"use client";

import Image from "next/image";
import Link from "next/link";
import { sutrProducts } from "@/lib/mockData/products";

export const Collections = () => {
    // Specifically showcasing the 4 products from the mockup resources
    const highlightedProducts = [
        {
            title: "Kanthi skirt",
            price: "6500",
            image: "/images/collections/kanthi_skirt.png",
            href: "/collections/sutr/kanthi-skirt"
        },
        {
            title: "Nilaaya dress",
            price: "8900",
            image: "/images/collections/nilaaya_dress.png",
            href: "/collections/sutr/nilaaya-dress"
        },
        {
            title: "Kaldhaara pants",
            price: "6500",
            image: "/images/collections/kaldhaara_pants.jpeg",
            href: "/collections/sutr/kaldhaara-pants"
        },
        {
            title: "Charkha vest",
            price: "6500",
            image: "/images/collections/charkha_vest.png",
            href: "/collections/sutr/charkha-vest"
        }
    ];

    return (
        <section className="relative w-full bg-background py-8 md:py-24 max-w-screen-2xl mx-auto px-4 md:px-8 space-y-12 md:space-y-24">
            
            {/* Top Section */}
            <div className="grid grid-cols-2 gap-4 md:gap-8">
                <div className="relative w-full aspect-[3/4] md:h-[80vh] md:aspect-auto">
                    <Image
                        src="/images/collections/group_photo.jpeg"
                        alt="Brahmi Sutr Collection"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 50vw"
                        priority
                    />
                </div>
                <div className="flex flex-col items-center justify-center h-full">
                    <Link href="/collections/sutr" className="group flex flex-col items-center">
                        <span className="text-xs md:text-[15px] font-medium tracking-widest border-b-[1px] border-black pb-1 hover:opacity-70 transition-opacity">
                            Shop now
                        </span>
                    </Link>
                </div>
            </div>

            {/* Middle Section (4-column Grid) */}
            <div className="grid grid-cols-4 gap-2 md:gap-6">
                {highlightedProducts.map((product) => (
                    <Link key={product.title} href={product.href} className="group flex flex-col cursor-pointer">
                        <div className="relative w-full aspect-[3/4] mb-2 md:mb-5 overflow-hidden">
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 25vw, 25vw"
                            />
                        </div>
                        <div className="flex flex-col items-start text-[8px] md:text-sm">
                            <span className="font-medium text-black border-b-[1px] border-black pb-[1px] md:pb-0.5 mb-1 capitalize">
                                {product.title}
                            </span>
                            <span className="text-muted-foreground font-mono">
                                {product.price}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-2 gap-4 md:gap-8">
                <div className="flex flex-col items-center justify-center h-full">
                    <Link href="/journey" className="group flex flex-col items-center text-center">
                        <span className="text-xs md:text-[15px] font-medium tracking-widest border-b-[1px] border-black pb-1 hover:opacity-70 transition-opacity">
                            Our journey
                        </span>
                    </Link>
                </div>
                <div className="relative w-full aspect-[4/3] md:h-[70vh] md:aspect-auto">
                    <video 
                        src="/videos/artisan_video.mp4" 
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

        </section>
    );
};
