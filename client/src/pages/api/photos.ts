import type { APIRoute } from "astro";

const S3_BUCKET_URL =
	"https://spm-portfolio-photography.s3.us-east-2.amazonaws.com";
const S3_BASE_URL = S3_BUCKET_URL;

export const GET: APIRoute = async ({ url }) => {
	// Get folder from query parameter
	const folder = url.searchParams.get("folder") || "";

	try {
		// Use the S3 REST API directly for public buckets (no AWS SDK auth needed)
		const prefix = folder ? `${folder}/` : "";
		const s3Url = `${S3_BUCKET_URL}?list-type=2&prefix=${encodeURIComponent(prefix)}`;

		console.log("Fetching from S3:", s3Url);
		console.log("Folder parameter:", folder);
		console.log("Prefix:", prefix);

		const response = await fetch(s3Url);

		if (!response.ok) {
			throw new Error(
				`S3 request failed: ${response.status} ${response.statusText}`,
			);
		}

		const xmlText = await response.text();

		// Check for errors in the XML
		const errorMatch = xmlText.match(/<Error>([\s\S]*?)<\/Error>/);
		if (errorMatch) {
			const codeMatch = xmlText.match(/<Code>([^<]+)<\/Code>/);
			const messageMatch = xmlText.match(/<Message>([^<]+)<\/Message>/);
			const code = codeMatch ? codeMatch[1] : "Unknown";
			const message = messageMatch ? messageMatch[1] : "Unknown error";
			throw new Error(`S3 Error: ${code} - ${message}`);
		}

		// Extract all Contents elements using regex
		const contentsRegex = /<Contents>([\s\S]*?)<\/Contents>/g;
		const contentsMatches = [...xmlText.matchAll(contentsRegex)];

		console.log("Number of items from S3:", contentsMatches.length);

		const photos = contentsMatches
			.map((match) => {
				const content = match[1];
				const keyMatch = content.match(/<Key>([^<]+)<\/Key>/);
				const sizeMatch = content.match(/<Size>([^<]+)<\/Size>/);
				const lastModifiedMatch = content.match(
					/<LastModified>([^<]+)<\/LastModified>/,
				);

				return {
					key: keyMatch ? keyMatch[1] : "",
					size: sizeMatch ? parseInt(sizeMatch[1], 10) : 0,
					lastModified: lastModifiedMatch ? lastModifiedMatch[1] : "",
				};
			})
			.filter((item) => {
				// Filter out the folder itself and only get image files
				return (
					item.key !== prefix && /\.(jpg|jpeg|png|webp|gif)$/i.test(item.key)
				);
			})
			.map((item) => ({
				key: item.key,
				url: `${S3_BASE_URL}/${item.key}`,
				name: item.key.split("/").pop() || "",
				size: item.size,
				lastModified: item.lastModified,
			}));

		console.log("Number of photos after filtering:", photos.length);
		console.log(
			"First 3 photo keys:",
			photos.slice(0, 3).map((p) => p.key),
		);

		return new Response(JSON.stringify(photos), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
		});
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error";
		console.error("Error fetching photos from S3:", errorMessage);

		return new Response(
			JSON.stringify({
				error: errorMessage,
				folder: folder || "root",
			}),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			},
		);
	}
};
