import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';

const TestimonialCard = ({
	testimonial,
	index,
}: {
	testimonial: any;
	index: number;
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<>
			<motion.div
				key={testimonial.id}
				initial={{ opacity: 0, y: 30, scale: 0.95 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{
					duration: 0.6,
					delay: index * 0.2,
					ease: 'easeOut',
				}}
				whileHover={{
					y: -8,
					scale: 1.02,
					transition: { duration: 0.3 },
				}}
				className="group relative">
				{/* Glow Effect */}
				<div className="absolute inset-0 bg-gradient-to-br from-warm-500/0 via-warm-400/0 to-warm-500/0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>

				{/* Card Container */}
				<div className="relative bg-gradient-to-br from-moody-800/80 to-moody-900/80 backdrop-blur-sm border border-warm-500/20 p-8 rounded-xl hover:border-warm-400/40 transition-all duration-500 overflow-hidden">
					{/* Animated Background Pattern */}
					<div className="absolute inset-0 opacity-5">
						<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-warm-400 via-transparent to-warm-500 animate-pulse"></div>
					</div>

					{/* Quote Icon */}
					<motion.div
						className="absolute top-4 right-4 text-warm-500/30 text-4xl"
						initial={{ scale: 0, rotate: -180 }}
						animate={{ scale: 1, rotate: 0 }}
						transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}>
						"
					</motion.div>

					{/* Avatar and Info */}
					<motion.div
						className="flex items-center mb-6"
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: index * 0.2 + 0.4, duration: 0.5 }}>
						<div className="flex-shrink-0 relative">
							<div className="w-14 h-14 rounded-full overflow-hidden border-2 border-warm-500/30 group-hover:border-warm-400/60 transition-colors duration-300">
								<img
									className="h-full w-full object-cover"
									src={
										testimonial.avatar_url || 'https://via.placeholder.com/56'
									}
									alt={testimonial.name}
								/>
							</div>
							{/* Avatar glow effect */}
							<div className="absolute inset-0 rounded-full bg-gradient-to-br from-warm-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
						</div>
						<div className="ml-4">
							<h3 className="font-heading text-lg font-semibold text-warm-400 group-hover:text-warm-300 transition-colors duration-300">
								{testimonial.name}
							</h3>
							<p className="text-moody-400 text-sm group-hover:text-moody-300 transition-colors duration-300">
								{testimonial.company}
							</p>
						</div>
					</motion.div>

					{/* Testimonial Text */}
					<motion.blockquote
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}>
						<p className="text-moody-300 italic leading-relaxed group-hover:text-moody-200 transition-colors duration-300 line-clamp-4">
							{testimonial.testimonial}
						</p>
					</motion.blockquote>

					{/* Read More Button */}
					<motion.button
						onClick={openModal}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.2 + 0.6, duration: 0.5 }}
						className="relative z-10 mt-4 px-4 py-2 bg-warm-500/10 border border-warm-500/30 text-warm-400 text-sm font-heading tracking-wider uppercase hover:bg-warm-500/20 hover:border-warm-400/50 transition-all duration-300 rounded-lg cursor-pointer">
						Read More
					</motion.button>

					{/* Floating Elements */}
					<motion.div
						className="absolute -top-2 -right-2 w-3 h-3 bg-warm-400/40 rounded-full pointer-events-none"
						animate={{
							y: [0, -8, 0],
							opacity: [0.4, 0.8, 0.4],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							ease: 'easeInOut',
							delay: index * 0.5,
						}}
					/>
					<motion.div
						className="absolute -bottom-1 -left-1 w-2 h-2 bg-warm-500/30 rounded-full pointer-events-none"
						animate={{
							y: [0, -6, 0],
							opacity: [0.3, 0.6, 0.3],
						}}
						transition={{
							duration: 1.5,
							repeat: Infinity,
							ease: 'easeInOut',
							delay: index * 0.5 + 1,
						}}
					/>
				</div>
			</motion.div>

			{/* Modal */}
			<AnimatePresence>
				{isModalOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-moody-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
						onClick={closeModal}>
						<motion.div
							initial={{ opacity: 0, scale: 0.9, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.9, y: 20 }}
							transition={{ duration: 0.3, ease: 'easeOut' }}
							className="relative bg-gradient-to-br from-moody-800 to-moody-900 border border-warm-500/30 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
							onClick={(e) => e.stopPropagation()}>
							{/* Close Button */}
							<button
								onClick={closeModal}
								className="absolute top-4 right-4 text-moody-400 hover:text-warm-400 transition-colors duration-300">
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"></path>
								</svg>
							</button>

							{/* Modal Content */}
							<div className="flex items-center mb-6">
								<div className="flex-shrink-0">
									<div className="w-16 h-16 rounded-full overflow-hidden border-2 border-warm-500/30">
										<img
											className="h-full w-full object-cover"
											src={
												testimonial.avatar_url ||
												'https://via.placeholder.com/64'
											}
											alt={testimonial.name}
										/>
									</div>
								</div>
								<div className="ml-6">
									<h3 className="font-heading text-2xl font-bold text-warm-400">
										{testimonial.name}
									</h3>
									<p className="text-moody-400 text-lg">
										{testimonial.company}
									</p>
								</div>
							</div>

							{/* Full Testimonial */}
							<blockquote className="relative">
								<div className="absolute -top-2 -left-2 text-warm-500/30 text-6xl">
									"
								</div>
								<p className="text-moody-300 text-lg leading-relaxed pl-8">
									{testimonial.testimonial}
								</p>
							</blockquote>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default TestimonialCard;
