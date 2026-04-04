import { FadeIn } from "@/lib/motion/primitives";

export const metadata = {
    title: "Shipping & Returns — Brahmi",
    description: "Brahmi shipping, returns, exchanges and cancellation policy.",
};

const sections = [
    {
        heading: "RETURN POLICY",
        body: "Products are eligible for return only under the following conditions:",
        points: [
            "The product received is damaged, or",
            "An incorrect product (wrong size, style, or item) has been delivered",
        ],
        footer: [
            "Returns must be requested within 3–4 days of the delivery date.",
            "Once the returned item is approved after inspection, a full refund will be issued.",
            "Returns will not be accepted for any other reasons beyond the conditions stated above.",
        ],
    },
    {
        heading: "EXCHANGE POLICY",
        body: "Products are eligible for exchange within 5–7 days of delivery under the following conditions:",
        points: [
            "The size ordered does not fit, or",
            "You are not satisfied with the product",
        ],
        footer: [
            "For exchanges, you may choose another product from our collection or exchange for the same product (subject to availability).",
            "Please note: No refunds are issued for exchanges — only product replacement is allowed.",
        ],
    },
    {
        heading: "SHIPPING CHARGES",
        body: null,
        points: [],
        footer: [
            "Delivery charges are included in the product price. No additional shipping fee will be charged at checkout.",
        ],
    },
    {
        heading: "SHIPPING TIME",
        body: "All Brahmi products are Made-to-Order (MTO) and crafted using slow, artisan-led processes.",
        points: [],
        footer: [
            "Estimated delivery time: 10–15 business days.",
            "This timeline includes artisan production, stitching, finishing, and quality checks — ensuring each piece is made with care and intention.",
        ],
    },
    {
        heading: "SHIPPING TRACKING",
        body: null,
        points: [],
        footer: [
            "Once your order is successfully placed and dispatched, a tracking code will be shared with you via email.",
        ],
    },
    {
        heading: "DELAYED DELIVERY",
        body: null,
        points: [],
        footer: [
            "In case of any delivery delays due to natural events or unforeseen circumstances, we will inform you via email at the earliest possible time.",
        ],
    },
    {
        heading: "CANCELLATION POLICY",
        body: null,
        points: [
            "Orders can be cancelled within 24 hours of placing the order.",
            "Cancellations made within this timeframe are eligible for a full refund.",
            "Orders cannot be cancelled once production has begun.",
        ],
        footer: [],
    },
];

export default function ShippingReturnsPage() {
    return (
        <div className="min-h-screen">
            {/* Header */}
            <section className="py-24 px-4 md:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <FadeIn>
                        <h1 className="text-xl md:text-2xl font-bold font-sans mb-6 uppercase">
                            Shipping &amp; Returns
                        </h1>
                        <p className="text-xs md:text-sm font-mono text-muted-foreground max-w-xl mx-auto tracking-tighter [word-spacing:-0.21rem] text-center">
                            Every piece is custom-made. Please read the policies below before placing your order.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Policy Sections */}
            <section className="pb-24 px-4 md:px-8">
                <div className="max-w-3xl mx-auto space-y-10 md:space-y-14">
                    {sections.map((section, i) => (
                        <FadeIn key={i} delay={i * 0.05}>
                            <div className="border-t border-border pt-6 md:pt-8">
                                <h2 className="text-xs md:text-sm font-bold font-sans uppercase tracking-widest mb-4">
                                    {section.heading}
                                </h2>

                                {section.body && (
                                    <p className="font-mono text-[10px] md:text-sm text-muted-foreground tracking-tighter [word-spacing:-0.21rem] text-justify mb-3">
                                        {section.body}
                                    </p>
                                )}

                                {section.points.length > 0 && (
                                    <ul className="space-y-1.5 mb-3">
                                        {section.points.map((point, j) => (
                                            <li
                                                key={j}
                                                className="font-mono text-[10px] md:text-sm text-muted-foreground tracking-tighter [word-spacing:-0.21rem] flex gap-2"
                                            >
                                                <span className="shrink-0 opacity-50 mt-px">•</span>
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {section.footer.map((line, j) => (
                                    <p
                                        key={j}
                                        className="font-mono text-[10px] md:text-sm text-muted-foreground tracking-tighter [word-spacing:-0.21rem] text-justify mt-2"
                                    >
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </section>
        </div>
    );
}
