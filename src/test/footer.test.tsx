/**
 * Footer.tsx — RTL tests
 * Tests: no nested interactive elements, dynamic year, real link hrefs
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/layout/Footer";

describe("Footer", () => {
    // ── 9a. No <a> nested inside <button> ─────────────────────────────────────
    it("has no <a> elements that are direct children of <button>", () => {
        const { container } = render(<Footer />);
        const buttons = container.querySelectorAll("button");
        for (const btn of Array.from(buttons)) {
            const nestedAnchors = btn.querySelectorAll("a");
            expect(
                nestedAnchors.length,
                `Found <a> inside <button>: ${btn.outerHTML.slice(0, 200)}`
            ).toBe(0);
        }
    });

    // ── 9b. Dynamic copyright year ────────────────────────────────────────────
    it("renders the current year in the copyright notice", () => {
        render(<Footer />);
        const year = new Date().getFullYear().toString();
        expect(screen.getByText(new RegExp(year))).toBeDefined();
    });

    // ── 9c. Real link hrefs ───────────────────────────────────────────────────
    it("Privacy Policy link points to /privacy", () => {
        const { container } = render(<Footer />);
        const link = container.querySelector("a[href='/privacy']");
        expect(link, "Expected link with href='/privacy'").not.toBeNull();
        expect(link?.textContent?.trim()).toMatch(/privacy policy/i);
    });

    it("Terms of Service link points to /terms", () => {
        const { container } = render(<Footer />);
        const link = container.querySelector("a[href='/terms']");
        expect(link, "Expected link with href='/terms'").not.toBeNull();
        expect(link?.textContent?.trim()).toMatch(/terms/i);
    });

    it("Cookie Settings link points to /cookies", () => {
        const { container } = render(<Footer />);
        const link = container.querySelector("a[href='/cookies']");
        expect(link, "Expected link with href='/cookies'").not.toBeNull();
        expect(link?.textContent?.trim()).toMatch(/cookie/i);
    });

    // ── 9d. Social icon anchors are NOT inside <button> ───────────────────────
    it("social icon anchors are direct children of the DOM (Button asChild), not wrapped in a native button", () => {
        const { container } = render(<Footer />);
        // Button asChild renders an <a> at the DOM level — the resulting element
        // should NOT have a button element as a parent
        const socialLinks = Array.from(container.querySelectorAll("a[target='_blank']"));
        expect(socialLinks.length).toBeGreaterThan(0);
        for (const link of socialLinks) {
            // Walk up the tree and ensure no <button> ancestor
            let parent = link.parentElement;
            while (parent) {
                expect(
                    parent.tagName.toLowerCase(),
                    `Social link <a> has a <button> ancestor: ${link.outerHTML}`
                ).not.toBe("button");
                parent = parent.parentElement;
            }
        }
    });
});
