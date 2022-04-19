/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext, useEffect, useMemo, useState } from 'react';
import SiteContext from 'context/SiteContext';
import { Dialog, Transition } from '@headlessui/react';
import { nacelleClient } from 'services';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './SearchBar';

const MobileMenu = ({ headerData, productData }) => {
  const {
    store: { mobileMenuOpen },
    setMobileMenuOpen
  } = useContext(SiteContext);
  const [activeSection, setActiveSection] = useState('Womens');
  const womensLinks = useMemo(
    () => headerData.find((item) => item.title === 'Womens')?.items || [],
    [headerData]
  );
  const mensLinks = useMemo(
    () => headerData.find((item) => item.title === 'Mens')?.items || [],
    [headerData]
  );

  return (
    <Transition.Root show={mobileMenuOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={() => setMobileMenuOpen(false)}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-y-0 right-0 pr-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative w-screen max-w-md">
                <div className="h-full max-w-xs flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto transition ease-in-out duration-300 transform">
                    <div className="px-4 pt-5 pb-2 flex">
                      <button
                        type="button"
                        className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>{' '}
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
                    </div>{' '}
                    <SearchBar productData={productData} isMobile={true} />
                    <div className="mt-2">
                      <div className="border-b border-gray-200">
                        <div
                          aria-orientation="horizontal"
                          role="tablist"
                          className="-mb-px flex px-4 space-x-8"
                        >
                          <button
                            type="button"
                            className={`flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium ${
                              activeSection === 'Womens'
                                ? 'text-indigo-600 border-indigo-600'
                                : 'text-gray-900 border-transparent'
                            }`}
                            onClick={() => setActiveSection('Womens')}
                          >
                            Womens
                          </button>
                          <button
                            type="button"
                            className={`flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium ${
                              activeSection === 'Mens'
                                ? 'text-indigo-600 border-indigo-600'
                                : 'text-gray-900 border-transparent'
                            }`}
                            onClick={() => setActiveSection('Mens')}
                          >
                            Mens
                          </button>
                        </div>
                      </div>{' '}
                      {activeSection === 'Womens' && (
                        <>
                          <div
                            aria-labelledby="tabs-0-tab-0"
                            role="tabpanel"
                            tabIndex="0"
                            className="pt-10 pb-8 px-4 space-y-10"
                          >
                            <div className="grid grid-cols-2 gap-x-4">

                            </div>
                          </div>
                          <div
                            aria-labelledby="tabs-0-tab-0"
                            role="tabpanel"
                            tabIndex="0"
                            className="pt-10 pb-8 px-4 space-y-10"
                          >
                            {womensLinks.slice(0, 2).map((link, i) => (
                              <div key={i}>
                                <p className="font-medium text-gray-900">
                                  {link.title}
                                </p>
                                <ul
                                  role="list"
                                  aria-labelledby={`${link.title}-heading-mobile`}
                                  className="mt-6 flex flex-col space-y-6"
                                >
                                  {link.items.map((subLink, j) => (
                                    <li className="flow-root" key={j}>
                                      <Link
                                        href={subLink.url}
                                        className="-m-2 p-2 block text-gray-500"
                                        passHref
                                      >
                                        <a
                                          onClick={() =>
                                            setMobileMenuOpen(false)
                                          }
                                        >
                                          {subLink.title}
                                        </a>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                      {activeSection === 'Mens' && (
                        <>
                          <div
                            aria-labelledby="tabs-1-tab-1"
                            role="tabpanel"
                            tabIndex="1"
                            className="pt-10 pb-8 px-4 space-y-10"
                          >
                            <div className="grid grid-cols-2 gap-x-4">
                              {mensLinks.slice(2, 4).map((link, i) => (
                                <Link
                                  href={link.url}
                                  className="group relative text-sm"
                                  key={i}
                                  passHref
                                >
                                  <a onClick={() => setMobileMenuOpen(false)}>
                                    <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                      <Image
                                        src={link.media[0].url}
                                        alt={link.title}
                                        layout="fill"
                                        objectFit="cover"
                                      />
                                    </div>{' '}
                                    <div className="mt-6 block font-medium text-gray-900">
                                      {link.title}
                                    </div>{' '}
                                    <p aria-hidden="true" className="mt-1">
                                      Shop now
                                    </p>
                                  </a>
                                </Link>
                              ))}
                            </div>
                          </div>
                          <div
                            aria-labelledby="tabs-1-tab-1"
                            role="tabpanel"
                            tabIndex="0"
                            className="pt-10 pb-8 px-4 space-y-10"
                          >
                            {mensLinks.slice(0, 2).map((link, i) => (
                              <div key={i}>
                                <p className="font-medium text-gray-900">
                                  {link.title}
                                </p>
                                <ul
                                  role="list"
                                  aria-labelledby={`${link.title}-heading-mobile`}
                                  className="mt-6 flex flex-col space-y-6"
                                >
                                  {link.items.map((subLink, j) => (
                                    <li className="flow-root" key={j}>
                                      <Link
                                        href={subLink.url}
                                        className="-m-2 p-2 block text-gray-500"
                                        passHref
                                      >
                                        <a
                                          onClick={() =>
                                            setMobileMenuOpen(false)
                                          }
                                        >
                                          {subLink.title}
                                        </a>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>{' '}
                    <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                      {headerData.slice(2, 4).map((link, i) => (
                        <div key={i} className="flow-root">
                          <Link href={link.url} passHref>
                            <a
                              onClick={() => setMobileMenuOpen(false)}
                              className="-m-2 p-2 block font-medium text-gray-900"
                            >
                              {link.title}
                            </a>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default MobileMenu;
