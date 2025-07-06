import jwt from 'jsonwebtoken';

const privateKey = import.meta.env.APPLE_MUSIC_PRIVATE_KEY;
export function generateAppleMusicToken() {
	console.log('Generating token');
	const token = jwt.sign({}, privateKey, {
		algorithm: 'ES256',
		expiresIn: '180d', // Max allowed
		issuer: import.meta.env.APPLE_MUSIC_TEAM_ID,
		header: {
			alg: 'ES256',
			kid: import.meta.env.APPLE_MUSIC_KEY_ID,
		},
	});

	return token;
}
