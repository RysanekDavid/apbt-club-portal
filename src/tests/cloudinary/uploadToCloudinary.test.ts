import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import axios from "axios";

// Mock axios
vi.mock("axios");
const mockedAxios = vi.mocked(axios, true);

// Mock console
let consoleErrorSpy: any;

beforeEach(() => {
  // Mock environment variables
  vi.stubEnv("VITE_CLOUDINARY_CLOUD_NAME", "test-cloud");
  vi.stubEnv("VITE_CLOUDINARY_UPLOAD_PRESET", "test-preset");
  vi.resetModules(); // Reset modules to ensure they use the stubbed env vars

  // Set up spies AFTER resetting modules and stubbing env
  consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe("uploadToCloudinary", () => {
  // Dynamically import the function here to ensure mocks are applied
  let uploadToCloudinary: typeof import("../../services/cloudinary").uploadToCloudinary;

  beforeEach(async () => {
    const cloudinaryModule = await import("../../services/cloudinary");
    uploadToCloudinary = cloudinaryModule.uploadToCloudinary;
  });

  const mockFile = new File(["dummy content"], "test.png", {
    type: "image/png",
  });
  const mockResponse = {
    data: {
      secure_url:
        "https://res.cloudinary.com/test-cloud/image/upload/v123/folder/test.png",
      public_id: "folder/test",
    },
  };

  it("should upload a file successfully without a folder", async () => {
    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    const result = await uploadToCloudinary(mockFile);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "https://api.cloudinary.com/v1_1/test-cloud/upload",
      expect.any(FormData),
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    const formData = mockedAxios.post.mock.calls[0][1] as FormData;
    expect(formData.has("file")).toBe(true);
    expect(formData.get("file")).toEqual(mockFile);
    expect(formData.get("upload_preset")).toBe("test-preset");
    expect(formData.has("folder")).toBe(false);

    expect(result).toEqual({
      url: mockResponse.data.secure_url,
      publicId: mockResponse.data.public_id,
      fileName: mockFile.name,
    });
  });

  it("should upload a file successfully with a folder", async () => {
    mockedAxios.post.mockResolvedValueOnce(mockResponse);
    const folderName = "test-folder";

    const result = await uploadToCloudinary(mockFile, folderName);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "https://api.cloudinary.com/v1_1/test-cloud/upload",
      expect.any(FormData),
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    const formData = mockedAxios.post.mock.calls[0][1] as FormData;
    expect(formData.has("file")).toBe(true);
    expect(formData.get("file")).toEqual(mockFile);
    expect(formData.get("upload_preset")).toBe("test-preset");
    expect(formData.get("folder")).toBe(folderName);

    expect(result).toEqual({
      url: mockResponse.data.secure_url,
      publicId: mockResponse.data.public_id,
      fileName: mockFile.name,
    });
  });

  it("should throw an error if upload fails", async () => {
    const errorMessage = "Upload failed";
    mockedAxios.post.mockRejectedValueOnce(new Error(errorMessage));

    await expect(uploadToCloudinary(mockFile)).rejects.toThrow(
      "Failed to upload file to Cloudinary"
    );
    // Check if consoleErrorSpy was called AFTER the promise rejection is handled
    await vi.waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error uploading to Cloudinary:",
        expect.any(Error)
      );
    });
  });
});
