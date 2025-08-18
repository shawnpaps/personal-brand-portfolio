import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function AnimatedAboutSection() {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start end', 'end start'],
	});

	// Transform scroll progress to control text opacity
	const firstTextOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
	const secondTextOpacity = useTransform(scrollYProgress, [0.2, 1], [0, 1]);

	return (
		<section
			ref={containerRef}
			id="about"
			className="py-20 px-4 sm:px-6 lg:px-8 relative min-h-[60rem] flex justify-between">
			<div className=" sticky top-5">
				<div className="sticky top-5">
					{/* First text - visible at start */}
					<motion.h2
						style={{ opacity: firstTextOpacity }}
						className="font-bold text-warm-400 max-w-md text-6xl font-heading">
						I am obsessed with capturing creatives doing cool sh*t...
					</motion.h2>

					{/* Second text - visible after halfway */}
					<motion.h2
						style={{ opacity: secondTextOpacity }}
						className="font-bold text-warm-400 max-w-md text-6xl font-heading  ">
						...and building tools to help them do it.
					</motion.h2>
				</div>
			</div>

			<div className="w-1/2 h-[60rem] bg-warm-500/20 overflow-hidden rounded-2xl shadow-2xl">
				<img
					src="https://iiyjiikbtsckevydbcsj.supabase.co/storage/v1/object/public/portfolio-assets/Images/Portraits/PAPS2980.jpg"
					alt="Shawn Papineau"
					className="object-cover h-full w-full"
				/>
			</div>
		</section>
	);
}
