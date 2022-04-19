/**
 * Transforms variant ids to valid PlainText shopify gids
 * If the variant id is a valid gid, that gid will be returned instead.
 * If the variant is a Base64 encoded gid, that gid will be returned
 * @param variantId - the variant id to transform
 * @returns gid - a valid shopify variant gid of the form gid://shopify/ProductVariant/{numeric-id}
 */
export default function (variantId: string): string;
