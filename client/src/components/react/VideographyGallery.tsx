import React, { useState, useEffect } from "react";
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
	meta?: {
		title?: string;
		description?: string;
		industry?: string;
		type?: string[];
		client?: string;
	};
	metadata?: { name?: string };
	title?: string;
}

const VideographyGallery = () => {
	const [videos, setVideos] = useState<Video[]>([]);
	const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [activeFilter, setActiveFilter] = useState<string>("all");
	const [activeIndustry, setActiveIndustry] = useState<string>("all");

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

				// Sort by created_at (most recent first)
				const sortedVideos = (data.videos || []).sort((a: Video, b: Video) => {
					const dateA = new Date(a.created_at || a.createdAt || 0).getTime();
					const dateB = new Date(b.created_at || b.createdAt || 0).getTime();
					return dateB - dateA;
				});

				setVideos(sortedVideos);
				setFilteredVideos(sortedVideos);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to load videos");
				console.error("Error fetching videos:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchVideos();
	}, []);

	useEffect(() => {
		let filtered = videos;

		// Filter by type
		if (activeFilter !== "all") {
			filtered = filtered.filter((video) => {
				const types = video.meta?.type || [];
				return types.includes(activeFilter);
			});
		}

		// Filter by industry
		if (activeIndustry !== "all") {
			filtered = filtered.filter((video) => {
				return video.meta?.industry === activeIndustry;
			});
		}

		setFilteredVideos(filtered);
	}, [activeFilter, activeIndustry, videos]);

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
		if (video.metadata?.name) return video.metadata.name;
		if (video.title) return video.title;
		if (video.id) return `Video ${video.id.slice(0, 8)}`;
		return "Untitled Video";
	};

	const formatDuration = (seconds?: number): string => {
		if (!seconds) return "";
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${String(secs).padStart(2, "0")}`;
	};

	// Get unique types and industries for filters
	const videoTypes = [
		...new Set(
			videos.flatMap((v) => v.meta?.type || []).filter((t) => t && t !== ""),
		),
	];

	const industries = [
		...new Set(
			videos
				.map((v) => v.meta?.industry)
				.filter((i) => i && i !== ""),
		),
	];

	if (loading) {
		return (
			<div className="min-h-[50vh] flex items-center justify-center px-6 py-24">
				<div className="text-center">
					<div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-rust-500 border-r-transparent mb-4" />
					<p className="text-steel-300 text-lg">Loading videos...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-[50vh] flex items-center justify-center px-6 py-24">
				<div className="text-center bg-black-soft/50 p-8 rounded-lg border border-rust-500/20 max-w-md">
					<p className="text-rust-500 text-xl font-semibold mb-2">
						Error Loading Videos
					</p>
					<p className="text-steel-300">{error}</p>
				</div>
			</div>
		);
	}

	if (videos.length === 0) {
		return (
			<div className="min-h-[50vh] flex items-center justify-center px-6 py-24">
				<p className="text-steel-300 text-xl text-center">
					No videos available yet. Check back soon!
				</p>
			</div>
		);
	}

	return (
		<div className="w-full">
			{/* Filter Buttons */}
			<section className="py-12 px-6 md:px-12 bg-black-soft border-b border-steel-800/30">
				<div className="max-w-7xl mx-auto">
					<div className="space-y-6">
						{/* Type Filters */}
						{videoTypes.length > 0 && (
							<div className="flex flex-wrap gap-3 justify-center">
								<button
									onClick={() => setActiveFilter("all")}
									className={`px-6 py-3 font-bold rounded-lg transition-all duration-300 ${
										activeFilter === "all"
											? "bg-rust-500 text-white scale-105"
											: "bg-steel-800 hover:bg-steel-700 text-white"
									}`}
								>
									All Videos
								</button>
								{videoTypes.map((type) => (
									<button
										key={type}
										onClick={() => setActiveFilter(type)}
										className={`px-6 py-3 font-bold rounded-lg transition-all duration-300 capitalize ${
											activeFilter === type
												? "bg-rust-500 text-white scale-105"
												: "bg-steel-800 hover:bg-steel-700 text-white"
										}`}
									>
										{type}
									</button>
								))}
							</div>
						)}

						{/* Industry Filters */}
						{industries.length > 0 && (
							<div className="flex flex-wrap gap-3 justify-center">
								<button
									onClick={() => setActiveIndustry("all")}
									className={`px-4 py-2 text-sm font-bold rounded-full transition-all duration-300 capitalize ${
										activeIndustry === "all"
											? "bg-rust-500/20 text-rust-500 border-2 border-rust-500"
											: "bg-steel-900 hover:bg-steel-800 text-steel-300 border border-steel-700"
									}`}
								>
									All Industries
								</button>
								{industries.map((industry) => (
									<button
										key={industry}
										onClick={() => setActiveIndustry(industry)}
										className={`px-4 py-2 text-sm font-bold rounded-full transition-all duration-300 capitalize ${
											activeIndustry === industry
												? "bg-rust-500/20 text-rust-500 border-2 border-rust-500"
												: "bg-steel-900 hover:bg-steel-800 text-steel-300 border border-steel-700"
										}`}
									>
										{industry}
									</button>
								))}
							</div>
						)}
					</div>

					{/* Results count */}
					<div className="text-center mt-6">
						<p className="text-steel-400 text-sm">
							Showing {filteredVideos.length} of {videos.length} videos
						</p>
					</div>
				</div>
			</section>

			{/* Video Grid */}
			<section className="py-24 px-6 md:px-12 bg-black">
				<div className="max-w-7xl mx-auto">
					{filteredVideos.length === 0 ? (
						<div className="text-center py-12">
							<p className="text-steel-300 text-xl">
								No videos match your filter criteria.
							</p>
							<button
								onClick={() => {
									setActiveFilter("all");
									setActiveIndustry("all");
								}}
								className="mt-6 px-6 py-3 bg-rust-500 hover:bg-rust-600 text-white font-bold rounded-lg transition-all"
							>
								Clear Filters
							</button>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
							{filteredVideos.map((video, index) => {
								const playbackId = extractPlaybackId(video);
								const title = extractTitle(video);
								const description = video.meta?.description || "";
								const client = video.meta?.client || "";
								const industry = video.meta?.industry || "";
								const types = video.meta?.type || [];
								const duration = formatDuration(video.duration);

								return (
									<div key={video.id || index} className="space-y-4">
										{/* Video Player */}
										<div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-steel-800/30 hover:border-rust-500/50 transition-all duration-300">
											{playbackId ? (
												<MuxPlayer
													playbackId={playbackId}
													title={title}
													thumbnailTime={3}
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

										{/* Video Info */}
										<div className="space-y-3">
											<h3 className="text-2xl md:text-3xl font-black text-white uppercase">
												{title}
											</h3>

											{description && (
												<p className="text-steel-300 leading-relaxed">
													{description}
												</p>
											)}

											{/* Tags */}
											{(types.length > 0 || industry) && (
												<div className="flex flex-wrap gap-2">
													{types.map((type, idx) => (
														<span
															key={idx}
															className="px-3 py-1 bg-steel-800 text-white text-sm rounded-full capitalize"
														>
															{type}
														</span>
													))}
													{industry && (
														<span className="px-3 py-1 bg-rust-500/20 text-rust-500 text-sm rounded-full capitalize border border-rust-500/30">
															{industry}
														</span>
													)}
												</div>
											)}

											{/* Meta Info */}
											{(client || duration) && (
												<div className="flex items-center gap-4 text-sm text-steel-400">
													{client && <span>Client: {client}</span>}
													{client && duration && <span>•</span>}
													{duration && <span>{duration}</span>}
												</div>
											)}
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</section>
		</div>
	);
};

export default VideographyGallery;
