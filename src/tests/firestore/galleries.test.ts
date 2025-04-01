import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import {
  collection,
  query,
  getDocs,
  Timestamp,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import {
  getPublishedGalleries,
  getGalleryImages,
} from "../../services/firestore"; // Import only gallery functions

// --- Mock Firebase Firestore ---
vi.mock("firebase/firestore", async (importOriginal) => {
  // Define MockTimestamp class INSIDE the factory
  class MockTimestamp {
    _date: Date;
    constructor(seconds: number, nanoseconds: number) {
      this._date = new Date(seconds * 1000 + nanoseconds / 1e6);
    }
    toDate() {
      return this._date;
    }
    isEqual(other: MockTimestamp) {
      return this._date.getTime() === other.toDate().getTime();
    }
    readonly seconds: number = 0;
    readonly nanoseconds: number = 0;
    valueOf(): string {
      return this._date.getTime().toString();
    }
    toJSON(): object {
      return { seconds: this.seconds, nanoseconds: this.nanoseconds };
    }
    toString(): string {
      return `MockTimestamp(seconds=${this.seconds}, nanoseconds=${this.nanoseconds})`;
    }
    _compareTo(other: MockTimestamp): number {
      return this._date.getTime() - other.toDate().getTime();
    }
    static now() {
      const now = new Date();
      return new MockTimestamp(
        Math.floor(now.getTime() / 1000),
        (now.getTime() % 1000) * 1e6
      );
    }
    static fromDate(date: Date) {
      return new MockTimestamp(
        Math.floor(date.getTime() / 1000),
        (date.getTime() % 1000) * 1e6
      );
    }
  }
  const original = await importOriginal<typeof import("firebase/firestore")>();
  return {
    ...original,
    collection: vi.fn(),
    query: vi.fn(),
    where: vi.fn((field, op, value) => ({ field, op, value, type: "where" })),
    orderBy: vi.fn((field, dir) => ({ field, dir, type: "orderBy" })),
    getDocs: vi.fn(),
    Timestamp: MockTimestamp,
  };
});

// --- Helper to create mock Firestore Timestamp ---
const createMockTimestamp = (date: Date): Timestamp => {
  const seconds = Math.floor(date.getTime() / 1000);
  const nanoseconds = (date.getTime() % 1000) * 1e6;
  return new (Timestamp as any)(seconds, nanoseconds) as Timestamp;
};

// --- Type Casting for Mocks ---
const mockCollection = collection as Mock;
const mockQuery = query as Mock;
const mockGetDocs = getDocs as Mock;

// --- Reset Mocks Before Each Test ---
beforeEach(() => {
  vi.clearAllMocks();
  mockQuery.mockImplementation((_collRef, ...constraints) => ({
    _collRef,
    constraints: constraints,
    type: "query",
  }));
  mockCollection.mockImplementation((_db, path) => ({
    _db,
    path,
    type: "collRef",
  }));
});

// --- Test Suites ---
describe("Firestore Galleries Service", () => {
  describe("getPublishedGalleries", () => {
    it("should return published galleries ordered by date descending", async () => {
      const date1 = new Date(2024, 1, 1);
      const date2 = new Date(2024, 0, 1); // Earlier date
      const mockDocs = [
        // Firestore returns ordered by date desc
        {
          id: "gal1",
          data: () => ({
            name: "Gallery 1",
            date: createMockTimestamp(date1),
            published: true,
            coverImageUrl: "url1",
          }),
        },
        {
          id: "gal2",
          data: () => ({
            name: "Gallery 2",
            date: createMockTimestamp(date2),
            published: true,
            coverImageUrl: "url2",
          }),
        },
      ];
      const mockQuerySnapshot = { docs: mockDocs } as unknown as QuerySnapshot;
      mockGetDocs.mockResolvedValue(mockQuerySnapshot);

      const result = await getPublishedGalleries();

      expect(mockCollection).toHaveBeenCalledWith(db, "gallery");
      expect(mockQuery).toHaveBeenCalledWith(
        expect.objectContaining({ path: "gallery" }),
        expect.objectContaining({ field: "published", op: "==", value: true }),
        expect.objectContaining({ field: "date", dir: "desc" })
      );
      expect(mockGetDocs).toHaveBeenCalledWith(
        expect.objectContaining({ type: "query" })
      );
      expect(result).toEqual([
        {
          id: "gal1",
          name: "Gallery 1",
          date: date1,
          published: true,
          coverImageUrl: "url1",
        },
        {
          id: "gal2",
          name: "Gallery 2",
          date: date2,
          published: true,
          coverImageUrl: "url2",
        },
      ]);
    });
  });

  describe("getGalleryImages", () => {
    it("should return images for a specific gallery ordered by 'order'", async () => {
      const galleryId = "gal1";
      const mockDocs = [
        {
          id: "img1",
          data: () => ({ galleryId: galleryId, imageUrl: "urlA", order: 1 }),
        },
        {
          id: "img2",
          data: () => ({ galleryId: galleryId, imageUrl: "urlB", order: 2 }),
        },
      ];
      const mockQuerySnapshot = { docs: mockDocs } as unknown as QuerySnapshot;
      mockGetDocs.mockResolvedValue(mockQuerySnapshot);

      const result = await getGalleryImages(galleryId);

      expect(mockCollection).toHaveBeenCalledWith(db, "galleryImages");
      expect(mockQuery).toHaveBeenCalledWith(
        expect.objectContaining({ path: "galleryImages" }),
        expect.objectContaining({
          field: "galleryId",
          op: "==",
          value: galleryId,
        }),
        expect.objectContaining({ field: "order", dir: "asc" })
      );
      expect(mockGetDocs).toHaveBeenCalledWith(
        expect.objectContaining({ type: "query" })
      );
      // Note: getGalleryImages doesn't convert timestamps in the provided code
      expect(result).toEqual([
        { id: "img1", galleryId: galleryId, imageUrl: "urlA", order: 1 },
        { id: "img2", galleryId: galleryId, imageUrl: "urlB", order: 2 },
      ]);
    });
  });
});
