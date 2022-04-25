import generateVariantSelectedOptions from "./generateVariantSelectedOptions";

export const filterProducts = ({ products, filters }) => {
    let results = [...products];
    const emptyFilters = true;
    filters.forEach((filter) => {
        if (filter.values.length) {
            emptyFilters = false;
        }
    });
    if (emptyFilters) return results;
    const types = filters?.filter((filter) => filter.type === "productType");
    const options = filters?.filter(
        (filter) => filter.type === "productOption"
    );
    if (types.length) {
        results = products.filter(({ productType }) =>
            types.some(({ value }) => {
                return value === productType;
            })
        );
    }
    if (options.length) {
        results = products.filter((product) => {
            const productHasSelectedOption = product.variants.some(
                (variant) => {
                    if (variant.content === null) {
                        variant = generateVariantSelectedOptions(
                            variant,
                            product.content?.options || []
                        );
                    }
                    const variantHasSelectedOption =
                        variant.content.selectedOptions.some(
                            (selectedOption) => {
                                return options.some(({ name, values }) => {
                                    return (
                                        selectedOption.name.toLowerCase() ===
                                            name.toLowerCase() &&
                                        values.includes(selectedOption.value)
                                    );
                                });
                            }
                        );
                    return variantHasSelectedOption;
                }
            );
            return productHasSelectedOption;
        });
    }
    return results;
};
