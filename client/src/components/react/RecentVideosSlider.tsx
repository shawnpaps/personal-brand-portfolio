import React, { useState, useEffect, useRef } from "react";
import MuxPlayer from "@mux/mux-player-react/lazy";

interface Video {
	id: string;
	playbackId?: string;
	playback_id?: string;
	playback_ids?: Array<{ id: string }>;
	duration?: number;
	aspectRatio?: string;
	aspect_ratio?: string;
	createdAt?: string;
	created_at?: string;
	metadata?: { name?: string };
	title?: string;
}

const RecentVideosSlider = () => {
	const [videos, setVideos] = useState<Video[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const fetchVideos = async () => {
			try {
				const response = await fetch("/api/get-videos");

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();

				if (data.error) {
					throw new Error(data.message || data.error);
				}

				const showcaseVideos = data.videos.filter(
					(video) => video.meta.creator_id === "spm-showcase",
				);

				// Sort by created_at and get the 4 most recent
				const sortedVideos = (data.videos || [])
					.sort((a: Video, b: Video) => {
						const dateA = new Date(a.created_at || a.createdAt || 0).getTime();
						const dateB = new Date(b.created_at || b.createdAt || 0).getTime();
						return dateB - dateA;
					})
					.slice(0, 4);

				setVideos(sortedVideos);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to load videos");
				console.error("Error fetching videos:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchVideos();
	}, []);

	console.log("Fetched videos:", videos);
	const extractPlaybackId = (video: Video): string | null => {
		if (video.playbackId) return video.playbackId;
		if (video.playback_id) return video.playback_id;
		if (video.playback_ids && video.playback_ids.length > 0) {
			return video.playback_ids[0].id;
		}
		return null;
	};

	const extractTitle = (video: Video): string => {
		if (video.meta?.title) return video.meta.title;
		if (video.title) return video.title;
		if (video.id) return `Video ${video.id.slice(0, 8)}`;
		return "Untitled Video";
	};

	const scrollToIndex = (index: number) => {
		if (scrollContainerRef.current) {
			const container = scrollContainerRef.current;
			const cardWidth = container.scrollWidth / videos.length;
			container.scrollTo({
				left: cardWidth * index,
				behavior: "smooth",
			});
		}
		setCurrentIndex(index);
	};

	const handlePrev = () => {
		const newIndex = currentIndex > 0 ? currentIndex - 1 : videos.length - 1;
		scrollToIndex(newIndex);
	};

	const handleNext = () => {
		const newIndex = currentIndex < videos.length - 1 ? currentIndex + 1 : 0;
		scrollToIndex(newIndex);
	};

	if (loading) {
		return (
			<div className="py-12 px-6">
				<div className="text-center">
					<div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-rust-500 border-r-transparent mb-4" />
					<p className="text-steel-300">Loading recent work...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="py-12 px-6">
				<div className="text-center bg-black-soft/50 p-8 rounded-lg border border-rust-500/20">
					<p className="text-rust-500 text-lg font-semibold mb-2">Error</p>
					<p className="text-steel-300">{error}</p>
				</div>
			</div>
		);
	}

	if (videos.length === 0) {
		return (
			<div className="py-12 px-6">
				<p className="text-steel-300 text-lg text-center">
					No videos available yet. Check back soon!
				</p>
			</div>
		);
	}

	return (
		<div className="py-16 relative">
			<h3 className="text-3xl md:text-4xl font-black text-white text-center mb-16 uppercase">
				Recent Work
			</h3>

			<div className="relative max-w-7xl mx-auto mt-12">
				{/* Navigation Arrows */}
				{videos.length > 1 && (
					<>
						<button
							onClick={handlePrev}
							className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-rust-500 hover:bg-rust-600 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 -ml-6 hidden md:flex"
							aria-label="Previous video"
						>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<polyline points="15 18 9 12 15 6" />
							</svg>
						</button>

						<button
							onClick={handleNext}
							className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-rust-500 hover:bg-rust-600 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 -mr-6 hidden md:flex"
							aria-label="Next video"
						>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<polyline points="9 18 15 12 9 6" />
							</svg>
						</button>
					</>
				)}

				{/* Scrollable Container */}
				<div
					ref={scrollContainerRef}
					className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
					style={{
						scrollbarWidth: "none",
						msOverflowStyle: "none",
					}}
				>
					<div className="flex gap-6 px-6 md:px-12">
						{videos.map((video, index) => {
							const playbackId = extractPlaybackId(video);
							const title = extractTitle(video);

							return (
								<div
									key={video.id || index}
									className="flex-shrink-0 w-full md:w-[calc(70%-12px)] lg:w-[calc(60%-12px)] snap-center"
								>
									<div className="bg-black-soft rounded-lg overflow-hidden shadow-xl border border-steel-800/30 hover:border-rust-500/50 transition-all duration-300 hover:scale-[1.02]">
										<div className="relative aspect-video bg-black">
											{playbackId ? (
												<MuxPlayer
													playbackId={playbackId}
													title={title}
													thumbnailTime={2}
													accentColor="#E63946"
													className="w-full h-full"
													style={{
														width: "100%",
														height: "100%",
														display: "block",
													}}
													metadata={{
														videoTitle: title,
													}}
												/>
											) : (
												<div className="w-full h-full flex items-center justify-center text-steel-500">
													No playback available
												</div>
											)}
										</div>
										<div className="p-6 bg-gradient-to-b from-black-soft to-black">
											<h4 className="text-xl font-bold text-white truncate">
												{title}
											</h4>
											{video.duration && (
												<p className="text-sm text-steel-400 mt-1">
													{Math.floor(video.duration / 60)}:
													{String(Math.floor(video.duration % 60)).padStart(
														2,
														"0",
													)}
												</p>
											)}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* Dots Indicator */}
				{videos.length > 1 && (
					<div className="flex justify-center gap-2 mt-8">
						{videos.map((_, index) => (
							<button
								key={index}
								onClick={() => scrollToIndex(index)}
								className={`w-2 h-2 rounded-full transition-all duration-300 ${
									index === currentIndex
										? "bg-rust-500 w-8"
										: "bg-steel-600 hover:bg-steel-500"
								}`}
								aria-label={`Go to video ${index + 1}`}
							/>
						))}
					</div>
				)}

				{/* Mobile Swipe Hint */}
				<div className="md:hidden text-center mt-4">
					<p className="text-steel-500 text-sm">← Swipe to see more →</p>
				</div>
			</div>

			<style>
				{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
			</style>
		</div>
	);
};

export default RecentVideosSlider;
