import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/mockData/products";
import { ProductImageGallery } from "@/components/collections/ProductImageGallery";
import { ProductInfo } from "@/components/collections/ProductInfo";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface ProductPageProps {
    params: Promise<{
        handle: string;
    }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { handle } = await params;
    const product = getProductByHandle(handle);

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen py-6 md:py-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <Link
                    href="/collections/sutr"
                    className="inline-flex items-center gap-2 text-xs md:text-sm font-mono text-muted-foreground hover:text-foreground transition-colors mb-4 md:mb-8 cursor-pointer hover:underline underline-offset-4"
                >
                    <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
                    Back to Collection
                </Link>

                {/* Product Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                    {/* Left: Image Gallery */}
                    <div>
                        <ProductImageGallery images={product.images} productTitle={product.title} />
                    </div>

                    {/* Right: Product Info */}
                    <div>
                        <ProductInfo product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
}
