import type { APIRoute } from 'astro';
import { getProducerPlaylist } from '../../utils/appleMusic';

export const GET: APIRoute = async () => {
	try {
		const tracks = await getProducerPlaylist();

		return new Response(JSON.stringify(tracks), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		console.error('Error fetching music tracks:', error);

		return new Response(JSON.stringify({ error: 'Failed to fetch tracks' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}
};
