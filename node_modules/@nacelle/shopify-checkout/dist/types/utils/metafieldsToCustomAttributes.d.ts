import { Attribute, Metafield } from '../checkout-client.types';
export interface ReconcileCustomAttributesParams {
    metafields?: Metafield[];
}
/**
 * Given either `customAttributes` or `metafields`, return `customAttributes`.
 *
 * If `customAttributes` are provided, `metafields` will be ignored.
 */
export default function metafieldsToCustomAttributes({ metafields }: ReconcileCustomAttributesParams): Attribute[];
