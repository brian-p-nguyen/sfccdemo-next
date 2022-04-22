export default function generateVariantSelectedOptions(variant, options) {
    return {
        ...variant,
        content: {
            selectedOptions: options.map((opt) => {
                let nameToSearch =
                    opt.name.toLowerCase() === "color"
                        ? "refinementColor"
                        : opt.name.toLowerCase();
                let optionMetafield = variant.metafields.find(
                    (mf) => mf.key === nameToSearch
                );
                if (optionMetafield) {
                    return {
                        name: opt.name,
                        value: opt.values.includes(optionMetafield.value)
                            ? optionMetafield.value
                            : opt.values[0],
                    };
                } else {
                    return {
                        name: opt.name,
                        value: opt.values[0],
                    };
                }
            }),
        },
    };
}
