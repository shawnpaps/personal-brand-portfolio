// Server-side utilities for fetching Notion media in Astro pages
// Use these functions in Astro component frontmatter for SSR

import type { NotionMedia } from './types';

/**
 * Fetch photos from the API endpoint (server-side)
 * Use this in Astro component frontmatter
 */
export async function getPhotos(baseUrl: string): Promise<NotionMedia[]> {
  try {
    const response = await fetch(`${baseUrl}/api/photos`);

    if (!response.ok) {
      throw new Error(`Failed to fetch photos: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
}

/**
 * Fetch videos from the API endpoint (server-side)
 * Use this in Astro component frontmatter
 */
export async function getVideos(baseUrl: string): Promise<NotionMedia[]> {
  try {
    const response = await fetch(`${baseUrl}/api/videos`);

    if (!response.ok) {
      throw new Error(`Failed to fetch videos: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

/**
 * Fetch all media from the API endpoint (server-side)
 * Use this in Astro component frontmatter
 * @param baseUrl The base URL of your site
 * @param tags Optional array of tags to filter by
 */
export async function getAllMedia(
  baseUrl: string,
  tags?: string[]
): Promise<NotionMedia[]> {
  try {
    const url = new URL(`${baseUrl}/api/media`);

    if (tags && tags.length > 0) {
      url.searchParams.set('tags', tags.join(','));
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Failed to fetch media: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching media:', error);
    return [];
  }
}

/**
 * Filter media array to show only the first item from each project
 * Useful for gallery views where you want one representative image per project
 */
export function getFirstMediaPerProject(
  mediaItems: NotionMedia[]
): NotionMedia[] {
  const projectMap = new Map<string, NotionMedia>();

  for (const item of mediaItems) {
    // Extract the base page ID (remove file index suffix if present)
    const baseId = item.id.includes('-')
      ? item.id.substring(0, item.id.lastIndexOf('-'))
      : item.id;

    // Only keep the first item for each base page ID
    if (!projectMap.has(baseId)) {
      // Clean up the title by removing " (1)" suffix if present
      const cleanedItem = {
        ...item,
        title: item.title.replace(/\s+\(\d+\)$/, ''),
      };
      projectMap.set(baseId, cleanedItem);
    }
  }

  return Array.from(projectMap.values());
}

/**
 * Get the base URL for API requests based on the Astro environment
 */
export function getServerBaseUrl(url: URL): string {
  // In production, use the configured site URL or request origin
  if (import.meta.env.PROD) {
    return import.meta.env.SITE || url.origin;
  }

  // In development, use localhost with the dev server port
  return url.origin;
}
