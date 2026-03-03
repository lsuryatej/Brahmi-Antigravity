"use client";

import { sutrProducts } from "@/lib/mockData/products";
import { CircularGallery } from "@/components/ui/circular-gallery";

const galleryItems = sutrProducts
    .filter((product) => product.images?.[0])
    .map((product) => ({
        title: product.title,
        image: product.images[0],
        href: `/collections/sutr/${product.handle}`,
    }));

export const Collections = () => {
    return (
        <section className="relative py-16 md:py-24 px-4 md:px-8">
            <div className="max-w-6xl mx-auto text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground font-sans">
                    Our Products
                </h2>
                <p className="text-muted-foreground font-mono text-sm md:text-base mt-2">
                    Explore our curated selection of traditional crafts
                </p>
            </div>
            <CircularGallery items={galleryItems} />
        </section>
    );
};
