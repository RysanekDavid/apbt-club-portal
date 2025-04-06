import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  serverTimestamp,
  Timestamp,
  DocumentReference,
  DocumentSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import {
  getDocumentById,
  getAllDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
} from "../../services/firestore";

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
    doc: vi.fn(),
    getDoc: vi.fn(),
    getDocs: vi.fn(),
    addDoc: vi.fn(),
    updateDoc: vi.fn(),
    deleteDoc: vi.fn(),
    query: vi.fn(),
    orderBy: vi.fn((field, dir) => ({ field, dir, type: "orderBy" })),
    // Use the MockTimestamp defined within this factory scope
    serverTimestamp: vi.fn(() => MockTimestamp.now()),
    Timestamp: MockTimestamp,
  };
});

// --- Helper to create mock Firestore Timestamp ---
const createMockTimestamp = (date: Date): Timestamp => {
  const seconds = Math.floor(date.getTime() / 1000);
  const nanoseconds = (date.getTime() % 1000) * 1e6;
  // We need to access the mocked Timestamp constructor via the mocked module
  // This requires a slightly more complex setup or potentially adjusting the mock structure.
  // For simplicity now, we'll assume the cast works, but this might be fragile.
  // A better approach might involve importing the mocked Timestamp explicitly if possible.
  return new (Timestamp as any)(seconds, nanoseconds) as Timestamp;
};

// --- Type Casting for Mocks ---
// Casts are needed because vi.mocked doesn't automatically type the mocked module structure perfectly
const mockCollection = collection as Mock;
const mockDoc = doc as Mock;
const mockGetDoc = getDoc as Mock;
const mockGetDocs = getDocs as Mock;
const mockAddDoc = addDoc as Mock;
const mockUpdateDoc = updateDoc as Mock;
const mockDeleteDoc = deleteDoc as Mock;
const mockQuery = query as Mock;
const mockServerTimestamp = serverTimestamp as Mock;

// --- Reset Mocks Before Each Test ---
beforeEach(() => {
  vi.clearAllMocks();
  // Re-mock implementation for serverTimestamp if needed, accessing the mocked class
  // This assumes the mock structure allows accessing MockTimestamp.now() this way
  mockServerTimestamp.mockImplementation(() => (Timestamp as any).now());
  mockQuery.mockImplementation((_collRef, ...constraints) => ({
    _collRef,
    constraints: constraints,
    type: "query",
  }));
  mockDoc.mockImplementation((_db, path, id) => ({
    _db,
    path,
    id,
    type: "docRef",
  }));
  mockCollection.mockImplementation((_db, path) => ({
    _db,
    path,
    type: "collRef",
  }));
});

