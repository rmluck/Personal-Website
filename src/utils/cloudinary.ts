import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { v2 as cloudinary } from "cloudinary";

// Ensure environment variables are set
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

// Throw error if any required env vars are missing
if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary environment variables are not set properly.");
}

cloudinary.config({
    cloud_name: cloudName!,
    api_key: apiKey!,
    api_secret: apiSecret!,
    secure: true,
});

// Preset transformations for different use cases
export const cloudinaryPresets = {
    grid: { width: 720, height: 480, crop: "fill", },
    modal: { width: 2560, crop: "fit", },
    carousel: { width: 180, height: 120, crop: "fill", },
    original: { width: 2560, crop: "fit", },
};

// Function to fetch photos from a specific folder in Cloudinary
export async function getPhotos(folderPath: string = "") {
    const resources: any[] = [];
    let nextCursor: string | undefined;

    do {
        const response = await cloudinary.api.resources({
            type: "upload",
            prefix: folderPath,
            max_results: 400,
            next_cursor: nextCursor,
            tags: true,
            context: true,
        });
        resources.push(...(response.resources || []));
        nextCursor = response.next_cursor;
    } while (nextCursor);

    return resources;
}

// Function to build a Cloudinary image URL with specified transformations
export function buildPhotoUrl(
    publicId: string,
    options: { width?: number; height?: number; crop?: string; quality?: string; format?: string; } = {}
) {
    const {
        width,
        height,
        crop = "fill",
        quality = "auto",
        format = "auto",
    } = options;
    const transforms = [];

    if (width) transforms.push(`w_${width}`);
    if (height) transforms.push(`h_${height}`);
    transforms.push(`c_${crop}`, `q_${quality}`, `f_${format}`);

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;

    if (!cloudName) {
        throw new Error("CLOUDINARY_CLOUD_NAME is not defined");
    }

    return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms.join(",")}/${publicId}`;
}