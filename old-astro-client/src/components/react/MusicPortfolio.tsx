import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Track {
	id: string;
	attributes: {
		name: string;
		artistName: string;
		albumName: string;
		artwork: {
			url: string;
		};
		previews?: Array<{
			url: string;
		}>;
		releaseDate: string;
		url: string;
	};
}

interface MusicPortfolioProps {
	tracks: Track[];
}

const MusicPortfolio: React.FC<MusicPortfolioProps> = ({ tracks }) => {
	const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
	const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

	const handlePlayPreview = async (track: Track) => {
		const previewUrl = track.attributes.previews?.[0]?.url;
		if (!previewUrl) return;

		// Stop currently playing track
		if (audio) {
			audio.pause();
			audio.currentTime = 0;
		}

		// If clicking the same track, stop it
		if (currentlyPlaying === track.id) {
			setCurrentlyPlaying(null);
			setAudio(null);
			return;
		}

		// Play new track
		const newAudio = new Audio(previewUrl);
		newAudio.volume = 0.7;

		newAudio.addEventListener('ended', () => {
			setCurrentlyPlaying(null);
			setAudio(null);
		});

		try {
			await newAudio.play();
			setCurrentlyPlaying(track.id);
			setAudio(newAudio);
		} catch (error) {
			console.error('Error playing preview:', error);
		}
	};

	const formatReleaseDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
		});
	};

	return (
		<div className="space-y-12">
			{/* Section Header */}
			<div className="text-center mb-16">
				<h2 className="font-display text-4xl md:text-5xl font-bold text-warm-400 mb-6 tracking-wider">
					DEFINE YOUR SONIC IDENTITY
				</h2>
				<p className="font-body text-xl text-moody-400 max-w-3xl mx-auto leading-relaxed">
					See & hear how I've helped artists & brands just like you bring their
					vision to life.
				</p>
			</div>

			{/* Tracks Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{tracks.map((track, index) => (
					<motion.div
						key={track.id}
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1, duration: 0.6 }}
						className="group">
						<div className="relative bg-moody-800/30 backdrop-blur-sm border border-warm-500/20 rounded-2xl overflow-hidden hover:border-warm-400/40 transition-all duration-500">
							{/* Artwork Container */}
							<div className="relative aspect-square overflow-hidden">
								<img
									src={track.attributes.artwork.url
										.replace('{w}', '600')
										.replace('{h}', '600')}
									alt={`${track.attributes.name} by ${track.attributes.artistName}`}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
								/>

								{/* Overlay with Play Button */}
								<div className="absolute inset-0 bg-gradient-to-t from-moody-900/80 via-moody-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
									<button
										onClick={() => handlePlayPreview(track)}
										className="absolute inset-0 flex items-center justify-center text-warm-400 hover:text-warm-300 transition-colors duration-300">
										{currentlyPlaying === track.id ? (
											<motion.div
												animate={{ rotate: 360 }}
												transition={{
													duration: 1,
													repeat: Infinity,
													ease: 'linear',
												}}
												className="w-16 h-16 bg-moody-900/80 rounded-full flex items-center justify-center border-2 border-warm-400">
												<svg
													className="w-8 h-8"
													fill="currentColor"
													viewBox="0 0 24 24">
													<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
												</svg>
											</motion.div>
										) : (
											<div className="w-16 h-16 bg-moody-900/80 rounded-full flex items-center justify-center border-2 border-warm-400 group-hover:scale-110 transition-transform duration-300">
												<svg
													className="w-8 h-8 ml-1"
													fill="currentColor"
													viewBox="0 0 24 24">
													<path d="M8 5v14l11-7z" />
												</svg>
											</div>
										)}
									</button>
								</div>

								{/* Preview Available Badge */}
								{track.attributes.previews?.[0]?.url && (
									<div className="absolute top-3 right-3 bg-warm-500/90 text-moody-900 text-xs font-heading font-semibold px-2 py-1 rounded-full">
										PREVIEW
									</div>
								)}
							</div>

							{/* Track Info */}
							<div className="p-6">
								<div className="space-y-3">
									<h3 className="font-heading text-xl font-bold text-warm-400 tracking-wider line-clamp-2">
										{track.attributes.name}
									</h3>
									<p className="text-moody-300 font-body">
										{track.attributes.artistName}
									</p>
									<p className="text-moody-400 text-sm font-body">
										{track.attributes.albumName}
									</p>
									<p className="text-moody-500 text-xs font-body">
										{formatReleaseDate(track.attributes.releaseDate)}
									</p>
								</div>

								{/* Action Buttons */}
								{/* <div className="flex gap-3 mt-6">
									<a
										href={`/music/${track.id}`}
										className="flex-1 px-4 py-2 bg-warm-500/10 border border-warm-500/30 text-warm-400 font-heading text-sm tracking-wider uppercase hover:bg-warm-500/20 hover:border-warm-400 transition-all duration-300 rounded-lg text-center">
										Case Study
									</a>
									<a
										href={track.attributes.url}
										target="_blank"
										rel="noopener noreferrer"
										className="px-4 py-2 bg-moody-800/50 border border-warm-500/20 text-warm-400 font-heading text-sm tracking-wider uppercase hover:bg-warm-500/10 hover:border-warm-400 transition-all duration-300 rounded-lg">
										<svg
											className="w-4 h-4"
											fill="currentColor"
											viewBox="0 0 24 24">
											<path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
										</svg>
									</a>
								</div> */}
							</div>
						</div>
					</motion.div>
				))}
			</div>

			{/* Empty State */}
			{tracks.length === 0 && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="text-center py-20">
					<div className="w-24 h-24 bg-warm-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
						<svg
							className="w-12 h-12 text-warm-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
						</svg>
					</div>
					<h3 className="text-2xl font-heading font-bold text-warm-400 mb-4">
						No Tracks Available
					</h3>
					<p className="text-moody-400">
						Check back soon for new music releases.
					</p>
				</motion.div>
			)}
		</div>
	);
};

export default MusicPortfolio;
