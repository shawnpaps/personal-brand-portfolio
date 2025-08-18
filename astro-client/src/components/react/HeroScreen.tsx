import React from 'react';
import HeroPortfolioCarousel from './HeroPortfolioCarousel';
import { motion } from 'motion/react';
import AgencyScreen from './AgencyScreen';

const HeroScreen = ({
	activeScreen,
}: {
	activeScreen: 'agency' | 'approach';
}) => {
	if (activeScreen === 'agency') {
		return <AgencyScreen />;
	}
	if (activeScreen === 'approach') {
		return <div>Approach</div>;
	}
	return null;
};

export default HeroScreen;
