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
        technique?: string;
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
        description: "The Kanthi Jacket is a handcrafted piece made in Gujarat from hand-spun, hand-woven cotton, dyed in an azo-free sky blue. Designed with an oversized fit and relaxed structure, it balances comfort with a clean silhouette. Charkha-inspired Kantha embroidery highlights the pockets and collar, adding subtle detail through skilled handwork. Requiring around 18 hours to complete, each jacket reflects careful craftsmanship and a considered approach to design.\n\nNote: This garment is handcrafted using traditional slow-craft techniques and produced in limited quantities. Slight variations in embroidery and fabric are natural, celebrating the uniqueness of handmade processes. Each piece is made to order and reflects the time, skill, and care of the artisans involved.",
        images: [
            "/products/sutr/kanthi-jacket/IMG_8341.AVIF",
            "/products/sutr/kanthi-jacket/IMG_8342.AVIF",
            "/products/sutr/kanthi-jacket/IMG_8344.AVIF",
            "/products/sutr/kanthi-jacket/IMG_8340.AVIF",
            "/products/sutr/kanthi-jacket/IMG_8343.AVIF"
        ],
        variants: [
            { id: "1-s", size: "S", inStock: false },
            { id: "1-m", size: "M", inStock: false },
            { id: "1-l", size: "L", inStock: true },
            { id: "1-xl", size: "XL", inStock: true },
            { id: "1-xxl", size: "XXL", inStock: false }
        ],
        details: {
            material: "Hand-spun & Hand-woven Cotton (Gujarat)",
            fit: "Oversized Fit",
            color: "Azo-free Dye (Sky Blue)",
            technique: "Hand Embroidered Kantha Technique"
        },
        care: "Dry clean only",
        shipping: "• Domestic delivery - approximately 15 - 20 days\n• Shipping charges will be shown at the checkout\n• Find out more - (link of shipping and return page)"
    },
    {
        id: "4",
        handle: "charkha-vest",
        title: "CHARKHA VEST",
        category: "vest",
        price: 4299,
        description: "The Charkha Vest is a sleeveless, front-open piece crafted from hand-spun, hand-woven cotton in a natural beige. Rooted in slow craft, it features flowing Kantha embroidery along the collar, stitched in red thread for subtle contrast. Finished with fabric-covered potli buttons, a notched lapel, and an adjustable lace-up back, the vest balances clean construction with artisanal detail. Each piece takes approximately 15 hours to complete.\n\nNote: This garment is handcrafted using traditional techniques. Slight variations in fabric texture, embroidery, and colour are inherent to the process and add to the uniqueness of each piece.",
        images: [
            "/products/sutr/charkha-vest/IMG_8306.AVIF",
            "/products/sutr/charkha-vest/IMG_8307.AVIF",
            "/products/sutr/charkha-vest/IMG_8308.AVIF",
            "/products/sutr/charkha-vest/PB__3011.mp4"
        ],
        variants: [
            { id: "4-s", size: "S", inStock: true },
            { id: "4-m", size: "M", inStock: true },
            { id: "4-l", size: "L", inStock: true },
            { id: "4-xl", size: "XL", inStock: true },
            { id: "4-xxl", size: "XXL", inStock: true }
        ],
        details: {
            material: "Handspun, Handwoven Cotton",
            fit: "Adjustable Fit, Notched Lapel, Corset-style Lace-up Back",
            color: "Natural Beige (Azo-free Dye)",
            technique: "Kantha Hand Embroidery, Fabric-bound Potli Buttons"
        },
        care: "Dry clean only",
        shipping: "• Domestic delivery - approximately 15 - 20 days\n• Shipping charges will be shown at the checkout\n• Find out more - (link of shipping and return page)"
    },

    // Tops & Shirts
    {
        id: "7",
        handle: "avanti-top",
        title: "AVANTI TOP",
        category: "top",
        price: 3799,
        description: "The Avanti Top is a cropped silhouette crafted from hand-spun, hand-woven cotton in a deep rust maroon, dyed with azo-free colours. Light and breathable, it’s designed for ease and warm-weather wear. A clean boat neckline defines the front, while the back falls into a soft, open cowl that adds fluid movement. With balanced proportions and refined construction, it’s a versatile piece that blends simplicity with subtle statement.\n\nNote: This garment is handcrafted using traditional techniques. Slight variations in fabric texture, drape, and colour are inherent to the process and add to the uniqueness of each piece.",
        images: [
            "/products/sutr/avanti-top/IMG_8295.AVIF",
            "/products/sutr/avanti-top/IMG_8294.AVIF",
            "/products/sutr/avanti-top/IMG_8296.AVIF",
            "/products/sutr/avanti-top/PB__3188.mp4"
        ],
        variants: [
            { id: "7-s", size: "S", inStock: true },
            { id: "7-m", size: "M", inStock: true },
            { id: "7-l", size: "L", inStock: false },
            { id: "7-xl", size: "XL", inStock: true },
            { id: "7-xxl", size: "XXL", inStock: true }
        ],
        details: {
            material: "Handspun, handwoven cotton",
            fit: "Cropped fit, Boat neckline at the front, Draped open-back detailing",
            color: "Rust maroon (Azo-free Dye)"
        },
        care: "Dry clean only",
        shipping: "• Domestic delivery - approximately 15 - 20 days\n• Shipping charges will be shown at the checkout\n• Find out more - (link of shipping and return page)"
    },
    {
        id: "8",
        handle: "eka-rekha-shirt",
        title: "EKA REKHA SHIRT",
        category: "shirt",
        price: 4499,
        description: "The Eka Rekha Shirt is a relaxed, slightly oversized piece in hand-spun, hand-woven cotton, finished in a warm camel-brown. A soft notched collar and handcrafted buttons keep the silhouette easy yet considered. Maroon Kantha embroidery subtly defines the collar, sleeves, and seam lines, adding quiet structure and depth. Dyed with azo-free colours and completed in about 12 hours, it’s a thoughtful blend of comfort, craft, and conscious making.\n\nNote: Each piece is handcrafted, so slight variations in weave, colour, and embroidery are natural and part of its unique character.",
        images: [
            "/products/sutr/eka-rekha-shirt/IMG_8327.AVIF",
            "/products/sutr/eka-rekha-shirt/IMG_8328.AVIF",
            "/products/sutr/eka-rekha-shirt/IMG_8326.AVIF",
            "/products/sutr/eka-rekha-shirt/IMG_8325.AVIF"
        ],
        variants: [
            { id: "8-s", size: "S", inStock: true },
            { id: "8-m", size: "M", inStock: true },
            { id: "8-l", size: "L", inStock: true },
            { id: "8-xl", size: "XL", inStock: true },
            { id: "8-xxl", size: "XXL", inStock: false }
        ],
        details: {
            material: "Handspun & handwoven cotton fabric",
            fit: "Open notched collar with decorative button placket",
            color: "Camel-brown (Azo-free Dye)",
            technique: "Maroon Kantha hand embroidery"
        },
        care: "Dry clean only",
        shipping: "• Domestic delivery - approximately 15 - 20 days\n• Shipping charges will be shown at the checkout\n• Find out more - (link of shipping and return page)"
    },
    {
        id: "10",
        handle: "neel-dhaara-shirt",
        title: "NEEL DHAARA SHIRT",
        category: "shirt",
        price: 4899,
        description: "The Neel Dhaara Shirt is a relaxed silhouette crafted from hand-spun, hand-woven cotton in soft sky blue and beige. True to its name, it carries a sense of calm, fluid movement. A soft V-neck with a contrast band collar flows into a button placket finished with handcrafted buttons. Subtle Kantha embroidery along the placket and sleeves adds gentle rhythm and texture. Dyed with azo-free colours and taking around 16 hours to complete, each piece reflects thoughtful handcraft by artisans in Gujarat.\n\nNotes: This garment is handcrafted using traditional techniques. Slight variations in fabric texture, embroidery, and colour are inherent to the process and add to the uniqueness of each piece.",
        images: [
            "/products/sutr/neel-dhaara-shirt/IMG_8355.AVIF",
            "/products/sutr/neel-dhaara-shirt/IMG_8333.AVIF",
            "/products/sutr/neel-dhaara-shirt/IMG_8356.AVIF",
            "/products/sutr/neel-dhaara-shirt/IMG_8354.AVIF"
        ],
        variants: [
            { id: "10-s", size: "S", inStock: true },
            { id: "10-m", size: "M", inStock: true },
            { id: "10-l", size: "L", inStock: true },
            { id: "10-xl", size: "XL", inStock: true },
            { id: "10-xxl", size: "XXL", inStock: true }
        ],
        details: {
            material: "Handspun, handwoven cotton",
            fit: "Relaxed, easy silhouette, V-neck with contrast band collar",
            color: "Sky blue and beige (Azo-free Dye)",
            technique: "Kantha hand embroidery technique, Decorative handmade buttons on front placket, Handcrafted by artisans in Gujarat"
        },
        care: "Dry clean only",
        shipping: "• Domestic delivery - approximately 15 - 20 days\n• Shipping charges will be shown at the checkout\n• Find out more - (link of shipping and return page)"
    },

    // Dresses
    {
        id: "3",
        handle: "nilaaya-dress",
        title: "NILAAYA DRESS",
        category: "dress",
        price: 5999,
        description: "The Nilaya Dress is a short, softly structured silhouette crafted from hand-spun, hand-woven cotton from Gujarat, dyed in an azo-free sky blue. It features a fitted bodice with a defined waist that flows into a relaxed skirt, balancing shape and ease. Hand-stitched Kantha embroidery adds subtle detail, complemented by fabric-covered buttons at the front and an adjustable lace-up back for a custom fit. Taking around 20 hours to complete, each piece reflects careful craftsmanship and considered design.\n\nNote: This garment is handcrafted using traditional slow-craft techniques and produced in limited quantities. Slight variations in embroidery, fabric texture, and colour are inherent to the handmade process and celebrate the uniqueness of each piece.",
        images: [
            "/products/sutr/nilaaya-dress/IMG_8365.AVIF",
            "/products/sutr/nilaaya-dress/IMG_8363.AVIF",
            "/products/sutr/nilaaya-dress/IMG_8362.AVIF",
            "/products/sutr/nilaaya-dress/IMG_8364.AVIF",
            "/products/sutr/nilaaya-dress/IMG_8366.AVIF"
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
            color: "Azo-free Dye (Sky Blue)",
            technique: "Hand Embroidered Kantha Technique (Semi-circular Motifs)"
        },
        care: "Dry clean only",
        shipping: "• Domestic delivery - approximately 15 - 20 days\n• Shipping charges will be shown at the checkout\n• Find out more - (link of shipping and return page)"
    },

    // Skirts
    {
        id: "2",
        handle: "kanthi-skirt",
        title: "KANTHI SKIRT",
        category: "skirt",
        price: 4799,
        description: "The Kanthi Skirt highlights the rhythm of traditional Kantha embroidery, handcrafted in Gujarat. Made from hand-spun, hand-woven cotton and dyed in an azo-free sky blue, it offers a soft, breathable feel with natural texture. Designed in a relaxed, short silhouette, it features fine running stitches flowing across the front and back, creating subtle yet distinctive surface detail. Taking around 14 hours to complete, each piece reflects careful handwork and a mindful approach to craft.\n\nNote : This garment is handcrafted using traditional slow-craft techniques and produced in limited quantities. Minor variations in stitch and fabric texture are inherent to the handmade process and enhance the uniqueness of each piece. Made to order with care and intention.",
        images: [
            "/products/sutr/kanthi-skirt/IMG_8347.AVIF",
            "/products/sutr/kanthi-skirt/IMG_8348.AVIF",
            "/products/sutr/kanthi-skirt/PB__3008.mp4"
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
            fit: "Relaxed Fit, Short Skirt",
            color: "Azo-free Dye (Sky Blue)",
            technique: "Traditional Kantha Hand Embroidery"
        },
        care: "Dry clean only",
        shipping: "• Domestic delivery - approximately 15 - 20 days\n• Shipping charges will be shown at the checkout\n• Find out more - (link of shipping and return page)"
    },
    {
        id: "6",
        handle: "dhaara-skirt",
        title: "DHAARA SKIRT",
        category: "skirt",
        price: 4299,
        description: "The Dhaara Skirt is a soft A-line silhouette crafted from hand-spun, hand-woven cotton in natural beige. Designed to move with ease, it pairs a clean, timeless shape with subtle hand detailing. Kantha embroidery flows across the surface in fine running stitches of red, blue, brown, and beige, creating gentle texture and rhythm. Taking around 24 hours to complete, each piece reflects patience, balance, and the beauty of slow craft.\n\nNote: This garment is handcrafted using traditional techniques. Slight variations in fabric texture, embroidery, and colour are inherent to the process and add to the uniqueness of each piece.",
        images: [
            "/products/sutr/dhaara-skirt/IMG_8315.AVIF",
            "/products/sutr/dhaara-skirt/IMG_8316.AVIF",
            "/products/sutr/dhaara-skirt/IMG_8313.AVIF",
            "/products/sutr/dhaara-skirt/IMG_8314.AVIF"
        ],
        variants: [
            { id: "6-s", size: "S", inStock: true },
            { id: "6-m", size: "M", inStock: false },
            { id: "6-l", size: "L", inStock: true },
            { id: "6-xl", size: "XL", inStock: true },
            { id: "6-xxl", size: "XXL", inStock: true }
        ],
        details: {
            material: "Handspun, handwoven cotton",
            fit: "A-line silhouette",
            color: "Natural beige (Azo-free Dye)",
            technique: "Kantha hand embroidery throughout, Vertical and horizontal running stitch detailing"
        },
        care: "Dry clean only",
        shipping: "• Domestic delivery - approximately 15 - 20 days\n• Shipping charges will be shown at the checkout\n• Find out more - (link of shipping and return page)"
    },

    // Pants
    {
        id: "5",
        handle: "charkha-pants",
        title: "CHARKHA PANTS",
        category: "pants",
        price: 3999,
        description: "The Charkha Pants are relaxed straight-leg trousers crafted from hand-spun, hand-woven cotton in a warm earthy brown. Designed for everyday ease, they balance fluid drape with clean construction. Kantha embroidery adds quiet character, horizontal stitches detail the folded hem panels, while circular charkha-inspired motifs accent the knee area on the front and back. Taking around 20 hours to complete, each pair reflects thoughtful craftsmanship and subtle, handcrafted depth.\n\nNote: This garment is handcrafted using traditional techniques. Slight variations in fabric texture, embroidery, and colour are inherent to the process and add to the uniqueness of each piece.",
        images: [
            "/products/sutr/charkha-pants/IMG_8301.AVIF",
            "/products/sutr/charkha-pants/IMG_8302.AVIF",
            "/products/sutr/charkha-pants/IMG_8300.AVIF",
            "/products/sutr/charkha-pants/PB__3011.mp4"
        ],
        variants: [
            { id: "5-s", size: "S", inStock: true },
            { id: "5-m", size: "M", inStock: true },
            { id: "5-l", size: "L", inStock: true },
            { id: "5-xl", size: "XL", inStock: false },
            { id: "5-xxl", size: "XXL", inStock: true }
        ],
        details: {
            material: "Handspun, handwoven cotton",
            fit: "Relaxed straight-leg fit, Folded hem panel with Kantha hand embroidery",
            color: "Purdy brown (Azo-free Dye)",
            technique: "Concentric charkha-inspired Kantha motifs at the knee"
        },
        care: "Dry clean only",
        shipping: "• Domestic delivery - approximately 15 - 20 days\n• Shipping charges will be shown at the checkout\n• Find out more - (link of shipping and return page)"
    },
    {
        id: "9",
        handle: "eka-rekha-pants",
        title: "EKA REKHA PANTS",
        category: "pants",
        price: 4199,
        description: "The Eka Rekha Pants are straight-fit trousers crafted from hand-spun, hand-woven cotton in natural beige, highlighted by a rust-maroon vertical panel down each leg. Inspired by the idea of a single line, Kantha embroidery flows along this panel in subtle beige thread. Dyed with azo-free colours and taking around 15 hours to complete, each pair balances clean structure with artisanal detail and everyday ease.\n\nNote: This garment is handcrafted using traditional techniques. Slight variations in fabric texture, embroidery, and colour are inherent to the process and add to the uniqueness of each piece.",
        images: [
            "/products/sutr/eka-rekha-pants/IMG_8319.AVIF",
            "/products/sutr/eka-rekha-pants/IMG_8320.AVIF",
            "/products/sutr/eka-rekha-pants/PB__3010.mp4"
        ],
        variants: [
            { id: "9-s", size: "S", inStock: true },
            { id: "9-m", size: "M", inStock: true },
            { id: "9-l", size: "L", inStock: true },
            { id: "9-xl", size: "XL", inStock: true },
            { id: "9-xxl", size: "XXL", inStock: true }
        ],
        details: {
            material: "Handspun, handwoven cotton",
            fit: "Straight-fit silhouette",
            color: "Natural beige base with rust-maroon centre panels (Azo-free Dye)",
            technique: "Kantha hand embroidery in beige anchor thread"
        },
        care: "Dry clean only",
        shipping: "• Domestic delivery - approximately 15 - 20 days\n• Shipping charges will be shown at the checkout\n• Find out more - (link of shipping and return page)"
    },
    {
        id: "11",
        handle: "kaldhaara-pants",
        title: "KALDHAARA PANTS",
        category: "pants",
        price: 4599,
        description: "The Kaldhaara Pants are relaxed straight-fit trousers crafted from hand-spun, hand-woven cotton in deep black, contrasted with an earthy brown front panel. Designed with a slightly oversized ease, they balance structure and comfort.Kantha embroidery in linear motifs adds subtle texture and movement across the front panel. Dyed with azo-free colours and taking around 19 hours to complete, each pair reflects skilled craftsmanship by artisans in Gujarat.\n\nNOTE: This garment is handcrafted using traditional techniques. Minor variations in fabric texture, embroidery, and colour are inherent to the process and enhance the individuality of each piece.",
        images: [
            "/products/sutr/kaldhaara-pants/IMG_8333.AVIF",
            "/products/sutr/kaldhaara-pants/IMG_8334.AVIF",
            "/products/sutr/kaldhaara-pants/IMG_8332.AVIF",
            "/products/sutr/kaldhaara-pants/PB__3009.mp4"
        ],
        variants: [
            { id: "11-s", size: "S", inStock: true },
            { id: "11-m", size: "M", inStock: true },
            { id: "11-l", size: "L", inStock: false },
            { id: "11-xl", size: "XL", inStock: true },
            { id: "11-xxl", size: "XXL", inStock: true }
        ],
        details: {
            material: "Handspun, handwoven cotton",
            fit: "Relaxed straight-fit, slightly oversized silhouette",
            color: "Deep black with earthy brown panel (Azo-free Dye)",
            technique: "Kantha hand embroidery on front panel"
        },
        care: "Dry clean only",
        shipping: "• Domestic delivery - approximately 15 - 20 days\n• Shipping charges will be shown at the checkout\n• Find out more - (link of shipping and return page)"
    }
];

export const getProductByHandle = (handle: string): Product | undefined => {
    return sutrProducts.find(p => p.handle === handle);
};

export const getProductsByCategory = (category: Product["category"]): Product[] => {
    return sutrProducts.filter(p => p.category === category);
};
