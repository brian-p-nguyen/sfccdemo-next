/* This example requires Tailwind CSS v2.0+ */
import { useContext, Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@nacelle/react-hooks';
import { Popover, Transition } from '@headlessui/react';
import { ShoppingBagIcon, MenuIcon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import SiteContext from 'context/SiteContext';
import AnnouncementBar from './AnnouncementBar';
import MegaMenu from './MegaMenu';
import SearchBar from './SearchBar';

const Header = ({ headerData, productData }) => {
  const { setMobileMenuOpen, setSidebarCartOpen } = useContext(SiteContext);
  const [{ cart }] = useCart();
  return (
    <header className="relative bg-white border-b border-gray-200">
      <AnnouncementBar />
      <nav className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center w-full py-4">
            <div className="flex justify-between w-full md:w-auto">
              <div className="flex justify-between w-full md:w-auto">
                <div className="md:hidden">
                  <button
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    onClick={() => setMobileMenuOpen(true)}
                  >
                    <span className="sr-only">Open menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <Link href="/" passHref>
                  <a className="relative w-10 h-9">
                    <span className="sr-only">Workflow</span>
                    <Image
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                      alt="logo"
                      layout="fill"
                      objectFit="contain"
                    />
                  </a>
                </Link>
                <div className="md:hidden">
                  <button
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    onClick={() => setSidebarCartOpen(true)}
                  >
                    <span className="sr-only">Open menu</span>
                    <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {cart.length}
                    </span>
                  </button>
                </div>
              </div>
              <div className="hidden md:flex md:ml-8 items-center">
                {headerData.map((link, i) =>
                  link.items ? (
                    <Popover key={i}>
                      <Popover.Button className="flex items-center cursor-pointer mr-4">
                        <span>{link.title}</span>
                        <ChevronDownIcon
                          className="text-gray-400 ml-1 h-5 w-5 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute top-full inset-x-0 border-t border-gray-200 text-sm text-gray-500 z-10">
                          <MegaMenu items={link.items} />
                        </Popover.Panel>
                      </Transition>
                    </Popover>
                  ) : (
                    <Link passHref key={i} href={link.url}>
                      <a className="mr-4">{link.title}</a>
                    </Link>
                  )
                )}
              </div>
            </div>
            <div className="hidden md:flex">
              <SearchBar productData={productData} />
              <button
                type="button"
                className="ml-0 md:ml-2 lg:ml-4 bg-white p-2 rounded-md text-gray-400 group p-2 flex items-center"
                onClick={() => setSidebarCartOpen(true)}
              >
                <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                  {cart.length}
                </span>
                <span className="sr-only">items in cart, view bag</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
