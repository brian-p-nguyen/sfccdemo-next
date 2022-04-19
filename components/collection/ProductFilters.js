const ProductFilters = ({ filters, activeFilters, toggleFilter }) => {
  return (
    <div>
      <h2 className="sr-only">Filters</h2>
      <form className="hidden lg:block divide-y divide-gray-200 space-y-10">
        {filters.map((filter, i) => (
          <div key={i} className={i !== 0 ? 'pt-10' : undefined}>
            <fieldset>
              <legend className="block text-sm font-medium text-gray-900">
                {filter.name}
              </legend>
              {filter.values.map((value, j) => (
                <div key={j} className="pt-6 space-y-3">
                  <div className="flex items-center">
                    <input
                      id={`${filter.type}-${filter.name}-${value}`}
                      type="checkbox"
                      className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      checked={activeFilters[i].values.includes(value)}
                      onChange={() => toggleFilter(i, value)}
                    />
                    <label
                      htmlFor={`${filter.type}-${filter.name}-${value}`}
                      className="ml-3 text-sm text-gray-600 cursor-pointer"
                    >
                      {value}
                    </label>
                  </div>
                </div>
              ))}
            </fieldset>
          </div>
        ))}
      </form>
    </div>
  );
};

export default ProductFilters;
