export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const formData = await request.json();
    if (!formData.name || !formData.email || !formData.workType) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const notionApiKey = "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";
    const notionDatabaseId = "5ceb4c0329bd44beac3208314c65c702";
    if (notionApiKey && notionDatabaseId) {
      try {
        const notionPayload = {
          parent: {
            database_id: notionDatabaseId
          },
          properties: {
            "Company Name": {
              title: [
                {
                  text: {
                    content: formData.name
                  }
                }
              ]
            },
            "Contact Name": {
              rich_text: [
                {
                  text: {
                    content: formData.name
                  }
                }
              ]
            },
            "Contact Email": {
              email: formData.email
            },
            Tags: {
              multi_select: [
                {
                  name: formData.workType === "photography" ? "Photography" : formData.workType === "audio" ? "Producer" : "Other"
                }
              ]
            },
            "Client Message": {
              rich_text: [
                {
                  text: {
                    content: formData.notes || "No additional notes provided"
                  }
                }
              ]
            },
            "Subscribe to Emails": {
              checkbox: formData.emailConsent
            },
            "Lead Status": {
              status: {
                name: "Need To Call"
              }
            },
            "Date of First Contact": {
              date: {
                start: (/* @__PURE__ */ new Date()).toISOString()
              }
            }
          }
        };
        const notionResponse = await fetch("https://api.notion.com/v1/pages", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${notionApiKey}`,
            "Content-Type": "application/json",
            "Notion-Version": "2022-06-28"
          },
          body: JSON.stringify(notionPayload)
        });
        if (!notionResponse.ok) {
          const errorText = await notionResponse.text();
          console.error("Notion API failed:", {
            status: notionResponse.status,
            statusText: notionResponse.statusText,
            error: errorText,
            payload: notionPayload,
            databaseId: notionDatabaseId
          });
        } else {
          console.log("Successfully created Notion page");
        }
      } catch (error) {
        console.error("Error sending to Notion:", error);
      }
    }
    const mailgunApiKey = undefined                               ;
    const mailgunDomain = undefined                              ;
    if (mailgunApiKey && mailgunDomain) ;
    return new Response(
      JSON.stringify({ success: true, message: "Message sent successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
      }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
      }
    });
  }
};
const OPTIONS = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	OPTIONS,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
