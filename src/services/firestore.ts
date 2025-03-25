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
  News,
  Event,
  Gallery,
  GalleryImage,
  Sponsor,
  Document,
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

// News specific functions
export const getPublishedNews = async (
  limitCount?: number
): Promise<News[]> => {
  let q = query(
    collection(db, "news"),
    where("published", "==", true),
    orderBy("publishedAt", "desc")
  );

  if (limitCount) {
    q = query(q, limit(limitCount));
  }

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const data = convertTimestampToDate(doc.data());
    return { id: doc.id, ...data } as News;
  });
};

// Events specific functions
export const getUpcomingEvents = async (): Promise<Event[]> => {
  const now = new Date();
  const q = query(
    collection(db, "events"),
    where("published", "==", true),
    where("date", ">=", now),
    orderBy("date", "asc")
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const data = convertTimestampToDate(doc.data());
    return {
      id: doc.id,
      ...data,
      isPast: false,
    } as Event;
  });
};

export const getPastEvents = async (limitCount?: number): Promise<Event[]> => {
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
  return querySnapshot.docs.map((doc) => {
    const data = convertTimestampToDate(doc.data());
    return {
      id: doc.id,
      ...data,
      isPast: true,
    } as Event;
  });
};

// Gallery specific functions
export const getPublishedGalleries = async (): Promise<Gallery[]> => {
  const q = query(
    collection(db, "gallery"),
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
  const q = query(
    collection(db, "galleryImages"),
    where("galleryId", "==", galleryId),
    orderBy("order", "asc")
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() } as GalleryImage;
  });
};

// Sponsors specific functions
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

export const getDocumentsByCategory = async (
  category: string
): Promise<Document[]> => {
  const q = query(
    collection(db, "documents"),
    where("published", "==", true),
    where("category", "==", category),
    orderBy("title", "asc")
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const data = convertTimestampToDate(doc.data());
    return { id: doc.id, ...data } as Document;
  });
};
