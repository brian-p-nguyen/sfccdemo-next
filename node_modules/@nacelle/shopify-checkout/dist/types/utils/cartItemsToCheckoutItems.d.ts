import { CartItem, CheckoutItem } from '../checkout-client.types';
export interface CartItemsToCheckoutItemsParams {
    cartItems: CartItem[];
}
export default function cartItemsToCheckoutItems({ cartItems }: CartItemsToCheckoutItemsParams): CheckoutItem[];
