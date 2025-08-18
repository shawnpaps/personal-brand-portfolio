import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const HeroPortfolioCarousel = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const screens = [
		{ src: '/samples/equature_screen.png', alt: 'Equature Screen' },
		{ src: '/samples/scatterbrain_screen.png', alt: 'Scatterbrain Screen' },
		{ src: '/samples/equature_screen.png', alt: 'Equature Screen' },
		{ src: '/samples/scatterbrain_screen.png', alt: 'Scatterbrain Screen' },
		{ src: '/samples/equature_screen.png', alt: 'Equature Screen' },
		{ src: '/samples/scatterbrain_screen.png', alt: 'Scatterbrain Screen' },
		{ src: '/samples/equature_screen.png', alt: 'Equature Screen' },
	];

	// Auto-slide effect
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % screens.length);
		}, 3000); // Change slide every 3 seconds

		return () => clearInterval(interval);
	}, [screens.length]);

	return (
		<div className="relative w-full h-96 overflow-hidden rounded-box">
			<div
				className="flex transition-transform duration-1000 ease-in-out"
				style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}>
				{/* Duplicate screens for infinite loop effect */}
				{[...screens, ...screens, ...screens].map((screen, index) => (
					<div key={index} className="flex-shrink-0 w-1/3 px-2">
						<div className="relative group">
							<img
								src={screen.src}
								alt={screen.alt}
								className="w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
							/>
							{/* Optional overlay on hover */}
							<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg" />
						</div>
					</div>
				))}
			</div>

			{/* Navigation dots */}
			<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
				{screens.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentIndex(index)}
						className={`w-3 h-3 rounded-full transition-all duration-300 ${
							index === currentIndex ? 'bg-primary scale-125' : 'bg-white/50'
						}`}
					/>
				))}
			</div>

			{/* Previous/Next buttons */}
			<button
				onClick={() =>
					setCurrentIndex(
						(prev) => (prev - 1 + screens.length) % screens.length
					)
				}
				className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110">
				←
			</button>
			<button
				onClick={() => setCurrentIndex((prev) => (prev + 1) % screens.length)}
				className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110">
				→
			</button>
		</div>
	);
};

export default HeroPortfolioCarousel;
