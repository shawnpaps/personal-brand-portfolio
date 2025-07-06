import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
	try {
		const notionApiKey = import.meta.env.NOTION_API_KEY;
		const notionDatabaseId = import.meta.env.NOTION_DATABASE_ID;

		if (!notionApiKey || !notionDatabaseId) {
			return new Response(
				JSON.stringify({
					error: 'Missing Notion credentials',
					hasApiKey: !!notionApiKey,
					hasDatabaseId: !!notionDatabaseId,
				}),
				{
					status: 400,
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
						'Access-Control-Allow-Headers': 'Content-Type, Authorization',
					},
				}
			);
		}

		// Test the connection by retrieving the database
		const response = await fetch(
			`https://api.notion.com/v1/databases/${notionDatabaseId}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${notionApiKey}`,
					'Content-Type': 'application/json',
					'Notion-Version': '2022-06-28',
				},
			}
		);

		if (!response.ok) {
			const errorText = await response.text();
			return new Response(
				JSON.stringify({
					error: 'Failed to connect to Notion',
					status: response.status,
					details: errorText,
				}),
				{
					status: response.status,
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
						'Access-Control-Allow-Headers': 'Content-Type, Authorization',
					},
				}
			);
		}

		const database = await response.json();

		// Extract property details for debugging
		const propertyDetails = Object.entries(database.properties || {}).map(
			([name, prop]: [string, any]) => ({
				name,
				type: prop.type,
				options:
					prop.select?.options ||
					prop.multi_select?.options ||
					prop.status?.options ||
					null,
				required: prop.type === 'title', // Title is always required
			})
		);

		return new Response(
			JSON.stringify({
				success: true,
				database: {
					title: database.title?.[0]?.plain_text || 'Untitled',
					id: database.id,
					properties: Object.keys(database.properties || {}),
					propertyDetails: propertyDetails,
				},
			}),
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type, Authorization',
				},
			}
		);
	} catch (error) {
		console.error('Notion test error:', error);
		return new Response(
			JSON.stringify({
				error: 'Internal server error',
				details: error instanceof Error ? error.message : 'Unknown error',
			}),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type, Authorization',
				},
			}
		);
	}
};

// Handle OPTIONS requests for CORS preflight
export const OPTIONS: APIRoute = async () => {
	return new Response(null, {
		status: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		},
	});
};
