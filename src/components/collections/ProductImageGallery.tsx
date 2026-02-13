"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import { useState } from "react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

interface ProductImageGalleryProps {
    images: string[];
    productTitle: string;
}

export const ProductImageGallery = ({ images, productTitle }: ProductImageGalleryProps) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    return (
        <div className="space-y-4">
            {/* Main Image Slider */}
            <Swiper
                modules={[Navigation, Pagination, Thumbs]}
                navigation
                pagination={{ clickable: true }}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                className="rounded-2xl overflow-hidden aspect-[3/4] bg-muted"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            <Image
                                src={image}
                                alt={`${productTitle} - Image ${index + 1}`}
                                fill
                                className="object-cover"
                                priority={index === 0}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Thumbnail Navigation */}
            <Swiper
                onSwiper={setThumbsSwiper}
                modules={[Thumbs]}
                spaceBetween={12}
                slidesPerView={3}
                watchSlidesProgress
                className="!cursor-pointer"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index} className="!h-24 rounded-lg overflow-hidden">
                        <div className="relative w-full h-full">
                            <Image
                                src={image}
                                alt={`${productTitle} - Thumbnail ${index + 1}`}
                                fill
                                className="object-cover hover:opacity-75 transition-opacity"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
