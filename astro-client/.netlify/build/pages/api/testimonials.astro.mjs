import { g as getTestimonials } from '../../chunks/supabase_BiQPTC9b.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async () => {
  const testimonials = await getTestimonials();
  return new Response(JSON.stringify(testimonials), {
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
