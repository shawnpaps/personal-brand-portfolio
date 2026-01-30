import type { APIRoute } from "astro";
import dotenv from "dotenv";

dotenv.config();

export const GET: APIRoute = async () => {
	// Mux API credentials from environment variables
	const MUX_TOKEN_ID = process.env.MUX_ACCESS_TOKEN;
	const MUX_TOKEN_SECRET = process.env.MUX_ACCESS_SECRET;

	// CORS headers
	const corsHeaders = {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type",
		"Content-Type": "application/json",
	};

	// Check if credentials are configured
	if (!MUX_TOKEN_ID || !MUX_TOKEN_SECRET) {
		return new Response(
			JSON.stringify({
				error: "Mux API credentials not configured",
				message:
					"Please set MUX_TOKEN_ID and MUX_TOKEN_SECRET environment variables",
			}),
			{
				status: 500,
				headers: corsHeaders,
			},
		);
	}

	try {
		// Create Basic Auth header (credentials must be Base64-encoded)
		const credentials = `${MUX_TOKEN_ID}:${MUX_TOKEN_SECRET}`;
		const encoded = Buffer.from(credentials, "utf8").toString("base64");

		// Call Mux API to list assets
		const response = await fetch("https://api.mux.com/video/v1/assets", {
			method: "GET",
			headers: {
				Authorization: `Basic ${encoded}`,
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			// Try to include response body for better debugging
			const body = await response.text();
			throw new Error(
				`Mux API error: ${response.status} ${response.statusText} - ${body}`,
			);
		}

		const data = await response.json();

		// Transform the data to include only ready videos with playback IDs
		// and include a best-effort title from common asset fields
		const videos = data.data.filter(
			(asset: any) =>
				asset.status === "ready" && asset.playback_ids?.length > 0,
		);

		return new Response(JSON.stringify({ videos }), {
			status: 200,
			headers: corsHeaders,
		});
	} catch (error) {
		const errMessage =
			error instanceof Error
				? `${error.message}${error.stack ? "\n" + error.stack : ""}`
				: String(error);
		console.error("Error fetching videos from Mux:", errMessage);

		return new Response(
			JSON.stringify({
				error: "Failed to fetch videos",
				message: error instanceof Error ? error.message : String(error),
				details:
					error instanceof Error && error.stack ? error.stack : undefined,
			}),
			{
				status: 500,
				headers: corsHeaders,
			},
		);
	}
};

export const OPTIONS: APIRoute = async () => {
	return new Response(null, {
		status: 204,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
		},
	});
};
