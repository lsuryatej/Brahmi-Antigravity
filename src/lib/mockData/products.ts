export interface ProductVariant {
    id: string;
    size: string;
    inStock: boolean;
}

export interface Product {
    id: string;
    handle: string;
    title: string;
    category: "jacket" | "vest" | "top" | "shirt" | "dress" | "skirt" | "pants";
    price: number;
    description: string;
    images: string[];
    variants: ProductVariant[];
    details: {
        material: string;
        fit: string;
        color?: string;
    };
    care: string;
    shipping: string;
}

export const sutrProducts: Product[] = [
    // Jackets & Vests
    {
        id: "1",
        handle: "kanthi-jacket",
        title: "KANTHI JACKET",
        category: "jacket",
        price: 6499,
        description: "The Kanthi Jacket is a refined expression of slow craft and contemporary silhouette, handcrafted using traditional techniques rooted in Gujarat. Made from hand-spun and hand-woven cotton, the fabric is dyed in an azo-free sky blue, lending it a soft, breathable texture with a natural matte finish. Designed with an oversized fit and dropped shoulders, the jacket features full-length sleeves and a relaxed structure that allows for ease of movement. Two front patch pockets are accentuated with hand-embroidered Charkha-inspired Kantha motifs, meticulously stitched by artisans using Anchor embroidery thread. The same linear Kantha embroidery flows subtly along the collar, creating a visual continuity that ties the garment together. Every Kanthi Jacket is a result of close collaboration with artisans, with the embroidery and construction process taking approximately 18 hours to complete, making each piece a quiet yet powerful statement of heritage, craftsmanship, and mindful fashion.\n\nNote: This garment is handcrafted using traditional slow-craft techniques and produced in limited quantities. Slight variations in embroidery and fabric are natural, celebrating the uniqueness of handmade processes. Each piece is made to order and reflects the time, skill, and care of the artisans involved.",
        images: [
            "/images/products/sutr/kanthi-jacket/image-1.jpeg",
            "/images/products/sutr/kanthi-jacket/image-2.jpeg",
            "/images/products/sutr/kanthi-jacket/image-3.jpg"
        ],
        variants: [
            { id: "1-s", size: "S", inStock: true },
            { id: "1-m", size: "M", inStock: true },
            { id: "1-l", size: "L", inStock: true },
            { id: "1-xl", size: "XL", inStock: true },
            { id: "1-xxl", size: "XXL", inStock: false }
        ],
        details: {
            material: "Hand-spun & Hand-woven Cotton (Gujarat)",
            fit: "Oversized Fit",
            color: "Sky Blue (Azo-free Dye)"
        },
        care: "Dry clean only",
        shipping: "Domestic delivery - approximately 15-20 days. Shipping charges will be shown at checkout."
    },
    {
        id: "4",
        handle: "charkha-vest",
        title: "CHARKHA VEST",
        category: "vest",
        price: 4299,
        description: "The charkha Vest is a contemporary expression of hand craft, rooted in delicate detail and thoughtful construction. Crafted from handspun, handwoven cotton sourced from Gujarat in a soft natural beige, this sleeveless vest celebrates slow processes and timeless design. The name charkha is inspired by the flowing Kantha hand-embroidery motifs that cascade across the collar, echoing organic forms found in nature. The embroidery is done using red anchor thread, adding a subtle contrast and handcrafted warmth to the piece. Designed with a front-open silhouette, the vest is fastened with fabric-bound potli buttons, while the back features a corset-style lace-up closure for an adjustable and flattering fit. The neckline is finished with a notched lapel collar, with softly folded flaps that act as a canvas for the hand embroidered detailing. Clean lines and artisanal finishes make this vest versatile yet distinctive, taking approximately 15 hours to complete the product.\n\nNote: This garment is handcrafted using traditional techniques. Slight variations in fabric texture, embroidery, and colour are inherent to the process and add to the uniqueness of each piece.",
        images: [
            "/images/products/sutr/charkha-vest/image-1.png",
            "/images/products/sutr/charkha-vest/image-2.png",
            "/images/products/sutr/charkha-vest/image-3.png"
        ],
        variants: [
            { id: "4-s", size: "S", inStock: true },
            { id: "4-m", size: "M", inStock: true },
            { id: "4-l", size: "L", inStock: true },
            { id: "4-xl", size: "XL", inStock: true },
            { id: "4-xxl", size: "XXL", inStock: true }
        ],
        details: {
            material: "Handspun, Handwoven Cotton (Gujarat)",
            fit: "Regular Fit with Adjustable Back (Corset-style Lace-up)",
            color: "Natural Beige (Azo-free Dye)"
        },
        care: "Dry clean only",
        shipping: "Domestic delivery - approximately 15-20 days. Shipping charges will be shown at checkout."
    },

    // Tops & Shirts
    {
        id: "7",
        handle: "avanti-top",
        title: "AVANTI TOP",
        category: "top",
        price: 3799,
        description: "The Avanti Top is a modern expression of ease and elegance, rooted in clean lines and mindful craftsmanship. Crafted from handspun, handwoven cotton in a deep rust maroon tone, this cropped silhouette celebrates simplicity through thoughtful construction and fluid drape. Dyed using azo-free dyes, the fabric carries a soft, breathable hand feel, making it ideal for warm-weather layering or standalone wear. The front features a minimal boat neckline with a structured, cropped fit that gently skims the body, while the back reveals a softly draped open-back detail that falls into a natural cowl, adding movement and understated drama. Balanced proportions and refined finishes make the Avanti Top versatile yet distinctive — a piece that moves seamlessly between everyday comfort and elevated styling.\n\nNote: This garment is handcrafted using traditional techniques. Slight variations in fabric texture, drape, and colour are inherent to the process and add to the uniqueness of each piece.",
        images: [
            "/images/products/sutr/avanti-top/image-1.jpeg",
            "/images/products/sutr/avanti-top/image-2.jpeg",
            "/images/products/sutr/avanti-top/image-3.jpg"
        ],
        variants: [
            { id: "7-s", size: "S", inStock: true },
            { id: "7-m", size: "M", inStock: true },
            { id: "7-l", size: "L", inStock: false },
            { id: "7-xl", size: "XL", inStock: true },
            { id: "7-xxl", size: "XXL", inStock: true }
        ],
        details: {
            material: "Handspun, Handwoven Cotton",
            fit: "Cropped Fit with Boat Neckline, Draped Open-back",
            color: "Rust Maroon (Azo-free Dye)"
        },
        care: "Dry clean only",
        shipping: "Domestic delivery - approximately 15-20 days. Shipping charges will be shown at checkout."
    },
    {
        id: "8",
        handle: "eka-rekha-shirt",
        title: "EKA REKHA SHIRT",
        category: "shirt",
        price: 4499,
        description: "Crafted from handspun and handwoven cotton, the Eka Rekha Shirt comes in a warm earthy camel-brown tone that reflects natural, grounded elegance. Designed in a relaxed, slightly oversized silhouette, it offers effortless comfort with a refined artisanal touch. The shirt features a soft open notched collar and a front button placket detailed with handcrafted decorative buttons that add character and charm. Subtle Kantha hand embroidery in deep maroon thread runs along the collar edges, sleeve hems, and the princess seam lines, highlighting the garment's structure while celebrating traditional craftsmanship.\n\nDyed using azo-free, eco-friendly dyes, this shirt is gentle on the skin and the environment — a perfect blend of sustainability, comfort, and timeless design, taking approximately 12 hours to complete the product.\n\nNote: Each piece is handcrafted, so slight variations in weave, colour, and embroidery are natural and part of its unique character.",
        images: [
            "/images/products/sutr/eka-rekha-shirt/image-1.jpeg",
            "/images/products/sutr/eka-rekha-shirt/image-2.jpeg",
            "/images/products/sutr/eka-rekha-shirt/image-3.jpeg",
            "/images/products/sutr/eka-rekha-shirt/image-4.jpg"

        ],
        variants: [
            { id: "8-s", size: "S", inStock: true },
            { id: "8-m", size: "M", inStock: true },
            { id: "8-l", size: "L", inStock: true },
            { id: "8-xl", size: "XL", inStock: true },
            { id: "8-xxl", size: "XXL", inStock: false }
        ],
        details: {
            material: "Handspun & Handwoven Cotton",
            fit: "Relaxed, Slightly Oversized Silhouette",
            color: "Camel-Brown (Azo-free Dye)"
        },
        care: "Dry clean only",
        shipping: "Domestic delivery - approximately 15-20 days. Shipping charges will be shown at checkout."
    },
    {
        id: "10",
        handle: "neel-dhaara-shirt",
        title: "NEEL DHAARA SHIRT",
        category: "shirt",
        price: 4899,
        description: "The Neel Dhaara Shirt is a contemporary expression of handcraft, blending soft structure with flowing detail. Crafted from handspun, handwoven cotton in a gentle sky blue and warm beige palette, the shirt reflects calm, fluid movement — true to its name, Neel Dhaara, meaning blue stream.\n\nDesigned with a relaxed, easy silhouette, it features a soft V-neck with a contrast band collar that extends into a front button placket. The placket is finished with handcrafted decorative buttons, adding character and artisanal charm. Flowing Kantha hand embroidery motifs in subtle contrast thread run along the placket and sleeves, creating rhythm and texture across the garment. Dyed using azo-free dyes, this piece is both skin-friendly and environmentally conscious. Each shirt takes approximately 16 hours to make and is hand-embroidered by artisans in Gujarat.\n\nNotes: This garment is handcrafted using traditional techniques. Slight variations in fabric texture, embroidery, and colour are inherent to the process and add to the uniqueness of each piece.",
        images: [
            "/images/products/sutr/neel-dhaara-shirt/image-1.jpeg",
            "/images/products/sutr/neel-dhaara-shirt/image-2.jpeg",
            "/images/products/sutr/neel-dhaara-shirt/image-3.jpeg",
            "/images/products/sutr/neel-dhaara-shirt/image-4.png"
        ],
        variants: [
            { id: "10-s", size: "S", inStock: true },
            { id: "10-m", size: "M", inStock: true },
            { id: "10-l", size: "L", inStock: true },
            { id: "10-xl", size: "XL", inStock: true },
            { id: "10-xxl", size: "XXL", inStock: true }
        ],
        details: {
            material: "Handspun, Handwoven Cotton",
            fit: "Relaxed, Easy Silhouette with V-neck",
            color: "Sky Blue and Beige (Azo-free Dye)"
        },
        care: "Dry clean only",
        shipping: "Domestic delivery - approximately 15-20 days. Shipping charges will be shown at checkout."
    },

    // Dresses
    {
        id: "3",
        handle: "nilaaya-dress",
        title: "NILAAYA DRESS",
        category: "dress",
        price: 5999,
        description: "The Nilaya Dress is a softly structured, short-length silhouette that brings together traditional handcraft and contemporary femininity. Crafted from hand-spun and hand-woven cotton sourced from Gujarat, the fabric is dyed in an azo-free sky blue tone, resulting in a breathable, lightweight texture with a natural finish. The dress features a fitted bodice with a defined waist yoke that gently shapes the form before flowing into a relaxed skirt. Delicate Kantha hand embroidery motifs are thoughtfully placed across the body, hand-stitched by artisans using Anchor embroidery thread. The front is detailed with fabric-covered (potli-style) buttons, adding a tactile, handcrafted accent, while the back is finished with an adjustable corset-style lace-up detail that allows for a customized fit. Designed as a sleeveless dress with a subtly flared silhouette, the Nilaaya Dress balances structure and ease. Each piece is made through a slow, intentional process, taking approximately 20 hours.\n\nNote: This garment is handcrafted using traditional slow-craft techniques and produced in limited quantities. Slight variations in embroidery, fabric texture, and colour are inherent to the handmade process and celebrate the uniqueness of each piece.",
        images: [
            "/images/products/sutr/nilaaya-dress/image-1.jpeg",
            "/images/products/sutr/nilaaya-dress/image-2.jpg",
            "/images/products/sutr/nilaaya-dress/image-3.jpeg",
            "/images/products/sutr/nilaaya-dress/image-4.jpeg"
        ],
        variants: [
            { id: "3-s", size: "S", inStock: true },
            { id: "3-m", size: "M", inStock: true },
            { id: "3-l", size: "L", inStock: true },
            { id: "3-xl", size: "XL", inStock: false },
            { id: "3-xxl", size: "XXL", inStock: true }
        ],
        details: {
            material: "Hand-spun & Hand-woven Cotton (Gujarat)",
            fit: "Fitted Bodice with Waist Yoke, Subtle A-line/Softly Flared Silhouette",
            color: "Sky Blue (Azo-free Dye)"
        },
        care: "Dry clean only",
        shipping: "Domestic delivery - approximately 15-20 days. Shipping charges will be shown at checkout."
    },

    // Skirts
    {
        id: "2",
        handle: "kanthi-skirt",
        title: "KANTHI SKIRT",
        category: "skirt",
        price: 4799,
        description: "The Kanthi Skirt is a celebration of rhythm, repetition, and handcraft, thoughtfully made using traditional Kantha embroidery techniques in Gujarat. Crafted from hand-spun and hand-woven cotton, the skirt is dyed in an azo-free sky blue, giving it a soft, breathable feel with a naturally textured finish. Designed as a short skirt with a relaxed fit, it features fine, straight running Kantha stitches that flow seamlessly across the fabric on both the front and back, creating a quiet yet striking surface detail. The embroidery is executed by skilled artisans using Anchor embroidery thread, allowing the linear Kantha motif to stand out while remaining subtle and wearable. Each Kanthi Skirt is carefully handcrafted through a slow, mindful process, taking approximately 14 hours to complete the product.\n\nNote: This garment is handcrafted using traditional slow-craft techniques and produced in limited quantities. Minor variations in stitch and fabric texture are inherent to the handmade process and enhance the uniqueness of each piece. Made to order with care and intention.",
        images: [
            "/images/products/sutr/kanthi-skirt/image-1.jpeg",
            "/images/products/sutr/kanthi-skirt/image-2.jpeg"
            // "/images/products/sutr/kanthi-skirt/image-3.jpg"
        ],
        variants: [
            { id: "2-s", size: "S", inStock: true },
            { id: "2-m", size: "M", inStock: true },
            { id: "2-l", size: "L", inStock: true },
            { id: "2-xl", size: "XL", inStock: true },
            { id: "2-xxl", size: "XXL", inStock: true }
        ],
        details: {
            material: "Hand-spun & Hand-woven Cotton",
            fit: "Short Skirt, Relaxed Fit",
            color: "Sky Blue (Azo-free Dye)"
        },
        care: "Dry clean only",
        shipping: "Domestic delivery - approximately 15-20 days. Shipping charges will be shown at checkout."
    },
    {
        id: "6",
        handle: "dhaara-skirt",
        title: "DHAARA SKIRT",
        category: "skirt",
        price: 4299,
        description: "The Dhaara Skirt is a graceful expression of fluidity and hand craftsmanship, rooted in simplicity and thoughtful detailing. Crafted from handspun, handwoven cotton in a soft natural beige, this A-line skirt flows gently with movement, offering comfort while maintaining a clean, timeless silhouette. The name Dhaara, meaning flow, is reflected in the continuous rhythm of Kantha hand embroidery that travels across the surface of the garment.\n\nFine vertical and horizontal running stitches in red, blue, brown, and beige create a layered, textural pattern, evoking the quiet movement of water and hand-drawn lines. Balanced proportions and artisanal finishes make this skirt versatile for everyday wear while celebrating the beauty of slow, handmade processes, taking approximately 24 hours to complete the product.\n\nNote: This garment is handcrafted using traditional techniques. Slight variations in fabric texture, embroidery, and colour are inherent to the process and add to the uniqueness of each piece.",
        images: [
            "/images/products/sutr/dhaara-skirt/image-1.png",
            "/images/products/sutr/dhaara-skirt/image-2.jpeg",
            "/images/products/sutr/dhaara-skirt/image-3.jpeg"
        ],
        variants: [
            { id: "6-s", size: "S", inStock: true },
            { id: "6-m", size: "M", inStock: false },
            { id: "6-l", size: "L", inStock: true },
            { id: "6-xl", size: "XL", inStock: true },
            { id: "6-xxl", size: "XXL", inStock: true }
        ],
        details: {
            material: "Handspun, Handwoven Cotton",
            fit: "A-line Silhouette",
            color: "Natural Beige (Azo-free Dye)"
        },
        care: "Dry clean only",
        shipping: "Domestic delivery - approximately 15-20 days. Shipping charges will be shown at checkout."
    },

    // Pants
    {
        id: "5",
        handle: "charkha-pants",
        title: "CHARKHA PANTS",
        category: "pants",
        price: 3999,
        description: "The Charkha Pants are a contemporary ode to comfort-driven design, rooted in thoughtful craftsmanship and hand processes. Crafted from handspun, handwoven cotton sourced from Gujarat in a warm purdy brown, these pants celebrate slow making through subtle detailing and fluid silhouettes. Designed in a relaxed straight-leg fit they offer ease through the hips and thighs while falling softly for an effortless, everyday drape. A folded hem panel stitched onto the bottom of each leg becomes a canvas for Kantha hand embroidery, with horizontal running stitches adding texture and artisanal depth. Further detailing appears around the knee area, where concentric circular Kantha motifs — inspired by the rhythmic form of the charkha — flow across both the front and back, creating movement and visual balance. Clean construction and handcrafted finishes make these pants versatile, grounded, and quietly distinctive, taking approximately 20 hours to make.\n\nNote: This garment is handcrafted using traditional techniques. Slight variations in fabric texture, embroidery, and colour are inherent to the process and add to the uniqueness of each piece.",
        images: [
            "/images/products/sutr/charkha-pants/image-1.jpeg",
            "/images/products/sutr/charkha-pants/image-2.jpeg",
            "/images/products/sutr/charkha-pants/image-3.jpeg"
        ],
        variants: [
            { id: "5-s", size: "S", inStock: true },
            { id: "5-m", size: "M", inStock: true },
            { id: "5-l", size: "L", inStock: true },
            { id: "5-xl", size: "XL", inStock: false },
            { id: "5-xxl", size: "XXL", inStock: true }
        ],
        details: {
            material: "Handspun, Handwoven Cotton (Gujarat)",
            fit: "Relaxed Straight-leg Fit",
            color: "Purdy Brown (Azo-free Dye)"
        },
        care: "Dry clean only",
        shipping: "Domestic delivery - approximately 15-20 days. Shipping charges will be shown at checkout."
    },
    {
        id: "9",
        handle: "eka-rekha-pants",
        title: "EKA REKHA PANTS",
        category: "pants",
        price: 4199,
        description: "The Eka Rekha Pants are a refined expression of handcrafted detail and thoughtful construction. Made from handspun, handwoven cotton in a soft natural beige base, the design is accented with a bold rust-maroon vertical panel running down the centre of each leg. The name Eka Rekha, meaning single line, is inspired by the flowing Kantha hand-embroidery motifs stitched along this panel using beige anchor thread by artisans in Gujarat.\n\nDesigned in a straight-fit silhouette, these pants balance structure with ease, offering everyday comfort while retaining a strong artisanal identity. Dyed using azo-free dyes, the fabric remains gentle on the skin and environmentally conscious. Each pair is meticulously cut, stitched, and finished over 15 hours, reflecting the care and craftsmanship invested in every detail.\n\nNote: This garment is handcrafted using traditional techniques. Slight variations in fabric texture, embroidery, and colour are inherent to the process and add to the uniqueness of each piece.",
        images: [
            "/images/products/sutr/eka-rekha-pants/image-1.jpeg",
            "/images/products/sutr/eka-rekha-pants/image-2.jpeg",
            // "/images/products/sutr/eka-rekha-pants/image-3.jpg"
        ],
        variants: [
            { id: "9-s", size: "S", inStock: true },
            { id: "9-m", size: "M", inStock: true },
            { id: "9-l", size: "L", inStock: true },
            { id: "9-xl", size: "XL", inStock: true },
            { id: "9-xxl", size: "XXL", inStock: true }
        ],
        details: {
            material: "Handspun, Handwoven Cotton",
            fit: "Straight-fit Silhouette",
            color: "Natural Beige with Rust-Maroon Panels (Azo-free Dye)"
        },
        care: "Dry clean only",
        shipping: "Domestic delivery - approximately 15-20 days. Shipping charges will be shown at checkout."
    },
    {
        id: "11",
        handle: "kaldhaara-pants",
        title: "KALDHAARA PANTS",
        category: "pants",
        price: 4599,
        description: "The Kaldhaara Pants are a grounded expression of handcrafted design, where structure meets subtle movement. Made from handspun, handwoven cotton in a deep black base, these pants are accented with an earthy brown front panel creating a striking yet balanced contrast. True to their name, Kaldhaara reflects an earthy flow — steady, rooted, and rhythmic.\n\nDesigned in a relaxed straight-fit silhouette with a slightly oversized feel, these men's pants offer comfort without compromising form. The front panel is detailed with Kantha hand embroidery, featuring vertical and horizontal linear motifs that create texture and quiet movement across the surface. Embroidered using Anchor embroidery thread, the stitching adds depth while remaining understated. Dyed with azo-free dyes, the fabric is gentle on the skin and environmentally responsible. Each pair is handcrafted and stitched over approximately 19 hours by skilled artisans in Gujarat.\n\nNOTE: This garment is handcrafted using traditional techniques. Minor variations in fabric texture, embroidery, and colour are inherent to the process and enhance the individuality of each piece.",
        images: [
            "/images/products/sutr/kaldhaara-pants/image-1.jpeg",
            "/images/products/sutr/kaldhaara-pants/image-2.jpeg",
            "/images/products/sutr/kaldhaara-pants/image-3.jpeg"
        ],
        variants: [
            { id: "11-s", size: "S", inStock: true },
            { id: "11-m", size: "M", inStock: true },
            { id: "11-l", size: "L", inStock: false },
            { id: "11-xl", size: "XL", inStock: true },
            { id: "11-xxl", size: "XXL", inStock: true }
        ],
        details: {
            material: "Handspun, Handwoven Cotton",
            fit: "Relaxed Straight-fit, Slightly Oversized Silhouette",
            color: "Deep Black with Earthy Brown Panel (Azo-free Dye)"
        },
        care: "Dry clean only",
        shipping: "Domestic delivery - approximately 15-20 days. Shipping charges will be shown at checkout."
    }
];

export const getProductByHandle = (handle: string): Product | undefined => {
    return sutrProducts.find(p => p.handle === handle);
};

export const getProductsByCategory = (category: Product["category"]): Product[] => {
    return sutrProducts.filter(p => p.category === category);
};
