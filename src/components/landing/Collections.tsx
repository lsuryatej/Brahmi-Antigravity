"use client";

import { CollectionsCarousel, Collection } from "@/components/ui/collections-carousel";

const collections: Collection[] = [
    {
        id: 1,
        title: "Charkha Pants",
        description: "Handcrafted pottery and traditional designs",
        image: "/images/collections/charkha-pants.jpeg",
        isNew: true,
        href: "/collections/sutr/charkha-pants",
    },
    {
        id: 2,
        title: "Avanti Top",
        description: "Woven fabrics and traditional patterns",
        image: "/images/collections/Avanti-Top.jpeg",
        href: "/collections/sutr/avanti-top",
    },
    {
        id: 3,
        title: "Charkha Vest",
        description: "Carved sculptures and handmade furniture",
        image: "/images/collections/Charkha-Vest.png",
        href: "/collections/sutr/charkha-vest",
    },
    {
        id: 4,
        title: "Eka Rekha Pants",
        description: "Bronze and brass traditional artifacts",
        image: "/images/collections/Eka-Rekha-Pants.jpeg",
        href: "/collections/sutr/eka-rekha-pants",
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
