import React from 'react';
import { motion } from 'motion/react';

const HeroScreenButton = ({
	activeScreen,
	handleScreenChange,
}: {
	activeScreen: 'agency' | 'approach';
	handleScreenChange: (screen: 'agency' | 'approach') => void;
}) => {
	return (
		<div className="relative flex gap-4 rounded-full bg-base-200 py-2 px-4 w-fit text-xl">
			{/* Sliding background */}
			<motion.div
				className="absolute top-2 bottom-2 bg-primary rounded-full"
				initial={false}
				animate={{
					x: activeScreen === 'agency' ? 0 : 'calc(100%)',
					width: 'calc(50% - 0.5rem)',
				}}
				transition={{ type: 'spring', stiffness: 300, damping: 30 }}
				style={{ left: '0.5rem' }}
			/>

			<motion.button
				className={`relative z-10 rounded-full p-2 px-4 font-orbitron text-black font-bold w-full ${
					activeScreen === 'agency' ? 'text-black' : 'text-white/50'
				}`}
				onClick={() => handleScreenChange('agency')}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
				Agency
			</motion.button>

			<motion.button
				className={`relative z-10 rounded-full p-2 px-4 font-orbitron text-black font-bold w-full ${
					activeScreen === 'approach' ? 'text-black' : 'text-white/50'
				}`}
				onClick={() => handleScreenChange('approach')}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
				Approach
			</motion.button>
		</div>
	);
};

export default HeroScreenButton;
