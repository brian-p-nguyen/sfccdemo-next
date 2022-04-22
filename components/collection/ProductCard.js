import { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@nacelle/react-hooks";
import { getSelectedVariant } from "utils/getSelectedVariant";
import { getCartVariant } from "utils/getCartVariant";
import SiteContext from "context/SiteContext";
import generateVariantSelectedOptions from "utils/generateVariantSelectedOptions";

function ProductCard({ product }) {
    let options = null;
    if (product?.content?.options?.some((option) => option.values.length > 1)) {
        options = product?.content?.options;
        if (product.variants[0].content === null) {
            product.variants = product.variants.map((v) =>
                generateVariantSelectedOptions(v, options)
            );
        }
    }
    const { setSidebarCartOpen } = useContext(SiteContext);
    const [, { addToCart }] = useCart();
    const [miniATCOpen, setMiniATCOpen] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState(
        product.variants.find((v) => v.availableForSale && v.price)
    );
    const [selectedOptions, setSelectedOptions] = useState(
        selectedVariant?.content?.selectedOptions
    );

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
        if (variant) {
            setSelectedVariant({ ...variant });
        }
    };

    const handleAddItem = () => {
        const variant = getCartVariant({
            product,
            variant: selectedVariant,
        });
        addToCart({
            variant,
            quantity: 1,
        });
        setSidebarCartOpen(true);
    };
    return (
        product && (
            <div
                className="relative"
                onMouseEnter={() => setMiniATCOpen(true)}
                onMouseLeave={() => setMiniATCOpen(false)}
            >
                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <Link
                        href={`/products/${encodeURIComponent(
                            product.content?.handle
                        )}`}
                        passHref
                    >
                        <a className="group relative">
                            {product.content?.featuredMedia ? (
                                <>
                                    <Image
                                        src={
                                            process.env
                                                .NEXT_PUBLIC_BASE_STOREFRONT_IMAGE_URL +
                                            product.content?.featuredMedia.src
                                        }
                                        alt={product.content?.featuredMedia.id}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                    <div className="absolute top-0 left-0 w-full h-full z-2 bg-white opacity-0 hover:opacity-30" />
                                </>
                            ) : (
                                <div>No Image</div>
                            )}
                        </a>
                    </Link>
                </div>
                {miniATCOpen ? (
                    <div>
                        {options &&
                            options.map((option, i) => (
                                <select
                                    key={i}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md mt-3"
                                    onChange={(event) =>
                                        handleOptionChange(event, option)
                                    }
                                >
                                    {option.values.map((value, vIndex) => (
                                        <option key={vIndex} value={value}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            ))}
                        <button
                            type="button"
                            disabled={!selectedVariant?.availableForSale}
                            onClick={handleAddItem}
                            className="relative flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200 w-full mt-3"
                        >
                            <span>{buttonText}</span>
                        </button>
                    </div>
                ) : (
                    <div>
                        {product.content?.title && (
                            <h3 className="mt-4 text-sm text-gray-700">
                                {product.content.title}
                            </h3>
                        )}
                        {selectedVariant?.compareAtPrice ? (
                            <p className="mt-1 text-lg font-medium text-gray-900">
                                <span className="text-red-600">
                                    ${selectedVariant.price.toFixed(2)}
                                </span>{" "}
                                <span className="line-through">
                                    ${selectedVariant.compareAtPrice.toFixed(2)}
                                </span>
                            </p>
                        ) : (
                            <p className="mt-1 text-lg font-medium text-gray-900">
                                <span>
                                    ${selectedVariant?.price?.toFixed(2)}
                                </span>
                            </p>
                        )}
                    </div>
                )}
            </div>
        )
    );
}

export default ProductCard;
