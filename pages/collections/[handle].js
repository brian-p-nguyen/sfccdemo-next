import { useEffect, useMemo, useState } from "react";
import { nacelleClient } from "services";
import ProductFilters from "components/collection/ProductFilters";
import ProductGrid from "components/collection/ProductGrid";
import ProductFiltersMobile from "components/collection/ProductFiltersMobile";
import { getProductFilters } from "utils/getProductFilters";
import { filterProducts } from "utils/filterProducts";
import Pagination from "components/collection/Pagination";
import HeadComponent from "components/head/Head";

function Collection({ products, collection }) {
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [filteredPaginatedProducts, setFilteredPaginatedProducts] = useState(
        products.slice(0, 36)
    );
    const filters = useMemo(() => getProductFilters({ products }), [products]);
    const [activeFilters, setActiveFilters] = useState(
        filters.map((filter) => ({ ...filter, values: [] }))
    );
    const toggleFilter = (filterIndex, value) => {
        setActiveFilters((prevState) =>
            prevState.map((filter, i) => {
                if (filterIndex === i) {
                    if (filter.values.includes(value)) {
                        // remove filter
                        return {
                            ...filter,
                            values: filter.values.filter((v) => v !== value),
                        };
                    } else {
                        // add filter
                        return {
                            ...filter,
                            values: filter.values.concat(value),
                        };
                    }
                } else {
                    return filter;
                }
            })
        );
    };
    // updates products when filters change
    useEffect(() => {
        setFilteredProducts(
            filterProducts({
                products,
                filters: activeFilters,
            })
        );
    }, [products, activeFilters, setFilteredProducts]);

    const [page, setPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(20);

    // paginates products
    useEffect(() => {
        setFilteredPaginatedProducts(
            filteredProducts.slice(
                resultsPerPage * page - resultsPerPage,
                resultsPerPage * page
            )
        );
    }, [filteredProducts, page, resultsPerPage]);

    return (
        collection && (
            <>
                <HeadComponent title={collection.content.title} />
                <div
                    data-v-6c4519e3=""
                    className="collectionPage layout-default__nuxt"
                >
                    <div data-v-6c4519e3="" className="bg-white">
                        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                            <div className="border-b border-gray-200 pb-10 flex">
                                {collection.content?.title && (
                                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 flex-1">
                                        {collection.content.title}
                                    </h1>
                                )}
                            </div>
                            <ProductFiltersMobile
                                filters={filters}
                                activeFilters={activeFilters}
                                toggleFilter={toggleFilter}
                            />
                            <Pagination
                                page={page}
                                setPage={setPage}
                                resultsPerPage={resultsPerPage}
                                setResultsPerPage={setResultsPerPage}
                                resultsTotalAmount={filteredProducts.length}
                            />
                            <div className="lg:pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
                                <ProductFilters
                                    filters={filters}
                                    activeFilters={activeFilters}
                                    toggleFilter={toggleFilter}
                                />
                                {products && (
                                    <ProductGrid
                                        products={filteredPaginatedProducts}
                                    />
                                )}
                            </div>
                            <div className="pt-6">
                                <Pagination
                                    page={page}
                                    setPage={setPage}
                                    resultsPerPage={resultsPerPage}
                                    setResultsPerPage={setResultsPerPage}
                                    resultsTotalAmount={filteredProducts.length}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    );
}

export default Collection;

export async function getStaticPaths() {
    // Performs a GraphQL query to Nacelle to get product collection handles.
    // (https://nacelle.com/docs/querying-data/storefront-sdk)
    const results = await nacelleClient.query({
        query: HANDLES_QUERY,
    });
    const handles = results.productCollections
        .filter((collection) => collection.content?.handle)
        .map((collection) => ({
            params: { handle: collection.content.handle },
        }));

    return {
        paths: handles,
        fallback: "blocking",
    };
}

export async function getStaticProps({ params }) {
    // Performs a GraphQL query to Nacelle to get product collection data,
    // using the handle of the current page.
    // (https://nacelle.com/docs/querying-data/storefront-sdk)
    const { productCollections } = await nacelleClient.query({
        query: PAGE_QUERY,
        variables: { handle: params.handle },
    });

    if (!productCollections.length) {
        return {
            notFound: true,
        };
    }

    const { products, ...rest } = productCollections[0];
    return {
        props: {
            collection: rest,
            products,
            canFetch: products?.length > 12,
        },
    };
}

// GraphQL fragment of necessary product data.
// (https://nacelle.com/docs/querying-data/storefront-api)
const PRODUCT_FRAGMENT = `
  nacelleEntryId
  sourceEntryId
  content{
    handle
    title
    options{
      name
      values
    }
    featuredMedia{
      src
      thumbnailSrc
      altText
    }
    media{
      src
      id
      altText
    }
  }
  variants{
    nacelleEntryId
    sourceEntryId
    sku
    availableForSale
    price
    compareAtPrice
    content{
      title
      selectedOptions{
        name
        value
      }
      featuredMedia{
        src
        thumbnailSrc
        altText
      }
    }
    metafields {
      key
      value
    }
  }
`;

// GraphQL query for the handles of product collections.
// Used in `getStaticPaths`.
// (https://nacelle.com/docs/querying-data/storefront-api)
const HANDLES_QUERY = `
  {
    productCollections {
      content {
        handle
      }
    }
  }
`;

// GraphQL query for product collection content and initial products.
// Used in `getStaticProps`.
// (https://nacelle.com/docs/querying-data/storefront-api)
const PAGE_QUERY = `
  query CollectionPage($handle: String!){
    productCollections(filter: { handles: [$handle] }){
      nacelleEntryId
      sourceEntryId
      content{
        title
      }
      products(first: 13){
        ${PRODUCT_FRAGMENT}
      }
    }
  }
`;

// GraphQL query for paginated products within a collection.
// Used in `handleFetch`.
// (https://nacelle.com/docs/querying-data/storefront-api)
const PRODUCTS_QUERY = `
  query CollectionProducts($handle: String!, $after: String!){
    productCollections(filter: { handles: [$handle] }){
      products(first: 12, after: $after){
        ${PRODUCT_FRAGMENT}
      }
    }
  }
`;
