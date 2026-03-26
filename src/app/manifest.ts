import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Brahmi",
        short_name: "Brahmi",
        description: "For Culture, Of Culture",
        start_url: "/",
        display: "standalone",
        background_color: "#f5f0eb",
        theme_color: "#f5f0eb",
        icons: [
            {
                src: "/icons/icon-192.png",
                sizes: "192x192",
                type: "image/png",
            },
        ],
    };
}
