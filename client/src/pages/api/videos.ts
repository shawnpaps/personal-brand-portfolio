import type { APIRoute } from 'astro';
import { Client } from '@notionhq/client';

// Initialize Notion client
const notion = new Client({
  auth: import.meta.env.NOTION_API_KEY,
});

export type MediaType = 'photography' | 'video';

export interface NotionMedia {
  id: string;
  title: string;
  type: MediaType;
  url: string;
  thumbnail?: string;
  description?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  fileIndex?: number;
}

function extractMediaFromPage(page: any): NotionMedia[] {
  const properties = page.properties;

  // Check "Hidden From Gallery" checkbox
  const hiddenFromGallery = properties['Hidden From Gallery']?.checkbox;
  if (hiddenFromGallery === true) {
    return [];
  }

  // Extract title
  const title =
    properties.Name?.title?.[0]?.plain_text ||
    properties.Title?.title?.[0]?.plain_text ||
    'Untitled';

  // Extract type
  const typeValue = properties.Type?.select?.name;
  if (!typeValue) {
    return [];
  }

  const type = typeValue.toLowerCase() as 'photography' | 'video';
  if (type !== 'photography' && type !== 'video') {
    return [];
  }

  // Extract description
  const description = properties.Description?.rich_text?.[0]?.plain_text || '';

  // Extract tags
  const tags = properties.Tags?.multi_select?.map((tag: any) => tag.name) || [];

  // Collect all files
  const allFiles: Array<{ url: string; index: number }> = [];

  // Try "Files & media" property
  const filesMediaProp = properties['Files & media'];
  if (filesMediaProp?.files && Array.isArray(filesMediaProp.files)) {
    filesMediaProp.files.forEach((file: any, index: number) => {
      const fileUrl = file.file?.url || file.external?.url;
      if (fileUrl) {
        allFiles.push({ url: fileUrl, index });
      }
    });
  }

  // Try "File" property if no files found
  if (allFiles.length === 0 && properties.File?.files) {
    properties.File.files.forEach((file: any, index: number) => {
      const fileUrl = file.file?.url || file.external?.url;
      if (fileUrl) {
        allFiles.push({ url: fileUrl, index });
      }
    });
  }

  // Try "URL" property if no files found
  if (allFiles.length === 0 && properties.URL?.url) {
    allFiles.push({ url: properties.URL.url, index: 0 });
  }

  if (allFiles.length === 0) {
    return [];
  }

  // Create a NotionMedia item for each file
  const mediaItems: NotionMedia[] = allFiles.map((file, idx) => {
    const thumbnail = allFiles[idx + 1]?.url || file.url;

    return {
      id: allFiles.length > 1 ? `${page.id}-${idx}` : page.id,
      title: allFiles.length > 1 ? `${title} (${idx + 1})` : title,
      type,
      url: file.url,
      thumbnail,
      description,
      tags,
      createdAt: page.created_time,
      updatedAt: page.last_edited_time,
      fileIndex: allFiles.length > 1 ? idx : undefined,
    };
  });

  return mediaItems;
}

export const GET: APIRoute = async ({ request }) => {
  const databaseId = import.meta.env.NOTION_MEDIA_DATABASE_ID;

  if (!databaseId) {
    return new Response(
      JSON.stringify({ error: 'NOTION_MEDIA_DATABASE_ID is not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (!import.meta.env.NOTION_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'NOTION_API_KEY is not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const response = await notion.dataSources.query({
      data_source_id: databaseId,
      filter: {
        property: 'Type',
        select: {
          equals: 'Video',
        },
      },
    });

    const mediaItems: NotionMedia[] = [];

    for (const page of response.results) {
      const mediaArray = extractMediaFromPage(page);
      if (mediaArray.length > 0) {
        mediaItems.push(...mediaArray);
      }
    }

    return new Response(JSON.stringify(mediaItems), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300, s-maxage=600',
      },
    });
  } catch (error) {
    console.error('Error fetching videos from Notion:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch videos from Notion' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
