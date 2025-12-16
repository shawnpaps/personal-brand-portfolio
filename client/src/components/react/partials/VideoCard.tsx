import React, { useEffect, useRef, useState } from "react";
import MuxPlayer from "@mux/mux-player-react/lazy";

interface VideoCardProps {
	videoData: any; // Accept either the full Mux asset object or a simplified shape
}

/**
 * Convert aspect ratio like "16:9" or "1.78" into padding-top percent.
 * Defaults to 16:9 => 56.25%
 */
function aspectRatioToPaddingTop(aspectRatio?: string): string {
	if (!aspectRatio) return "56.25%";
	try {
		if (aspectRatio.includes(":")) {
			const [wRaw, hRaw] = aspectRatio.split(":");
			const w = Number(wRaw);
			const h = Number(hRaw);
			if (!Number.isNaN(w) && !Number.isNaN(h) && w !== 0) {
				return `${(h / w) * 100}%`;
			}
		} else {
			const val = Number(aspectRatio);
			if (!Number.isNaN(val) && val !== 0) {
				// val is width/height
				return `${(1 / val) * 100}%`;
			}
		}
	} catch {
		/* fallthrough to default */
	}
	return "56.25%";
}

function formatDuration(seconds?: number) {
	if (seconds === undefined || seconds === null || Number.isNaN(seconds))
		return "";
	const mins = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60)
		.toString()
		.padStart(2, "0");
	return `${mins}:${secs}`;
}

/**
 * Try several common locations for a human-friendly title:
 * - asset.metadata.name
 * - asset.meta.title
 * - asset.title
 * - asset.filename
 * - asset.passthrough (string or JSON with { title | name })
 * - asset.data.title
 * - fallback to id / playback id when nothing else exists
 */
function extractTitle(asset: any): string | null {
	if (!asset) return null;

	// If frontend already passed plain string
	if (typeof asset === "string") return asset;

	// Common Mux metadata fields
	if (
		asset.metadata &&
		typeof asset.metadata.name === "string" &&
		asset.metadata.name.trim()
	) {
		return asset.metadata.name;
	}
	if (
		asset.meta &&
		typeof asset.meta.title === "string" &&
		asset.meta.title.trim()
	) {
		return asset.meta.title;
	}
	if (typeof asset.title === "string" && asset.title.trim()) {
		return asset.title;
	}
	if (typeof asset.filename === "string" && asset.filename.trim()) {
		return asset.filename;
	}

	// passthrough could be a JSON string or plain string, or an object
	if (asset.passthrough) {
		const p = asset.passthrough;
		if (typeof p === "string") {
			// Try parse JSON safely; if parse fails, fallback to the raw string
			try {
				const parsed = JSON.parse(p);
				if (parsed && typeof parsed === "object") {
					if (typeof parsed.title === "string" && parsed.title.trim())
						return parsed.title;
					if (typeof parsed.name === "string" && parsed.name.trim())
						return parsed.name;
				}
			} catch {
				// not JSON, use the raw value if it's non-empty
				if (p.trim()) return p;
			}
		} else if (typeof p === "object") {
			if (typeof p.title === "string" && p.title.trim()) return p.title;
			if (typeof p.name === "string" && p.name.trim()) return p.name;
		}
	}

	if (
		asset.data &&
		typeof asset.data.title === "string" &&
		asset.data.title.trim()
	) {
		return asset.data.title;
	}

	// fallback to id or the first playback id if available
	if (asset.id) return String(asset.id);
	if (asset.playbackId) return String(asset.playbackId);
	if (asset.playback_id) return String(asset.playback_id);
	if (Array.isArray(asset.playback_ids) && asset.playback_ids.length > 0) {
		const first = asset.playback_ids[0];
		if (first && (first.id || first.playback_id))
			return String(first.id ?? first.playback_id);
	}

	return null;
}

/**
 * Extract a usable playback id from various possible shapes:
 * - asset.playbackId (simplified)
 * - asset.playback_id
 * - asset.playback_ids array with { id | playback_id }
 * - asset.data.playback_ids
 */
