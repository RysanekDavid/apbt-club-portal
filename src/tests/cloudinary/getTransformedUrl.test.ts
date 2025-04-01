import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// No need to mock axios or console for this function
// No need to mock env vars as this function doesn't use them directly

beforeEach(() => {
  // Reset modules might not be strictly necessary here either
  vi.resetModules();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("getTransformedUrl", () => {
  // Dynamically import the function
  let getTransformedUrl: typeof import("../../services/cloudinary").getTransformedUrl;

  beforeEach(async () => {
    const cloudinaryModule = await import("../../services/cloudinary");
    getTransformedUrl = cloudinaryModule.getTransformedUrl;
  });

  const originalUrl =
    "https://res.cloudinary.com/test-cloud/image/upload/v12345/folder/image.jpg";

  it("should return original URL if not a Cloudinary URL", () => {
    const nonCloudinaryUrl = "https://example.com/image.jpg";
    expect(getTransformedUrl(nonCloudinaryUrl, { width: 100 })).toBe(
      nonCloudinaryUrl
    );
  });

  it("should return original URL if URL is null or empty", () => {
    expect(getTransformedUrl("", { width: 100 })).toBe("");
    // Depending on TS config, null might not be assignable to string
    // expect(getTransformedUrl(null as any, { width: 100 })).toBe(null);
  });

  it("should apply width transformation", () => {
    const expected =
      "https://res.cloudinary.com/test-cloud/image/upload/w_300/v12345/folder/image.jpg";
    expect(getTransformedUrl(originalUrl, { width: 300 })).toBe(expected);
  });

  it("should apply height transformation", () => {
    const expected =
      "https://res.cloudinary.com/test-cloud/image/upload/h_200/v12345/folder/image.jpg";
    expect(getTransformedUrl(originalUrl, { height: 200 })).toBe(expected);
  });

  it("should apply crop transformation", () => {
    const expected =
      "https://res.cloudinary.com/test-cloud/image/upload/c_fill/v12345/folder/image.jpg";
    expect(getTransformedUrl(originalUrl, { crop: "fill" })).toBe(expected);
  });

  it("should apply quality transformation", () => {
    const expected =
      "https://res.cloudinary.com/test-cloud/image/upload/q_80/v12345/folder/image.jpg";
    expect(getTransformedUrl(originalUrl, { quality: 80 })).toBe(expected);
  });

  it("should apply multiple transformations", () => {
    const expected =
      "https://res.cloudinary.com/test-cloud/image/upload/w_400,h_300,c_limit,q_90/v12345/folder/image.jpg";
    expect(
      getTransformedUrl(originalUrl, {
        width: 400,
        height: 300,
        crop: "limit",
        quality: 90,
      })
    ).toBe(expected);
  });

  it("should handle URLs without version numbers", () => {
    const urlWithoutVersion =
      "https://res.cloudinary.com/test-cloud/image/upload/folder/image.jpg";
    const expected =
      "https://res.cloudinary.com/test-cloud/image/upload/w_100/folder/image.jpg";
    expect(getTransformedUrl(urlWithoutVersion, { width: 100 })).toBe(expected);
  });
});
