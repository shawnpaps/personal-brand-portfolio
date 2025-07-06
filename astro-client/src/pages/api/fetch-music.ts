import type { APIRoute } from 'astro';
import { getProducerPlaylist } from '../../utils/appleMusic';

export const GET: APIRoute = async () => {
	try {
		const tracks = await getProducerPlaylist();

		return new Response(JSON.stringify(tracks), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type, Authorization',
				'Cache-Control': 'public, max-age=600', // Cache for 10 minutes
			},
		});
	} catch (error) {
		console.error('Error fetching music tracks:', error);

		return new Response(JSON.stringify({ error: 'Failed to fetch tracks' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type, Authorization',
			},
		});
	}
};
