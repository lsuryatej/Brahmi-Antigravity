/**
 * CircularGallery — RTL tests
 * Tests: empty items guard, scroll timeout cleanup
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, act } from "@testing-library/react";
import { CircularGallery, type GalleryItem } from "@/components/ui/circular-gallery";

const SAMPLE_ITEMS: GalleryItem[] = [
    { title: "Jacket", image: "/img.jpg", href: "/jacket" },
];

afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
});

// ─────────────────────────────────────────────────────────────────────────────
// 6. Empty items guard
// ─────────────────────────────────────────────────────────────────────────────
describe("CircularGallery — empty items", () => {
    it("renders without throwing when items is empty", () => {
        expect(() => render(<CircularGallery items={[]} />)).not.toThrow();
    });

    it("renders NO Link elements when items is empty", () => {
        const { container } = render(<CircularGallery items={[]} />);
        const links = container.querySelectorAll("a");
        expect(links).toHaveLength(0);
    });

    it("renders the correct number of cards for non-empty items", () => {
        const { container } = render(<CircularGallery items={SAMPLE_ITEMS} />);
        const links = container.querySelectorAll("a");
        expect(links).toHaveLength(SAMPLE_ITEMS.length);
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// 7. Scroll timeout cleanup
// ─────────────────────────────────────────────────────────────────────────────
describe("CircularGallery — scroll timeout cleanup", () => {
    it("clears timeout and removes scroll listener on unmount", () => {
        const clearTimeoutSpy = vi.spyOn(globalThis, "clearTimeout");
        const removeSpy = vi.spyOn(window, "removeEventListener");

        const { unmount } = render(<CircularGallery items={SAMPLE_ITEMS} />);

        // Simulate scroll to arm the timeout
        act(() => {
            window.dispatchEvent(new Event("scroll"));
        });

        unmount();

        // After unmount, clearTimeout must have been called
        expect(clearTimeoutSpy).toHaveBeenCalled();
        // And the scroll listener must be removed
        const scrollRemoveCalls = removeSpy.mock.calls.filter((args) => args[0] === "scroll");
        expect(scrollRemoveCalls.length).toBeGreaterThan(0);
    });

    it("does not trigger state updates after unmount", () => {
        vi.useFakeTimers();
        const consoleSpy = vi.spyOn(console, "error");

        const { unmount } = render(<CircularGallery items={SAMPLE_ITEMS} />);

        act(() => {
            window.dispatchEvent(new Event("scroll"));
        });

        unmount();

        // Run all pending timers — with clearTimeout in cleanup, this should be a no-op
        act(() => {
            vi.runAllTimers();
        });

        const unmountWarnings = consoleSpy.mock.calls
            .flat()
            .filter((msg) => typeof msg === "string" && msg.includes("unmounted"));
        expect(unmountWarnings).toHaveLength(0);

        vi.useRealTimers();
    });
});
