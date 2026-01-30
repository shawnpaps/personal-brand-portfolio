import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";

interface VideoPlayerProps {
	playbackId?: string;
	thumbnailUrl: string;
	title: string;
	description?: string;
}

export default function VideoPlayer({
	playbackId,
	thumbnailUrl,
	title,
	description,
}: VideoPlayerProps) {
	const [error, setError] = useState<string | null>(null);

	// If no playbackId, show placeholder with thumbnail
	if (!playbackId || playbackId.startsWith("placeholder")) {
		return (
			<div className="relative aspect-video bg-black-soft rounded-lg overflow-hidden group">
				<img
					src={thumbnailUrl}
					alt={title}
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-black-deep/60 flex items-center justify-center">
					<div className="text-center px-6">
						<div className="w-20 h-20 rounded-full bg-rust-orange/20 flex items-center justify-center mx-auto mb-4">
							<svg
								className="w-10 h-10 text-rust-orange"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M8 5v14l11-7z" />
							</svg>
						</div>
						<h3 className="text-white text-xl font-bold mb-2">{title}</h3>
						{description && (
							<p className="text-steel-light text-sm">{description}</p>
						)}
						<p className="text-rust-orange text-xs mt-4">
							Video will be available once connected to Mux
						</p>
					</div>
				</div>
			</div>
		);
	}

	// Real Mux player
	return (
		<div className="relative aspect-video bg-black-soft rounded-lg overflow-hidden">
			{error ? (
				<div className="absolute inset-0 bg-black-deep flex items-center justify-center">
					<div className="text-center px-6">
						<div className="w-20 h-20 rounded-full bg-rust-orange/20 flex items-center justify-center mx-auto mb-4">
							<svg
								className="w-10 h-10 text-rust-orange"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								/>
							</svg>
						</div>
						<h3 className="text-white text-xl font-bold mb-2">Video Error</h3>
						<p className="text-steel-light text-sm">{error}</p>
					</div>
				</div>
			) : (
				<MuxPlayer
					playbackId={playbackId}
					metadata={{
						video_title: title,
						video_id: playbackId,
					}}
					streamType="on-demand"
					autoPlay="muted"
					loop
					primaryColor="#d4512a"
					secondaryColor="#ffffff"
					onError={(error) => {
						console.error("Mux Player Error:", error);
						setError(
							"Unable to load video. Please check your connection and try again.",
						);
					}}
					style={{
						width: "100%",
						height: "100%",
					}}
				/>
			)}
		</div>
	);
}
