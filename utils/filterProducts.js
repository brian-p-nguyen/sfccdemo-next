export const filterProducts = ({ products, filters }) => {
  let results = [...products];
  const emptyFilters = true;
  filters.forEach((filter) => {
    if (filter.values.length) {
      emptyFilters = false;
    }
  });
  if (emptyFilters) return results;
  const types = filters?.filter((filter) => filter.type === 'productType');
  const options = filters?.filter((filter) => filter.type === 'productOption');
  if (types.length) {
    results = products.filter(({ productType }) =>
      types.some(({ value }) => {
        return value === productType;
      })
    );
  }
  if (options.length) {
    results = products.filter((product) =>
      product.variants.some((variant) =>
        variant.content.selectedOptions.some((selectedOption) => {
          return options.some(({ name, values }) => {
            return (
              selectedOption.name === name &&
              values.includes(selectedOption.value)
            );
          });
        })
      )
    );
  }
  return results;
};
