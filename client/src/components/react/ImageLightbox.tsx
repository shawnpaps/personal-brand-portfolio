import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageLightboxProps {
	images: string[];
	currentIndex: number;
	isOpen: boolean;
	onClose: () => void;
	onNext: () => void;
	onPrevious: () => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({
	images,
	currentIndex,
	isOpen,
	onClose,
	onNext,
	onPrevious,
}) => {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!isOpen) return;

			if (e.key === "Escape") onClose();
			if (e.key === "ArrowLeft") onPrevious();
			if (e.key === "ArrowRight") onNext();
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, onClose, onNext, onPrevious]);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	if (!isOpen || images.length === 0) return null;

	const currentImage = images[currentIndex];

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
					onClick={onClose}
				>
					{/* Close Button */}
					<button
						onClick={onClose}
						className="absolute top-4 right-4 text-white hover:text-rust-500 transition-colors z-10 w-12 h-12 flex items-center justify-center bg-black/50 rounded-full backdrop-blur-sm"
						aria-label="Close lightbox"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>

					{/* Navigation Buttons */}
					{images.length > 1 && (
						<>
							<button
								onClick={(e) => {
									e.stopPropagation();
									onPrevious();
								}}
								className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-rust-500 transition-colors z-10 w-12 h-12 flex items-center justify-center bg-black/50 rounded-full backdrop-blur-sm"
								aria-label="Previous image"
							>
								<svg
									className="w-8 h-8"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 19l-7-7 7-7"
									/>
								</svg>
							</button>
							<button
								onClick={(e) => {
									e.stopPropagation();
									onNext();
								}}
								className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-rust-500 transition-colors z-10 w-12 h-12 flex items-center justify-center bg-black/50 rounded-full backdrop-blur-sm"
								aria-label="Next image"
							>
								<svg
									className="w-8 h-8"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</button>
						</>
					)}

					{/* Image Counter */}
					<div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
						{currentIndex + 1} / {images.length}
					</div>

					{/* Image Container */}
					<motion.div
						key={currentIndex}
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.2 }}
						className="relative max-w-7xl max-h-[90vh] w-full flex items-center justify-center"
						onClick={(e) => e.stopPropagation()}
					>
						<img
							src={currentImage}
							alt={`Photo ${currentIndex + 1}`}
							className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg"
						/>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ImageLightbox;
