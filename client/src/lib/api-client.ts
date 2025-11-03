// Client-side API utilities for fetching Notion media

import type { NotionMedia } from './types';

/**
 * Base URL for API requests
 * In production, this will use the site's domain
 * In development, it uses the dev server
 */
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return '';
};

/**
 * Fetch all photos from the API
 */
export async function fetchPhotos(): Promise<NotionMedia[]> {
  try {
    const response = await fetch(`${getBaseUrl()}/api/photos`);

    if (!response.ok) {
      throw new Error(`Failed to fetch photos: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
}

/**
 * Fetch all videos from the API
 */
export async function fetchVideos(): Promise<NotionMedia[]> {
  try {
    const response = await fetch(`${getBaseUrl()}/api/videos`);

    if (!response.ok) {
      throw new Error(`Failed to fetch videos: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
}

/**
 * Fetch all media from the API
 * @param tags Optional array of tags to filter by
 */
export async function fetchAllMedia(tags?: string[]): Promise<NotionMedia[]> {
  try {
    const url = new URL(`${getBaseUrl()}/api/media`);

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
    throw error;
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
