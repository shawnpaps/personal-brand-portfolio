import type { APIRoute } from 'astro';

// CORS headers for all API responses
export const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
	'Access-Control-Max-Age': '86400',
};

// Helper function to create API responses with CORS headers
export const createApiResponse = (
	data: any,
	status: number = 200,
	additionalHeaders: Record<string, string> = {}
) => {
	return new Response(JSON.stringify(data), {
		status,
		headers: {
			'Content-Type': 'application/json',
			...corsHeaders,
			...additionalHeaders,
		},
	});
};

// Helper function to create error responses with CORS headers
export const createErrorResponse = (
	error: string,
	status: number = 500,
	additionalHeaders: Record<string, string> = {}
) => {
	return createApiResponse({ error }, status, additionalHeaders);
};

// Standard OPTIONS handler for CORS preflight requests
export const handleOptions: APIRoute = async () => {
	return new Response(null, {
		status: 200,
		headers: corsHeaders,
	});
};

// Helper to add cache headers
export const addCacheHeaders = (
	headers: Record<string, string>,
	maxAge: number = 300
) => {
	return {
		...headers,
		'Cache-Control': `public, max-age=${maxAge}`,
	};
};
