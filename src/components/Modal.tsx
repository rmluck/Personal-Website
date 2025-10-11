import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import type { ImageProps } from "@/utils/photography_utils";
import { useKeyPress } from "@/utils/photography_utils"
import SharedModal from "./SharedModal";

export default function Modal({
    images,
    onClose,
}: {
    images: ImageProps[];
    onClose?: () => void;
}) {
    let overlayRef = useRef(null);
    const router = useRouter();

    const searchParams = useSearchParams();
    const photoId = searchParams.get("photoId");
    const initialIndex = images.findIndex((img) => String(img.id) === String(photoId));
    const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
    const [direction, setDirection] = useState(0);

    function handleClose() {
        router.push("/photography", undefined, { shallow: true });
        if (onClose) onClose();
    }

    function changePhotoId(newIndex: number) {
        if (newIndex < 0 || newIndex >= images.length) return;

        const nextPhoto = images[newIndex];
        if (!nextPhoto) return;

        setDirection(newIndex > currentIndex ? 1 : -1);
        setCurrentIndex(newIndex);
        router.push(`?photoId=${nextPhoto.id}`, { shallow: true });
    }

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

    useEffect(() => {
        document.body.classList.add("modal-open");

        return () => {
            document.body.classList.remove("modal-open");
        };
    }, []);

    return (
        <Dialog
            static
            open={true}
            onClose={handleClose}
            initialFocus={overlayRef}
            className="fixed inset-0 z-10 flex items-center justify-center"
        >
            <motion.div 
                ref={overlayRef}
                key="backdrop"
                className="fixed inset-0 z-30 bg-pro200/40 dark:bg-pro900/70 backdrop-blur-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={handleClose}
                aria-hidden="true"
            />
            <Dialog.Panel>
                <SharedModal 
                    index={currentIndex}
                    direction={direction}
                    images={images}
                    currentPhoto={images[currentIndex]}
                    changePhotoId={changePhotoId}
                    closeModal={handleClose}
                    navigation={true}
                />
            </Dialog.Panel>
        </Dialog>
    );
}