import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import {
  collection,
  query,
  getDocs,
  Timestamp, // Keep Timestamp for helper, even if not directly used in getActiveSponsors
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { getActiveSponsors } from "../../services/firestore"; // Import only sponsor function

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

// --- Helper to create mock Firestore Timestamp (might be needed if Sponsor model uses Timestamps) ---
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
describe("Firestore Sponsors Service", () => {
  describe("getActiveSponsors", () => {
    it("should return active sponsors ordered by 'order' ascending", async () => {
      // Although getActiveSponsors doesn't convert timestamps, the model might have them
      // Let's include a mock date just in case, using the helper
      const mockDate = new Date();
      const mockDocs = [
        {
          id: "sponsor1",
          data: () => ({
            name: "Sponsor A",
            active: true,
            order: 1,
            logoUrl: "url1",
            createdAt: createMockTimestamp(mockDate),
          }),
        },
        {
          id: "sponsor2",
          data: () => ({
            name: "Sponsor B",
            active: true,
            order: 2,
            logoUrl: "url2",
            createdAt: createMockTimestamp(mockDate),
          }),
        },
      ];
      const mockQuerySnapshot = { docs: mockDocs } as unknown as QuerySnapshot;
      mockGetDocs.mockResolvedValue(mockQuerySnapshot);

      const result = await getActiveSponsors();

      expect(mockCollection).toHaveBeenCalledWith(db, "sponsors");
      expect(mockQuery).toHaveBeenCalledWith(
        expect.objectContaining({ path: "sponsors" }),
        expect.objectContaining({ field: "active", op: "==", value: true }),
        expect.objectContaining({ field: "order", dir: "asc" })
      );
      expect(mockGetDocs).toHaveBeenCalledWith(
        expect.objectContaining({ type: "query" })
      );
      // The function itself doesn't convert timestamps, but the helper in the original file does.
      // We need to replicate that conversion here for the assertion.
      expect(result).toEqual([
        {
          id: "sponsor1",
          name: "Sponsor A",
          active: true,
          order: 1,
          logoUrl: "url1",
          createdAt: mockDate,
        }, // Expect Date
        {
          id: "sponsor2",
          name: "Sponsor B",
          active: true,
          order: 2,
          logoUrl: "url2",
          createdAt: mockDate,
        }, // Expect Date
      ]);
    });
  });
});
