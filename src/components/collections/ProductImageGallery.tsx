"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import { useState, useCallback } from "react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

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
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const isVideo = (url: string) => url.toLowerCase().endsWith(".mp4");

    // Only images go into the lightbox (videos stay in the swiper only)
    const imageSlides = images
        .filter((url) => !isVideo(url))
        .map((url) => ({ src: url }));

    // Map swiper slide index → lightbox slide index (skip videos)
    const getLightboxIndex = useCallback(
        (swiperIndex: number) => {
            let count = 0;
            for (let i = 0; i < swiperIndex; i++) {
                if (!isVideo(images[i])) count++;
            }
            return count;
        },
        [images]
    );

    const openLightbox = (swiperIndex: number) => {
        if (isVideo(images[swiperIndex])) return; // videos don't open lightbox
        setLightboxIndex(getLightboxIndex(swiperIndex));
        setLightboxOpen(true);
    };

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
                        <div
                            className={`relative w-full h-full ${!isVideo(media) ? "cursor-zoom-in" : ""}`}
                            onClick={() => openLightbox(index)}
                        >
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
                                <>
                                    <Image
                                        src={media}
                                        alt={`${productTitle} - Image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        priority={index === 0}
                                    />
                                    {/* Zoom hint on first image */}
                                    {index === 0 && (
                                        <div className="absolute bottom-3 right-3 bg-black/40 text-white text-[9px] font-mono px-2 py-1 rounded-full pointer-events-none select-none backdrop-blur-sm">
                                            tap to zoom
                                        </div>
                                    )}
                                </>
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

            {/* Lightbox */}
            {imageSlides.length > 0 && (
                <Lightbox
                    open={lightboxOpen}
                    close={() => setLightboxOpen(false)}
                    index={lightboxIndex}
                    slides={imageSlides}
                    plugins={[Zoom, Thumbnails]}
                    zoom={{
                        maxZoomPixelRatio: 4,
                        zoomInMultiplier: 2,
                        doubleTapDelay: 300,
                        doubleClickDelay: 300,
                        keyboardMoveDistance: 50,
                        wheelZoomDistanceFactor: 100,
                        pinchZoomDistanceFactor: 100,
                        scrollToZoom: true,
                    }}
                    thumbnails={{
                        position: "bottom",
                        width: 80,
                        height: 60,
                        border: 1,
                        borderRadius: 4,
                        gap: 8,
                    }}
                    styles={{
                        container: { backgroundColor: "rgba(0,0,0,0.92)" },
                    }}
                    carousel={{ finite: false }}
                />
            )}
        </div>
    );
};
