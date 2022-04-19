import { ShopifyCheckout } from '../../checkout-client.types';
import { CreateCheckoutParams } from '../../client/actions/checkoutCreate';
import { CheckoutAttributesUpdateParams } from '../../client/actions/checkoutAttributesUpdate';
import { CheckoutLineItemsReplaceParams } from '../../client/actions/checkoutLineItemsReplace';
declare type CheckoutActionIntersection = CreateCheckoutParams & CheckoutAttributesUpdateParams & CheckoutLineItemsReplaceParams;
export declare type PutCheckoutParams = Partial<CheckoutActionIntersection> & Pick<CheckoutActionIntersection, 'gqlClient'>;
export default function putCheckout({ gqlClient, id, lineItems, customAttributes, note, queueToken }: PutCheckoutParams): Promise<void | ShopifyCheckout>;
export {};
