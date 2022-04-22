import ProductCard from "components/collection/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { nacelleClient } from "services";

const GET_COLLECTION_PRODUCTS = `
  query productCollections(
      $filter: ProductCollectionFilterInput
    ) {
    productCollections(filter: $filter) {
      products(first: 4) {
        content {
          title
          handle
          featuredMedia {
            src
            altText
          }
          options {
            name
            values
          }
        }
        variants {
          availableForSale
          compareAtPrice
          price
          content {
            selectedOptions {
              label
              name
              value
            }
          }
          metafields {
            key
            value
          }
        }
      }
    }
  }
`;

const FeaturedCollection = ({ fields }) => {
    const { title, fallbackCollectionHandle } = fields;
    const [collectionProductData, setCollectionProductData] = useState([]);
    useEffect(() => {
        const variables = {
            filter: {
                first: 1,
                locale: "en-US",
                handles: [fallbackCollectionHandle],
            },
        };
        nacelleClient
            .query({
                query: GET_COLLECTION_PRODUCTS,
                variables,
            })
            .then((data) => {
                console.log(fallbackCollectionHandle, data);
                setCollectionProductData(data.productCollections[0].products);
            });
    }, [fallbackCollectionHandle]);
    return (
        <section className="bg-white" section="FeaturedProducts">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-baseline sm:justify-between">
                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                        Featured {title}
                    </h2>
                    <a
                        href={`/collections/${fallbackCollectionHandle}`}
                        className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
                    >
                        Browse our {title.toLowerCase()}{" "}
                        <span aria-hidden="true">→</span>
                    </a>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
                    {collectionProductData.slice(0, 4).map((product, index) => (
                        <div key={`${product.id}-${index}`}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
                <div className="mt-6 sm:hidden">
                    <Link
                        href={`/collections/${fallbackCollectionHandle}`}
                        passHref
                    >
                        <a className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                            Browse our {title.toLowerCase()}{" "}
                            <span aria-hidden="true">→</span>
                        </a>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollection;
