export const prerender = false;

import type { APIRoute } from "astro";
import { Client } from "@notionhq/client";

// Initialize Notion client
const notion = new Client({
	auth: import.meta.env.NOTION_API_KEY,
});

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
	fileIndex?: number;
	pageId?: string;
}

function extractMediaFromPage(page: any): NotionMedia[] {
	const properties = page.properties || {};

	// Check "Hidden From Gallery" checkbox (try multiple common names)
	const hidden =
		(properties["Hidden From Gallery"] &&
			properties["Hidden From Gallery"].checkbox) ||
		(properties["Hidden"] && properties["Hidden"].checkbox) ||
		Object.values(properties).some(
			(p: any) => p?.type === "checkbox" && /hidden/i.test(p.name || ""),
		);
	if (hidden) return [];

	// Extract title (try common property names)
	const title =
		(properties.Name &&
			properties.Name.title &&
			properties.Name.title[0]?.plain_text) ||
		(properties.Title &&
			properties.Title.title &&
			properties.Title.title[0]?.plain_text) ||
		"Untitled";

	// Extract description and tags
	const description =
		(properties.Description?.rich_text &&
			properties.Description.rich_text[0]?.plain_text) ||
		null;
	const tags =
		(properties.Tags?.multi_select || []).map((t: any) => t.name) || [];

	// Collect files from candidate properties
	const allFiles: Array<{ url: string; index: number }> = [];

	for (const [name, prop] of Object.entries(properties)) {
		if (!prop) continue;
		if (prop.type === "files" && Array.isArray((prop as any).files)) {
			(prop as any).files.forEach((file: any, idx: number) => {
				const fileUrl = file?.file?.url || file?.external?.url;
				if (fileUrl) allFiles.push({ url: fileUrl, index: idx });
			});
		}
		if (prop.type === "file" && prop.file) {
			const u = prop.file.url;
			if (u) allFiles.push({ url: u, index: 0 });
		}
		if (prop.type === "url" && prop.url) {
			allFiles.push({ url: prop.url, index: 0 });
		}
	}

	// Fallback common names
	if (allFiles.length === 0 && properties.URL?.url)
		allFiles.push({ url: properties.URL.url, index: 0 });
	if (allFiles.length === 0 && properties["Files & media"]?.files) {
		(properties["Files & media"] as any).files.forEach(
			(file: any, idx: number) => {
				const fileUrl = file?.file?.url || file?.external?.url;
				if (fileUrl) allFiles.push({ url: fileUrl, index: idx });
			},
		);
	}

	if (allFiles.length === 0) return [];

	const created = page.created_time || page.createdAt || null;
	const updated = page.last_edited_time || page.updatedAt || null;

	return allFiles.map(
		(f, idx) =>
			({
				id: allFiles.length > 1 ? `${page.id}-${idx}` : page.id,
				pageId: page.id,
				title: allFiles.length > 1 ? `${title} (${idx + 1})` : title,
				type: "video",
				url: f.url,
				thumbnail: allFiles[idx + 1]?.url || f.url,
				description,
				tags,
				createdAt: created,
				updatedAt: updated,
				fileIndex: allFiles.length > 1 ? idx : undefined,
			}) as any,
	);
}

async function fetchAllVideoPages(databaseId: string) {
	const all: any[] = [];
	let start_cursor: string | undefined = undefined;
	const filter = {
		property: "Type",
		select: { equals: "Video" },
	};

	do {
		const resp = await notion.databases.query({
			database_id: databaseId,
			filter,
			page_size: 100,
			start_cursor,
		});
		if (Array.isArray(resp.results)) all.push(...resp.results);
		start_cursor = resp.has_more ? resp.next_cursor : undefined;
	} while (start_cursor);

	return all;
}

export const GET: APIRoute = async ({ request }) => {
	const databaseId = import.meta.env.NOTION_MEDIA_DATABASE_ID;

	if (!databaseId) {
		return new Response(
			JSON.stringify({ error: "NOTION_MEDIA_DATABASE_ID is not configured" }),
			{ status: 500, headers: { "Content-Type": "application/json" } },
		);
	}

	if (!import.meta.env.NOTION_API_KEY) {
		return new Response(
			JSON.stringify({ error: "NOTION_API_KEY is not configured" }),
			{ status: 500, headers: { "Content-Type": "application/json" } },
		);
	}

	try {
		const pages = await fetchAllVideoPages(databaseId);

		const mediaItems: NotionMedia[] = [];
		for (const page of pages) {
			const mediaArray = extractMediaFromPage(page);
			if (mediaArray.length > 0) mediaItems.push(...mediaArray);
		}

		// Sort results newest-first by createdAt (fallback to updatedAt)
		mediaItems.sort(
			(a, b) =>
				new Date(b.createdAt || b.updatedAt).getTime() -
				new Date(a.createdAt || a.updatedAt).getTime(),
		);

		return new Response(JSON.stringify(mediaItems), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "public, max-age=300, s-maxage=600",
			},
		});
	} catch (error) {
		console.error("Error fetching videos from Notion:", error);
		const details = (error && (error as any).message) || String(error);
		return new Response(
			JSON.stringify({ error: "Failed to fetch videos from Notion", details }),
			{ status: 500, headers: { "Content-Type": "application/json" } },
		);
	}
};
