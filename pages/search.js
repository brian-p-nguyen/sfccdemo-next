import { useCallback, useEffect, useState } from 'react';
import { nacelleClient } from 'services';
import ProductFilters from 'components/collection/ProductFilters';
import ProductGrid from 'components/collection/ProductGrid';
import ProductFiltersMobile from 'components/collection/ProductFiltersMobile';
import { getProductFilters } from 'utils/getProductFilters';
import { filterProducts } from 'utils/filterProducts';
import SearchBarLarge from 'components/search/SearchBarLarge';
import { searchProducts } from 'utils/searchProducts';
import Pagination from 'components/collection/Pagination';
import HeadComponent from 'components/head/Head';

function Search({ productData }) {
  const [searchedProducts, setSearchedProducts] = useState(productData);
  const [filteredSearchedProducts, setFilteredSearchedProducts] =
    useState(productData);
  const [
    filteredSearchedPaginatedProducts,
    setFilteredSearchedPaginatedProducts
  ] = useState(productData.slice(0, 20));
  const [page, setPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(20);

  const [filters, setFilters] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const toggleFilter = (filterIndex, value) => {
    setActiveFilters((prevState) =>
      prevState.map((filter, i) => {
        if (filterIndex === i) {
          if (filter.values.includes(value)) {
            // remove filter
            return {
              ...filter,
              values: filter.values.filter((v) => v !== value)
            };
          } else {
            // add filter
            return { ...filter, values: filter.values.concat(value) };
          }
        } else {
          return filter;
        }
      })
    );
  };

  const [query, setQuery] = useState('');
  // updates products when search bar changes
  const handleSearchChange = useCallback(
    (query) => {
      setQuery(query);
      if (productData?.length) {
        const newQuerySearchedProducts = searchProducts({
          products: productData,
          query
        });
        const newQueryFilters = getProductFilters({
          products: newQuerySearchedProducts
        });
        setFilters(newQueryFilters);
        setActiveFilters(
          newQueryFilters.map((filter) => ({ ...filter, values: [] }))
        );
        setSearchedProducts(newQuerySearchedProducts);
      }
    },
    [productData]
  );
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get('q');
    handleSearchChange(initialQuery);
  }, [handleSearchChange]);

  // updates products when filters change
  useEffect(() => {
    setFilteredSearchedProducts(
      filterProducts({
        products: searchedProducts,
        filters: activeFilters
      })
    );
  }, [searchedProducts, activeFilters]);

  // paginates products
  useEffect(() => {
    setFilteredSearchedPaginatedProducts(
      filteredSearchedProducts.slice(
        resultsPerPage * page - resultsPerPage,
        resultsPerPage * page
      )
    );
  }, [filteredSearchedProducts, page, resultsPerPage]);
  return (
    <>
      <HeadComponent title={'Search'} />
      <div className="SearchPage layout-default__nuxt">
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="border-b border-gray-200 pb-10 flex flex-wrap items-center gap-4 md:gap-8">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                Search
              </h1>{' '}
              <SearchBarLarge
                query={query}
                handleSearchChange={handleSearchChange}
              />
            </div>
            <div className="py-6">
              <p className="text-lg leading-6">
                {filteredSearchedProducts.length} result(s) found
              </p>
              <Pagination
                page={page}
                setPage={setPage}
                resultsPerPage={resultsPerPage}
                setResultsPerPage={setResultsPerPage}
                resultsTotalAmount={filteredSearchedProducts.length}
              />
              <ProductFiltersMobile
                filters={filters}
                activeFilters={activeFilters}
                toggleFilter={toggleFilter}
              />
              <div className="lg:pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
                <ProductFilters
                  filters={filters}
                  activeFilters={activeFilters}
                  toggleFilter={toggleFilter}
                />
                {productData && (
                  <ProductGrid products={filteredSearchedPaginatedProducts} />
                )}
              </div>
              <div className="pt-6">
                <Pagination
                  page={page}
                  setPage={setPage}
                  resultsPerPage={resultsPerPage}
                  setResultsPerPage={setResultsPerPage}
                  resultsTotalAmount={filteredSearchedProducts.length}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
