import React from 'react';
import HeroPortfolioCarousel from './HeroPortfolioCarousel';

const AgencyScreen = () => {
	return (
		<div className="h-full ">
			<h1 className="text-7xl font-bold mt-32 max-w-4xl mx-auto text-center">
				Most agencies don’t get{' '}
				<span className="text-primary relative">
					<span className="absolute inset-0 blur-lg bg-secondary opacity-50"></span>
					<span className="relative">creatives.</span>
				</span>
			</h1>
			<h2 className="text-4xl tracking-tighter font-bold font-doto text-center mt-4 max-w-4xl mx-auto">
				I built one that does.
			</h2>
			<div className="w-full h-full mt-32">
				<HeroPortfolioCarousel />
			</div>
			<section className="min-h-screen">
				<div className="max-w-4xl mx-auto">
					<p className="text-2xl font-bold">
						SPAP Technology Solutions is a Creative Tech studio, built by
						creatives with a passion for helping creative brands stand out in
						today's online world. We partner with companies and collaborators to
						create one-of-a-kind experiences that elevate their brand.
					</p>
				</div>
			</section>
		</div>
	);
};

export default AgencyScreen;
