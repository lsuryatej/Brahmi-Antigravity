/**
 * Mapping of internal product IDs to Shopify product IDs
 * Add new products here to enable Shopify Buy Button integration
 */

export const SHOPIFY_PRODUCT_MAPPING: Record<string, string> = {
    // Product ID (from products.ts) : Shopify Product ID

    // Jackets & Vests
    "1": "8312234639554",  // Kanthi Jacket
    "4": "8312236015810",  // Charkha Vest

    // Tops & Shirts
    "7": "8312236179650",  // Avanti Top
    "8": "8312236245186",  // Eka Rekha Shirt
    "10": "8312236310722",  // Neel Dhaara Shirt

    // Dresses
    "3": "8312235983042",  // Nilaaya Dress

    // Skirts
    "2": "8318672961730",  // Kanthi Skirt
    "6": "8312236146882",  // Dhaara Skirt

    // Pants
    "5": "8312236081346",  // Charkha Pants
    "9": "8312236277954",  // Eka Rekha Pants
    "11": "8312236605634",  // Kaldhaara Pants
};

/**
 * Check if a product has Shopify integration enabled
 */
export const hasShopifyIntegration = (productId: string): boolean => {
    return productId in SHOPIFY_PRODUCT_MAPPING;
};

/**
 * Get Shopify product ID for a given product
 */
export const getShopifyProductId = (productId: string): string | undefined => {
    return SHOPIFY_PRODUCT_MAPPING[productId];
};

/**
 * Shopify configuration
 */
export const SHOPIFY_CONFIG = {
    domain: "wxbq05-r4.myshopify.com",
    storefrontAccessToken: "227a23bcbd1d0e223e51cc2de5fa104d",
    moneyFormat: "Rs.%20%7B%7Bamount%7D%7D",
    apiVersion: "2026-01",
};
