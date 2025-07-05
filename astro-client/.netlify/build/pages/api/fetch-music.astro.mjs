import { g as getProducerPlaylist } from '../../chunks/appleMusic_C2fbbrWQ.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async () => {
  try {
    const tracks = await getProducerPlaylist();
    return new Response(JSON.stringify(tracks), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error fetching music tracks:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch tracks" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
