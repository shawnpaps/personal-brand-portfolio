import React, { useState } from 'react';
import HeroScreenButton from './HeroScreenButton';
import HeroScreen from './HeroScreen';

const DynamicHero = () => {
	const [activeScreen, setActiveScreen] = useState<'agency' | 'approach'>(
		'agency'
	);
	const handleScreenChange = (screen: 'agency' | 'approach') => {
		setActiveScreen(screen);
	};
	return (
		<section className="h-screen relative flex items-center justify-center flex-col">
			<div className="absolute top-0 left-0 w-full h-full mt-4 ml-4">
				<HeroScreenButton
					activeScreen={activeScreen}
					handleScreenChange={handleScreenChange}
				/>
			</div>
			<div className="w-full h-full">
				<HeroScreen activeScreen={activeScreen} />
			</div>
		</section>
	);
};

export default DynamicHero;
