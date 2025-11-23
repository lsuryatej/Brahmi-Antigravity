"use client";

import { CollectionsCarousel, Collection } from "@/components/ui/collections-carousel";

const collections: Collection[] = [
    {
        id: 1,
        title: "Ceramics",
        description: "Handcrafted pottery and traditional designs",
        image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=800&auto=format&fit=crop",
        isNew: true,
    },
    {
        id: 2,
        title: "Textiles",
        description: "Woven fabrics and traditional patterns",
        image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Woodwork",
        description: "Carved sculptures and handmade furniture",
        image: "https://images.unsplash.com/photo-1565191999001-551c187427bb?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "Metal Art",
        description: "Bronze and brass traditional artifacts",
        image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 5,
        title: "Paintings",
        description: "Traditional art and modern interpretations",
        image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=800&auto=format&fit=crop",
    },
];

export const Collections = () => {
    return (
        <CollectionsCarousel
            collections={collections}
            title="Our Collections"
            subtitle="Explore our curated selection of traditional crafts"
        />
    );
};
