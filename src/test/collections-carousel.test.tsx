/**
 * collections-carousel.tsx — cursor-pointer conditional test
 */
import { describe, it, expect, vi, beforeAll } from "vitest";
import { render } from "@testing-library/react";
import { CollectionsCarousel, type Collection } from "@/components/ui/collections-carousel";

// jsdom doesn't implement matchMedia — stub it
beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
});

const BASE: Collection = {
    id: 1,
    title: "Test Collection",
    image: "/img.jpg",
};

describe("CollectionsCarousel — cursor-pointer conditional", () => {
    it("applies cursor-pointer when collection.href is provided", () => {
        const col = { ...BASE, href: "/some-path" };
        const { container } = render(<CollectionsCarousel collections={[col]} />);
        const cursored = container.querySelector(".cursor-pointer");
        expect(cursored, "Expected .cursor-pointer element when href is set").not.toBeNull();
    });

    it("does NOT apply cursor-pointer when collection.href is undefined", () => {
        const col = { ...BASE, href: undefined };
        const { container } = render(<CollectionsCarousel collections={[col]} />);
        const cursored = container.querySelector(".cursor-pointer");
        expect(cursored, "Did not expect .cursor-pointer when href is undefined").toBeNull();
    });
});
