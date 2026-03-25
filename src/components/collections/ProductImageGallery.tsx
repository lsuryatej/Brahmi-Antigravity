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

    const isVideo = (url: string) => url.toLowerCase().endsWith(".mp4");

    return (
        <div className="space-y-4">
            {/* Main Image Slider */}
            <Swiper
                modules={[Navigation, Pagination, Thumbs]}
                navigation
                pagination={{ clickable: true }}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                className="overflow-hidden aspect-[3/4] bg-muted"
            >
                {images.map((media, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            {isVideo(media) ? (
                                <video
                                    src={media}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <Image
                                    src={media}
                                    alt={`${productTitle} - Image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority={index === 0}
                                />
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Thumbnail Navigation */}
            <Swiper
                onSwiper={setThumbsSwiper}
                modules={[Thumbs]}
                spaceBetween={12}
                slidesPerView={4}
                watchSlidesProgress
                className="!cursor-pointer"
            >
                {images.map((media, index) => (
                    <SwiperSlide key={index} className="!h-24 overflow-hidden">
                        <div className="relative w-full h-full bg-muted">
                            {isVideo(media) ? (
                                <video
                                    src={media}
                                    muted
                                    playsInline
                                    className="object-cover w-full h-full hover:opacity-75 transition-opacity"
                                />
                            ) : (
                                <Image
                                    src={media}
                                    alt={`${productTitle} - Thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover hover:opacity-75 transition-opacity"
                                    sizes="25vw"
                                />
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
