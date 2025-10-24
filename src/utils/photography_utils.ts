import { createGlobalState } from "react-hooks-global-state";
import { useEffect } from "react";

// Global state to track last viewed photo
const initialState = { photoToScrollTo: null as string | null };
const { useGlobalState } = createGlobalState(initialState);

// Animation variants for photo modal transitions
export const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        };
    },
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => {
        return {
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        };
    },
};

// Custom hook to access and update the last viewed photo
export const useLastViewedPhoto = () => {
    return useGlobalState("photoToScrollTo");
};

// Utility function to create a range of numbers
export const range = (start: number, end: number) => {
    const output: number[] = [];
    if (typeof end === "undefined") {
        end = start;
        start = 0;
    }
    for (let i = start; i < end; i++) {
        output.push(i);
    }
    return output;
};

export interface ImageProps {
    id: number;
    publicId: string;
    format: string;
    width: number;
    height: number;
    urls: {
        grid: string;
        modal: string;
        carousel: string;
        original: string;
    },
    blurDataUrl: string;
    created_at: string;
    tags: string[];
    context?: {
        custom?: {
            alt?: string;
            caption?: string;
            city?: string;
            state?: string;
            country?: string;
            date?: string;
        }
    }
}

export interface SharedModalProps {
    index: number;
    images: ImageProps[];
    currentPhoto: ImageProps;
    changePhotoId: (newVal: number) => void;
    closeModal: () => void;
    navigation: boolean;
    direction?: number;
}

// Function to force download of a blob URL
function forceDownload(blobUrl: string, filename: string) {
    const a: HTMLAnchorElement = document.createElement("a");
    a.download = filename;
    a.href = blobUrl;
    document.body.appendChild(a);
    a.click();
    a.remove();
};

// Function to download a photo from a given URL
export function downloadPhoto(url: string, filename: string) {
    if (!filename) filename = url.split("\\").pop()?.split("/").pop() || "";
    fetch(url, {
        headers: new Headers({
            Origin: location.origin,
        }),
        mode: "cors",
    })
        .then((response) => response.blob())
        .then((blob) => {
            const blobUrl = window.URL.createObjectURL(blob);
            forceDownload(blobUrl, filename);
        })
        .catch((e) => console.error(e));
};

// Custom hook to handle key press events
export function useKeyPress(keys: string[], callback: (key: string) => void) {
    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if (keys.includes(event.key)) callback(event.key);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [keys, callback]);
}