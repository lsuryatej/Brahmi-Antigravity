"use client";

import { CollectionsCarousel, Collection } from "@/components/ui/collections-carousel";

const collections: Collection[] = [
    {
        id: 1,
        title: "Charkha Pants",
        description: "Handcrafted pottery and traditional designs",
        image: "/images/collections/charkha-pants.jpeg",
        isNew: true,
    },
    {
        id: 2,
        title: "Avanti Top",
        description: "Woven fabrics and traditional patterns",
        image: "/images/collections/Avanti-Top.jpeg",
    },
    {
        id: 3,
        title: "Charkha Vest",
        description: "Carved sculptures and handmade furniture",
        image: "/images/collections/Charkha-Vest.png",
    },
    {
        id: 4,
        title: "Eka Rekha Pants",
        description: "Bronze and brass traditional artifacts",
        image: "/images/collections/Eka-Rekha-Pants.jpeg",
    },
];

export const Collections = () => {
    return (
        <CollectionsCarousel
            collections={collections}
            title="Our Products"
            subtitle="Explore our curated selection of traditional crafts"
        />
    );
};
