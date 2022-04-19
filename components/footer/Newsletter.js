import { useState } from 'react';
const Newsletter = () => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  return (
    <div className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center">
        <div className="lg:w-0 lg:flex-1">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Sign up for our newsletter
          </h2>{' '}
          <p className="mt-3 max-w-3xl text-lg leading-6 text-gray-300">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            Lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat.
          </p>
        </div>{' '}
        <div className="mt-8 lg:mt-0 lg:ml-8">
          {hasSubmitted ? (
            <div className="flex bg-green-50 mx-auto py-4 px-4 border border-2 border-green-300 rounded-lg sm:px-5 lg:px-6">
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
              Thanks for signing up!
            </div>
          ) : (
            <form className="sm:flex">
              <label htmlFor="email-address" className="sr-only"></label>
              <input
                type="email"
                autoComplete="email"
                required="required"
                placeholder="Enter your email"
                className="w-full px-5 py-3 border border-transparent placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white sm:max-w-xs rounded-md"
              />
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                  onClick={() => setHasSubmitted(true)}
                >
                  Sign Up
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
