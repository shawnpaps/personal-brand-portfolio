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
	fileIndex?: number; // Index for entries with multiple files
}

/**
 * Helper function to extract media data from Notion page
 */
function extractMediaFromPage(page: any): NotionMedia[] {
	const properties = page.properties;

	// Debug: log available properties
	console.log(`Page ${page.id} properties:`, Object.keys(properties));

	// Check "Hidden From Gallery" checkbox
	const hiddenFromGallery = properties["Hidden From Gallery"]?.checkbox;
	if (hiddenFromGallery === true) {
		console.log(`Page ${page.id} is hidden from gallery - skipping`);
		return [];
	}

	// Extract title - try common property names
	const title =
		properties.Name?.title?.[0]?.plain_text ||
		properties.Title?.title?.[0]?.plain_text ||
		"Untitled";

	// Extract type
	const typeValue = properties.Type?.select?.name;
	if (!typeValue) {
		console.warn(`Page ${page.id} has no Type property`);
		return [];
	}

	const type = typeValue.toLowerCase() as "photography" | "video";
	if (type !== "photography" && type !== "video") {
		console.warn(`Page ${page.id} has invalid type: ${typeValue}`);
		return [];
	}

	// Extract description
	const description = properties.Description?.rich_text?.[0]?.plain_text || "";

	// Extract tags
	const tags = properties.Tags?.multi_select?.map((tag: any) => tag.name) || [];

	// Collect all files from various properties
	const allFiles: Array<{ url: string; index: number }> = [];

	// Try "Files & media" property (with spaces and special chars)
	const filesMediaProp = properties["Files & media"];
	if (filesMediaProp?.files && Array.isArray(filesMediaProp.files)) {
		filesMediaProp.files.forEach((file: any, index: number) => {
			const fileUrl = file.file?.url || file.external?.url;
			if (fileUrl) {
				allFiles.push({ url: fileUrl, index });
			}
		});
	}

	// Try "File" property if no files found yet
	if (allFiles.length === 0 && properties.File?.files) {
		properties.File.files.forEach((file: any, index: number) => {
			const fileUrl = file.file?.url || file.external?.url;
			if (fileUrl) {
				allFiles.push({ url: fileUrl, index });
			}
		});
	}

	// Try "URL" property if no files found yet
	if (allFiles.length === 0 && properties.URL?.url) {
		allFiles.push({ url: properties.URL.url, index: 0 });
	}

	if (allFiles.length === 0) {
		console.warn(
			`Page ${page.id} has no URL or File. Available properties:`,
			Object.keys(properties),
		);
		console.warn(
			`Files & media content:`,
			JSON.stringify(properties["Files & media"], null, 2),
		);
		return [];
	}

	// Create a NotionMedia item for each file
	const mediaItems: NotionMedia[] = allFiles.map((file, idx) => {
		// For thumbnail, use the next file if available, otherwise use the same file
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
			const mediaArray = extractMediaFromPage(page);
			if (mediaArray.length > 0) {
				mediaItems.push(...mediaArray);
			} else {
				console.warn(
					`Skipped page ${page.id} - failed to extract media or hidden from gallery`,
				);
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
			const mediaArray = extractMediaFromPage(page);
			if (mediaArray.length > 0) {
				mediaItems.push(...mediaArray);
			}
		}

		return mediaItems;
	} catch (error) {
		console.error("Error fetching media by tags from Notion:", error);
		throw error;
	}
}

/**
 * Filter media array to show only the first item from each project
 * Useful for gallery views where you want one representative image per project
 */
export function getFirstMediaPerProject(
	mediaItems: NotionMedia[],
): NotionMedia[] {
	const projectMap = new Map<string, NotionMedia>();

	for (const item of mediaItems) {
		// Extract the base page ID (remove file index suffix if present)
		const baseId = item.id.includes("-")
			? item.id.substring(0, item.id.lastIndexOf("-"))
			: item.id;

		// Only keep the first item for each base page ID
		if (!projectMap.has(baseId)) {
			// Clean up the title by removing " (1)" suffix if present
			const cleanedItem = {
				...item,
				title: item.title.replace(/\s+\(\d+\)$/, ""),
			};
			projectMap.set(baseId, cleanedItem);
		}
	}

	return Array.from(projectMap.values());
}
