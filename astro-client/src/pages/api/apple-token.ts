import type { APIRoute } from 'astro';
import { generateAppleMusicToken } from '../../utils/generateToken';

export const GET: APIRoute = async () => {
	try {
		console.log('Getting Apple Music token');
		const token = generateAppleMusicToken();

		return new Response(JSON.stringify({ token }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type, Authorization',
				'Cache-Control': 'public, max-age=3600', // Cache for 1 hour since tokens are reusable
			},
		});
	} catch (error) {
		console.error('Error generating Apple Music token:', error);
		return new Response(JSON.stringify({ error: 'Failed to generate token' }), {
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
