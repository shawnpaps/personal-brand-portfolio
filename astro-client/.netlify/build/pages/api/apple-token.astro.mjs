import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';
export { renderers } from '../../renderers.mjs';

const privateKey = fs.readFileSync(
	path.join(process.cwd(), 'AuthKey_F247AY8D6N.p8')
);

function generateAppleMusicToken() {
	console.log('Generating token');
	const token = jwt.sign({}, privateKey, {
		algorithm: 'ES256',
		expiresIn: '180d', // Max allowed
		issuer: 'FA5PHSX25S',
		header: {
			alg: 'ES256',
			kid: 'F247AY8D6N',
		},
	});

	return token;
}

const GET = async () => {
  console.log("Getting token");
  const token = generateAppleMusicToken();
  return new Response(JSON.stringify({ token }), {
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
