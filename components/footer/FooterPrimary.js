import Link from 'next/link';

const FooterPrimary = ({ footerData }) => {
  return (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mb-16">
      {footerData.map((link, i) => (
        <div className="mt-10" key={i}>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
              {link.title}
            </h3>
            <ul role="list" className="mt-4 space-y-4">
              {link.items.map((subLink, j) => (
                <li key={j}>
                  <Link href={subLink.url} passHref>
                    <a
                      className="text-base text-gray-500 hover:text-gray-900 nuxt-link-exact-active nuxt-link-active"
                      aria-current="page"
                    >
                      {subLink.title}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FooterPrimary;
