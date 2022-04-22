import { Fragment, useContext, useEffect, useState } from "react";
import { useCart } from "@nacelle/react-hooks";
import SiteContext from "context/SiteContext";
import { getSelectedVariant } from "utils/getSelectedVariant";
import { getCartVariant } from "utils/getCartVariant";
import generateVariantSelectedOptions from "utils/generateVariantSelectedOptions";

const ProductDetails = ({ product }) => {
    let options = null;
    if (product?.content?.options?.some((option) => option.values.length > 1)) {
        options = product?.content?.options;
        if (product.variants[0].content === null) {
            product.variants = product.variants.map((v) =>
                generateVariantSelectedOptions(v, options)
            );
        }
    }
    const [, { addToCart }] = useCart();
    const { setSidebarCartOpen } = useContext(SiteContext);
    const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
    const [selectedOptions, setSelectedOptions] = useState(
        selectedVariant.content?.selectedOptions || []
    );
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        let firstAvailableVariant = product.variants.find(
            (v) => v.availableForSale && v.price
        );
        setSelectedVariant(firstAvailableVariant);
        setSelectedOptions(firstAvailableVariant.content.selectedOptions || []);
        setQuantity(1);
    }, [product]);

    const buttonText = selectedVariant
        ? selectedVariant.availableForSale
            ? "Add To Cart"
            : "Sold Out"
        : "Select Option";

    const handleOptionChange = (event, option) => {
        const newOption = { name: option.name, value: event.target.value };
        const optionIndex = selectedOptions.findIndex((selectedOption) => {
            return selectedOption.name === newOption.name;
        });

        const newSelectedOptions = [...selectedOptions];
        if (optionIndex > -1) {
            newSelectedOptions.splice(optionIndex, 1, newOption);
            setSelectedOptions([...newSelectedOptions]);
        } else {
            setSelectedOptions([...newSelectedOptions, newOption]);
        }
        const variant = getSelectedVariant({
            product,
            options: newSelectedOptions,
        });
        setSelectedVariant(variant ? { ...variant } : null);
    };

    const handleQuantityChange = (event) => {
        setQuantity(+event.target.value);
    };

    // Get product data and add it to the cart by using `addToCart`
    // from the `useCart` hook provided by `@nacelle/react-hooks`.
    // (https://github.com/getnacelle/nacelle-react/tree/main/packages/react-hooks)
    const handleAddItem = () => {
        const variant = getCartVariant({
            product,
            variant: selectedVariant,
        });
        addToCart({
            variant,
            quantity,
        });
        setSidebarCartOpen(true);
    };
    return (
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                {!!product.content.title && product.content.title}
            </h1>
            <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-gray-900">
                    {selectedVariant.compareAtPrice ? (
                        <>
                            <span className="text-red-600">
                                ${selectedVariant.price.toFixed(2)}
                            </span>{" "}
                            <span className="line-through">
                                ${selectedVariant.compareAtPrice.toFixed(2)}
                            </span>
                        </>
                    ) : (
                        <span>${selectedVariant.price}</span>
                    )}
                </p>
            </div>
            {product.content.description && (
                <div className="mt-6">
                    <h3 className="sr-only">Description</h3>
                    <div
                        className="text-base text-gray-700 space-y-6"
                        dangerouslySetInnerHTML={{
                            __html: product.content.description,
                        }}
                    />
                </div>
            )}
            <form className="mt-6">
                {options && (
                    <div className="max-w-xs">
                        {options.map((option, oIndex) => (
                            <Fragment key={oIndex}>
                                <h3 className="font-medium text-sm text-gray-700">
                                    {option.name}
                                </h3>
                                <fieldset className="mt-2 mb-3">
                                    <legend className="sr-only">
                                        Choose a {option.name}
                                    </legend>
                                    <select
                                        id={`select-${oIndex}-${product.id}`}
                                        onChange={($event) =>
                                            handleOptionChange($event, option)
                                        }
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                        {option.values.map((value, vIndex) => (
                                            <option key={vIndex} value={value}>
                                                {value}
                                            </option>
                                        ))}
                                    </select>
                                </fieldset>
                            </Fragment>
                        ))}
                    </div>
                )}

                <div className="mt-4">
                    <label
                        className="font-medium text-sm text-gray-700"
                        htmlFor={`quantity-${product.nacelleEntryId}`}
                    >
                        Quantity
                    </label>
                    <div className="max-w-xs mt-2">
                        <input
                            id={`quantity-${product.nacelleEntryId}`}
                            className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                    </div>
                </div>
                <div className="mt-10 flex">
                    <button
                        type="button"
                        onClick={handleAddItem}
                        className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                    >
                        <span>{buttonText}</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductDetails;
