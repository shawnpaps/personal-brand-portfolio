import jwt from 'jsonwebtoken';

const privateKey = process.env.APPLE_MUSIC_PRIVATE_KEY;
export function generateAppleMusicToken() {
	console.log('Generating token');
	const token = jwt.sign({}, privateKey, {
		algorithm: 'ES256',
		expiresIn: '180d', // Max allowed
		issuer: process.env.APPLE_MUSIC_TEAM_ID,
		header: {
			alg: 'ES256',
			kid: process.env.APPLE_MUSIC_KEY_ID,
		},
	});

	return token;
}
