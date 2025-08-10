import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
  DocumentData,
} from "firebase/firestore";
import { db } from "../firebase/config";
import {
  Event,
  Gallery,
  GalleryImage,
  Sponsor,
  Document,
  BlogPost,
} from "../types/models";

// Helper function to convert Firestore timestamp to Date
const convertTimestampToDate = (data: DocumentData): DocumentData => {
  const result = { ...data };

  // Convert all timestamp fields to Date objects
  Object.keys(result).forEach((key) => {
    if (result[key] instanceof Timestamp) {
      result[key] = result[key].toDate();
    }
  });

  return result;
};

// Generic function to get a document by ID
export const getDocumentById = async <T>(
  collectionName: string,
  id: string
): Promise<T> => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error(`Document not found in ${collectionName} with ID: ${id}`);
  }

  const data = convertTimestampToDate(docSnap.data());
  return { id: docSnap.id, ...data } as T;
};

// Generic function to get all documents from a collection
export const getAllDocuments = async <T>(
  collectionName: string,
  orderByField: string = "createdAt",
  orderDirection: "asc" | "desc" = "desc"
): Promise<T[]> => {
  const q = query(
    collection(db, collectionName),
    orderBy(orderByField, orderDirection)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const data = convertTimestampToDate(doc.data());
    return { id: doc.id, ...data } as T;
  });
};

// Generic function to add a document
export const addDocument = async <T extends object>(
  collectionName: string,
  data: Omit<T, "id" | "createdAt" | "updatedAt">
): Promise<string> => {
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
};

// Generic function to update a document
export const updateDocument = async <T extends object>(
  collectionName: string,
  id: string,
  data: Partial<Omit<T, "id" | "createdAt" | "updatedAt">>
): Promise<void> => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

// Generic function to delete a document
export const deleteDocument = async (
  collectionName: string,
  id: string
): Promise<void> => {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
};

// Events specific functions
export const getUpcomingEvents = async (): Promise<Event[]> => {
  try {
    console.log("Fetching upcoming events...");
    const now = new Date();
    const q = query(
      collection(db, "events"),
      where("published", "==", true),
      where("date", ">=", now),
      orderBy("date", "asc")
    );

    const querySnapshot = await getDocs(q);
    console.log(`Retrieved ${querySnapshot.docs.length} upcoming events`);

    return querySnapshot.docs.map((doc) => {
      const data = convertTimestampToDate(doc.data());
      return {
        id: doc.id,
        ...data,
        isPast: false,
      } as Event;
    });
  } catch (error) {
    console.error("Error in getUpcomingEvents:", error);
    if (error instanceof Error) {
      console.error("Original Firestore Error (Upcoming):", error.message); // Log original error
      console.error("Error details:", error.message);

      // Check if this is a missing index error
      if (error.message.includes("requires an index")) {
        console.error(
          "Missing index error. Please create the required index in Firebase console."
        );
        throw new Error("Chybí index v databázi. Kontaktujte správce webu.");
      }
    }
    throw error; // Re-throw to be handled by the component
  }
};

export const getPastEvents = async (limitCount?: number): Promise<Event[]> => {
  try {
    console.log("Fetching past events...");
    const now = new Date();
    let q = query(
      collection(db, "events"),
      where("published", "==", true),
      where("date", "<", now),
      orderBy("date", "desc")
    );

    if (limitCount) {
      q = query(q, limit(limitCount));
    }

    const querySnapshot = await getDocs(q);
    console.log(`Retrieved ${querySnapshot.docs.length} past events`);

    return querySnapshot.docs.map((doc) => {
      const data = convertTimestampToDate(doc.data());
      return {
        id: doc.id,
        ...data,
        isPast: true,
      } as Event;
    });
  } catch (error) {
    console.error("Error in getPastEvents:", error);
    if (error instanceof Error) {
      console.error("Original Firestore Error (Past):", error.message); // Log original error
      console.error("Error details:", error.message);

      // Check if this is a missing index error
      if (error.message.includes("requires an index")) {
        console.error(
          "Missing index error. Please create the required index in Firebase console."
        );
        throw new Error("Chybí index v databázi. Kontaktujte správce webu.");
      }
    }
    throw error; // Re-throw to be handled by the component
  }
};

// Gallery specific functions
export const getPublishedGalleries = async (): Promise<Gallery[]> => {
  const q = query(
    collection(db, "galleries"), // Corrected collection name to plural
    where("published", "==", true),
    orderBy("date", "desc")
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const data = convertTimestampToDate(doc.data());
    return { id: doc.id, ...data } as Gallery;
  });
};

export const getGalleryImages = async (
  galleryId: string
): Promise<GalleryImage[]> => {
  // TODO: Verify this collection name is correct if/when implementing image details
  const q = query(
    collection(db, "galleryImages"), // Assuming this collection name is correct for later use
    where("galleryId", "==", galleryId),
    orderBy("order", "asc")
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() } as GalleryImage;
  });
};

// Gallery specific functions
export const getGalleryBySlug = async (
  slug: string
): Promise<Gallery | null> => {
  const q = query(
    collection(db, "galleries"),
    where("slug", "==", slug),
    limit(1) // Expecting only one gallery per slug
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.warn(`Gallery with slug "${slug}" not found.`);
    return null; // Return null if not found
  }

  const doc = querySnapshot.docs[0];
  const data = convertTimestampToDate(doc.data());
  return { id: doc.id, ...data } as Gallery;
};

// Blog specific functions
export const getBlogPostBySlug = async (
  slug: string
): Promise<BlogPost | null> => {
  const q = query(
    collection(db, "blogPosts"),
    where("slug", "==", slug),
    limit(1)
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.warn(`Blog post with slug "${slug}" not found.`);
    return null;
  }

  const doc = querySnapshot.docs[0];
  const data = convertTimestampToDate(doc.data());
  return { id: doc.id, ...data } as BlogPost;
};

// Sponsors specific functions - Restore this function
export const getActiveSponsors = async (): Promise<Sponsor[]> => {
  const q = query(
    collection(db, "sponsors"),
    where("active", "==", true),
    orderBy("order", "asc")
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const data = convertTimestampToDate(doc.data());
    return { id: doc.id, ...data } as Sponsor;
  });
};

// Documents specific functions
export const getPublishedDocuments = async (): Promise<Document[]> => {
  const q = query(
    collection(db, "documents"),
    where("published", "==", true),
    orderBy("title", "asc")
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const data = convertTimestampToDate(doc.data());
    return { id: doc.id, ...data } as Document;
  });
};

// Removed getDocumentsByCategory as category field is removed
