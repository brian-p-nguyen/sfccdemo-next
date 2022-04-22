/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext, useEffect, useState } from "react";
import SiteContext from "context/SiteContext";
import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { useCart } from "@nacelle/react-hooks";
import { useCheckout } from "@nacelle/react-hooks";
import Link from "next/link";
import Image from "next/image";
import { nacelleClient } from "services";
import { getCartVariant } from "utils/getCartVariant";

const SidebarCart = () => {
    const [{ cart }, { addToCart, removeFromCart }] = useCart();
    const [, { processCheckout }] = useCheckout();
    const {
        store: { sidebarCartOpen },
        setSidebarCartOpen,
    } = useContext(SiteContext);

    const cartSubtotal = cart.reduce((sum, lineItem) => {
        return sum + lineItem.variant.price * lineItem.quantity;
    }, 0);

    const handleProcessCheckout = async () => {
        // Maps the cart line items into a new array with Shopify
        // required properties: `variantId` and `quantity`.
        const cartItems = cart.map((lineItem) => ({
            variantId: lineItem.variant.id,
            quantity: lineItem.quantity,
        }));
        await processCheckout({ cartItems })
            .then(({ url, completed }) => {
                if (url && !completed) {
                    window.location = url;
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const [upsells, setUpsells] = useState([]);
    useEffect(() => {
        nacelleClient.spaceProperties().then(({ properties }) => {
            const upsellHandles = properties
                .find((prop) => prop.namespace === "Upsells")
                .items.map((item) => item.value);
            nacelleClient
                .products({ handles: upsellHandles })
                .then((products) => {
                    setUpsells(
                        products.map((prod) => ({ ...prod, hasAdded: false }))
                    );
                });
        });
    }, []);
    const handleAddItem = (upsell) => {
        const variant = getCartVariant({
            product: upsell,
            variant: upsell.variants[0],
        });
        addToCart({
            variant,
            quantity: 1,
        });
        setUpsells((prev) =>
            prev.map((u) => ({
                ...u,
                hasAdded:
                    u.sourceEntryId === upsell.sourceEntryId
                        ? true
                        : u.hasAdded,
            }))
        );
    };
    return (
        <Transition.Root show={sidebarCartOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 overflow-hidden"
                onClose={() => setSidebarCartOpen(false)}
            >
                <div className="absolute inset-0 overflow-hidden">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-300 sm:duration-500"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-300 sm:duration-500"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="w-screen max-w-md transform transition ease-in-out duration-500">
                                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                                    <div className="py-6 flex items-start justify-between px-4 sm:px-6">
                                        <h2
                                            id="slide-over-title"
                                            className="text-lg font-medium text-gray-900"
                                        >
                                            Shopping Cart
                                        </h2>
                                        <div className="ml-3 h-7 flex items-center">
                                            <button
                                                type="button"
                                                className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                onClick={() =>
                                                    setSidebarCartOpen(false)
                                                }
                                            >
                                                <span className="sr-only">
                                                    Close panel
                                                </span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                    className="h-6 w-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex-1 py-6 overflow-y-auto px-4 border-t border-gray-200 sm:px-6">
                                        <div>
                                            <div className="flow-root">
                                                {cart.length ? (
                                                    <div>
                                                        <ul
                                                            role="list"
                                                            className="-my-6 divide-y divide-gray-200"
                                                        >
                                                            {cart.map(
                                                                (item, i) => (
                                                                    <li
                                                                        className="py-6 flex"
                                                                        key={i}
                                                                    >
                                                                        <div className="relative flex-shrink-0 border border-gray-200 rounded-md overflow-hidden w-20 h-20">
                                                                            <Image
                                                                                src={
                                                                                    process
                                                                                        .env
                                                                                        .NEXT_PUBLIC_BASE_STOREFRONT_IMAGE_URL +
                                                                                    item
                                                                                        .variant
                                                                                        .featuredMedia
                                                                                        .src
                                                                                }
                                                                                alt={
                                                                                    item
                                                                                        .variant
                                                                                        .productTitle
                                                                                }
                                                                                layout="fill"
                                                                                objectFit="cover"
                                                                            />
                                                                        </div>
                                                                        <div className="ml-4 flex-1 flex flex-col">
                                                                            <div>
                                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                    <h3>
                                                                                        <Link
                                                                                            href={`/products/${item.variant.productHandle}`}
                                                                                            passHref
                                                                                        >
                                                                                            <a
                                                                                                onClick={() =>
                                                                                                    setSidebarCartOpen(
                                                                                                        false
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    item
                                                                                                        .variant
                                                                                                        .productTitle
                                                                                                }
                                                                                            </a>
                                                                                        </Link>
                                                                                    </h3>
                                                                                    <p className="ml-4">
                                                                                        <span>
                                                                                            $
                                                                                            {item.variant.price.toFixed(
                                                                                                2
                                                                                            )}
                                                                                        </span>
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex-1 flex items-end justify-between text-sm">
                                                                                <p className="text-gray-500">
                                                                                    Qty{" "}
                                                                                    {
                                                                                        item.quantity
                                                                                    }
                                                                                </p>
                                                                                <div className="flex">
                                                                                    <button
                                                                                        type="button"
                                                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                                        onClick={() =>
                                                                                            removeFromCart(
                                                                                                item
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        Remove
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-400 text-center">
                                                        Cart is empty.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-200 py-4 px-4">
                                        <h2 className="text-lg font-medium text-gray-900">
                                            You May Also Like
                                        </h2>
                                        <ul
                                            role="list"
                                            className="-mb-6 divide-y divide-gray-200"
                                        >
                                            {upsells.map((upsell, i) => (
                                                <li
                                                    className="py-6 flex"
                                                    key={i}
                                                >
                                                    <div className="relative flex-shrink-0 border border-gray-200 rounded-md overflow-hidden w-20 h-20">
                                                        <Image
                                                            src={
                                                                process.env
                                                                    .NEXT_PUBLIC_BASE_STOREFRONT_IMAGE_URL +
                                                                upsell.content
                                                                    .featuredMedia
                                                                    .src
                                                            }
                                                            alt={
                                                                upsell.content
                                                                    .title
                                                            }
                                                            layout="fill"
                                                            objectFit="cover"
                                                        />
                                                    </div>
                                                    <div className="ml-4 flex-1 flex flex-col">
                                                        <div>
                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                <h3>
                                                                    <Link
                                                                        href={`/products/${upsell.content.handle}`}
                                                                        passHref
                                                                    >
                                                                        <a
                                                                            onClick={() =>
                                                                                setSidebarCartOpen(
                                                                                    false
                                                                                )
                                                                            }
                                                                        >
                                                                            {
                                                                                upsell
                                                                                    .content
                                                                                    .title
                                                                            }
                                                                        </a>
                                                                    </Link>
                                                                </h3>
                                                                <p className="ml-4">
                                                                    <span>
                                                                        {/* ${upsell.variants[0].price.toFixed(2)} */}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 flex items-end justify-end text-sm">
                                                            {upsell.hasAdded ? (
                                                                <div className="flex">
                                                                    <CheckCircleIcon className="text-indigo-600 w-5 h-5 mr-1" />
                                                                    <p className="font-medium text-indigo-600 whitespace-nowrap">
                                                                        Added to
                                                                        Cart!
                                                                    </p>
                                                                </div>
                                                            ) : (
                                                                <button
                                                                    type="button"
                                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                    onClick={() =>
                                                                        handleAddItem(
                                                                            upsell
                                                                        )
                                                                    }
                                                                >
                                                                    Add Item
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            <p>${cartSubtotal.toFixed(2)}</p>
                                        </div>
                                        <p className="mt-0.5 text-sm text-gray-500">
                                            Shipping and taxes calculated at
                                            checkout.
                                        </p>
                                        <div className="mt-6">
                                            <button
                                                className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out disabled:bg-indigo-400 disabled:border-indigo-400 disabled:text-white disabled:shadow-none"
                                                onClick={handleProcessCheckout}
                                                disabled={!cart?.length}
                                            >
                                                Checkout
                                            </button>
                                        </div>
                                        <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                                            <p>
                                                or{" "}
                                                <button
                                                    type="button"
                                                    className="text-indigo-600 font-medium hover:text-indigo-500"
                                                >
                                                    Continue Shopping
                                                    <span aria-hidden="true">
                                                        {" "}
                                                        →
                                                    </span>
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};
export default SidebarCart;
