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
        description: "The Kanthi Jacket is a masterpiece of traditional craftsmanship, meticulously handwoven using time-honored techniques passed down through generations. Each thread tells a story of dedication and artistry, creating a garment that seamlessly blends heritage with contemporary style.\n\nCrafted from premium handloom fabrics, this jacket features intricate detailing that showcases the skill of our artisans. The relaxed yet structured silhouette makes it versatile enough for both casual and semi-formal occasions.\n\nPerfect for layering or as a statement piece on its own, the Kanthi Jacket embodies the essence of slow fashion and sustainable luxury.",
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
            material: "100% Handwoven Cotton | Natural Dyes",
            fit: "Relaxed Fit with Structured Shoulders"
        },
        care: "Dry clean recommended. Can be hand washed separately in cold water. Do not bleach. Iron on medium heat while slightly damp.",
        shipping: "We ship within 2-3 business days via premium courier. Delivery typically takes 5-7 business days within India. International shipping available on request."
    },
    {
        id: "4",
        handle: "charkha-vest",
        title: "CHARKHA VEST",
        category: "vest",
        price: 4299,
        description: "The Charkha Vest celebrates the timeless art of hand-spinning, inspired by the traditional charkha wheel that has been central to Indian textile heritage for centuries. This versatile piece combines functionality with artisanal beauty.\n\nHandcrafted from naturally spun yarns, each vest carries the unique character of handmade textiles. The breathable fabric and classic cut make it an essential addition to any conscious wardrobe, perfect for layering throughout the seasons.\n\nWhether worn over a simple shirt or paired with traditional kurtas, the Charkha Vest adds depth and texture to your ensemble while honoring sustainable fashion practices.",
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
            material: "Hand-spun Khadi Cotton | Vegetable Dyed",
            fit: "Regular Fit with Adjustable Back"
        },
        care: "Hand wash or gentle machine wash in cold water. Air dry in shade. Iron on low to medium heat. Avoid harsh detergents.",
        shipping: "Orders processed within 2-3 business days. Standard delivery takes 5-7 business days across India. Express shipping available at checkout."
    },

    // Tops & Shirts
    {
        id: "7",
        handle: "avanti-top",
        title: "AVANTI TOP",
        category: "top",
        price: 3799,
        description: "The Avanti Top embodies effortless elegance through its clean lines and artisanal details. Designed for the modern woman who appreciates the beauty of handcrafted textiles, this top seamlessly transitions from day to evening wear.\n\nFeaturing traditional weaving patterns reimagined in a contemporary silhouette, the Avanti Top celebrates the intersection of heritage craft and modern design. The luxurious hand-feel of the fabric speaks to hours of skilled craftsmanship.\n\nStyle it with tailored pants for a polished look, or pair with flowing skirts for a more relaxed aesthetic. This versatile piece is destined to become a wardrobe staple.",
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
            material: "100% Handloom Cotton | Natural Finish",
            fit: "Relaxed Fit with Gathered Details"
        },
        care: "Machine wash cold separately. Tumble dry low or air dry. Iron while slightly damp for best results. Avoid direct sunlight when drying.",
        shipping: "Ships within 2-3 business days. Estimated delivery: 5-7 business days for domestic orders. Track your order via email notifications."
    },
    {
        id: "8",
        handle: "eka-rekha-shirt",
        title: "EKA REKHA SHIRT",
        category: "shirt",
        price: 4499,
        description: "Eka Rekha, meaning 'single line' in Sanskrit, pays homage to the minimalist beauty found in traditional textile designs. This shirt features subtle linear patterns created through meticulous handweaving techniques that have been refined over generations.\n\nThe Eka Rekha Shirt represents the perfect balance between simplicity and sophistication. Each piece is woven with intention, creating a meditative quality that translates into a garment of exceptional beauty and comfort.\n\nIdeal for those who appreciate understated luxury, this shirt pairs beautifully with both traditional and contemporary pieces, making it an invaluable addition to any thoughtful wardrobe.",
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
            material: "Premium Handwoven Linen-Cotton Blend",
            fit: "Regular Fit with Contemporary Cut"
        },
        care: "Hand wash or gentle machine wash separately. Air dry flat. Iron on medium heat. The natural fibers will soften beautifully with each wash.",
        shipping: "Processing time: 2-3 business days. Delivery within 5-7 business days across India via reliable courier partners."
    },
    {
        id: "10",
        handle: "neel-dhaara-shirt",
        title: "NEEL DHAARA SHIRT",
        category: "shirt",
        price: 4899,
        description: "Neel Dhaara, translating to 'indigo stream,' showcases the ancient art of natural indigo dyeing. This shirt embodies centuries of traditional knowledge, where each piece is hand-dyed using organic indigo extracted from plants, creating depth and richness impossible to replicate synthetically.\n\nThe flowing patterns of blue hues tell the story of the dye's journey through the fabric, creating unique variations that make each shirt one-of-a-kind. The traditional dyeing process is an act of patience and skill, passed down through generations of master dyers.\n\nWear this shirt as a celebration of sustainable fashion and artisanal excellence. The color will deepen and develop character over time, creating a garment that ages gracefully with you.",
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
            material: "100% Organic Cotton | Natural Indigo Dye",
            fit: "Relaxed Fit with Classic Collar"
        },
        care: "Hand wash separately in cold water to preserve color. Avoid direct sunlight. Air dry in shade. Gentle iron if needed. Color may bleed initially.",
        shipping: "Handmade to preserve quality. Ships within 2-3 days. Standard delivery: 5-7 business days. Packaged with care in eco-friendly materials."
    },

    // Dresses
    {
        id: "3",
        handle: "nilaaya-dress",
        title: "NILAAYA DRESS",
        category: "dress",
        price: 5999,
        description: "The Nilaaya Dress is a stunning celebration of traditional weaving artistry, reimagined for the contemporary wardrobe. This elegant piece combines flowing silhouettes with intricate handwoven details, creating a dress that feels both timeless and modern.\n\nCrafted from the finest handloom fabrics, each Nilaaya Dress is a labor of love, requiring days of careful weaving and finishing. The result is a garment of exceptional quality that drapes beautifully and moves gracefully with your body.\n\nPerfect for special occasions or elevated everyday wear, this dress embodies the essence of conscious luxury. The attention to detail in every stitch and weave pattern makes it a true investment piece.",
        images: [
            "/images/products/sutr/nilaaya-dress/image-1.jpeg",
            "/images/products/sutr/nilaaya-dress/image-2.jpg",
            "/images/products/sutr/nilaaya-dress/image-3.jpeg",
            "/images/products/sutr/nilaaya-dress/image-4.jpeg",
            "/images/products/sutr/nilaaya-dress/image-5.png"
        ],
        variants: [
            { id: "3-s", size: "S", inStock: true },
            { id: "3-m", size: "M", inStock: true },
            { id: "3-l", size: "L", inStock: true },
            { id: "3-xl", size: "XL", inStock: false },
            { id: "3-xxl", size: "XXL", inStock: true }
        ],
        details: {
            material: "Handwoven Silk-Cotton Blend | Traditional Weave",
            fit: "Flowing A-Line Silhouette"
        },
        care: "Dry clean recommended for best care. Can be hand washed gently in cold water if needed. Air dry flat away from direct sunlight. Steam or iron on low heat.",
        shipping: "Carefully packaged and shipped within 2-3 business days. Delivery in 5-7 business days. International shipping available."
    },

    // Skirts
    {
        id: "2",
        handle: "kanthi-skirt",
        title: "KANTHI SKIRT",
        category: "skirt",
        price: 4799,
        description: "The Kanthi Skirt mirrors the artisanal excellence of its jacket counterpart, featuring the same meticulous handweaving that creates a garment of exceptional beauty. This skirt celebrates traditional techniques while offering a versatile piece for modern styling.\n\nWith its flowing silhouette and carefully crafted details, the Kanthi Skirt moves gracefully with every step. The handloom fabric provides a luxurious texture that speaks to the hours of skilled craftsmanship invested in each piece.\n\nStyle it with the matching jacket for a coordinated ensemble, or pair with simple tops to let the skirt's artisanal quality shine. This is a piece that transcends trends and seasons.",
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
            material: "100% Handwoven Cotton | Natural Dyes",
            fit: "Mid-Rise with Flowing Silhouette"
        },
        care: "Dry clean preferred. Hand wash in cold water separately if needed. Do not wring. Air dry flat. Iron on medium heat while damp.",
        shipping: "Ships within 2-3 business days. Standard delivery across India in 5-7 days. Tracking information provided via email."
    },
    {
        id: "6",
        handle: "dhaara-skirt",
        title: "DHAARA SKIRT",
        category: "skirt",
        price: 4299,
        description: "Dhaara, meaning 'flow' in Sanskrit, perfectly describes the graceful movement of this beautifully crafted skirt. The Dhaara Skirt embodies the fluidity of traditional textiles, with patterns that seem to flow like water across the fabric.\n\nEach skirt is handwoven with precision, creating subtle variations in pattern and texture that make every piece unique. The natural fibers and organic dyes ensure both comfort and sustainability, while the timeless design guarantees years of wear.\n\nWhether dressed up with elegant tops or styled casually with simple tees, the Dhaara Skirt brings an element of artisanal sophistication to any outfit. It's a versatile piece that honors tradition while embracing contemporary style.",
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
            material: "Handloom Cotton with Traditional Patterns",
            fit: "Comfortable Mid-Rise with Gentle Drape"
        },
        care: "Machine wash cold on gentle cycle or hand wash. Air dry in shade. Iron while slightly damp on medium heat. Avoid bleach and harsh chemicals.",
        shipping: "Order processing: 2-3 business days. Delivery time: 5-7 business days for domestic orders. Secure packaging guaranteed."
    },

    // Pants
    {
        id: "5",
        handle: "charkha-pants",
        title: "CHARKHA PANTS",
        category: "pants",
        price: 3999,
        description: "The Charkha Pants pay tribute to the traditional spinning wheel, embodying the spirit of self-reliance and sustainable fashion. Crafted from hand-spun khadi fabric, these pants represent a commitment to preserving traditional textile arts while creating contemporary, wearable pieces.\n\nThe unique texture of hand-spun fabric gives these pants a character that machine-made textiles simply cannot replicate. Each thread carries the imprint of artisan hands, creating a garment with soul and substance.\n\nDesigned for comfort and style, the Charkha Pants feature a relaxed fit that works beautifully for both casual and smart-casual occasions. They're a testament to the beauty of slow fashion and conscious consumption.",
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
            material: "Hand-spun Khadi Cotton | Vegetable Dyed",
            fit: "Relaxed Fit with Tapered Leg"
        },
        care: "Hand wash or gentle machine wash in cold water. Air dry in shade to preserve color. Iron on medium heat. The fabric softens beautifully with each wash.",
        shipping: "Ships within 2-3 business days. Domestic delivery in 5-7 days via trusted courier partners. All orders are trackable."
    },
    {
        id: "9",
        handle: "eka-rekha-pants",
        title: "EKA REKHA PANTS",
        category: "pants",
        price: 4199,
        description: "Complementing the Eka Rekha Shirt, these pants feature the same minimalist linear aesthetics that define the collection. The subtle striping created through traditional weaving techniques adds visual interest without overwhelming the design.\n\nCrafted with the same attention to detail as all our pieces, the Eka Rekha Pants represent the perfect marriage of form and function. The premium handloom fabric drapes beautifully while maintaining structure throughout the day.\n\nVersatile enough to pair with both traditional and contemporary tops, these pants are an essential foundation piece. They embody the philosophy that true luxury lies in quality, craftsmanship, and timeless design.",
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
            material: "Premium Handwoven Linen-Cotton Blend",
            fit: "Straight Leg with Modern Cut"
        },
        care: "Machine wash cold or hand wash. Tumble dry low or air dry. Iron on medium heat while slightly damp for crisp finish. The fabric improves with age.",
        shipping: "Ready to ship within 2-3 business days. Standard delivery takes 5-7 business days. Express options available at checkout."
    },
    {
        id: "11",
        handle: "kaldhaara-pants",
        title: "KALDHAARA PANTS",
        category: "pants",
        price: 4599,
        description: "Kaldhaara, representing the flow of time, captures the essence of traditional craftsmanship evolving with contemporary needs. These pants blend heritage weaving techniques with modern tailoring, creating a garment that honors the past while looking firmly to the future.\n\nThe rich texture and depth of color achieved through natural dyeing processes give these pants a distinctive character. Each pair tells its own story through subtle variations that are the signature of handmade textiles.\n\nDesigned for the conscious consumer who refuses to compromise on style or sustainability, the Kaldhaara Pants offer exceptional comfort and durability. They're built to last, growing more beautiful with time and wear.",
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
            material: "100% Handwoven Cotton | Natural Dyes",
            fit: "Comfortable Relaxed Fit"
        },
        care: "Hand wash or gentle machine wash in cold water separately. Air dry away from direct sunlight. Iron on medium heat. Handle with care to preserve the handwoven quality.",
        shipping: "Processing time: 2-3 business days. Estimated delivery: 5-7 business days for domestic orders. International shipping on request."
    }
];

export const getProductByHandle = (handle: string): Product | undefined => {
    return sutrProducts.find(p => p.handle === handle);
};

export const getProductsByCategory = (category: Product["category"]): Product[] => {
    return sutrProducts.filter(p => p.category === category);
};
