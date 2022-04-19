import { useState } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/solid';

const ProductExpandable = ({ features }) => {
  const [showingFeatures, setShowingFeatures] = useState(false);
  return (
    <section aria-labelledby="details-heading" className="mt-12">
      <h2 id="details-heading" className="sr-only">
        Additional details
      </h2>
      <div className="border-t divide-y divide-gray-200">
        <div data-v-41d9177d="">
          <h3>
            <button
              type="button"
              aria-controls="disclosure-1"
              className="group relative w-full py-6 flex justify-between items-center text-left"
              onClick={() => setShowingFeatures((t) => !t)}
            >
              <span className="text-gray-900 text-sm font-medium">
                Features
              </span>
              <span className="ml-6 flex items-center">
                {showingFeatures ? (
                  <MinusIcon className="block h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                ) : (
                  <PlusIcon className="block h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                )}
              </span>
            </button>
          </h3>
          {showingFeatures && (
            <div id="disclosure-1" className="pb-6 prose prose-sm">
              <ul role="list">
                {features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductExpandable;
