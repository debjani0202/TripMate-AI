import { Readable } from "stream";
import cloudinary from "../../config/cloudinary.js";

export const uploadProfilePhotoToCloudinary = async (
  file: Express.Multer.File,
  userId: number,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `tripmate/profile-photos/user-${userId}`,
        resource_type: "image",
        transformation: [
          {
            width: 500,
            height: 500,
            crop: "fill",
            gravity: "face",
          },
        ],
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (!result?.secure_url) {
          reject(new Error("Cloudinary did not return an image URL"));
          return;
        }

        resolve(result.secure_url);
      },
    );

    Readable.from(file.buffer).pipe(uploadStream);
  });
};