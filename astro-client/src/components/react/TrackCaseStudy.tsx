import React, { useState } from 'react';
import { motion } from 'motion/react';

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

interface TrackCaseStudyProps {
	track: Track;
}

const TrackCaseStudy: React.FC<TrackCaseStudyProps> = ({ track }) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

	const handlePlayPreview = async () => {
		const previewUrl = track.attributes.previews?.[0]?.url;
		if (!previewUrl) return;

		if (audio) {
			audio.pause();
			audio.currentTime = 0;
		}

		if (isPlaying) {
			setIsPlaying(false);
			setAudio(null);
			return;
		}

		const newAudio = new Audio(previewUrl);
		newAudio.volume = 0.7;

		newAudio.addEventListener('ended', () => {
			setIsPlaying(false);
			setAudio(null);
		});

		try {
			await newAudio.play();
			setIsPlaying(true);
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
			day: 'numeric',
		});
	};

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
				{/* Background Elements */}
				<div className="absolute inset-0 bg-gradient-to-br from-moody-900/50 to-moody-800/30"></div>
				<div className="absolute top-20 left-10 w-64 h-64 bg-warm-500/10 rounded-full blur-3xl"></div>
				<div className="absolute bottom-20 right-10 w-80 h-80 bg-warm-600/10 rounded-full blur-3xl"></div>

				<div className="max-w-7xl mx-auto relative z-10">
					{/* Back Button */}
					<motion.a
						href="/music"
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						className="inline-flex items-center space-x-2 text-warm-400 hover:text-warm-300 transition-colors duration-300 mb-8">
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M15 19l-7-7 7-7"></path>
						</svg>
						<span className="font-heading tracking-wider">
							Back to Portfolio
						</span>
					</motion.a>

					<div className="grid lg:grid-cols-2 gap-12 items-center">
						{/* Track Artwork */}
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.6 }}
							className="relative group">
							<div className="aspect-square rounded-2xl overflow-hidden relative">
								{/* Glow Effect */}
								<div className="absolute inset-0 bg-gradient-to-br from-warm-500/20 via-warm-400/10 to-warm-600/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>

								{/* Image Container */}
								<div className="relative z-10 w-full h-full rounded-2xl border-2 border-warm-500/30 group-hover:border-warm-400/50 transition-all duration-500 overflow-hidden">
									<img
										src={track.attributes.artwork.url
											.replace('{w}', '600')
											.replace('{h}', '600')}
										alt={`${track.attributes.name} by ${track.attributes.artistName}`}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
									/>

									{/* Play Overlay */}
									{track.attributes.previews?.[0]?.url && (
										<div className="absolute inset-0 bg-gradient-to-t from-moody-900/80 via-moody-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
											<button
												onClick={handlePlayPreview}
												className="absolute inset-0 flex items-center justify-center text-warm-400 hover:text-warm-300 transition-colors duration-300">
												{isPlaying ? (
													<motion.div
														animate={{ rotate: 360 }}
														transition={{
															duration: 1,
															repeat: Infinity,
															ease: 'linear',
														}}
														className="w-20 h-20 bg-moody-900/80 rounded-full flex items-center justify-center border-2 border-warm-400">
														<svg
															className="w-10 h-10"
															fill="currentColor"
															viewBox="0 0 24 24">
															<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
														</svg>
													</motion.div>
												) : (
													<div className="w-20 h-20 bg-moody-900/80 rounded-full flex items-center justify-center border-2 border-warm-400 group-hover:scale-110 transition-transform duration-300">
														<svg
															className="w-10 h-10 ml-1"
															fill="currentColor"
															viewBox="0 0 24 24">
															<path d="M8 5v14l11-7z" />
														</svg>
													</div>
												)}
											</button>
										</div>
									)}
								</div>
							</div>
						</motion.div>

						{/* Track Info */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="space-y-8">
							<div>
								<h1 className="font-display text-4xl md:text-6xl font-bold text-warm-400 mb-4 tracking-wider">
									{track.attributes.name}
								</h1>
								<p className="text-2xl text-moody-300 font-body mb-2">
									{track.attributes.artistName}
								</p>
								<p className="text-moody-400 font-body">
									{track.attributes.albumName}
								</p>
							</div>

							<div className="space-y-4">
								<div className="flex items-center space-x-4">
									<div className="w-12 h-12 bg-warm-500/20 rounded-full flex items-center justify-center">
										<svg
											className="w-6 h-6 text-warm-400"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
										</svg>
									</div>
									<div>
										<p className="font-heading text-warm-400 font-semibold tracking-wider">
											RELEASE DATE
										</p>
										<p className="text-moody-300">
											{formatReleaseDate(track.attributes.releaseDate)}
										</p>
									</div>
								</div>

								{track.attributes.previews?.[0]?.url && (
									<div className="flex items-center space-x-4">
										<div className="w-12 h-12 bg-warm-500/20 rounded-full flex items-center justify-center">
											<svg
												className="w-6 h-6 text-warm-400"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
											</svg>
										</div>
										<div>
											<p className="font-heading text-warm-400 font-semibold tracking-wider">
												PREVIEW
											</p>
											<p className="text-moody-300">Available</p>
										</div>
									</div>
								)}
							</div>

							<div className="flex flex-col sm:flex-row gap-4">
								<a
									href={track.attributes.url}
									target="_blank"
									rel="noopener noreferrer"
									className="px-8 py-4 bg-gradient-to-r from-warm-500 to-warm-600 text-moody-900 font-heading font-semibold tracking-wider uppercase hover:from-warm-400 hover:to-warm-500 transition-all duration-300 transform hover:scale-105 rounded-xl text-center">
									Listen on Apple Music
								</a>
								{track.attributes.previews?.[0]?.url && (
									<button
										onClick={handlePlayPreview}
										className="px-8 py-4 bg-moody-800/50 border border-warm-500/20 text-warm-400 font-heading font-semibold tracking-wider uppercase hover:bg-warm-500/10 hover:border-warm-400 transition-all duration-300 transform hover:scale-105 rounded-xl">
										{isPlaying ? 'Stop Preview' : 'Play Preview'}
									</button>
								)}
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Case Study Content */}
			<section className="py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="space-y-12">
						{/* Case Study Header */}
						<div className="text-center">
							<h2 className="font-display text-3xl md:text-4xl font-bold text-warm-400 mb-6 tracking-wider">
								CASE STUDY
							</h2>
							<div className="w-24 h-1 bg-gradient-to-r from-warm-500 to-warm-600 mx-auto mb-8"></div>
						</div>

						{/* Placeholder Content */}
						<div className="bg-moody-800/30 backdrop-blur-sm border border-warm-500/20 rounded-2xl p-8">
							<h3 className="text-2xl font-heading font-semibold text-warm-400 mb-4">
								The Creative Process
							</h3>
							<p className="text-moody-300 leading-relaxed mb-6">
								This case study is coming soon. Here you'll find detailed
								insights into the creative process, production techniques, and
								the story behind this track.
							</p>
							<div className="grid md:grid-cols-2 gap-6">
								<div className="space-y-3">
									<h4 className="font-heading text-warm-400 font-semibold tracking-wider">
										PRODUCTION NOTES
									</h4>
									<p className="text-moody-400 text-sm">
										Details about the production process, equipment used, and
										technical decisions.
									</p>
								</div>
								<div className="space-y-3">
									<h4 className="font-heading text-warm-400 font-semibold tracking-wider">
										INSPIRATION
									</h4>
									<p className="text-moody-400 text-sm">
										The creative inspiration, influences, and artistic vision
										behind the track.
									</p>
								</div>
							</div>
						</div>

						{/* Technical Details */}
						<div className="bg-moody-800/30 backdrop-blur-sm border border-warm-500/20 rounded-2xl p-8">
							<h3 className="text-2xl font-heading font-semibold text-warm-400 mb-6">
								Technical Details
							</h3>
							<div className="grid md:grid-cols-3 gap-6">
								<div className="text-center">
									<div className="text-2xl font-heading font-bold text-warm-400 mb-2">
										Genre
									</div>
									<div className="text-moody-300">Coming Soon</div>
								</div>
								<div className="text-center">
									<div className="text-2xl font-heading font-bold text-warm-400 mb-2">
										BPM
									</div>
									<div className="text-moody-300">Coming Soon</div>
								</div>
								<div className="text-center">
									<div className="text-2xl font-heading font-bold text-warm-400 mb-2">
										Key
									</div>
									<div className="text-moody-300">Coming Soon</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	);
};

export default TrackCaseStudy;
