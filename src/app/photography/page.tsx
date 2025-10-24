"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useLastViewedPhoto } from "@/utils/photography_utils";
import type { ImageProps } from "@/utils/photography_utils";
import photos from "../../../public/data/photos.json";

export default function Photography() {
    const searchParams = useSearchParams();
    const photoId = searchParams.get("photoId");
    const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
    const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

    // Map photos data to ImageProps type
    const images: ImageProps[] = photos.map((photo) => ({
        id: photo.id,
        publicId: photo.publicId,
        format: photo.format,
        width: photo.width,
        height: photo.height,
        urls: photo.urls,
        blurDataUrl: photo.blurDataUrl,
        created_at: photo.created_at,
        tags: photo.tags || [],
        context: photo.context || {},
    }));

    // Scroll to last viewed photo when closing modal
    useEffect(() => {
        if (lastViewedPhoto && !photoId) {
            lastViewedPhotoRef.current?.scrollIntoView({ block: "center" });
            setLastViewedPhoto(null);
        }
    }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

    return (
        <div className="flex flex-col min-h-screen no-snap">
            <Navbar items={[]} />

            <main className="flex-1">
                <section className="px-6 sm:px-12 py-12 mx-4 sm:mx-18 lg:mx-24 mt-0 mb-0">
                    {/* Header */}
                    <div className="mb-6 mt-10">
                        <h2
                            className={`
                                text-4xl sm:text-5xl text-pro900 dark:text-pro200
                                font-heading font-bold
                                text-center whitespace-nowrap
                            `}
                            style={{ textShadow: "-3px 3px 0 var(--accent)" }}
                        >
                            PHOTOGRAPHY
                        </h2>
                    </div>

                    {/* Image Grid */}
                    <div className="w-full">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {images.map((image) => (
                                <Link
                                    key={image.id}
                                    href={`/photography?photoId=${image.id}`}
                                    ref={
                                        image.id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null
                                    }
                                    shallow
                                    className={`
                                        group relative block w-full overflow-hidden
                                        after:content after:absolute after:inset-0 after:pointer-events-none
                                        after:rounded-lg after:shadow-highlight
                                        cursor-none cursor-hover clickable
                                    `}
                                >
                                    <Image 
                                        src={image.urls.grid}
                                        alt={image.context?.custom?.alt || ""}
                                        className={`
                                            rounded-lg 
                                            brightness-90 group-hover:brightness-110
                                            transform transition duration-200 will-change-auto
                                        `}
                                        style={{ transform: "translate3d(0, 0, 0)" }}
                                        placeholder="blur"
                                        blurDataURL={image.blurDataUrl}
                                        width={720}
                                        height={480}
                                        sizes={`
                                            (max-width: 640px) 100vw,
                                            (max-width: 1280px) 50vw,
                                            (max-width: 1536px) 33vw,
                                            25vw`}
                                    />

                                    {/* Alt Text Overlay */}
                                    {image.context?.custom?.alt && (
                                        <div
                                            className={`
                                                absolute p-4 bottom-0 left-0 right-0
                                                bg-pro200/70 dark:bg-pro900/70 rounded-b-lg
                                                transition-transform duration-500
                                                translate-y-full group-hover:translate-y-0
                                            `}
                                        >
                                            <p className="text-xs text-pro900 dark:text-pro200 font-text">
                                                {image.context.custom.alt}
                                            </p>
                                        </div>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Modal */}
                {photoId && (
                    <Modal 
                        images={images}
                        onClose={() => {
                            setLastViewedPhoto(photoId);
                        }}
                    />
                )}

                <section className="mt-0">
                    <Footer />
                </section>
            </main>
        </div>
    )
}