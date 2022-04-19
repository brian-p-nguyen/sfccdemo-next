import ProductCard from 'components/collection/ProductCard';

import { useEffect, useState } from 'react';
import { nacelleClient } from 'services';

const RelatedProducts = ({ fields }) => {
  const { title, productOne, productTwo, productThree, productFour } = fields;
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    nacelleClient
      .products({
        handles: [productOne, productTwo, productThree, productFour].map(
          (prod) => prod.replace('::en-us', '')
        )
      })
      .then((res) => setRelatedProducts(res));
  }, [productOne, productTwo, productThree, productFour]);
  return (
    <section className="bg-white" section="RelatedProducts">
      <div className="max-w-7xl mx-auto py-16 sm:py-24">
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            {title}
          </h2>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
          {relatedProducts.map((product, index) => (
            <div key={`${product.id}-${index}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
