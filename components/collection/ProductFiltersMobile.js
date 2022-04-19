import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';
const ProductFiltersMobile = ({ filters, activeFilters, toggleFilter }) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  return (
    <div className="pt-8 lg:hidden">
      <h2 className="sr-only">Filters</h2>
      <button
        type="button"
        className="inline-flex items-center"
        onClick={() => setMobileFiltersOpen(true)}
      >
        <span className="text-sm font-medium text-gray-700">Filters</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className="flex-shrink-0 ml-1 h-5 w-5 text-gray-400"
        >
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden"
          onClose={() => setMobileFiltersOpen(false)}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300 sm:duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300 sm:duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="w-screen max-w-md transform transition ease-in-out duration-500">
                  <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                    <div className="relative w-full h-full bg-white shadow-xl py-4 pb-6 flex flex-col overflow-y-auto">
                      <div className="px-4 flex items-center justify-between">
                        <h2 className="text-lg font-medium text-gray-900">
                          Filters
                        </h2>
                        <button
                          type="button"
                          className="-mr-2 w-10 h-10 p-2 flex items-center justify-center text-gray-400 hover:text-gray-50"
                          onClick={() => setMobileFiltersOpen(false)}
                        >
                          <span className="sr-only">Close menu</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                        </button>
                      </div>
                      <form className="mt-4">
                        <div className="border-t border-gray-200 pt-4 pb-4">
                          <fieldset>
                            <legend className="w-full px-2"></legend>
                            <button
                              type="button"
                              aria-controls="productType-Product Type"
                              aria-expanded="false"
                              className="w-full p-2 flex items-center justify-between text-gray-400 hover:text-gray-500"
                            >
                              <span className="text-sm font-medium text-gray-900">
                                Product Type
                              </span>
                              <span className="ml-6 h-7 flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                  className="rotate-0 h-5 w-5 transform"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                              </span>
                            </button>
                          </fieldset>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default ProductFiltersMobile;
