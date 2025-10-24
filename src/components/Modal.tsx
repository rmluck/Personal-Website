import SharedModal from "./SharedModal";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Dialog, DialogPanel } from "@headlessui/react";
import type { ImageProps } from "@/utils/photography_utils";
import { useKeyPress } from "@/utils/photography_utils"

export default function Modal({
    images,
    onClose,
}: {
    images: ImageProps[];
    onClose?: () => void;
}) {
    const overlayRef = useRef(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const photoId = searchParams.get("photoId");
    const initialIndex = images.findIndex((img) => String(img.id) === String(photoId));
    const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
    const [direction, setDirection] = useState(0);

    // Close modal and navigate back to photography page
    function handleClose() {
        router.push("/photography");
        if (onClose) onClose();
    }

    // Change photo based on index
    function changePhotoId(newIndex: number) {
        if (newIndex < 0 || newIndex >= images.length) return;

        const nextPhoto = images[newIndex];
        if (!nextPhoto) return;

        setDirection(newIndex > currentIndex ? 1 : -1);
        setCurrentIndex(newIndex);
        router.push(`/photography?photoId=${nextPhoto.id}`);
    }

    // Keyboard navigation
    useKeyPress(["ArrowLeft"], () => {
        if (currentIndex > 0) {
            changePhotoId(currentIndex - 1);
        }
    });
    useKeyPress(["ArrowRight"], () => {
        if (currentIndex < images.length - 1) {
            changePhotoId(currentIndex + 1);
        }
    });
    useKeyPress(["Escape"], () => {
        handleClose();
    });

    // Prevent background scrolling when modal is open
    useEffect(() => {
        document.body.classList.add("modal-open");

        return () => {
            document.body.classList.remove("modal-open");
        };
    }, []);

    return (
        <Dialog
            open={true}
            onClose={handleClose}
            className="flex items-center justify-center fixed inset-0 z-50"
        >
            {/* Backdrop Overlay */}
            <motion.div 
                ref={overlayRef}
                key="backdrop"
                className={`
                    fixed inset-0 z-30
                    bg-pro200/40 dark:bg-pro900/70
                    backdrop-blur-2xl
                `}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={handleClose}
                aria-hidden="true"
            />

            {/* Modal Panel */}
            <DialogPanel>
                <SharedModal 
                    index={currentIndex}
                    direction={direction}
                    images={images}
                    currentPhoto={images[currentIndex]}
                    changePhotoId={changePhotoId}
                    closeModal={handleClose}
                    navigation={true}
                />
            </DialogPanel>
        </Dialog>
    );
}