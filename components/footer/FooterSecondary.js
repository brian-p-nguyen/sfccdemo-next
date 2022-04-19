import { FacebookIcon, GithubIcon, TwitterIcon } from 'assets/svgs';

const FooterSecondary = ({ socialData }) => {
  const iconMap = {
    Facebook: <FacebookIcon />,
    Github: <GithubIcon />,
    Twitter: <TwitterIcon />
  };
  return (
    <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
      <div className="flex space-x-6 md:order-2">
        {socialData.map((link, i) => (
          <a
            key={i}
            href={link.url}
            className="text-gray-500 hover:text-gray-900"
          >
            <span className="sr-only">{link.title}</span>
            <span className="h-6 w-6">{iconMap[link.title]}</span>
          </a>
        ))}
      </div>
      <p className="mt-8 text-base text-gray-500 md:mt-0 md:order-1">
        &copy; {new Date().getFullYear()} Nacelle, Inc. All rights reserved.
      </p>
    </div>
  );
};

export default FooterSecondary;
