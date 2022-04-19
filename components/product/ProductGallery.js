import Image from 'next/image';
import { useEffect, useState } from 'react';

const ProductGallery = ({ product }) => {
  const [activeImage, setActiveImage] = useState(product.content.featuredMedia);
  useEffect(() => {
    setActiveImage(product.content.featuredMedia);
  }, [product]);
  return (
    <>
      <div className="flex flex-col-reverse">
        <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
          <div
            aria-orientation="horizontal"
            role="tablist"
            className="grid grid-cols-4 gap-6"
          >
            {product.content.media.map((image, i) => (
              <button
                key={i}
                type="button"
                className="relative flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                onClick={() => setActiveImage(image)}
              >
                {/* <Image
                  src={image.thumbnailSrc}
                  alt={image.altText}
                  width={130}
                  height={96}
                  className="rounded-md"
                /> */}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full aspect-w-1 aspect-h-1 relative rounded-lg overflow-hidden">
          <Image
            src={`https://zyed-001.sandbox.us01.dx.commercecloud.salesforce.com/on/demandware.static/-/Sites-apparel-m-catalog/default/dw2413bfcb/images/${activeImage.src}`}
            alt="altText"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </>
  );
};

export default ProductGallery;
