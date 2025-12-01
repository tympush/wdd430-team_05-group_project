// app/types/index.ts

export interface Product {
  id: string;
  title: string;
  price: number;
  image?: string | null;
  description?: string;
  sellerId: string;
  sellerName?: string;
  category?: string;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar?: string;
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}

export interface Story {
  id: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar?: string;
  slides: StorySlide[];
  createdAt: Date;
  expiresAt?: Date;
  views?: number;
}

export interface StorySlide {
  id: string;
  type: 'image' | 'video';
  mediaUrl: string;
  caption?: string;
  duration?: number; // in seconds
  productLink?: {
    productId: string;
    productName: string;
  };
}

export interface Seller {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
  coverImage?: string;
  location?: string;
  joinedDate: Date;
  collections: Collection[];
  stories: Story[];
}
