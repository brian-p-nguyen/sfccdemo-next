import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Popover } from '@headlessui/react';

const MegaMenu = ({ items }) => {
  return (
    <div className="relative bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
          <div className="col-start-2 grid grid-cols-2 gap-x-8">
            {items.slice(2, 4).map((link, i) => (
              <Link key={i} href={link.url} passHref>
                <Popover.Button
                  as="a"
                  className="group relative text-base sm:text-sm"
                >
                  <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                    <Image
                      src={link.media[0].url}
                      alt={link.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="mt-6 block font-medium text-gray-900">
                    {link.title}
                  </div>
                  <p aria-hidden="true" className="mt-1">
                    Shop now
                  </p>
                </Popover.Button>
              </Link>
            ))}
          </div>
          <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
            {items.slice(0, 2).map((item, i) => (
              <div key={i}>
                <p className="font-medium text-gray-900">{item.title}</p>
                <ul
                  role="list"
                  aria-labelledby={`${item.title}-heading`}
                  className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                >
                  {item.items.map((subItem, j) => (
                    <li className="flex" key={j}>
                      <Link href={subItem.url} passHref>
                        <Popover.Button as="a" className="hover:text-gray-800">
                          {subItem.title}
                        </Popover.Button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
