import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useMemo } from 'react';
const Pagination = ({
  page,
  setPage,
  resultsPerPage,
  setResultsPerPage,
  resultsTotalAmount
}) => {
  const numPages = useMemo(() => {
    return Math.ceil(resultsTotalAmount / resultsPerPage);
  }, [resultsPerPage, resultsTotalAmount]);
  return (
    resultsTotalAmount > 0 && (
      <div className="bg-white pt-5 flex items-center justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50${
              page === 1 ? ' bg-gray-100 hover:bg-gray-100' : ''
            }`}
            onClick={() => setPage((p) => (p === 1 ? p : p - 1))}
          >
            Previous
          </button>
          <button
            className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50${
              page === numPages ? ' bg-gray-100 hover:bg-gray-100' : ''
            }`}
            onClick={() => setPage((p) => (p === numPages ? p : p + 1))}
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          {numPages > 1 ? (
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50${
                    page === 1 ? ' bg-gray-100 hover:bg-gray-100' : ''
                  }`}
                  disabled={page === 1}
                  onClick={() => setPage((p) => (p === 1 ? p : p - 1))}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                <button
                  onClick={() => setPage(1)}
                  aria-current="page"
                  className={`${
                    page === 1
                      ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 '
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 '
                  }relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                >
                  1
                </button>
                {numPages > 1 && (
                  <button
                    onClick={() => setPage(2)}
                    className={`${
                      page === 2
                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 '
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 '
                    }relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                  >
                    2
                  </button>
                )}
                {numPages > 2 && (
                  <button
                    onClick={() => setPage(3)}
                    className={`${
                      page === 3
                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 '
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 '
                    }relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                  >
                    3
                  </button>
                )}
                {numPages > 6 && (
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                  </span>
                )}
                {numPages > 5 && (
                  <button
                    onClick={() => setPage(numPages - 2)}
                    className={`${
                      page === numPages - 2
                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 '
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 '
                    }relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                  >
                    {numPages - 2}
                  </button>
                )}
                {numPages > 4 && (
                  <button
                    onClick={() => setPage(numPages - 1)}
                    className={`${
                      page === numPages - 1
                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 '
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 '
                    }relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                  >
                    {numPages - 1}
                  </button>
                )}
                {numPages > 3 && (
                  <button
                    onClick={() => setPage(numPages)}
                    className={`${
                      page === numPages
                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 '
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 '
                    }relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                  >
                    {numPages}
                  </button>
                )}
                <button
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50${
                    page === numPages ? ' bg-gray-100 hover:bg-gray-100' : ''
                  }`}
                  disabled={page === numPages}
                  onClick={() => setPage((p) => (p === numPages ? p : p + 1))}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          ) : (
            <div />
          )}
          <div className="flex items-center">
            <p className="text-sm text-gray-700 whitespace-nowrap">
              Results per page:
            </p>{' '}
            <select
              className="form-select appearance-none inline-block w-full pl-3 mx-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              aria-label="Results per page"
              onChange={(e) => setResultsPerPage(e.target.value)}
            >
              <option selected value="20">
                20
              </option>
              <option value="40">40</option>
              <option value="60">60</option>
            </select>
          </div>
        </div>
      </div>
    )
  );
};

export default Pagination;
