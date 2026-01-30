import { useState, useEffect } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { Copy, Check, ExternalLink, RefreshCw } from "lucide-react";

interface MuxAsset {
	id: string;
	playback_ids?: Array<{
		id: string;
		policy: string;
	}>;
	duration?: number;
	created_at?: string;
	status?: string;
	aspect_ratio?: string;
	max_stored_resolution?: string;
	tracks?: Array<{
		type: string;
		max_width?: number;
		max_height?: number;
	}>;
}

interface MuxVideoManagerProps {
	showPreviews?: boolean;
}

export default function MuxVideoManager({
	showPreviews = true,
}: MuxVideoManagerProps) {
	const [videos, setVideos] = useState<MuxAsset[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [copiedId, setCopiedId] = useState<string | null>(null);
	const [previewingId, setPreviewingId] = useState<string | null>(null);

	const loadVideos = async () => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch("/api/get-videos");

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Failed to fetch videos");
			}

			const data = await response.json();
			setVideos(data.videos || []);
		} catch (err) {
			console.error("Error loading videos:", err);
			setError(err instanceof Error ? err.message : "An unexpected error occurred");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadVideos();
	}, []);

	const copyToClipboard = async (text: string, id: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedId(id);
			setTimeout(() => setCopiedId(null), 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	const formatDuration = (seconds: number): string => {
		const minutes = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${minutes}:${secs.toString().padStart(2, "0")}`;
	};

	if (loading) {
		return (
			<div className="text-center py-20">
				<div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-rust-orange"></div>
				<p className="text-steel-light mt-4">Loading videos from Mux...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="bg-rust-orange/10 border border-rust-orange/30 rounded-lg p-6 max-w-2xl mx-auto">
				<h3 className="text-rust-orange text-xl font-bold mb-2">
					Error Loading Videos
				</h3>
				<p className="text-steel-light mb-4">{error}</p>
				<button
					onClick={loadVideos}
					className="flex items-center gap-2 px-6 py-2 bg-rust-orange hover:bg-rust-light text-white font-semibold rounded-lg transition-colors"
				>
					<RefreshCw size={16} />
					Retry
				</button>
			</div>
		);
	}

	if (videos.length === 0) {
		return (
			<div className="text-center py-20">
				<p className="text-steel-light text-xl">
					No videos found in your Mux account.
				</p>
				<p className="text-steel-light text-sm mt-4">
					Upload videos to Mux to see them here.
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Header Stats */}
			<div className="bg-black-soft/50 backdrop-blur-sm border border-concrete/20 rounded-lg p-6">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-steel-light text-sm mb-1">Total Videos</p>
						<p className="text-white text-3xl font-bold">{videos.length}</p>
					</div>
					<button
						onClick={loadVideos}
						className="flex items-center gap-2 px-4 py-2 bg-concrete hover:bg-concrete-light text-white font-semibold rounded-lg transition-colors"
					>
						<RefreshCw size={16} />
						Refresh
					</button>
				</div>
			</div>

			{/* Videos Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{videos.map((video) => {
					const playbackId = video.playback_ids?.[0]?.id;
					const policy = video.playback_ids?.[0]?.policy || "N/A";
					const duration = video.duration
						? formatDuration(video.duration)
						: "Unknown";
					const resolution = video.max_stored_resolution || "N/A";
					const status = video.status || "unknown";
					const createdAt = video.created_at
						? new Date(video.created_at).toLocaleDateString()
						: "N/A";
					const isCopied = copiedId === video.id;
					const isPreviewing = previewingId === video.id;

					return (
						<div
							key={video.id}
							className="bg-black-soft border border-concrete/20 rounded-lg overflow-hidden hover:border-rust-orange/50 transition-colors"
						>
							{/* Video Preview */}
							{showPreviews &&
								playbackId &&
								status === "ready" &&
								isPreviewing && (
									<div className="aspect-video bg-black-deep">
										<MuxPlayer
											playbackId={playbackId}
											metadata={{
												video_id: video.id,
											}}
											streamType="on-demand"
											primaryColor="#d4512a"
											secondaryColor="#ffffff"
											style={{
												width: "100%",
												height: "100%",
											}}
										/>
									</div>
								)}

							<div className="p-6">
								{/* Status Badge */}
								<div className="flex items-start justify-between mb-4">
									<div className="flex-1">
										<h3 className="text-white font-bold text-sm mb-1">
											Asset ID
										</h3>
										<code className="text-steel-light text-xs break-all bg-black-deep px-2 py-1 rounded block">
											{video.id}
										</code>
									</div>
									<span
										className={`ml-4 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
											status === "ready"
												? "bg-green-500/20 text-green-400"
												: "bg-yellow-500/20 text-yellow-400"
										}`}
									>
										{status}
									</span>
								</div>

								{/* Playback ID */}
								{playbackId && (
									<div className="mb-4">
										<p className="text-steel-light text-sm mb-2">Playback ID</p>
										<div className="flex items-center gap-2">
											<code className="flex-1 text-white text-xs bg-black-deep px-3 py-2 rounded break-all">
												{playbackId}
											</code>
											<button
												onClick={() => copyToClipboard(playbackId, video.id)}
												className={`p-2 rounded transition-colors ${
													isCopied
														? "bg-green-500 hover:bg-green-600"
														: "bg-rust-orange hover:bg-rust-light"
												} text-white`}
												title="Copy Playback ID"
											>
												{isCopied ? <Check size={16} /> : <Copy size={16} />}
											</button>
										</div>
									</div>
								)}

								{/* Video Details */}
								<div className="grid grid-cols-2 gap-4 text-sm mb-4">
									<div>
										<p className="text-steel-light text-xs">Duration</p>
										<p className="text-white font-semibold">{duration}</p>
									</div>
									<div>
										<p className="text-steel-light text-xs">Resolution</p>
										<p className="text-white font-semibold">{resolution}</p>
									</div>
									<div>
										<p className="text-steel-light text-xs">Policy</p>
										<p className="text-white font-semibold capitalize">
											{policy}
										</p>
									</div>
									<div>
										<p className="text-steel-light text-xs">Created</p>
										<p className="text-white font-semibold">{createdAt}</p>
									</div>
								</div>

								{/* Action Buttons */}
								{playbackId && status === "ready" && (
									<div className="flex gap-2 pt-4 border-t border-concrete/20">
										{showPreviews && (
											<button
												onClick={() =>
													setPreviewingId(isPreviewing ? null : video.id)
												}
												className="flex-1 px-4 py-2 bg-concrete hover:bg-concrete-light text-white text-sm font-semibold rounded transition-colors"
											>
												{isPreviewing ? "Hide Preview" : "Show Preview"}
											</button>
										)}
										<a
											href={`https://stream.mux.com/${playbackId}.m3u8`}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-2 px-4 py-2 bg-rust-orange hover:bg-rust-light text-white text-sm font-semibold rounded transition-colors"
										>
											<ExternalLink size={14} />
											Stream
										</a>
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>

			{/* Usage Instructions */}
			<div className="bg-black-soft/30 border border-concrete/10 rounded-lg p-6 mt-8">
				<h3 className="text-white font-bold text-lg mb-3">
					How to Use Playback IDs
				</h3>
				<div className="space-y-3 text-steel-light text-sm">
					<p>
						1. Copy the <span className="text-rust-orange">Playback ID</span>{" "}
						from any video above
					</p>
					<p>
						2. Open your{" "}
						<code className="bg-black-deep px-2 py-1 rounded text-xs">
							videography.json
						</code>{" "}
						file
					</p>
					<p>
						3. Replace the{" "}
						<code className="bg-black-deep px-2 py-1 rounded text-xs">
							placeholder-video-XXX
						</code>{" "}
						with your actual Playback ID
					</p>
					<p className="text-xs text-steel-light/60 mt-4">
						Example:{" "}
						<code className="bg-black-deep px-2 py-1 rounded">
							"muxPlaybackId": "YOUR_PLAYBACK_ID_HERE"
						</code>
					</p>
				</div>
			</div>
		</div>
	);
}
