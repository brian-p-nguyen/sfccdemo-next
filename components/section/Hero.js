import Image from 'next/image';
import Link from 'next/link';
const Hero = ({ fields }) => {
  const { ctaText, ctaUrl, featuredMedia, subtitle, textColor, title } = fields;
  return (
    <section className="bg-white" section="Hero">
      <div
        className={`relative ${featuredMedia ? 'bg-gray-900' : 'bg-gray-50'}`}
      >
        {featuredMedia ? (
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
            <Image
              src={`https:${featuredMedia.fields.file.url}`}
              alt={featuredMedia.fields.file.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ) : null}
        <div
          aria-hidden="true"
          className={`absolute inset-0 ${
            featuredMedia ? 'bg-gray-900' : 'bg-gray-50'
          } opacity-50`}
        ></div>
        <div
          className={`relative max-w-3xl mx-auto ${
            featuredMedia ? 'py-32 sm:py-48' : 'py-16'
          } px-6 flex flex-col items-center text-center  lg:px-0`}
        >
          <h1
            className="text-4xl font-extrabold tracking-tight lg:text-6xl"
            style={{ color: textColor }}
          >
            {title}
          </h1>
          <p
            className="mt-4 text-xl text-gray-500"
            style={{ color: textColor }}
          >
            {subtitle}
          </p>
          {ctaText && ctaUrl ? (
            <Link href={ctaUrl} passHref>
              <a className="mt-8 inline-block bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100">
                {ctaText}
              </a>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Hero;
