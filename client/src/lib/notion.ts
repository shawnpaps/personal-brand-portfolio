import { Client } from "@notionhq/client";

// Initialize Notion client
const notion = new Client({
	auth: import.meta.env.NOTION_API_KEY,
});

// Type represents the actual values in your Notion database Type field
export type MediaType = "photography" | "video";

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
}

/**
 * Helper function to extract media data from Notion page
 */
function extractMediaFromPage(page: any): NotionMedia | null {
	const properties = page.properties;

	// Debug: log available properties
	console.log(`Page ${page.id} properties:`, Object.keys(properties));

	// Extract title - try common property names
	const title =
		properties.Name?.title?.[0]?.plain_text ||
		properties.Title?.title?.[0]?.plain_text ||
		"Untitled";

	// Extract type
	const typeValue = properties.Type?.select?.name;
	if (!typeValue) {
		console.warn(`Page ${page.id} has no Type property`);
		return null;
	}

	const type = typeValue.toLowerCase() as "photography" | "video";
	if (type !== "photography" && type !== "video") {
		console.warn(`Page ${page.id} has invalid type: ${typeValue}`);
		return null;
	}

	// Extract URL from file or URL property - try multiple property names
	let url = "";

	// Try "Files & media" property (with spaces and special chars)
	const filesMediaProp = properties["Files & media"];
	if (filesMediaProp?.files?.[0]) {
		url =
			filesMediaProp.files[0].file?.url ||
			filesMediaProp.files[0].external?.url ||
			"";
	}

	// Try "File" property
	if (!url && properties.File?.files?.[0]) {
		url =
			properties.File.files[0].file?.url ||
			properties.File.files[0].external?.url ||
			"";
	}

	// Try "URL" property
	if (!url && properties.URL?.url) {
		url = properties.URL.url;
	}

	if (!url) {
		console.warn(
			`Page ${page.id} has no URL or File. Available properties:`,
			Object.keys(properties),
		);
		console.warn(
			`Files & media content:`,
			JSON.stringify(properties["Files & media"], null, 2),
		);
		return null;
	}

	// Extract thumbnail (if different from main URL)
	const thumbnail =
		properties.Thumbnail?.files?.[0]?.file?.url ||
		properties.Thumbnail?.files?.[0]?.external?.url ||
		properties["Files & media"]?.files?.[1]?.file?.url ||
		properties["Files & media"]?.files?.[1]?.external?.url ||
		url;

	// Extract description
	const description = properties.Description?.rich_text?.[0]?.plain_text || "";

	// Extract tags
	const tags = properties.Tags?.multi_select?.map((tag: any) => tag.name) || [];

	return {
		id: page.id,
		title,
		type,
		url,
		thumbnail,
		description,
		tags,
		createdAt: page.created_time,
		updatedAt: page.last_edited_time,
	};
}

/**
 * Fetch media items by type from the Notion database
 */
async function getMediaByType(
	type: "photography" | "video",
): Promise<NotionMedia[]> {
	const databaseId = import.meta.env.NOTION_MEDIA_DATABASE_ID;

	if (!databaseId) {
		throw new Error("NOTION_MEDIA_DATABASE_ID is not defined in .env file");
	}

	if (!import.meta.env.NOTION_API_KEY) {
		throw new Error("NOTION_API_KEY is not defined in .env file");
	}

	try {
		console.log(`Fetching ${type} items from Notion...`);
		console.log(`Database ID: ${databaseId.substring(0, 8)}...`);

		const response = await notion.dataSources.query({
			data_source_id: databaseId,
			filter: {
				property: "Type",
				select: {
					equals: type === "photography" ? "Photography" : "Video",
				},
			},
		});

		console.log(`Found ${response.results.length} ${type} items`);

		const mediaItems: NotionMedia[] = [];

		for (const page of response.results) {
			const media = extractMediaFromPage(page);
			if (media) {
				mediaItems.push(media);
			} else {
				console.warn(`Skipped page ${page.id} - failed to extract media`);
			}
		}

		console.log(`Successfully extracted ${mediaItems.length} ${type} items`);
		return mediaItems;
	} catch (error) {
		console.error(`Error fetching ${type}s from Notion:`, error);
		throw error;
	}
}

/**
 * Get all photos from the Notion database
 * Note: This fetches items with Type = "Photography" from your Notion database
 */
export async function getPhotos(): Promise<NotionMedia[]> {
	return getMediaByType("photography");
}

/**
 * Get all videos from the Notion database
 * Note: This fetches items with Type = "Video" from your Notion database
 */
export async function getVideos(): Promise<NotionMedia[]> {
	return getMediaByType("video");
}

/**
 * Get all media items (photos and videos)
 */
export async function getAllMedia(): Promise<NotionMedia[]> {
	const [photos, videos] = await Promise.all([getPhotos(), getVideos()]);

	return [...photos, ...videos].sort(
		(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
	);
}

/**
 * Get media by specific tags
 */
export async function getMediaByTags(tags: string[]): Promise<NotionMedia[]> {
	const databaseId = import.meta.env.NOTION_MEDIA_DATABASE_ID;

	if (!databaseId) {
		throw new Error("NOTION_MEDIA_DATABASE_ID is not defined in .env file");
	}

	try {
		const response = await notion.dataSources.query({
			data_source_id: databaseId,
			filter: {
				or: tags.map((tag) => ({
					property: "Tags",
					multi_select: {
						contains: tag,
					},
				})),
			},
		});

		const mediaItems: NotionMedia[] = [];

		for (const page of response.results) {
			const media = extractMediaFromPage(page);
			if (media) {
				mediaItems.push(media);
			}
		}

		return mediaItems;
	} catch (error) {
		console.error("Error fetching media by tags from Notion:", error);
		throw error;
	}
}
