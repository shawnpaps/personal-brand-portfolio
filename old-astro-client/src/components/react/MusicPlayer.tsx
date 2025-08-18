import React, { useEffect, useState } from 'react';
import { getProducerPlaylist } from '../../utils/appleMusic';
import TrackCard from './TrackCard';

const MusicPlayer = () => {
	const [music, setMusic] = useState([]);
	const [showMore, setShowMore] = useState(false);
	const [previewData, setPreviewData] = useState<any>(null);
	const getMusic = async () => {
		const musicData = await getProducerPlaylist();

		// Sort by release date (newest first)
		const sortedMusic = musicData.sort((a: any, b: any) => {
			const dateA = new Date(a.attributes.releaseDate);
			const dateB = new Date(b.attributes.releaseDate);
			return dateB.getTime() - dateA.getTime();
		});

		setMusic(sortedMusic);
		setPreviewData(sortedMusic.slice(0, 6));
	};

	useEffect(() => {
		getMusic();
	}, []);

	return (
		<div className="mx-auto bg-moody-800/50 rounded-lg border border-warm-500/20 p-8">
			{music.length > 0 ? (
				<>
					<div
						className={`grid grid-cols-2 md:grid-cols-3 gap-4 ${
							showMore ? 'max-h-[600px] overflow-y-auto pr-2' : ''
						}`}
						style={{
							scrollbarWidth: 'thin',
							scrollbarColor: '#f27522 #343a40',
						}}>
						{!showMore
							? previewData.map((track: any) => (
									<TrackCard key={track.id} track={track} />
							  ))
							: music.map((track: any) => (
									<TrackCard key={track.id} track={track} />
							  ))}
					</div>

					<button
						onClick={() => setShowMore(!showMore)}
						className="mt-6 w-full py-3 bg-warm-500/10 text-warm-400 rounded-lg border border-warm-500/20 hover:bg-warm-500/20 transition-colors duration-300">
						{showMore ? 'Show Less' : 'Show More'}
					</button>
				</>
			) : (
				<div className="text-center py-12">
					{/* Spinner */}
					<div className="relative w-16 h-16 mx-auto mb-4">
						{/* Outer ring */}
						<div className="absolute inset-0 border-4 border-warm-500/20 rounded-full"></div>
						{/* Spinning ring */}
						<div className="absolute inset-0 border-4 border-transparent border-t-warm-400 rounded-full animate-spin"></div>
						{/* Inner glow */}
						<div className="absolute inset-2 bg-gradient-to-br from-warm-500/10 to-transparent rounded-full animate-pulse"></div>
					</div>

					{/* Loading text */}
					<div className="text-warm-400 font-heading text-lg tracking-wider">
						LOADING TRACKS
					</div>
					<div className="text-moody-400 text-sm mt-2">
						Spinning up the vinyl...
					</div>
				</div>
			)}
		</div>
	);
};

export default MusicPlayer;
