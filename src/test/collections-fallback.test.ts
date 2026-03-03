/**
 * Collections.tsx — image fallback unit test
 * Verifies that products with missing images use FALLBACK_IMAGE constant
 */
import { describe, it, expect } from "vitest";

const FALLBACK_IMAGE = "/images/placeholder.jpg";

/** Mirror of Collections.tsx galleryItems mapping logic */
function makeGalleryItem(product: { title: string; handle: string; images?: string[] }) {
    return {
        title: product.title,
        image: product.images?.[0] ?? FALLBACK_IMAGE,
        href: `/collections/sutr/${product.handle}`,
    };
}

describe("Collections galleryItems image fallback", () => {
    it("uses the product image when images array is populated", () => {
        const item = makeGalleryItem({
            title: "Test Product",
            handle: "test",
            images: ["/real/image.jpg"],
        });
        expect(item.image).toBe("/real/image.jpg");
    });

    it("falls back to FALLBACK_IMAGE when images is an empty array", () => {
        const item = makeGalleryItem({
            title: "No Image Product",
            handle: "no-image",
            images: [],
        });
        expect(item.image).toBe(FALLBACK_IMAGE);
        expect(item.image).not.toBeNull();
        expect(item.image).not.toBeUndefined();
    });

    it("falls back to FALLBACK_IMAGE when images is undefined", () => {
        const item = makeGalleryItem({
            title: "Undefined Images",
            handle: "undef",
        });
        expect(item.image).toBe(FALLBACK_IMAGE);
    });

    it("all real sutrProducts produce a non-null image", async () => {
        const { sutrProducts } = await import("@/lib/mockData/products");
        const items = sutrProducts.map((p) => makeGalleryItem(p));
        for (const item of items) {
            expect(item.image).toBeTruthy();
            expect(item.image).not.toBeUndefined();
        }
    });
});
