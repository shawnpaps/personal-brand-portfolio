import { g as getTestimonials } from '../../chunks/supabase_BiQPTC9b.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async ({ request }) => {
  try {
    const testimonials = await getTestimonials();
    return new Response(JSON.stringify(testimonials), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Cache-Control": "public, max-age=300"
        // Cache for 5 minutes
      }
    });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch testimonials" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
