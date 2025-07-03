import { getTestimonials } from '../../supabase/supabase';

export const GET = async () => {
	const testimonials = await getTestimonials();

	return new Response(JSON.stringify(testimonials), {
		headers: { 'Content-Type': 'application/json' },
	});
};
