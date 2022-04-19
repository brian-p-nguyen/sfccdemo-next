import { useState } from 'react';

const ContactForm = () => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  return (
    <section className="py-12 px-4 sm:py-16 lg:py-20" section="ContactForm">
      <div className="max-w-3xl mx-auto">
        {hasSubmitted ? (
          <div className="flex bg-green-50 mx-auto py-5 px-5 border border-2 border-green-300 rounded-lg sm:px-6 lg:px-7">
            <span className="text-green-500 mr-4 h-6 w-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
                style={{ width: 'inherit', height: 'inherit' }}
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M22 5.18L10.59 16.6l-4.24-4.24 1.41-1.41 2.83 2.83 10-10L22 5.18zm-2.21 5.04c.13.57.21 1.17.21 1.78 0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8c1.58 0 3.04.46 4.28 1.25l1.44-1.44A9.9 9.9 0 0012 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-1.19-.22-2.33-.6-3.39l-1.61 1.61z"></path>
              </svg>
            </span>
            Thanks for contacting us! We will be in touch shortly.
          </div>
        ) : (
          <form className="grid grid-cols-1 gap-y-6" onClick={() => setHasSubmitted(true)}>
            <div>
              <label htmlFor="full-name" className="sr-only">
                Full Name*
              </label>
              <input
                id="full-name"
                type="text"
                name="full-name"
                autoComplete="name"
                required="required"
                placeholder="Full Name**"
                className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email Address*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required="required"
                placeholder="Email Address**"
                className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone Number*
              </label>
              <input
                id="phone"
                type="text"
                name="phone"
                autoComplete="tel"
                required="required"
                placeholder="Phone Number**"
                className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Message*
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required="required"
                placeholder="Message**"
                className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
export default ContactForm;
