import axios from "axios";

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;

export const uploadToCloudinary = async (
  file: File,
  folder?: string
): Promise<{ url: string; publicId: string; fileName: string }> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    if (folder) {
      formData.append("folder", folder);
    }

    const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      url: response.data.secure_url,
      publicId: response.data.public_id,
      fileName: file.name,
    };
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload file to Cloudinary");
  }
};

export const deleteFromCloudinary = async (
  publicId: string
): Promise<boolean> => {
  try {
    console.log(`Would delete file with public ID: ${publicId}`);
    return true;
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    return false;
  }
};

export const getTransformedUrl = (
  url: string,
  options: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: number;
  }
): string => {
  if (!url || !url.includes("cloudinary.com")) {
    return url;
  }

  const [baseUrl, filePath] = url.split("/upload/");

  const transformations = [];

  if (options.width) transformations.push(`w_${options.width}`);
  if (options.height) transformations.push(`h_${options.height}`);
  if (options.crop) transformations.push(`c_${options.crop}`);
  if (options.quality) transformations.push(`q_${options.quality}`);

  const transformationString = transformations.join(",");

  return `${baseUrl}/upload/${transformationString}/${filePath}`;
};
