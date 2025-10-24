import Image from "next/image";
import Loading from "@/components/Loading";
import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { Download, ExternalLink, Undo2, ChevronLeft, ChevronRight, X, Info } from "lucide-react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { variants, range, downloadPhoto } from "@/utils/photography_utils";
import type { ImageProps, SharedModalProps } from "@/utils/photography_utils";

export default function SharedModal({
    index,
    images,
    changePhotoId,
    closeModal,
    navigation,
    currentPhoto,
    direction,
}: SharedModalProps) {
    const [loaded, setLoaded] = useState(false);
    const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
    const [showInfo, setShowInfo] = useState(false);
    const [isClosingPanel, setIsClosingPanel] = useState(false);
    const currentImage = currentPhoto || images[index];
    const isPortrait = currentImage.height > currentImage.width;

    // Filter images to only those within 15 indices of the current index
    const filteredImages = images.filter((img: ImageProps, i: number) => 
        range(Math.max(0, index - 15), Math.min(images.length, index + 16)).includes(i)
    );

    // Swipe Handlers
    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (index < images.length - 1) {
                changePhotoId(index + 1);
            }
        },
        onSwipedRight: () => {
            if (index > 0) {
                changePhotoId(index - 1);
            }
        },
        trackMouse: true,
    });

    // Function to handle closing the info panel with animation
    const handleClosePanel = () => {
        setIsClosingPanel(true);
        setTimeout(() => {
            setShowInfo(false);
            setIsClosingPanel(false);
        }, 300);
    };

    // Function to get formatted image location
    function getImageLocation(image: ImageProps) {
        const city = image.context?.custom?.city || "";
        const state = image.context?.custom?.state || "";
        const country = image.context?.custom?.country || "";

        const locationParts = [];
        if (city) locationParts.push(city);
        if (state) locationParts.push(state);
        if (country && country !== "United States") locationParts.push(country);
        return locationParts.join(", ");
    }

    // Reset loaded state when index changes
    useEffect(() => {
        setLoaded(false);
    }, [index]);

    return (
        <MotionConfig
            transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
            }}
        >
            <div
                className="flex items-center justify-center relative z-50 h-full w-full"
                {...handlers}
            >
                {/* Main Image Container */}
                <motion.div
                    className={`
                        flex items-center justify-center
                        relative h-full max-w-7xl
                        transition-all duration-300
                    `}
                    animate={{
                        width: showInfo && !isClosingPanel ? "calc(100% - 320px)" : "100%",
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        delay: isClosingPanel ? 0 : showInfo ? 0.1 : 0,
                    }}
                >
                    <div className="flex items-center justify-center relative w-full h-[calc(100vh)]">
                        {!loaded && (
                            <div className="absolute inset-0 z-30">
                                <Loading />
                            </div>
                        )}

                        {/* Main Image */}
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={index}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="flex items-center justify-center w-full h-full"
                            >
                                <Image 
                                    ref={setImageRef}
                                    src={currentImage.urls.modal}
                                    width={currentImage.width}
                                    height={currentImage.height}
                                    priority
                                    alt={currentImage.context?.custom?.alt || ""}
                                    onLoad={() => setLoaded(true)}
                                    className={isPortrait ? "max-w-full max-h-full object-contain" : "w-full h-full object-cover"}
                                    style={isPortrait ? {
                                        width: "auto",
                                        height: "auto",
                                    } : {
                                        width: "100%",
                                        height: "100%",
                                    }}
                                />

                                {/* Top Left & Right Controls */}
                                {loaded && (
                                    <>
                                        <div className="absolute top-3 left-3 z-50 flex items-center gap-2">
                                            <button
                                                onClick={() => closeModal()}
                                                className={`
                                                    p-2
                                                    bg-pro200/50 dark:bg-pro900/50
                                                    backdrop-blur-xl 
                                                    border-2 border-transparent  
                                                    rounded-full
                                                    text-pro900/75 dark:text-pro200/75
                                                    transition
                                                    hover:bg-accent/30 hover:border-accent
                                                    hover:text-accent focus:outline-none 
                                                    cursor-hover cursor-none clickable
                                                `}
                                            >
                                                {navigation ? (
                                                    <X className="h-5 w-5" />
                                                ) : (
                                                    <Undo2 className="h-5 w-5" />
                                                )}
                                            </button>
                                        </div>

                                        <div className="absolute top-3 right-3 z-50 flex items-center gap-2">
                                            <button
                                                onClick={() => setShowInfo(!showInfo)}
                                                className={`
                                                    p-2
                                                    backdrop-blur-xl
                                                    border-2 border-transparent
                                                    rounded-full
                                                    transition focus:outline-none cursor-hover cursor-none clickable
                                                    ${showInfo ? "bg-accent/30 text-accent border-accent" : "bg-pro200/50 dark:bg-pro900/50 text-pro900/75 dark:text-pro200/75 hover:bg-accent/30 hover:text-accent hover:border-accent"}
                                                `}
                                                title="Image context"
                                            >
                                                <Info className="h-5 w-5" />
                                            </button>

                                            <a
                                                href={currentImage.urls.original}
                                                className={`
                                                    p-2
                                                    bg-pro200/50 dark:bg-pro900/50
                                                    backdrop-blur-xl
                                                    border-2 border-transparent
                                                    rounded-full
                                                    text-pro900/75 dark:text-pro200/75 
                                                    hover:bg-accent/30 hover:border-accent
                                                    hover:text-accent
                                                    transition focus:outline-none 
                                                    cursor-hover cursor-none clickable
                                                `}
                                                target="_blank"
                                                title="Open fullsize version"
                                                rel="noreferrer"
                                            >
                                                <ExternalLink className="h-5 w-5" />
                                            </a>

                                            <button
                                                onClick={() => downloadPhoto(currentImage.urls.original, currentImage.publicId)}
                                                className={`
                                                    p-2
                                                    bg-pro200/50 dark:bg-pro900/50
                                                    backdrop-blur-xl
                                                    border-2 border-transparent
                                                    rounded-full
                                                    text-pro900/75 dark:text-pro200/75 
                                                    hover:bg-accent/30 hover:border-accent
                                                    hover:text-accent
                                                    transition focus:outline-none 
                                                    cursor-hover cursor-none clickable`}
                                                title="Download photo"
                                            >
                                                <Download className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Controls Overlay */}
                    {loaded && (
                        <>
                            {navigation && (
                                <>
                                    {index > 0 && (
                                        <button
                                            className="absolute left-3 top-1/2 -translate-y-1/2 z-50 rounded-full p-3 border-2 border-transparent backdrop-blur-xl bg-pro200/50 dark:bg-pro900/50 text-pro900/75 dark:text-pro200/75 hover:bg-accent/30 hover:text-accent hover:border-accent transition focus:outline-none cursor-hover cursor-none clickable"
                                            onClick={() => changePhotoId(index - 1)}
                                        >
                                            <ChevronLeft className="h-6 w-6" />
                                        </button>
                                    )}
                                    {index + 1 < images.length && (
                                        <button
                                            className={`
                                                absolute top-1/2 right-3
                                                -translate-y-1/2 p-3 z-50
                                                bg-pro200/50 dark:bg-pro900/50
                                                backdrop-blur-xl
                                                border-2 border-transparent
                                                rounded-full
                                                text-pro900/75 dark:text-pro200/75 
                                                hover:bg-accent/30 hover:border-accent hover:text-accent
                                                transition focus:outline-none
                                                cursor-hover cursor-none clickable 
                                            `}
                                            onClick={() => changePhotoId(index + 1)}
                                        >
                                            <ChevronRight className="h-6 w-6" />
                                        </button>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </motion.div>

                {/* Info Panel */}
                <AnimatePresence mode="wait">
                    {showInfo && loaded && (
                        <motion.div
                            initial={{ x: "100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "100%", opacity: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 40, opacity: { duration: 0.2 } }}
                            className="w-80 h-[calc(100vh)] bg-pro100/95 dark:bg-pro900/95 backdrop-blur-xl z-40 flex-shrink-0"
                        >
                            <div className="p-6 h-full overflow-y-auto">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg text-pro900 dark:text-pro100 font-regular font-semibold">
                                        Image Context
                                    </h3>
                                    <button
                                        onClick={handleClosePanel}
                                        className={`
                                            p-1 rounded-full
                                            text-pro600 dark:text-pro400
                                            transition
                                            hover:bg-pro200 dark:hover:bg-pro800 
                                            cursor-hover cursor-none clickable
                                        `}
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="space-y-4 text-sm">
                                    {currentImage.context?.custom?.caption && (
                                        <div>
                                            <p className="text-pro600 dark:text-pro400 leading-relaxed">
                                                {currentImage.context.custom.caption}
                                            </p>
                                        </div>
                                    )}

                                    <div>
                                        <h4 className="font-medium text-pro800 dark:text-pro200">Location</h4>
                                        <p className="text-pro600 dark:text-pro400 leading-relaxed">{getImageLocation(currentImage)}</p>
                                    </div>

                                    <div>
                                        <h4 className="font-medium text-pro800 dark:text-pro200 mb-2">Metadata</h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-pro600 dark:text-pro400">Dimensions</span>
                                                <span className="text-pro800 dark:text-pro200">
                                                    {currentImage.width} x {currentImage.height}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-pro600 dark:text-pro400">Format</span>
                                                <span className="text-pro800 dark:text-pro200 uppercase">
                                                    {currentImage.format}
                                                </span>
                                            </div>
                                            {currentImage.context?.custom?.date && (
                                                <div className="flex justify-between">
                                                    <span className="text-pro600 dark:text-pro400">Date</span>
                                                    <span className="text-pro800 dark:text-pro200">{new Date(currentImage.context?.custom?.date).toLocaleDateString()}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Bottom Carousel */}
                {navigation && (
                    <div 
                        className={`
                            fixed inset-x-0 bottom-0
                            z-40 overflow-hidden
                            bg-gradient-to-b from-pro200/0 to-pro200/60
                            dark:from-pro900/0 dark:to-pro900/60
                        `}
                    >
                        <motion.div
                            initial={false}
                            className="mx-auto mt-6 mb-6 flex aspect-[3/2] h-14"
                        >
                            <AnimatePresence initial={false}>
                                {filteredImages.map(({ id, context, urls }) => (
                                    <motion.button
                                        initial={{
                                            width: "0%",
                                            x: `${Math.max((index - 1) * -100, 15 * -100)}%`,
                                        }}
                                        animate={{
                                            scale: id === index ? 1.25 : 1,
                                            width: "100%",
                                            x: `${Math.max(index * -100, 15 * -100)}%`,
                                        }}
                                        exit={{ width: "0%" }}
                                        onClick={() => changePhotoId(id)}
                                        key={id}
                                        className={`${
                                            id === index
                                                ? "z-20 rounded-md shadow shadow-pro200/50 dark:shadow-pro900/50"
                                                : "z-10"
                                        } ${id === 0 ? "rounded-l-md" : ""} ${id === images.length - 1 ? "rounded-r-md" : ""} relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-none`}
                                    >
                                        <Image 
                                            alt={context?.custom?.alt || ""}
                                            width={180}
                                            height={120}
                                            className={`${id === index
                                                ? "brightness-110 hover:brightness-110"
                                                : "brightness-50 contrast-125 hover:brightness-75"
                                            } h-full transform object-cover transition cursor-hover cursor-none clickable`}
                                            src={urls.carousel}
                                        />
                                    </motion.button>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                )}
            </div>
        </MotionConfig>
    );
}