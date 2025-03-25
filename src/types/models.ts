// Base model with common fields
export interface BaseModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// News model
export interface News extends BaseModel {
  title: string;
  content: string;
  imageUrl?: string;
  imageName?: string;
  published: boolean;
  publishedAt?: Date;
  slug: string;
}

// Event model
export interface Event extends BaseModel {
  title: string;
  description: string;
  date: Date;
  endDate?: Date;
  location: string;
  imageUrl?: string;
  imageName?: string;
  published: boolean;
  slug: string;
  isPast: boolean; // Derived field to determine if event is in the past
}

// Gallery model
export interface Gallery extends BaseModel {
  title: string;
  description: string;
  date: Date;
  coverImageUrl: string;
  coverImageName: string;
  published: boolean;
  slug: string;
}

// Gallery image model
export interface GalleryImage {
  id: string;
  galleryId: string;
  imageUrl: string;
  imageName: string;
  description?: string;
  order: number;
}

// Sponsor model
export interface Sponsor extends BaseModel {
  name: string;
  description: string;
  websiteUrl?: string;
  logoUrl: string;
  logoName: string;
  active: boolean;
  order: number;
}

// Document model
export interface Document extends BaseModel {
  title: string;
  description: string;
  fileUrl: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  category: string;
  published: boolean;
}

// Document category model
export interface DocumentCategory {
  id: string;
  name: string;
  description?: string;
  order: number;
}

// Form field validation error
export interface FieldError {
  [key: string]: string;
}
