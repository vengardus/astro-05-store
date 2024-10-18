import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.CLOUDINARY_APY_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

export class ImageUpload {
    static async uploadImage(file: File) {
        const buffer = await file.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");
        const imageType = file.type.split("/")[1];  // "image/png" -> "png"

        const resp = await cloudinary.uploader.upload( 
            `data:image/${imageType};base64,${base64Image}`, 
             {
                //public_id: file.name,
                folder: "gardo-shop/products",
                //resource_type: "auto",
                overwrite: true,
                //format: imageType
            }
        );  

        return resp.secure_url;
    }
    
    static async delete(image: string) {
        try {
            const imageName = image.split("/").pop()?? "";
            const imageId = imageName.split(".")[0]?? "";

            const fullImageId = `gardo-shop/products/${imageId}`

            const resp = await cloudinary.uploader.destroy(fullImageId );
            console.log('ImageUpload destroy', resp, imageName, imageId)
            return true
        } catch (error) {
            console.log('ImageUpload destroy error', error)
        }
        return false
    }
}