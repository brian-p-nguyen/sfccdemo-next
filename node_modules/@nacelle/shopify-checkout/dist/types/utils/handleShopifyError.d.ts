import { ShopifyCheckoutUserError, ShopifyError } from '../checkout-client.types';
export interface VerboseErrorParams {
    caller?: string;
    message?: string;
}
export default function handleShopifyError(errors?: ShopifyCheckoutUserError[] | ShopifyError[], { caller, message }?: VerboseErrorParams): void;
