import { describe, it, expect, vi, beforeEach, Mock, afterEach } from "vitest";
import {
  collection,
  query,
  limit,
  getDocs,
  Timestamp,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { getUpcomingEvents, getPastEvents } from "../../services/firestore";

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
  // Keep track of the mock limit function to check calls later
  const mockLimitFn = vi.fn((num) => ({ num, type: "limit" })); // This represents the constraint object

  return {
    ...original,
    collection: vi.fn(),
    // query mock needs to handle both (collection, ...constraints) and (query, ...constraints)
    query: vi.fn((source, ...constraints) => {
      // Create a mock query object that includes a mock limit method
      const mockQueryObj = {
        _source: source, // Keep track of the source (collection or previous query)
        constraints: constraints,
        type: "query",
        // The limit method on the query object should return the constraint object
        limit: mockLimitFn,
      };
      // If the source is already a query object, accumulate constraints
      if (source && source.type === "query") {
        mockQueryObj.constraints = [...source.constraints, ...constraints];
        mockQueryObj._source = source._source; // Keep original source
      }
      return mockQueryObj;
    }),
    where: vi.fn((field, op, value) => ({ field, op, value, type: "where" })),
    orderBy: vi.fn((field, dir) => ({ field, dir, type: "orderBy" })),
    limit: mockLimitFn, // Export the constraint mock function as well
    getDocs: vi.fn(),
    Timestamp: MockTimestamp,
  };
});

// --- Mock Console ---
const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

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
const mockLimit = limit as Mock; // Keep reference to the constraint mock

// --- Reset Mocks Before Each Test ---
beforeEach(() => {
  vi.clearAllMocks();
  // Reset the query mock implementation for each test
  mockQuery.mockImplementation((source, ...constraints) => {
    const mockQueryObj = {
      _source: source,
      constraints: constraints,
      type: "query",
      limit: mockLimit, // Attach the constraint mock function
    };
    if (source && source.type === "query") {
      mockQueryObj.constraints = [...source.constraints, ...constraints];
      mockQueryObj._source = source._source;
    }
    return mockQueryObj;
  });
  mockCollection.mockImplementation((_db, path) => ({
    _db,
    path,
    type: "collRef",
  }));
});

afterEach(() => {
  consoleLogSpy.mockClear();
  consoleErrorSpy.mockClear();
});

