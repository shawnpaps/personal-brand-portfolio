import type { APIRoute } from 'astro';
import { getTestimonials } from '../../supabase/supabase';

export const GET: APIRoute = async ({ request }) => {
	try {
		const testimonials = await getTestimonials();

		return new Response(JSON.stringify(testimonials), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type, Authorization',
				'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
			},
		});
	} catch (error) {
		console.error('Error fetching testimonials:', error);
		return new Response(
			JSON.stringify({ error: 'Failed to fetch testimonials' }),
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
