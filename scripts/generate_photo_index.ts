import fs from "fs";
import path from "path";
import { getPhotos, buildPhotoUrl, cloudinaryPresets } from "../src/utils/cloudinary.ts";
import sharp from "sharp";

async function generatePhotoIndex() {
    console.log("Fetching photos from Cloudinary...");

    const allPhotos = await getPhotos("");

    console.log(`Fetched ${allPhotos.length} photos.`);

    const photos = allPhotos.filter(photo => {
        const context = photo.context.custom || {};
        const isPrivate = context["private"] && context["private"] === "true";

        if (isPrivate) {
            console.log(`Skipping private photo: ${photo.public_id}`);
        }

        return !isPrivate;
    });

    console.log(`Processing ${photos.length} public photos...`);

    const photoData = await Promise.all(
        photos.map(async (photo: any, index: number) => {
            const publicId = photo.public_id;
            const format = photo.format;

            const urls = {
                grid: buildPhotoUrl(publicId, { ...cloudinaryPresets.grid }),
                modal: buildPhotoUrl(publicId, { ...cloudinaryPresets.modal }),
                carousel: buildPhotoUrl(publicId, { ...cloudinaryPresets.carousel }),
                original: buildPhotoUrl(publicId, { ...cloudinaryPresets.original }),
            };

            const smallUrl = buildPhotoUrl(publicId, { width: 16, height: 10, });
            const response = await fetch(smallUrl);
            const buffer = Buffer.from(await response.arrayBuffer());
            const blur = await sharp(buffer).resize(16).blur().toBuffer();
            const blurBase64 = `data:image/jpeg;base64,${blur.toString("base64")}`;

            return {
                id: index,
                publicId: publicId,
                format,
                width: photo.width,
                height: photo.height,
                urls,
                blurDataUrl: blurBase64,
                created_at: photo.created_at,
                tags: photo.tags || [],
                context: photo.context || {},
            };
        })
    );

    const outputPath = path.join(process.cwd(), "public/data/photos.json");
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(photoData, null, 2));

    console.log(`Photo index generated at ${outputPath}`);
}

generatePhotoIndex().catch((error) => {
    console.error("Error generating photo index:", error);
    process.exit(1);
});