// --- Test Suites ---
describe("Firestore Generic CRUD Service", () => {
  const collectionName = "testCollection";
  const docId = "testDocId";

  describe("getDocumentById", () => {
    it("should return a document when it exists", async () => {
      const mockDate = new Date(2024, 0, 1);
      const mockTimestamp = createMockTimestamp(mockDate);
      const mockData = {
        name: "Test Item",
        value: 123,
        date: mockTimestamp, // Use the created mock timestamp
      };
      const mockDocSnap = {
        exists: () => true,
        data: () => mockData,
        id: docId,
      } as unknown as DocumentSnapshot;
      mockGetDoc.mockResolvedValue(mockDocSnap);

      const result = await getDocumentById<{
        id: string;
        name: string;
        value: number;
        date: Date; // Expecting Date after conversion
      }>(collectionName, docId);

      expect(mockDoc).toHaveBeenCalledWith(db, collectionName, docId);
      expect(mockGetDoc).toHaveBeenCalledWith(
        expect.objectContaining({ id: docId })
      );
      // The convertTimestampToDate function inside getDocumentById should convert the mockTimestamp
      expect(result).toEqual({
        id: docId,
        name: "Test Item",
        value: 123,
        date: mockDate, // Expect the original Date object
      });
    });

    it("should throw an error if document does not exist", async () => {
      const mockDocSnap = {
        exists: () => false,
        id: docId,
      } as unknown as DocumentSnapshot;
      mockGetDoc.mockResolvedValue(mockDocSnap);

      await expect(getDocumentById(collectionName, docId)).rejects.toThrow(
        `Document not found in ${collectionName} with ID: ${docId}`
      );
    });
  });

  describe("getAllDocuments", () => {
    it("should return all documents from a collection with default order", async () => {
      const date1 = new Date(2024, 0, 1);
      const date2 = new Date(2024, 0, 2);
      const mockDocs = [
        {
          id: "doc1",
          data: () => ({
            name: "Item 1",
            createdAt: createMockTimestamp(date1),
          }),
        },
        {
          id: "doc2",
          data: () => ({
            name: "Item 2",
            createdAt: createMockTimestamp(date2),
          }),
        },
      ];
      const mockQuerySnapshot = { docs: mockDocs } as unknown as QuerySnapshot;
      mockGetDocs.mockResolvedValue(mockQuerySnapshot);

      const result = await getAllDocuments<{
        id: string;
        name: string;
        createdAt: Date; // Expecting Date
      }>(collectionName);

      expect(mockCollection).toHaveBeenCalledWith(db, collectionName);
      expect(mockQuery).toHaveBeenCalledWith(
        expect.objectContaining({ path: collectionName }),
        expect.objectContaining({
          field: "createdAt",
          dir: "desc",
          type: "orderBy",
        })
      );
      expect(mockGetDocs).toHaveBeenCalledWith(
        expect.objectContaining({ type: "query" })
      );
      expect(result).toEqual([
        { id: "doc1", name: "Item 1", createdAt: date1 }, // Expect Date
        { id: "doc2", name: "Item 2", createdAt: date2 }, // Expect Date
      ]);
    });

    it("should return all documents with specified order", async () => {
      const date1 = new Date(2024, 0, 1);
      const date2 = new Date(2024, 0, 2);
      const mockDocs = [
        {
          id: "doc2",
          data: () => ({ name: "Apple", modified: createMockTimestamp(date2) }),
        },
        {
          id: "doc1",
          data: () => ({
            name: "Banana",
            modified: createMockTimestamp(date1),
          }),
        },
      ];
      const mockQuerySnapshot = { docs: mockDocs } as unknown as QuerySnapshot;
      mockGetDocs.mockResolvedValue(mockQuerySnapshot);

      const result = await getAllDocuments<{
        id: string;
        name: string;
        modified: Date; // Expecting Date
      }>(collectionName, "name", "asc");

      expect(mockQuery).toHaveBeenCalledWith(
        expect.objectContaining({ path: collectionName }),
        expect.objectContaining({ field: "name", dir: "asc", type: "orderBy" })
      );
      expect(result).toEqual([
        { id: "doc2", name: "Apple", modified: date2 }, // Expect Date
        { id: "doc1", name: "Banana", modified: date1 }, // Expect Date
      ]);
    });
  });

  describe("addDocument", () => {
    it("should add a document with server timestamps", async () => {
      const inputData = { name: "New Item", value: 456 };
      const mockDocRef = { id: "newDocId" } as DocumentReference;
      mockAddDoc.mockResolvedValue(mockDocRef);
      // Use the mocked serverTimestamp function which returns a MockTimestamp instance
      const mockTimestamp = (Timestamp as any).now();

      const resultId = await addDocument(collectionName, inputData);

      expect(mockCollection).toHaveBeenCalledWith(db, collectionName);
      expect(mockAddDoc).toHaveBeenCalledWith(
        expect.objectContaining({ path: collectionName }),
        {
          ...inputData,
          createdAt: mockTimestamp, // Expect the mock timestamp object
          updatedAt: mockTimestamp, // Expect the mock timestamp object
        }
      );
      expect(resultId).toBe("newDocId");
    });
  });

  describe("updateDocument", () => {
    it("should update a document with server timestamp", async () => {
      const updateData = { value: 789 };
      const mockTimestamp = (Timestamp as any).now();
      // Ensure the mock implementation is set correctly before the call
      mockServerTimestamp.mockImplementation(() => mockTimestamp);

      await updateDocument(collectionName, docId, updateData);

      expect(mockDoc).toHaveBeenCalledWith(db, collectionName, docId);
      expect(mockUpdateDoc).toHaveBeenCalledWith(
        expect.objectContaining({ id: docId }),
        {
          ...updateData,
          updatedAt: mockTimestamp, // Expect the mock timestamp object
        }
      );
    });
  });

  describe("deleteDocument", () => {
    it("should delete a document", async () => {
      await deleteDocument(collectionName, docId);

      expect(mockDoc).toHaveBeenCalledWith(db, collectionName, docId);
      expect(mockDeleteDoc).toHaveBeenCalledWith(
        expect.objectContaining({ id: docId })
      );
    });
  });
});
