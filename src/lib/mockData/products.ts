export interface ProductVariant {
    id: string;
    size: string;
    inStock: boolean;
}

export interface Product {
    id: string;
    handle: string;
    title: string;
    category: "shirt" | "pants";
    price: number;
    description: string;
    images: string[];
    variants: ProductVariant[];
    specifications: {
        material: string;
        fit: string;
        care: string;
    };
}

export const mockProducts: Product[] = [
    // Shirts (6)
    {
        id: "1",
        handle: "handwoven-cotton-shirt-ivory",
        title: "Handwoven Cotton Shirt - Ivory",
        category: "shirt",
        price: 3499,
        description: "Meticulously handwoven by skilled artisans, this ivory cotton shirt embodies traditional craftsmanship. The breathable fabric and relaxed fit make it perfect for both casual and semi-formal occasions.",
        images: [
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800",
            "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800",
            "https://images.unsplash.com/photo-1620799139834-6b8f844fbe51?w=800"
        ],
        variants: [
            { id: "1-s", size: "S", inStock: true },
            { id: "1-m", size: "M", inStock: true },
            { id: "1-l", size: "L", inStock: true },
            { id: "1-xl", size: "XL", inStock: false }
        ],
        specifications: {
            material: "100% Handwoven Cotton",
            fit: "Regular Fit",
            care: "Hand wash or gentle machine wash in cold water"
        }
    },
    {
        id: "2",
        handle: "indigo-dyed-kurta-shirt",
        title: "Indigo Dyed Kurta Shirt",
        category: "shirt",
        price: 4299,
        description: "A contemporary take on the classic kurta, naturally dyed with indigo using traditional techniques. Each piece is unique with subtle variations that tell the story of its handcrafted origin.",
        images: [
            "https://images.unsplash.com/photo-1602810319428-019690571b5b?w=800",
            "https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?w=800",
            "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800"
        ],
        variants: [
            { id: "2-s", size: "S", inStock: true },
            { id: "2-m", size: "M", inStock: true },
            { id: "2-l", size: "L", inStock: true },
            { id: "2-xl", size: "XL", inStock: true }
        ],
        specifications: {
            material: "100% Natural Indigo Dyed Cotton",
            fit: "Relaxed Fit",
            care: "Hand wash separately in cold water to preserve color"
        }
    },
    {
        id: "3",
        handle: "block-print-linen-shirt-terracotta",
        title: "Block Print Linen Shirt - Terracotta",
        category: "shirt",
        price: 3999,
        description: "Featuring traditional block prints in warm terracotta tones, this linen shirt celebrates the ancient art of hand-block printing. Lightweight and perfect for warm weather.",
        images: [
            "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=800",
            "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=800",
            "https://images.unsplash.com/photo-1621072390765-29c2f31a1da1?w=800"
        ],
        variants: [
            { id: "3-s", size: "S", inStock: true },
            { id: "3-m", size: "M", inStock: false },
            { id: "3-l", size: "L", inStock: true },
            { id: "3-xl", size: "XL", inStock: true }
        ],
        specifications: {
            material: "100% Pure Linen with Hand Block Print",
            fit: "Regular Fit",
            care: "Dry clean recommended or gentle hand wash"
        }
    },
    {
        id: "4",
        handle: "khadi-silk-blend-shirt-charcoal",
        title: "Khadi Silk Blend Shirt - Charcoal",
        category: "shirt",
        price: 5199,
        description: "A luxurious blend of khadi cotton and silk, hand-spun and handwoven. The charcoal color adds sophistication while maintaining the rustic charm of traditional textiles.",
        images: [
            "https://images.unsplash.com/photo-1602810319854-e5555f745c33?w=800",
            "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=800",
            "https://images.unsplash.com/photo-1622445275446-5b7e80b4b43f?w=800"
        ],
        variants: [
            { id: "4-s", size: "S", inStock: true },
            { id: "4-m", size: "M", inStock: true },
            { id: "4-l", size: "L", inStock: true },
            { id: "4-xl", size: "XL", inStock: true }
        ],
        specifications: {
            material: "Khadi Cotton-Silk Blend (70% Cotton, 30% Silk)",
            fit: "Slim Fit",
            care: "Dry clean only to maintain fabric quality"
        }
    },
    {
        id: "5",
        handle: "organic-cotton-shirt-sage",
        title: "Organic Cotton Shirt - Sage",
        category: "shirt",
        price: 3299,
        description: "Crafted from certified organic cotton in a soothing sage green. This eco-friendly shirt combines sustainability with comfort, featuring mother-of-pearl buttons.",
        images: [
            "https://images.unsplash.com/photo-1620799140397-1ecc8df74c83?w=800",
            "https://images.unsplash.com/photo-1621072390504-67f4e4aef46e?w=800",
            "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=800"
        ],
        variants: [
            { id: "5-s", size: "S", inStock: true },
            { id: "5-m", size: "M", inStock: true },
            { id: "5-l", size: "L", inStock: false },
            { id: "5-xl", size: "XL", inStock: true }
        ],
        specifications: {
            material: "100% Organic Cotton (GOTS Certified)",
            fit: "Regular Fit",
            care: "Machine wash cold, tumble dry low"
        }
    },
    {
        id: "6",
        handle: "ikat-weave-cotton-shirt-burgundy",
        title: "Ikat Weave Cotton Shirt - Burgundy",
        category: "shirt",
        price: 4799,
        description: "Showcasing the intricate ikat weaving technique, this burgundy shirt features geometric patterns that are dyed into the yarn before weaving, creating a distinctive blurred effect.",
        images: [
            "https://images.unsplash.com/photo-1620799140404-96e4e9c63ed0?w=800",
            "https://images.unsplash.com/photo-1621072390409-69fb0d4c8850?w=800",
            "https://images.unsplash.com/photo-1620799140577-60ccac82ae09?w=800"
        ],
        variants: [
            { id: "6-s", size: "S", inStock: true },
            { id: "6-m", size: "M", inStock: true },
            { id: "6-l", size: "L", inStock: true },
            { id: "6-xl", size: "XL", inStock: true }
        ],
        specifications: {
            material: "100% Ikat Woven Cotton",
            fit: "Regular Fit",
            care: "Hand wash or gentle machine wash, air dry"
        }
    },

    // Pants (4)
    {
        id: "7",
        handle: "handloom-cotton-trousers-beige",
        title: "Handloom Cotton Trousers - Beige",
        category: "pants",
        price: 3899,
        description: "Classic beige trousers crafted from handloom cotton. Tailored for comfort with a modern cut, these versatile pants pair perfectly with our collection of artisan shirts.",
        images: [
            "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800",
            "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800",
            "https://images.unsplash.com/photo-1624378440070-485aabf36169?w=800"
        ],
        variants: [
            { id: "7-28", size: "28", inStock: true },
            { id: "7-30", size: "30", inStock: true },
            { id: "7-32", size: "32", inStock: true },
            { id: "7-34", size: "34", inStock: true },
            { id: "7-36", size: "36", inStock: false }
        ],
        specifications: {
            material: "100% Handloom Cotton",
            fit: "Straight Fit",
            care: "Machine wash cold, iron while slightly damp"
        }
    },
    {
        id: "8",
        handle: "khadi-linen-pants-navy",
        title: "Khadi Linen Pants - Navy",
        category: "pants",
        price: 4499,
        description: "Breathable khadi linen pants in deep navy. The relaxed cut and natural texture make these pants ideal for both casual and dressed-up occasions.",
        images: [
            "https://images.unsplash.com/photo-1511105043137-944629d06814?w=800",
            "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800",
            "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=800"
        ],
        variants: [
            { id: "8-28", size: "28", inStock: true },
            { id: "8-30", size: "30", inStock: true },
            { id: "8-32", size: "32", inStock: false },
            { id: "8-34", size: "34", inStock: true },
            { id: "8-36", size: "36", inStock: true }
        ],
        specifications: {
            material: "Khadi Linen Blend",
            fit: "Relaxed Fit",
            care: "Dry clean recommended or gentle hand wash"
        }
    },
    {
        id: "9",
        handle: "organic-cotton-chinos-olive",
        title: "Organic Cotton Chinos - Olive",
        category: "pants",
        price: 3599,
        description: "Contemporary chinos in earthy olive, made from certified organic cotton. Features a modern slim fit with traditional handcrafted details.",
        images: [
            "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800",
            "https://images.unsplash.com/photo-1510990336413-3598a91e4f20?w=800",
            "https://images.unsplash.com/photo-1584865288642-42078afe6942?w=800"
        ],
        variants: [
            { id: "9-28", size: "28", inStock: true },
            { id: "9-30", size: "30", inStock: true },
            { id: "9-32", size: "32", inStock: true },
            { id: "9-34", size: "34", inStock: true },
            { id: "9-36", size: "36", inStock: true }
        ],
        specifications: {
            material: "100% Organic Cotton (GOTS Certified)",
            fit: "Slim Fit",
            care: "Machine wash cold, tumble dry low"
        }
    },
    {
        id: "10",
        handle: "handwoven-wool-trousers-grey",
        title: "Handwoven Wool Trousers - Grey",
        category: "pants",
        price: 5999,
        description: "Premium handwoven wool trousers in sophisticated grey. Perfect for cooler weather, these pants showcase the finest in traditional textile craftsmanship.",
        images: [
            "https://images.unsplash.com/photo-1594033884509-2d9bb43f54b4?w=800",
            "https://images.unsplash.com/photo-1593030841022-c682e8f0f3cb?w=800",
            "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800"
        ],
        variants: [
            { id: "10-28", size: "28", inStock: false },
            { id: "10-30", size: "30", inStock: true },
            { id: "10-32", size: "32", inStock: true },
            { id: "10-34", size: "34", inStock: true },
            { id: "10-36", size: "36", inStock: true }
        ],
        specifications: {
            material: "100% Handwoven Merino Wool",
            fit: "Tailored Fit",
            care: "Dry clean only"
        }
    }
];

export const getProductByHandle = (handle: string): Product | undefined => {
    return mockProducts.find(p => p.handle === handle);
};

export const getProductsByCategory = (category: "shirt" | "pants"): Product[] => {
    return mockProducts.filter(p => p.category === category);
};
