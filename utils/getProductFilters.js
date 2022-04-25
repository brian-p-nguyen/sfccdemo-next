export const getProductFilters = ({ products }) => {
    return products
        .reduce((acc, product) => {
            const filterValue = product.productType?.toLowerCase();
            let filterIndex = acc.findIndex((filterItem) => {
                return filterItem.type === "productType";
            });
            if (filterValue) {
                if (filterIndex < 0) {
                    acc.push({
                        type: "productType",
                        name: "Product Type",
                        values: [filterValue],
                    });
                } else if (!acc[filterIndex].values.includes(filterValue)) {
                    acc[filterIndex].values.push(filterValue);
                }
            }
            product.content?.options.forEach((option) => {
                if (option.name !== "Title") {
                    filterIndex = acc.findIndex(
                        (filterItem) =>
                            filterItem.type === "productOption" &&
                            filterItem.name.toLowerCase() ===
                                option.name.toLowerCase()
                    );
                    if (filterIndex < 0) {
                        acc.push({
                            type: "productOption",
                            name: option.name.toLowerCase(),
                            values: option.values,
                        });
                    } else {
                        acc[filterIndex] = {
                            ...acc[filterIndex],
                            values: Array.from(
                                new Set(
                                    acc[filterIndex].values.concat(
                                        option.values
                                    )
                                )
                            ),
                        };
                    }
                }
            });
            return acc;
        }, [])
        .sort((a) => {
            if (a.type === "productType") return -1;
            else return 1;
        });
};
