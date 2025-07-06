import { apiUrl } from '../data/variables';
const getProducerPlaylist = async () => {
	try {
		const res = await fetch(`${apiUrl}/apple-token`);
		const { token } = await res.json();
		const musicRes = await fetch(
			'https://api.music.apple.com/v1/catalog/us/playlists/pl.u-MDAWX4DuWbx1oRA',
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const musicData = await musicRes.json();

		// Get the raw tracks data
		const tracks = musicData.data[0].relationships.tracks.data;

		// Sort tracks by release date (most recent first)
		const sortedTracks = tracks.sort((a, b) => {
			const dateA = new Date(a.attributes.releaseDate);
			const dateB = new Date(b.attributes.releaseDate);
			return dateB - dateA; // Descending order (newest first)
		});

		return sortedTracks;
	} catch (error) {
		console.error('Error fetching producer playlist:', error);
		// Return empty array as fallback
		return [];
	}
};

export { getProducerPlaylist };
