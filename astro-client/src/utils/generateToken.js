import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';

const privateKey = fs.readFileSync(
	path.join(process.cwd(), 'AuthKey_F247AY8D6N.p8')
);

export function generateAppleMusicToken() {
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
