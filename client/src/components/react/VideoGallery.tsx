import React, { useState, useEffect } from "react";
import VideoCard from "./partials/VideoCard";

interface Video {
	id: string;
	playbackId: string;
	duration: number;
	aspectRatio: string;
	createdAt: string;
}

const VideoGallery = () => {
	const [videos, setVideos] = useState<Video[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

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

				setVideos(data.videos);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to load videos");
				console.error("Error fetching videos:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchVideos();
	}, []);

	console.log(videos);
	if (loading) {
		return (
			<div className="h-screen w-full flex items-center justify-center px-4 py-8">
				<div className="text-center">
					<div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-accent border-r-transparent mb-4" />
					<p className="text-neutral">Loading videos...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="h-screen w-full flex items-center justify-center px-4 py-8">
				<div className="text-center bg-dark/50 p-8 rounded-lg border border-accent/20">
					<p className="text-accent text-lg font-semibold mb-2">Error</p>
					<p className="text-neutral">{error}</p>
				</div>
			</div>
		);
	}

	if (videos.length === 0) {
		return (
			<div className="h-screen w-full flex items-center justify-center px-4 py-8">
				<p className="text-neutral text-lg">No videos available</p>
			</div>
		);
	}

	return (
		// Full-screen hero gallery container — two-up hero layout centered
		<div className="h-screen w-full px-6 py-12 flex items-start justify-center">
			{/* two-column hero grid: 1 column on small, 2 on medium+, centered with big cards */}
			<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-min items-start justify-center overflow-auto h-full py-6">
				{videos.map((video, idx) => (
					<VideoCard
						key={(video as any).playbackId || (video as any).id || idx}
						videoData={video}
					/>
				))}
			</div>
		</div>
	);
};

export default VideoGallery;