// --- Test Suites ---
describe("Firestore Events Service", () => {
  describe("getUpcomingEvents", () => {
    it("should return upcoming published events ordered by date ascending", async () => {
      const now = new Date();
      const futureDate1 = new Date(now.getTime() + 86400000); // Tomorrow
      const futureDate2 = new Date(now.getTime() + 2 * 86400000); // Day after tomorrow
      const mockDocs = [
        {
          id: "event1",
          data: () => ({
            title: "Event 1",
            date: createMockTimestamp(futureDate1),
            published: true,
          }),
        },
        {
          id: "event2",
          data: () => ({
            title: "Event 2",
            date: createMockTimestamp(futureDate2),
            published: true,
          }),
        },
      ];
      const mockQuerySnapshot = { docs: mockDocs } as unknown as QuerySnapshot;
      mockGetDocs.mockResolvedValue(mockQuerySnapshot);

      const result = await getUpcomingEvents();

      expect(mockCollection).toHaveBeenCalledWith(db, "events");
      // Check the first call to query
      expect(mockQuery).toHaveBeenCalledWith(
        expect.objectContaining({ path: "events" }),
        expect.objectContaining({ field: "published", op: "==", value: true }),
        expect.objectContaining({
          field: "date",
          op: ">=",
          value: expect.any(Date),
        }),
        expect.objectContaining({ field: "date", dir: "asc" })
      );
      // getDocs should be called with the result of the first query
      expect(mockGetDocs).toHaveBeenCalledWith(
        expect.objectContaining({ type: "query" })
      );
      expect(result).toEqual([
        {
          id: "event1",
          title: "Event 1",
          date: futureDate1,
          published: true,
          isPast: false,
        },
        {
          id: "event2",
          title: "Event 2",
          date: futureDate2,
          published: true,
          isPast: false,
        },
      ]);
      expect(consoleLogSpy).toHaveBeenCalledWith("Fetching upcoming events...");
      expect(consoleLogSpy).toHaveBeenCalledWith(
        `Retrieved ${mockDocs.length} upcoming events`
      );
    });

    it("should throw specific error for missing index", async () => {
      const indexError = new Error(
        "FirebaseError: The query requires an index. You can create it here: ..."
      );
      mockGetDocs.mockRejectedValue(indexError);

      await expect(getUpcomingEvents()).rejects.toThrow(
        "Chybí index v databázi. Kontaktujte správce webu."
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error in getUpcomingEvents:",
        indexError
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Original Firestore Error (Upcoming):",
        indexError.message
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Missing index error. Please create the required index in Firebase console."
      );
    });
  });

  describe("getPastEvents", () => {
    it("should return past published events ordered by date descending", async () => {
      const now = new Date();
      const pastDate1 = new Date(now.getTime() - 86400000); // Yesterday
      const pastDate2 = new Date(now.getTime() - 2 * 86400000); // Day before yesterday
      const mockDocs = [
        {
          id: "event1",
          data: () => ({
            title: "Past Event 1",
            date: createMockTimestamp(pastDate1),
            published: true,
          }),
        },
        {
          id: "event2",
          data: () => ({
            title: "Past Event 2",
            date: createMockTimestamp(pastDate2),
            published: true,
          }),
        },
      ];
      const mockQuerySnapshot = { docs: mockDocs } as unknown as QuerySnapshot;
      mockGetDocs.mockResolvedValue(mockQuerySnapshot);

      const result = await getPastEvents();

      expect(mockCollection).toHaveBeenCalledWith(db, "events");
      // Check the first call to query
      expect(mockQuery).toHaveBeenCalledWith(
        expect.objectContaining({ path: "events" }),
        expect.objectContaining({ field: "published", op: "==", value: true }),
        expect.objectContaining({
          field: "date",
          op: "<",
          value: expect.any(Date),
        }),
        expect.objectContaining({ field: "date", dir: "desc" })
      );
      // getDocs should be called with the result of the first query
      expect(mockGetDocs).toHaveBeenCalledWith(
        expect.objectContaining({ type: "query" })
      );
      expect(result).toEqual([
        {
          id: "event1",
          title: "Past Event 1",
          date: pastDate1,
          published: true,
          isPast: true,
        },
        {
          id: "event2",
          title: "Past Event 2",
          date: pastDate2,
          published: true,
          isPast: true,
        },
      ]);
      expect(consoleLogSpy).toHaveBeenCalledWith("Fetching past events...");
      expect(consoleLogSpy).toHaveBeenCalledWith(
        `Retrieved ${mockDocs.length} past events`
      );
    });

    it("should return limited past published events", async () => {
      const now = new Date();
      const pastDate1 = new Date(now.getTime() - 86400000);
      const mockDocs = [
        {
          id: "event1",
          data: () => ({
            title: "Past Event 1",
            date: createMockTimestamp(pastDate1),
            published: true,
          }),
        },
      ]; // Assume limit is 1
      const mockQuerySnapshot = { docs: mockDocs } as unknown as QuerySnapshot;
      mockGetDocs.mockResolvedValue(mockQuerySnapshot);
      const limitCount = 1;

      const result = await getPastEvents(limitCount);

      // Check the first call to query (without limit)
      expect(mockQuery).toHaveBeenCalledWith(
        expect.objectContaining({ path: "events" }),
        expect.objectContaining({ field: "published", op: "==", value: true }),
        expect.objectContaining({
          field: "date",
          op: "<",
          value: expect.any(Date),
        }),
        expect.objectContaining({ field: "date", dir: "desc" })
      );

      // Check the second call to query (with the limit constraint)
      const firstQueryResult = mockQuery.mock.results[0].value; // Get the object returned by the first query call
      expect(mockQuery).toHaveBeenCalledWith(
        firstQueryResult, // The source is the result of the first query
        expect.objectContaining({ num: limitCount, type: "limit" }) // The new constraint is the limit
      );

      // getDocs should be called with the result of the second query (which includes the limit)
      const secondQueryResult = mockQuery.mock.results[1].value;
      expect(mockGetDocs).toHaveBeenCalledWith(secondQueryResult);

      expect(result).toHaveLength(limitCount);
      expect(result[0]).toEqual({
        id: "event1",
        title: "Past Event 1",
        date: pastDate1,
        published: true,
        isPast: true,
      });
    });

    it("should throw specific error for missing index", async () => {
      const indexError = new Error(
        "FirebaseError: The query requires an index. You can create it here: ..."
      );
      mockGetDocs.mockRejectedValue(indexError);

      await expect(getPastEvents()).rejects.toThrow(
        "Chybí index v databázi. Kontaktujte správce webu."
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error in getPastEvents:",
        indexError
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Original Firestore Error (Past):",
        indexError.message
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Missing index error. Please create the required index in Firebase console."
      );
    });
  });
});
