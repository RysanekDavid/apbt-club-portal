import axios from "axios";

// Cloudinary configuration
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// Base URL for Cloudinary uploads
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;

/**
 * Uploads a file to Cloudinary
 * @param file The file to upload
 * @param folder Optional folder to upload to
 * @returns Promise with the upload result
 */
export const uploadToCloudinary = async (
  file: File,
  folder?: string
): Promise<{ url: string; publicId: string; fileName: string }> => {
  try {
    // Create form data for the upload
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    // Add folder if provided
    if (folder) {
      formData.append("folder", folder);
    }

    // Upload to Cloudinary
    const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Return the URL and public ID
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

/**
 * Deletes a file from Cloudinary
 * @param publicId The public ID of the file to delete
 * @returns Promise with the deletion result
 */
export const deleteFromCloudinary = async (
  publicId: string
): Promise<boolean> => {
  try {
    // This would typically be done through a backend API for security
    // For a complete implementation, you should create a server endpoint that handles this
    // as it requires your API secret which shouldn't be exposed in frontend code

    // For now, we'll just log the deletion request
    console.log(`Would delete file with public ID: ${publicId}`);
    return true;
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    return false;
  }
};

/**
 * Generates a Cloudinary URL with transformations
 * @param url The original Cloudinary URL
 * @param options Transformation options
 * @returns Transformed URL
 */
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

  // Extract base URL and file path
  const [baseUrl, filePath] = url.split("/upload/");

  // Build transformation string
  const transformations = [];

  if (options.width) transformations.push(`w_${options.width}`);
  if (options.height) transformations.push(`h_${options.height}`);
  if (options.crop) transformations.push(`c_${options.crop}`);
  if (options.quality) transformations.push(`q_${options.quality}`);

  const transformationString = transformations.join(",");

  // Return transformed URL
  return `${baseUrl}/upload/${transformationString}/${filePath}`;
};
