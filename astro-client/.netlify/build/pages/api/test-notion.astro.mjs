export { renderers } from '../../renderers.mjs';

const GET = async () => {
  try {
    const notionApiKey = "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";
    const notionDatabaseId = "5ceb4c0329bd44beac3208314c65c702";
    if (!notionApiKey || !notionDatabaseId) ;
    const response = await fetch(
      `https://api.notion.com/v1/databases/${notionDatabaseId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${notionApiKey}`,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28"
        }
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      return new Response(
        JSON.stringify({
          error: "Failed to connect to Notion",
          status: response.status,
          details: errorText
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const database = await response.json();
    const propertyDetails = Object.entries(database.properties || {}).map(
      ([name, prop]) => ({
        name,
        type: prop.type,
        options: prop.select?.options || prop.multi_select?.options || prop.status?.options || null,
        required: prop.type === "title"
        // Title is always required
      })
    );
    return new Response(
      JSON.stringify({
        success: true,
        database: {
          title: database.title?.[0]?.plain_text || "Untitled",
          id: database.id,
          properties: Object.keys(database.properties || {}),
          propertyDetails
        }
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Notion test error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
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
