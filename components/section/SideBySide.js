import Image from 'next/image';
import Link from 'next/link';
const SideBySide = ({ fields }) => {
  const {
    ctaText,
    ctaUrl,
    featuredMedia,
    content,
    title,
    reverseDesktop,
    imageFullWidth
  } = fields;
  return (
    <section className="relative bg-white" section="SideBySideFull">
      {imageFullWidth && (
        <div className="lg:absolute lg:inset-0">
          <div
            className={`lg:absolute lg:inset-y-0 lg:w-1/2 ${
              reverseDesktop ? 'lg:right-0' : 'lg:left-0'
            }`}
          >
            {featuredMedia ? (
              <Image
                src={`https:${featuredMedia.fields.file.url}`}
                alt={featuredMedia.fields.title}
                layout="fill"
                objectFit="cover"
              />
            ) : null}
          </div>
        </div>
      )}
      <div
        className={`relative pt-12 pb-16 px-4 ${
          imageFullWidth ? 'sm:pt-16' : 'py-24 sm:py-32'
        } sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-2 lg:items-center`}
      >
        <div
          className={
            reverseDesktop ? 'lg:col-start-1 lg:pr-8' : 'lg:col-start-2 lg:pl-8'
          }
        >
          <div
            className={`text-base max-w-prose mx-auto lg:max-w-lg ${
              reverseDesktop ? 'lg:mr-auto lg:ml-0' : 'lg:ml-auto lg:mr-0'
            }`}
          >
            <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {title}
            </h3>
            <p className="mt-4 text-lg text-gray-500">
              {content.content[0].content[0].value}
            </p>
            {ctaText && ctaUrl ? (
              <div className="mt-6">
                <Link href={ctaUrl} passHref>
                  <a className="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                    {ctaText}
                  </a>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
        {!imageFullWidth && (
          <div className="aspect-w-3 aspect-h-2 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={`https:${featuredMedia.fields.file.url}`}
              alt={featuredMedia.fields.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default SideBySide;
