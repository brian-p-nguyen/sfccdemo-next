import { Popover, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, Fragment } from 'react';
import { nacelleClient } from 'services';
import { searchProducts } from 'utils/searchProducts';

const SearchBar = ({ productData, isMobile }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const handleSearch = (e) => {
    setQuery(e.target.value);
    setIsVisible(true);
    setResults(
      searchProducts({
        products: productData,
        query: e.target.value
      }).slice(0, 3)
    );
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsVisible(false);
    router.push(`/search?q=${query}`);
  };
  return (
    <div className="relative">
      <div
        className={`flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end${
          isMobile ? '' : ' hidden lg:block'
        }`}
      >
        <div className="max-w-lg w-full lg:max-w-xs">
          <label htmlFor="search" className="sr-only">
            Search
          </label>{' '}
          <div className="relative">
            <div className=" absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="h-5 w-5 text-gray-400"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <form onSubmit={handleSearchSubmit}>
              <input
                id="search-36"
                name="search-36"
                placeholder="Search"
                type="search"
                value={query}
                onChange={handleSearch}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </form>
          </div>
        </div>
      </div>
      <Transition
        as={Fragment}
        show={!!results.length && isVisible}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <div className="absolute md:right-0 md:w-96 md:top-10 z-50 bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-center text-2xl font-extrabold tracking-tight text-gray-900">
              Search Results
            </h2>
            <div>
              {results.map((result, i) => {
                const { handle, title, featuredMedia } = result.content;
                const { compareAtPrice, price } = result.variants[0];
                return (
                  <div key={i}>
                    <Link href={`/products/${handle}`} passHref>
                      <a className="py-6 flex">
                        <div className="relative flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                          <Image
                            src={featuredMedia.thumbnailSrc}
                            alt={featuredMedia.altText}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{title}</h3>
                              <p className="ml-4">
                                {compareAtPrice > price ? (
                                  <>
                                    <span className="text-red-600">
                                      ${price.toFixed(2)}
                                    </span>{' '}
                                    <span className="line-through">
                                      ${compareAtPrice.toFixed(2)}
                                    </span>
                                  </>
                                ) : (
                                  <span>${price.toFixed(2)}</span>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                );
              })}
              <button
                type="button"
                className="w-full text-center inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleSearchSubmit}
              >
                Search All
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default SearchBar;
