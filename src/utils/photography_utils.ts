import { createGlobalState } from "react-hooks-global-state";
import { useEffect } from "react";

const initialState = { photoToScrollTo: null };
const { useGlobalState } = createGlobalState(initialState);

export const useLastViewedPhoto = () => {
    return useGlobalState("photoToScrollTo");
};

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

export const range = (start: number, end: number) => {
    let output = [];
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

function forceDownload(blobUrl: string, filename: string) {
    let a: any = document.createElement("a");
    a.download = filename;
    a.href = blobUrl;
    document.body.appendChild(a);
    a.click();
    a.remove();
};

export function downloadPhoto(url: string, filename: string) {
    if (!filename) filename = url.split("\\").pop()?.split("/").pop();
    fetch(url, {
        headers: new Headers({
            Origin: location.origin,
        }),
        mode: "cors",
    })
        .then((response) => response.blob())
        .then((blob) => {
            let blobUrl = window.URL.createObjectURL(blob);
            forceDownload(blobUrl, filename);
        })
        .catch((e) => console.error(e));
};

export function useKeyPress(keys: string[], callback: (key: string) => void) {
    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if (keys.includes(event.key)) callback(event.key);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [keys, callback]);
}