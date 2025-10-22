"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useLastViewedPhoto } from "@/utils/photography_utils";
import type { ImageProps } from "@/utils/photography_utils";
import Modal from "@/components/Modal";
import photos from "../../../public/data/photos.json";

export default function Photography() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const photoId = searchParams.get("photoId");
    const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

    const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        if (lastViewedPhoto && !photoId) {
            lastViewedPhotoRef.current?.scrollIntoView({ block: "center" });
            setLastViewedPhoto(null);
        }
    }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

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

    return (
        <div className="flex flex-col min-h-screen no-snap">
            <Navbar items={[]} />

            <main className="flex-1">
                <section className="px-6 sm:px-12 pb-8 mx-12 mb-0">
                    <div className="mb-10 mt-10">
                        <h2
                            className="text-5xl text-pro900 dark:text-pro200 font-heading font-bold whitespace-nowrap text-center"
                            style={{ textShadow: "3px 3px 0 var(--accent)" }}
                        >
                            PHOTOGRAPHY
                        </h2>
                    </div>

                    <div className="w-full">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {images.map((image) => (
                                <Link
                                    key={image.id}
                                    href={`/photography?photoId=${image.id}`}
                                    ref={image.id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
                                    shallow
                                    className="after:content group relative block w-full cursor-none cursor-hover clickable after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight overflow-hidden"
                                >
                                    <Image 
                                        src={image.urls.grid}
                                        alt={image.context?.custom?.alt || ""}
                                        className="transform rounded-lg brightness-90 transition duration-200 will-change-auto group-hover:brightness-110"
                                        style={{ transform: "translate3d(0, 0, 0)" }}
                                        placeholder="blur"
                                        blurDataURL={image.blurDataUrl}
                                        width={720}
                                        height={480}
                                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
                                    />

                                    {image.context?.custom?.alt && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-pro200/70 dark:bg-pro900/70 translate-y-full group-hover:translate-y-0 transition-transform duration-500 p-4 rounded-b-lg">
                                            <p className="text-pro900 dark:text-pro200 text-xs font-text">
                                                {image.context.custom.alt}
                                            </p>
                                        </div>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {photoId && (
                    <Modal 
                        images={images}
                        onClose={() => {
                            setLastViewedPhoto(photoId);
                        }}
                    />
                )}

                {/* <AnimatePresence>
                    {selectedPhoto && (
                        <motion.div
                            className="fixed inset-0 z-50 backdrop-blur-xl flex flex-col items-center justify-center overflow-auto m-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                        >
                            <motion.div className="relative flex flex-col w-[100vw] h-[100vh] bg-pro300/70 dark:bg-pro800/70 rounded-lg shadow-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
                                <motion.div
                                    className="relative flex justify-center items-center w-full h-[90vh] mt-8 gap-6"
                                >
                                    <button onClick={showPrev} className="absolute left-5 top-1/2 -translate-y-1/2 z-10 text-pro100 bg-black/30 hover:bg-black/50 rounded-full px-3 py-2">
                                        &#10094;
                                    </button>

                                    <Image 
                                        src={selectedPhoto.urls.modal}
                                        alt={selectedPhoto.context?.custom?.alt || ""}
                                        fill
                                        priority
                                        className="object-contain rounded-lg"
                                    />

                                    <button onClick={showNext} className="absolute right-5 top-1/2 -translate-y-1/2 z-10 text-pro100 bg-black/30 hover:bg-black/50 rounded-full px-3 py-2">
                                        &#10095;
                                    </button>

                                    <button
                                        className="absolute top-2 right-2 px-3 py-1 bg-pro300/50 dark:bg-pro700/50 text-pro900 dark:text-pro100 rounded transition duration-200 hover:bg-accent/30 hover:text-accent hover:font-bold font-regular"
                                        onClick={() => window.open(selectedPhoto.urls.original, "_blank")}
                                    >
                                        Download
                                    </button>
                                </motion.div>

                                <div className="mt-4 mb-4 flex gap-2 overflow-x-auto py-2">
                                    {photos.map((photo) => (
                                        <div key={photo.publicId} className="flex-shrink-0 cursor-hover cursor-none clickable" onClick={() => openModal(photo.publicId)}>
                                            <Image 
                                                src={photo.urls.carousel}
                                                width={180}
                                                height={120}
                                                alt={photo.context?.custom?.alt || ""}
                                                placeholder="blur"
                                                blurDataURL={photo.blurDataUrl}
                                                className={`rounded-md border-2 ${photo.publicId === selectedPhotoId ? 'border-pro500' : 'border-transparent'}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence> */}

                <section className="mt-0">
                    <Footer />
                </section>
            </main>
        </div>
    )
}