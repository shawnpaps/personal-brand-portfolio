import React, { useState, useEffect } from "react";
import ImageLightbox from "./ImageLightbox";

interface S3Photo {
	key: string;
	url: string;
	name: string;
	size: number;
	lastModified: string;
}

interface S3PhotoGalleryProps {
	folder?: string;
}

const S3PhotoGallery: React.FC<S3PhotoGalleryProps> = ({
	folder = "main-portfolio",
}) => {
	const [photos, setPhotos] = useState<S3Photo[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	useEffect(() => {
		const fetchPhotos = async () => {
			try {
				const response = await fetch(`/api/photos?folder=${folder}`);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();

				if (data.error) {
					throw new Error(data.error);
				}

				// Filter out any folder entries (keys ending with /)
				const imageFiles = data.filter(
					(item: S3Photo) => !item.key.endsWith("/"),
				);

				setPhotos(imageFiles);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to load photos");
				console.error("Error fetching photos:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchPhotos();
	}, [folder]);

	const openLightbox = (index: number) => {
		setCurrentImageIndex(index);
		setLightboxOpen(true);
	};

	const closeLightbox = () => {
		setLightboxOpen(false);
	};

	const goToNext = () => {
		setCurrentImageIndex((prevIndex) =>
			prevIndex === photos.length - 1 ? 0 : prevIndex + 1,
		);
	};

	const goToPrevious = () => {
		setCurrentImageIndex((prevIndex) =>
			prevIndex === 0 ? photos.length - 1 : prevIndex - 1,
		);
	};

	if (loading) {
		return (
			<div className="min-h-[50vh] flex items-center justify-center px-6 py-24">
				<div className="text-center">
					<div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-rust-500 border-r-transparent mb-4" />
					<p className="text-steel-300 text-lg">Loading photos...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-[50vh] flex items-center justify-center px-6 py-24">
				<div className="text-center bg-black-soft/50 p-8 rounded-lg border border-rust-500/20 max-w-md">
					<p className="text-rust-500 text-xl font-semibold mb-2">
						Error Loading Photos
					</p>
					<p className="text-steel-300">{error}</p>
				</div>
			</div>
		);
	}

	if (photos.length === 0) {
		return (
			<div className="min-h-[50vh] flex items-center justify-center px-6 py-24">
				<p className="text-steel-300 text-xl text-center">
					No photos available yet. Check back soon!
				</p>
			</div>
		);
	}

	return (
		<>
			{/* Masonry Grid */}
			<div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
				{photos.map((photo, index) => (
					<div
						key={photo.key}
						className="break-inside-avoid group relative overflow-hidden rounded-lg cursor-pointer bg-black-soft border border-steel-800/30 hover:border-rust-500/50 transition-all duration-300"
						onClick={() => openLightbox(index)}
					>
						<img
							src={photo.url}
							alt={photo.name}
							loading="lazy"
							className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
						/>

						{/* Hover Overlay */}
						<div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
							<div className="text-white">
								<p className="font-semibold text-sm truncate">{photo.name}</p>
								<p className="text-xs text-steel-400 mt-1">
									Click to view full size
								</p>
							</div>
						</div>

						{/* View Icon */}
						<div className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
							<svg
								className="w-5 h-5 text-white"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
								/>
							</svg>
						</div>
					</div>
				))}
			</div>

			{/* Photo Count */}
			<div className="text-center mt-12">
				<p className="text-steel-400 text-sm">
					Showing {photos.length} photo{photos.length !== 1 ? "s" : ""}
				</p>
			</div>

			{/* Lightbox */}
			<ImageLightbox
				images={photos.map((p) => p.url)}
				currentIndex={currentImageIndex}
				isOpen={lightboxOpen}
				onClose={closeLightbox}
				onNext={goToNext}
				onPrevious={goToPrevious}
			/>
		</>
	);
};

export default S3PhotoGallery;
