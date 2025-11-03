# Notion API Integration - Real-Time Fetching

This project uses Astro's API routes to fetch Notion data in real-time rather than at build time. This allows media content to be updated dynamically without rebuilding the site.

## Architecture Overview

The integration consists of three main parts:

1. **API Routes** (`/src/pages/api/`)
   - Server-side endpoints that fetch data from Notion
   - Handle authentication and data transformation
   - Return clean JSON responses with proper caching headers

2. **Server Utilities** (`/src/lib/notion-server.ts`)
   - Helper functions for Astro pages to fetch from API routes
   - Used in `.astro` component frontmatter for SSR

3. **Client Utilities** (`/src/lib/api-client.ts`)
   - Browser-side functions for dynamic client-side fetching
   - Can be used in React components or client-side scripts

## API Endpoints

### GET `/api/photos`
Fetches all photography items from Notion database.

**Response:**
```json
[
  {
    "id": "page-id",
    "title": "Photo Title",
    "type": "photography",
    "url": "https://...",
    "thumbnail": "https://...",
    "description": "Description text",
    "tags": ["tag1", "tag2"],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### GET `/api/videos`
Fetches all video items from Notion database.

**Response:** Same structure as `/api/photos`

### GET `/api/media`
Fetches all media items (photos and videos) from Notion database.

**Query Parameters:**
- `tags` (optional): Comma-separated list of tags to filter by
  - Example: `/api/media?tags=portrait,landscape`

**Response:** Array of NotionMedia objects sorted by creation date (newest first)

## Configuration

### Environment Variables

Required environment variables in `.env`:

```env
NOTION_API_KEY=your_notion_integration_key
NOTION_MEDIA_DATABASE_ID=your_database_id
```

### Astro Configuration

The `astro.config.mjs` is configured for hybrid rendering:

```js
export default defineConfig({
  output: "hybrid", // Allows mixing static and SSR pages
  adapter: node({
    mode: "standalone",
  }),
});
```

## Usage Examples

### Server-Side Rendering (in .astro files)

```astro
---
// Disable prerendering to enable SSR
export const prerender = false;

import { getAllMedia, getServerBaseUrl } from "../lib/notion-server";
import type { NotionMedia } from "../lib/types";

// Fetch data at request time
const baseUrl = getServerBaseUrl(Astro.url);
const media = await getAllMedia(baseUrl);
---

<div>
  {media.map(item => (
    <div>{item.title}</div>
  ))}
</div>
```

### Client-Side Fetching (in React components)

```tsx
import { useEffect, useState } from 'react';
import { fetchAllMedia } from '../lib/api-client';
import type { NotionMedia } from '../lib/types';

export function MediaGallery() {
  const [media, setMedia] = useState<NotionMedia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllMedia().then(data => {
      setMedia(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {media.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}
```

### Direct API Calls

You can also fetch from the API endpoints directly:

```javascript
fetch('/api/media')
  .then(res => res.json())
  .then(data => console.log(data));

// With tags filter
fetch('/api/media?tags=portrait,landscape')
  .then(res => res.json())
  .then(data => console.log(data));
```

## Caching Strategy

API endpoints include cache headers for optimal performance:

```
Cache-Control: public, max-age=300, s-maxage=600
```

- Browser cache: 5 minutes (300 seconds)
- CDN cache: 10 minutes (600 seconds)

This balances fresh content with performance.

## Data Processing

### Multiple Files per Page

The integration handles Notion pages with multiple files by creating separate media items for each file:

- Each file gets a unique ID: `{pageId}-{index}`
- Titles are appended with the file index: "Title (1)", "Title (2)", etc.
- Use `getFirstMediaPerProject()` to show only the first file per page

### Hidden from Gallery

Pages with the "Hidden From Gallery" checkbox enabled are automatically excluded from results.

### Supported File Sources

The integration checks multiple Notion property types for media URLs:
1. "Files & media" property (multi-file property)
2. "File" property (single file property)
3. "URL" property (external URL)

## Helper Functions

### `getFirstMediaPerProject(mediaItems)`

Filters media array to show only the first item from each project:

```typescript
import { getFirstMediaPerProject } from '../lib/notion-server';

const allMedia = await getAllMedia(baseUrl);
const firstOnly = getFirstMediaPerProject(allMedia); // One item per project
```

### `getServerBaseUrl(url)`

Determines the correct base URL for API requests:

```typescript
import { getServerBaseUrl } from '../lib/notion-server';

const baseUrl = getServerBaseUrl(Astro.url);
// Development: http://localhost:4321
// Production: https://sudo.create
```

## Migrating from Build-Time Fetching

The old `lib/notion.ts` file fetched data at build time. The new approach:

**Before:**
```astro
---
import { getAllMedia } from '../lib/notion';
const media = await getAllMedia(); // Fetches directly from Notion
---
```

**After:**
```astro
---
export const prerender = false;
import { getAllMedia, getServerBaseUrl } from '../lib/notion-server';
const baseUrl = getServerBaseUrl(Astro.url);
const media = await getAllMedia(baseUrl); // Fetches from API route
---
```

## Benefits

1. **Real-Time Updates**: Content updates in Notion appear immediately without rebuilding
2. **Better Performance**: API responses are cached, reducing Notion API calls
3. **Separation of Concerns**: Business logic in API routes, presentation in components
4. **Flexibility**: Can be used for both SSR and client-side rendering
5. **Scalability**: API routes can be deployed to edge functions or serverless

## Development

Start the dev server:

```bash
pnpm dev
```

The API routes will be available at:
- http://localhost:4321/api/photos
- http://localhost:4321/api/videos
- http://localhost:4321/api/media

## Production Deployment

Build the project:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

The Node adapter will create a standalone server in the `dist/` directory that can be deployed to any Node.js hosting platform.

## Troubleshooting

### API returns 500 error

Check that environment variables are set:
- `NOTION_API_KEY`
- `NOTION_MEDIA_DATABASE_ID`

### Empty results

Verify your Notion database:
- Has a "Type" select property with "Photography" or "Video" values
- Has media files in "Files & media", "File", or "URL" properties
- Items aren't marked with "Hidden From Gallery" checkbox

### Stale data

Check cache headers and adjust `max-age` values in API route files if needed.