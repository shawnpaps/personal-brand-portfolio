import { generateAppleMusicToken } from '../../utils/generateToken';

export const GET = async () => {
	console.log('Getting token');
	const token = generateAppleMusicToken();

	return new Response(JSON.stringify({ token }), {
		headers: { 'Content-Type': 'application/json' },
	});
};
