import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import {
  collection,
  query,
  getDocs,
  Timestamp,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { getPublishedDocuments } from "../../services/firestore";

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
describe("Firestore Documents Service", () => {
  describe("getPublishedDocuments", () => {
    it("should return published documents ordered by title", async () => {
      const date1 = new Date();
      const mockDocs = [
        {
          id: "docA",
          data: () => ({
            title: "Doc Alpha",
            published: true,
            fileUrl: "urlA",
            category: "cat1",
            createdAt: createMockTimestamp(date1),
          }),
        },
        {
          id: "docB",
          data: () => ({
            title: "Doc Beta",
            published: true,
            fileUrl: "urlB",
            category: "cat2",
            createdAt: createMockTimestamp(date1),
          }),
        },
      ];
      const mockQuerySnapshot = { docs: mockDocs } as unknown as QuerySnapshot;
      mockGetDocs.mockResolvedValue(mockQuerySnapshot);

      const result = await getPublishedDocuments();

      expect(mockCollection).toHaveBeenCalledWith(db, "documents");
      expect(mockQuery).toHaveBeenCalledWith(
        expect.objectContaining({ path: "documents" }),
        expect.objectContaining({ field: "published", op: "==", value: true }),
        expect.objectContaining({ field: "title", dir: "asc" })
      );
      expect(mockGetDocs).toHaveBeenCalledWith(
        expect.objectContaining({ type: "query" })
      );
      expect(result).toEqual([
        {
          id: "docA",
          title: "Doc Alpha",
          published: true,
          fileUrl: "urlA",
          category: "cat1",
          createdAt: date1,
        },
        {
          id: "docB",
          title: "Doc Beta",
          published: true,
          fileUrl: "urlB",
          category: "cat2",
          createdAt: date1,
        },
      ]);
    });
  });

  // Removed describe block for getDocumentsByCategory as the function was removed
});
