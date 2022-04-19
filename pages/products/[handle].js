import { nacelleClient } from 'services';
import ProductGallery from 'components/product/ProductGallery';
import ProductDetails from 'components/product/ProductDetails';
import HeadComponent from 'components/head/Head';
import DynamicComponent from 'components/section/DynamicComponent';
import ProductExpandable from 'components/product/ProductExpandable';

function Product({ product, content }) {
  return (
    product && (
      <>
        <HeadComponent title={product.content.title} />
        <div className="productPage layout-default__next">
          <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
              <ProductGallery product={product} />
              <div>
                <ProductDetails product={product} />
                {content && !!content.fields.productFeatures.length && (
                  <ProductExpandable
                    features={content.fields.productFeatures}
                  />
                )}
              </div>
            </div>
            {content &&
              content.fields.sections.map(({ fields, sys }) => (
                <DynamicComponent
                  key={sys.id}
                  component={sys.contentType.sys.id}
                  fields={fields}
                />
              ))}
          </div>
        </div>
      </>
    )
  );
}

export default Product;

export async function getStaticPaths() {
  // Performs a GraphQL query to Nacelle to get product handles.
  // (https://nacelle.com/docs/querying-data/storefront-sdk)
  const results = await nacelleClient.query({
    query: HANDLES_QUERY
  });
  const handles = results.products
    .filter((product) => product.content?.handle)
    .map((product) => ({ params: { handle: product.content.handle } }));

  return {
    paths: handles,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  // Performs a GraphQL query to Nacelle to get product data,
  // using the handle of the current page.
  // (https://nacelle.com/docs/querying-data/storefront-sdk)
  const { products } = await nacelleClient.query({
    query: PAGE_QUERY,
    variables: { handle: params.handle }
  });

  const content = await nacelleClient.content({
    handles: [params.handle]
  });

  return {
    props: {
      product: products[0],
      content: content?.[0] || null
    }
  };
}

// GraphQL query for the handles of products. Used in `getStaticPaths`.
// (https://nacelle.com/docs/querying-data/storefront-api)
const HANDLES_QUERY = `
  {
    products {
      content {
        handle
      }
    }
  }
`;

// GraphQL query for product content. Used in `getStaticProps`.
// (https://nacelle.com/docs/querying-data/storefront-api)
const PAGE_QUERY = `
  query ProductPage($handle: String!){
    products(filter: { handles: [$handle] }){
      nacelleEntryId
      sourceEntryId
      content{
        handle
        title
        description
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
          thumbnailSrc
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
      }
    }
  }
`;
