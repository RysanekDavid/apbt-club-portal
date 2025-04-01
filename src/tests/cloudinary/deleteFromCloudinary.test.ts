import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock console
let consoleLogSpy: any;
let consoleErrorSpy: any;

beforeEach(() => {
  // Set up spies
  consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  // Reset modules might not be strictly necessary here as deleteFromCloudinary doesn't use env vars directly
  // but keeping it for consistency in setup pattern if needed later.
  vi.resetModules();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("deleteFromCloudinary", () => {
  // Dynamically import the function
  let deleteFromCloudinary: typeof import("../../services/cloudinary").deleteFromCloudinary;

  beforeEach(async () => {
    const cloudinaryModule = await import("../../services/cloudinary");
    deleteFromCloudinary = cloudinaryModule.deleteFromCloudinary;
  });

  const publicId = "folder/test_id";

  it("should log the public ID to be deleted and return true", async () => {
    const result = await deleteFromCloudinary(publicId);
    // Need to wait for the next tick potentially for async console log
    await vi.waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith(
        `Would delete file with public ID: ${publicId}`
      );
    });
    expect(result).toBe(true);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it("should log error and return false if an unexpected error occurs (simulated)", async () => {
    // Simulate an error during the process (e.g., if console.log threw)
    consoleLogSpy.mockImplementationOnce(() => {
      throw new Error("Simulated error");
    });

    const result = await deleteFromCloudinary(publicId);

    // Need to wait for the next tick potentially
    await vi.waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error deleting from Cloudinary:",
        expect.any(Error)
      );
    });
    expect(result).toBe(false);
  });
});
