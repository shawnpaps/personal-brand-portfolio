import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

// Global audio state to ensure only one track plays at a time
let globalAudioRef: HTMLAudioElement | null = null;
let globalPlayingTrackId: string | null = null;

const TrackCard = ({ track }: { track: any }) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	const handlePlay = () => {
		if (!track.attributes.previews?.[0]?.url) {
			console.log('No preview URL available for this track');
			return;
		}

		// Stop any currently playing track
		if (globalAudioRef && globalPlayingTrackId !== track.id) {
			globalAudioRef.pause();
			globalAudioRef.currentTime = 0;
		}

		if (audioRef.current) {
			if (isPlaying) {
				// Pause current track
				audioRef.current.pause();
				setIsPlaying(false);
				globalPlayingTrackId = null;
				globalAudioRef = null;
			} else {
				// Play this track
				audioRef.current.play();
				setIsPlaying(true);
				globalPlayingTrackId = track.id;
				globalAudioRef = audioRef.current;
			}
		}
	};

	const handleAudioEnded = () => {
		setIsPlaying(false);
		globalPlayingTrackId = null;
		globalAudioRef = null;
	};

	// Listen for global audio changes
	useEffect(() => {
		const checkGlobalAudio = () => {
			if (globalPlayingTrackId !== track.id && isPlaying) {
				setIsPlaying(false);
			}
		};

		// Check periodically for global audio changes
		const interval = setInterval(checkGlobalAudio, 100);
		return () => clearInterval(interval);
	}, [track.id, isPlaying]);

	return (
		<motion.div
			key={track.id}
			initial={{ opacity: 0, y: 20, rotateY: -15 }}
			animate={{ opacity: 1, y: 0, rotateY: 0 }}
			transition={{ duration: 0.6, ease: 'easeOut' }}
			whileHover={{
				scale: 1.05,
				rotateY: 5,
				z: 50,
				transition: { duration: 0.3, ease: 'easeOut' },
			}}
			className="group relative perspective-1000 cursor-pointer">
			{/* Vinyl Record Container */}
			<div className="relative w-64 h-64 bg-gradient-to-br from-moody-800 to-moody-900 rounded-full shadow-2xl border-4 border-warm-500/20 hover:border-warm-400/40 transition-all duration-500 overflow-hidden">
				{/* Record Grooves Effect */}
				<div className="absolute inset-0 bg-gradient-to-br from-transparent via-moody-700/30 to-transparent rounded-full"></div>
				<div className="absolute inset-4 bg-gradient-to-br from-moody-900 via-moody-800 to-moody-900 rounded-full border border-moody-600/30"></div>

				{/* Center Hole */}
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-moody-900 rounded-full border-2 border-warm-500/30 z-10"></div>

				{/* Album Artwork */}
				<div className="absolute inset-8 rounded-full overflow-hidden">
					<motion.img
						src={track.attributes.artwork.url
							.replace('{w}', '200')
							.replace('{h}', '200')}
						alt={track.attributes.name}
						className="w-full h-full object-cover"
						whileHover={{ scale: 1.1 }}
						transition={{ duration: 0.3 }}
					/>
				</div>

				{/* Vinyl Label Overlay */}

				{/* Hover Glow Effect */}
				<div className="absolute inset-0 bg-gradient-to-br from-warm-500/0 via-warm-400/0 to-warm-500/0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

				{/* Full Overlay Play Button */}
				<motion.button
					onClick={handlePlay}
					className="absolute inset-0 bg-moody-900/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-moody-900/90"
					initial={{ scale: 0.8 }}
					whileHover={{ scale: 1 }}
					transition={{ duration: 0.2 }}>
					<div className="w-16 h-16 bg-warm-500/90 rounded-full flex items-center justify-center shadow-lg hover:bg-warm-400 transition-colors duration-200">
						{isPlaying ? (
							<svg
								className="w-8 h-8 text-moody-900"
								fill="currentColor"
								viewBox="0 0 24 24">
								<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
							</svg>
						) : (
							<svg
								className="w-8 h-8 text-moody-900 ml-1"
								fill="currentColor"
								viewBox="0 0 24 24">
								<path d="M8 5v14l11-7z" />
							</svg>
						)}
					</div>
				</motion.button>
			</div>

			{/* Track Info Below Record */}
			<motion.div
				className="mt-4 text-center"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.3, duration: 0.5 }}>
				<h3 className="text-warm-400 font-bold text-lg truncate max-w-64">
					{track.attributes.name}
				</h3>
				<p className="text-moody-400 text-sm truncate max-w-64">
					{track.attributes.artistName}
				</p>
				<div className="text-warm-500/60 text-xs mt-1 font-mono">
					{Math.floor(track.attributes.durationInMillis / 60000)}:
					{String(
						Math.floor((track.attributes.durationInMillis % 60000) / 1000)
					).padStart(2, '0')}
				</div>
			</motion.div>

			{/* Floating Particles Effect */}
			<motion.div
				className="absolute -top-2 -right-2 w-3 h-3 bg-warm-400/60 rounded-full"
				animate={{
					y: [0, -10, 0],
					opacity: [0.6, 1, 0.6],
				}}
				transition={{
					duration: 2,
					repeat: Infinity,
					ease: 'easeInOut',
					delay: Math.random() * 2,
				}}
			/>
			<motion.div
				className="absolute -bottom-1 -left-1 w-2 h-2 bg-warm-500/40 rounded-full"
				animate={{
					y: [0, -8, 0],
					opacity: [0.4, 0.8, 0.4],
				}}
				transition={{
					duration: 1.5,
					repeat: Infinity,
					ease: 'easeInOut',
					delay: Math.random() * 1.5,
				}}
			/>

			{/* Hidden Audio Element */}
			{track.attributes.previews?.[0]?.url && (
				<audio
					ref={audioRef}
					src={track.attributes.previews[0].url}
					onEnded={handleAudioEnded}
					preload="none"
				/>
			)}
		</motion.div>
	);
};

export default TrackCard;
