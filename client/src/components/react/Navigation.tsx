import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

interface DropdownItem {
	label: string;
	href: string;
}

interface NavItem {
	label: string;
	href?: string;
	dropdown?: DropdownItem[];
}

const navItems: NavItem[] = [
	{
		label: "Media",
		dropdown: [
			{ label: "Photography", href: "/photography" },
			{ label: "Videography", href: "/videography" },
		],
	},
	{
		label: "Clients",
		dropdown: [
			{ label: "Creators", href: "/clients/creators" },
			{ label: "Small Businesses", href: "/clients/small-businesses" },
			{ label: "Events", href: "/clients/events" },
		],
	},
	{
		label: "Web Design",
		href: "/web-design",
	},
	{
		label: "Customer Stories",
		href: "/customer-stories",
	},
	{
		label: "Contact",
		href: "/contact",
	},
];

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}, [isOpen]);

	const toggleDropdown = (label: string) => {
		setActiveDropdown(activeDropdown === label ? null : label);
	};

	return (
		<>
			{/* Desktop Navigation */}
			<motion.nav
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				className={`fixed hover:bg-white/10 hover:backdrop-blur-xl top-0 left-0 right-0 z-50 transition-all duration-500 ${
					scrolled
						? "bg-black-card/90 backdrop-blur-xl border-b border-white/5 py-4 shadow-lg shadow-black/20"
						: "bg-transparent py-6"
				}`}
			>
				<div className="container-max flex items-center justify-between">
					{/* Logo with Enhanced Styling */}
					<a
						href="/"
						className="relative text-2xl font-black text-white hover:text-rust-500 transition-all duration-300 group"
					>
						<span className="relative z-10">
							SHAWN PAPS MEDIA
							<span className="text-rust-500 group-hover:text-rust-400">.</span>
						</span>
						<span className="absolute inset-0 text-rust-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
							SHAWN PAPS MEDIA
						</span>
					</a>

					{/* Desktop Menu */}
					<div className="hidden lg:flex items-center gap-10">
						{navItems.map((item) => (
							<div
								key={item.label}
								className="relative group"
								onMouseEnter={() =>
									item.dropdown && setActiveDropdown(item.label)
								}
								onMouseLeave={() => setActiveDropdown(null)}
							>
								{item.href ? (
									<a
										href={item.href}
										className="relative text-white font-semibold text-[15px] hover:text-rust-400 transition-colors duration-300 flex items-center gap-1 py-2"
									>
										<span>{item.label}</span>
										<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rust-500 to-rust-400 group-hover:w-full transition-all duration-300"></span>
									</a>
								) : (
									<button className="relative text-white font-semibold text-[15px] hover:text-rust-400 transition-colors duration-300 flex items-center gap-1.5 py-2">
										<span>{item.label}</span>
										<ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 duration-300" />
										<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rust-500 to-rust-400 group-hover:w-full transition-all duration-300"></span>
									</button>
								)}

								{/* Enhanced Dropdown Menu */}
								{item.dropdown && (
									<AnimatePresence>
										{activeDropdown === item.label && (
											<motion.div
												initial={{ opacity: 0, y: -10, scale: 0.95 }}
												animate={{ opacity: 1, y: 0, scale: 1 }}
												exit={{ opacity: 0, y: -10, scale: 0.95 }}
												transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
												className="absolute top-full left-0 mt-3 bg-black-card/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden min-w-[220px] shadow-xl shadow-black/40"
											>
												<div className="p-2">
													{item.dropdown.map((dropdownItem, index) => (
														<a
															key={dropdownItem.href}
															href={dropdownItem.href}
															className="block px-5 py-3 text-steel-300 hover:text-white hover:bg-rust-500/10 transition-all duration-200 rounded-xl font-medium text-[15px] relative group/item"
															style={{ animationDelay: `${index * 50}ms` }}
														>
															<span className="relative z-10">
																{dropdownItem.label}
															</span>
															<span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-1 bg-rust-500 rounded-full group-hover/item:w-1.5 transition-all duration-200 ml-2"></span>
														</a>
													))}
												</div>
											</motion.div>
										)}
									</AnimatePresence>
								)}
							</div>
						))}
					</div>

					{/* Enhanced Mobile Menu Button */}
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="lg:hidden relative w-10 h-10 flex items-center justify-center text-white hover:text-rust-400 transition-colors duration-300 rounded-xl hover:bg-white/5"
						aria-label="Toggle menu"
					>
						<AnimatePresence mode="wait">
							{isOpen ? (
								<motion.div
									key="close"
									initial={{ rotate: -90, opacity: 0 }}
									animate={{ rotate: 0, opacity: 1 }}
									exit={{ rotate: 90, opacity: 0 }}
									transition={{ duration: 0.2 }}
								>
									<X className="w-7 h-7" />
								</motion.div>
							) : (
								<motion.div
									key="menu"
									initial={{ rotate: 90, opacity: 0 }}
									animate={{ rotate: 0, opacity: 1 }}
									exit={{ rotate: -90, opacity: 0 }}
									transition={{ duration: 0.2 }}
								>
									<Menu className="w-7 h-7" />
								</motion.div>
							)}
						</AnimatePresence>
					</button>
				</div>
			</motion.nav>

			{/* Enhanced Mobile Menu Overlay */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="fixed inset-0 bg-black-deep/98 backdrop-blur-xl z-40 lg:hidden"
					>
						{/* Background decoration */}
						<div className="absolute inset-0 mesh-gradient opacity-30 pointer-events-none" />
						<div className="absolute top-1/4 right-1/4 w-96 h-96 bg-rust-500/10 rounded-full blur-[120px] animate-glow-pulse pointer-events-none" />

						<div className="relative z-10 flex flex-col items-center justify-center h-full gap-4 p-8">
							{navItems.map((item, index) => (
								<div key={item.label} className="w-full max-w-sm">
									{item.href ? (
										<motion.a
											initial={{ opacity: 0, y: 30 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{
												delay: index * 0.1,
												duration: 0.5,
												ease: [0.16, 1, 0.3, 1],
											}}
											href={item.href}
											onClick={() => setIsOpen(false)}
											className="block text-4xl font-black text-white hover:text-rust-400 transition-all duration-300 text-center py-3 group"
										>
											<span className="relative">
												{item.label}
												<span className="absolute inset-0 text-rust-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
													{item.label}
												</span>
											</span>
										</motion.a>
									) : (
										<div>
											<motion.button
												initial={{ opacity: 0, y: 30 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{
													delay: index * 0.1,
													duration: 0.5,
													ease: [0.16, 1, 0.3, 1],
												}}
												onClick={() => toggleDropdown(item.label)}
												className="w-full text-4xl font-black text-white hover:text-rust-400 transition-all duration-300 text-center flex items-center justify-center gap-3 py-3 group"
											>
												<span className="relative">
													{item.label}
													<span className="absolute inset-0 text-rust-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
														{item.label}
													</span>
												</span>
												<ChevronDown
													className={`w-7 h-7 transition-transform duration-300 ${
														activeDropdown === item.label ? "rotate-180" : ""
													}`}
												/>
											</motion.button>

											{/* Mobile Dropdown */}
											<AnimatePresence>
												{activeDropdown === item.label && item.dropdown && (
													<motion.div
														initial={{ height: 0, opacity: 0 }}
														animate={{ height: "auto", opacity: 1 }}
														exit={{ height: 0, opacity: 0 }}
														transition={{
															duration: 0.3,
															ease: [0.16, 1, 0.3, 1],
														}}
														className="overflow-hidden mt-4"
													>
														<div className="bg-white/5 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
															{item.dropdown.map((dropdownItem) => (
																<a
																	key={dropdownItem.href}
																	href={dropdownItem.href}
																	onClick={() => setIsOpen(false)}
																	className="block text-xl text-steel-300 hover:text-white hover:bg-rust-500/10 transition-all duration-200 text-center py-3 rounded-xl font-medium"
																>
																	{dropdownItem.label}
																</a>
															))}
														</div>
													</motion.div>
												)}
											</AnimatePresence>
										</div>
									)}
								</div>
							))}

							{/* Mobile CTA */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: navItems.length * 0.1, duration: 0.5 }}
								className="mt-8"
							>
								<a
									href="/contact"
									onClick={() => setIsOpen(false)}
									className="inline-flex items-center gap-3 bg-gradient-to-r from-rust-500 to-rust-400 text-white font-bold text-lg px-10 py-4 rounded-full hover:scale-105 transition-transform duration-300"
								>
									<span>Get Started</span>
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2.5"
											d="M17 8l4 4m0 0l-4 4m4-4H3"
										/>
									</svg>
								</a>
							</motion.div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
