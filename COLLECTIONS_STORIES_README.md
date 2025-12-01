# Collections & Stories Feature Documentation

## Overview

This feature allows sellers to create and showcase their work through **Collections** (curated product groups) and **Stories** (Instagram-style temporary content).

## Features Implemented

### 1. Collections System

**What it does:** Sellers can group related products into themed collections with descriptions, cover images, and tags.

**Pages & Components:**

- `/collections` - Browse all collections with category filters
- `/collections/[id]` - View individual collection details with all products
- `CollectionCard.tsx` - Reusable collection preview card

**Key Features:**

- Grid layout with cover images
- Product count badges
- Seller attribution
- Tag system for categorization
- Responsive design (1-3 columns based on screen size)

### 2. Stories System

**What it does:** Sellers share behind-the-scenes content, new products, and creative processes through time-limited stories.

**Pages & Components:**

- `/stories` - View all active stories
- `StoryViewer.tsx` - Full-screen Instagram-style story viewer
- `StoryCircle.tsx` - Circular story avatar with gradient ring

**Key Features:**

- Auto-advancing slides (5 seconds default)
- Progress bars for each slide
- Navigation (prev/next)
- Product linking within stories
- Caption overlays
- 24-hour expiration (tracked via `expiresAt`)

### 3. Seller Profiles & Dashboard

**Pages:**

- `/sellers/[id]` - Public seller profile with collections, stories, and products
- `/dashboard` - Seller dashboard to manage collections and stories

**Dashboard Features:**

- Stats overview (collections, stories, views, followers)
- Collection management (edit/delete)
- Story creation interface (placeholder for file upload)
- Modal forms for creating new content

### 4. Homepage Integration

**Updates to home page:**

- Featured Stories section with horizontal scroll
- Featured Collections grid
- Click-to-view story viewer modal
- Links to full pages

### 5. Navigation Updates

Added new navigation links:

- Collections
- Stories

## Data Models

Located in `app/types/index.ts`:

```typescript
interface Collection {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  sellerId: string;
  sellerName: string;
  products: Product[];
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface Story {
  id: string;
  sellerId: string;
  sellerName: string;
  slides: StorySlide[];
  createdAt: Date;
  expiresAt?: Date;
}

interface StorySlide {
  id: string;
  type: "image" | "video";
  mediaUrl: string;
  caption?: string;
  duration?: number;
  productLink?: {
    productId: string;
    productName: string;
  };
}
```

## File Structure

```
app/
├── types/
│   └── index.ts                    # TypeScript interfaces
├── components/
│   ├── CollectionCard.tsx          # Collection preview card
│   ├── StoryCircle.tsx             # Story avatar circle
│   └── StoryViewer.tsx             # Full-screen story viewer
├── collections/
│   ├── page.tsx                    # Collections listing
│   └── [id]/
│       └── page.tsx                # Individual collection detail
├── stories/
│   └── page.tsx                    # Stories listing
├── sellers/
│   └── [id]/
│       └── page.tsx                # Seller profile page
└── dashboard/
    └── page.tsx                    # Seller dashboard
```

## Current State (Mock Data)

All features currently use mock data for demonstration. To connect to a real backend:

1. **Replace mock data** in each page with API calls
2. **Implement forms** in dashboard for creating collections/stories
3. **Add file upload** functionality for images/videos
4. **Connect authentication** to link sellers to their content
5. **Add MongoDB schemas** matching the TypeScript interfaces

## Styling

Uses the existing design system:

- CSS variables from `globals.css` (`--color-primary`, `--color-secondary`, etc.)
- Tailwind CSS utilities
- Responsive breakpoints
- Consistent hover states and transitions

## Next Steps

### Backend Integration:

1. Create API routes for collections and stories CRUD operations
2. Set up MongoDB schemas matching TypeScript types
3. Implement file storage (AWS S3, Cloudinary, etc.)
4. Add authentication middleware

### Enhanced Features:

1. Story upload with image/video processing
2. Analytics tracking (views, clicks)
3. Follow/unfollow functionality
4. Search and filtering
5. Notification system for new stories
6. Collection sharing via social media

## Testing

To test the features:

```bash
npm run dev
```

Then visit:

- http://localhost:3000 - Homepage with stories and collections
- http://localhost:3000/collections - Browse collections
- http://localhost:3000/stories - View stories
- http://localhost:3000/dashboard - Seller dashboard
- http://localhost:3000/sellers/seller1 - Example seller profile

## Notes

- All images use placeholder paths (`/images/...`) - replace with actual assets
- Stories auto-advance every 5 seconds
- Mobile-responsive design tested for all screen sizes
- Accessibility features included (ARIA labels, keyboard navigation)
