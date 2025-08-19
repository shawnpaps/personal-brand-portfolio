const DesktopNavigation = () => {
	return (
		<div className="grid grid-cols-3 w-full pb-32 pt-8 border-b-2 border-base-500 px-16">
			<div>
				<img
					src="/icons/logo_white.svg"
					alt="SPAP Technology Logo"
					className="h-12"
				/>
			</div>
			<div className="flex justify-center">
				<p className="leading-tight text-center text-lg">
					SPAP Technology is a creative tech studio built by creatives with a
					passion for helping creative brands stand out in today's online world.
				</p>
			</div>
			<div className="flex justify-end">
				<button className="btn btn-primary font-orbitron btn-outline">
					Let's Talk
				</button>
			</div>
		</div>
	);
};

export default DesktopNavigation;
