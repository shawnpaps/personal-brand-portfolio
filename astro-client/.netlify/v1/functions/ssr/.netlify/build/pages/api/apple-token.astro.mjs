import jwt from 'jsonwebtoken';
export { renderers } from '../../renderers.mjs';

const privateKey = "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgtIKHJ/BuQ0imK6Xe\n1pDZ2k58mjcx/RQLU/6QXS4Sb6mgCgYIKoZIzj0DAQehRANCAAQaU5wKmzP9Z9Jo\neiZ5wRw72lBXUGIN20frw72JQvK1UBJRV1u9Lh70VUsIo/JxoxBdiARUwYugRGdO\nAnNHffF8\n-----END PRIVATE KEY-----";
function generateAppleMusicToken() {
  console.log("Generating token");
  const token = jwt.sign({}, privateKey, {
    algorithm: "ES256",
    expiresIn: "180d",
    // Max allowed
    issuer: "FA5PHSX25S",
    header: {
      alg: "ES256",
      kid: "F247AY8D6N"
    }
  });
  return token;
}

const GET = async () => {
  try {
    console.log("Getting Apple Music token");
    const token = generateAppleMusicToken();
    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Cache-Control": "public, max-age=3600"
        // Cache for 1 hour since tokens are reusable
      }
    });
  } catch (error) {
    console.error("Error generating Apple Music token:", error);
    return new Response(JSON.stringify({ error: "Failed to generate token" }), {
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