function extractPlaybackId(asset: any): string | null {
	if (!asset) return null;

	if (typeof asset === "string") {
		// If the caller passed the raw playbackId as a string
		return asset;
	}

	if (typeof asset.playbackId === "string" && asset.playbackId.trim())
		return asset.playbackId;
	if (typeof asset.playback_id === "string" && asset.playback_id.trim())
		return asset.playback_id;

	if (Array.isArray(asset.playback_ids) && asset.playback_ids.length > 0) {
		const first = asset.playback_ids[0];
		if (first) {
			if (typeof first.id === "string" && first.id.trim()) return first.id;
			if (typeof first.playback_id === "string" && first.playback_id.trim())
				return first.playback_id;
			// sometimes playback objects use other keys
			if (typeof first.playbackId === "string" && first.playbackId.trim())
				return first.playbackId;
		}
	}

	if (
		asset.data &&
		Array.isArray(asset.data.playback_ids) &&
		asset.data.playback_ids.length > 0
	) {
		const first = asset.data.playback_ids[0];
		if (first) {
			if (typeof first.id === "string" && first.id.trim()) return first.id;
			if (typeof first.playback_id === "string" && first.playback_id.trim())
				return first.playback_id;
		}
	}

	return null;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoData }) => {
	const playerRef = useRef<any | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [overlayVisible, setOverlayVisible] = useState(false);
	const [moreOpen, setMoreOpen] = useState(false);

	// Support either full Mux asset or a simplified object passed from backend
	const title = extractTitle(videoData) ?? "Untitled Video";
	const playbackId = extractPlaybackId(videoData);
	const duration =
		typeof videoData?.duration === "number"
			? videoData.duration
			: (videoData?.video_duration ?? null);
	const aspectRatio = videoData?.aspect_ratio ?? videoData?.aspectRatio ?? null;
	const createdAt = videoData?.created_at ?? videoData?.createdAt ?? null;

	const paddingTop = aspectRatioToPaddingTop(
		typeof aspectRatio === "string" ? aspectRatio : undefined,
	);

	useEffect(() => {
		const el = playerRef.current;
		if (!el || typeof el.addEventListener !== "function") return;

		const onPlay = () => setIsPlaying(true);
		const onPause = () => setIsPlaying(false);

		try {
			el.addEventListener("play", onPlay);
			el.addEventListener("pause", onPause);
		} catch {
			// If mux-player doesn't expose DOM events in this environment, ignore
		}

		return () => {
			try {
				el.removeEventListener("play", onPlay);
				el.removeEventListener("pause", onPause);
			} catch {
				// ignore
			}
		};
	}, [playerRef]);

	const togglePlay = async () => {
		const el = playerRef.current;
		if (!el) return;

		try {
			if (isPlaying) {
				if (typeof el.pause === "function") await el.pause();
				setIsPlaying(false);
			} else {
				if (typeof el.play === "function") await el.play();
				setIsPlaying(true);
			}
		} catch {
			// Some runtimes or web components may not expose play/pause directly
			// Best-effort: try to find a nested video element
			try {
				const nestedVideo: HTMLVideoElement | null =
					el?.shadowRoot?.querySelector?.("video") ??
					el?.querySelector?.("video") ??
					null;
				if (nestedVideo) {
					if (isPlaying) {
						await nestedVideo.pause();
						setIsPlaying(false);
					} else {
						await nestedVideo.play();
						setIsPlaying(true);
					}
				}
			} catch {
				// ignore
			}
		}
	};

	const toggleMore = () => setMoreOpen((s) => !s);

	return (
		<article className="col-span-1" aria-label={`Video card: ${title}`}>
			<div
				className="flex flex-col sm:flex-row items-stretch gap-4 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-white/3 to-black/6 transition-transform hover:-translate-y-0.5 p-6"
				onMouseEnter={() => setOverlayVisible(true)}
				onMouseLeave={() => {
					setOverlayVisible(false);
					setMoreOpen(false);
				}}
				onFocus={() => setOverlayVisible(true)}
				onBlur={() => setOverlayVisible(false)}
			>
				{/* Left: meta */}
				<div className="w-full sm:w-48 flex-shrink-0 flex flex-col justify-center gap-2 px-2">
					<h3 className="text-2xl font-semibold text-white " title={title}>
						{title}
					</h3>
				</div>

				{/* Right: player */}
				<div className="flex-1">
					{/* Aspect-ratio spacer - ensures consistent height */}
					<div className="relative w-full" style={{ paddingTop }}>
						<div className="absolute inset-0 rounded-md overflow-hidden bg-black">
							{playbackId ? (
								<MuxPlayer
									ref={playerRef as any}
									playbackId={playbackId}
									title={title}
									thumbnailTime={4}
									accentColor="#00e5ff"
									metadata={{ videoTitle: title, ViewerUserId: "user-id-007" }}
									className="w-full h-full"
									style={{
										width: "100%",
										height: "100%",
										display: "block",
										objectFit: "cover",
									}}
								/>
							) : (
								<div className="w-full h-full flex items-center justify-center text-white">
									No playback id
								</div>
							)}

							{/* Overlay controls */}
							<div
								className={`absolute inset-0 flex items-center justify-center transition-opacity ${
									overlayVisible
										? "opacity-100"
										: "opacity-0 pointer-events-none"
								} sm:pointer-events-auto`}
								aria-hidden={!overlayVisible}
							>
								<div className="flex items-center gap-3 bg-black/35 backdrop-blur-sm rounded-full p-2">
									<button
										onClick={togglePlay}
										className="w-12 h-12 rounded-full bg-white/90 text-black flex items-center justify-center hover:scale-105 transition"
										aria-label={isPlaying ? "Pause" : "Play"}
									>
										{isPlaying ? (
											<svg
												width="18"
												height="18"
												viewBox="0 0 24 24"
												fill="currentColor"
												aria-hidden
											>
												<rect x="6" y="5" width="4" height="14"></rect>
												<rect x="14" y="5" width="4" height="14"></rect>
											</svg>
										) : (
											<svg
												width="18"
												height="18"
												viewBox="0 0 24 24"
												fill="currentColor"
												aria-hidden
											>
												<path d="M5 3v18l15-9z" />
											</svg>
										)}
									</button>

									<div className="relative">
										<button
											onClick={toggleMore}
											aria-haspopup="menu"
											aria-expanded={moreOpen}
											className="w-10 h-10 rounded-full bg-white/90 text-black flex items-center justify-center hover:scale-105 transition"
										>
											<svg
												width="16"
												height="16"
												viewBox="0 0 24 24"
												fill="currentColor"
												aria-hidden
											>
												<circle cx="5" cy="12" r="2" />
												<circle cx="12" cy="12" r="2" />
												<circle cx="19" cy="12" r="2" />
											</svg>
										</button>

										{moreOpen && (
											<div
												className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg overflow-hidden z-50"
												role="menu"
											>
												<button
													className="block w-full text-left px-3 py-2 text-sm hover:bg-neutral/6"
													role="menuitem"
													onClick={() => {
														setMoreOpen(false);
														alert(`Details for ${title}`);
													}}
												>
													Details
												</button>
												{playbackId && (
													<button
														className="block w-full text-left px-3 py-2 text-sm hover:bg-neutral/6"
														role="menuitem"
														onClick={() => {
															setMoreOpen(false);
															const url = `https://stream.mux.com/${playbackId}.m3u8`;
															try {
																navigator.clipboard?.writeText(url);
																alert("Stream URL copied to clipboard");
															} catch {
																// ignore
																window.open(url, "_blank", "noopener");
															}
														}}
													>
														Copy stream URL
													</button>
												)}
											</div>
										)}
									</div>
								</div>
							</div>

							{/* Mobile small title badge for context */}
							<div className="absolute left-3 top-3 sm:hidden">
								<div className="bg-black/60 text-white text-xs px-2 py-1 rounded-md">
									{title}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
};

export default VideoCard;
