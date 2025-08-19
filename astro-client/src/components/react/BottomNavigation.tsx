import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const BottomNavigation = () => {
	const [activePage, setActivePage] = useState('/');

	useEffect(() => {
		// Set active page based on current URL
		setActivePage(window.location.pathname);
	}, []);

	const navItems = [
		{ path: '/', label: 'Welcome', icon: '🏠' },
		{ path: '/work', label: 'Work', icon: '💼' },
		{ path: '/photography', label: 'Looks', icon: '📸' },
	];

	const handleNavClick = (path: string) => {
		setActivePage(path);
	};

	return (
		<nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
			<div className="bg-moody-900/80 backdrop-blur-md  rounded-full px-2 py-2 shadow-2xl">
				<ul className="flex items-center space-x-2">
					{navItems.map((item) => (
						<li key={item.path} className="relative">
							<a
								href={item.path}
								onClick={() => handleNavClick(item.path)}
								className={`flex flex-col items-center justify-center px-6 py-3 rounded-full font-heading text-sm tracking-wider transition-all duration-300 ${
									activePage === item.path
										? 'bg-white/50 text-black '
										: 'text-moody-300 hover:text-warm-400 hover:bg-warm-500/10 border border-transparent hover:border-warm-500/30'
								}`}>
								{/* Icon */}
								<span className="text-lg mb-1">{item.icon}</span>

								{/* Label */}
								<span className="text-xs font-semibold uppercase">
									{item.label}
								</span>

								{/* Active indicator */}
								{activePage === item.path && (
									<motion.div
										layoutId="activeIndicator"
										className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-warm-400 rounded-full"
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										transition={{ type: 'spring', stiffness: 500, damping: 30 }}
									/>
								)}
							</a>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default BottomNavigation;
