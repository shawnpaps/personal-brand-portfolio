import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "./Lightbox";
import { ChevronDown, ChevronUp, X } from "lucide-react";

interface GalleryItem {
	id: string;
	title: string;
	description?: string;
	imageUrl: string;
	mood?: string[];
	aesthetic?: string[];
	subject?: string[];
	industry?: string[];
}

interface FilterableGalleryProps {
	items: GalleryItem[];
	filterCategories: {
		mood?: string[];
		aesthetic?: string[];
		subject?: string[];
		industry?: string[];
	};
}

export default function FilterableGallery({
	items,
	filterCategories,
}: FilterableGalleryProps) {
	const [selectedFilters, setSelectedFilters] = useState<{
		mood: string[];
		aesthetic: string[];
		subject: string[];
		industry: string[];
	}>({
		mood: [],
		aesthetic: [],
		subject: [],
		industry: [],
	});

	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [expandedCategories, setExpandedCategories] = useState<{
		mood: boolean;
		aesthetic: boolean;
		subject: boolean;
		industry: boolean;
	}>({
		mood: true,
		aesthetic: true,
		subject: true,
		industry: true,
	});

	const toggleCategory = (category: keyof typeof expandedCategories) => {
		setExpandedCategories((prev) => ({
			...prev,
			[category]: !prev[category],
		}));
	};

	const toggleFilter = (
		category: keyof typeof selectedFilters,
		value: string,
	) => {
		setSelectedFilters((prev) => {
			const currentCategoryFilters = prev[category];
			const isSelected = currentCategoryFilters.includes(value);

			return {
				...prev,
				[category]: isSelected
					? currentCategoryFilters.filter((f) => f !== value)
					: [...currentCategoryFilters, value],
			};
		});
	};

	const clearAllFilters = () => {
		setSelectedFilters({
			mood: [],
			aesthetic: [],
			subject: [],
			industry: [],
		});
	};

	const filteredItems = useMemo(() => {
		return items.filter((item) => {
			const matchesMood =
				selectedFilters.mood.length === 0 ||
				selectedFilters.mood.some((f) => item.mood?.includes(f));

			const matchesAesthetic =
				selectedFilters.aesthetic.length === 0 ||
				selectedFilters.aesthetic.some((f) => item.aesthetic?.includes(f));

			const matchesSubject =
				selectedFilters.subject.length === 0 ||
				selectedFilters.subject.some((f) => item.subject?.includes(f));

			const matchesIndustry =
				selectedFilters.industry.length === 0 ||
				selectedFilters.industry.some((f) => item.industry?.includes(f));

			return (
				matchesMood && matchesAesthetic && matchesSubject && matchesIndustry
			);
		});
	}, [items, selectedFilters]);

	const hasActiveFilters = Object.values(selectedFilters).some(
		(arr) => arr.length > 0,
	);

	const openLightbox = (index: number) => {
		setCurrentImageIndex(index);
		setLightboxOpen(true);
	};

	const navigate = (direction: "prev" | "next") => {
		if (direction === "prev") {
			setCurrentImageIndex((prev) =>
				prev === 0 ? filteredItems.length - 1 : prev - 1,
			);
		} else {
			setCurrentImageIndex((prev) =>
				prev === filteredItems.length - 1 ? 0 : prev + 1,
			);
		}
	};

	return (
		<div className="w-full">
			{/* Filters Panel */}
			<div className="mb-12 bg-black-soft/50 backdrop-blur-sm border border-concrete/20 rounded-2xl p-6 md:p-8 shadow-2xl">
				{/* Header */}
				<div className="flex items-center justify-between mb-6">
					<div>
						<h2 className="text-2xl font-black text-white mb-1">
							Filter Gallery
						</h2>
						<p className="text-steel-light text-sm">
							{hasActiveFilters ? (
								<>
									<span className="text-rust-orange font-semibold">
										{Object.values(selectedFilters).flat().length}
									</span>{" "}
									active filter
									{Object.values(selectedFilters).flat().length !== 1
										? "s"
										: ""}
								</>
							) : (
								"Select filters to refine your search"
							)}
						</p>
					</div>
					{hasActiveFilters && (
						<button
							onClick={clearAllFilters}
							className="flex items-center gap-2 px-4 py-2 bg-rust-orange/10 hover:bg-rust-orange/20 text-rust-orange border border-rust-orange/30 rounded-lg font-semibold transition-all hover:scale-105"
						>
							<X size={16} />
							Clear All
						</button>
					)}
				</div>

				{/* Active Filters Pills */}
				{hasActiveFilters && (
					<div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-concrete/20">
						{Object.entries(selectedFilters).map(([category, values]) =>
							values.map((value) => (
								<motion.button
									key={`${category}-${value}`}
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									onClick={() =>
										toggleFilter(
											category as keyof typeof selectedFilters,
											value,
										)
									}
									className="flex items-center gap-1.5 px-3 py-1.5 bg-rust-orange text-white text-sm font-semibold rounded-full hover:bg-rust-light transition-all group"
								>
									{value}
									<X
										size={14}
										className="group-hover:rotate-90 transition-transform"
									/>
								</motion.button>
							)),
						)}
					</div>
				)}

				{/* Filter Categories */}
				<div className="space-y-4">
					{Object.entries(filterCategories).map(([category, values]) => {
						if (!values || values.length === 0) return null;
						const isExpanded =
							expandedCategories[category as keyof typeof expandedCategories];
						const categoryKey = category as keyof typeof selectedFilters;
						const activeCount = selectedFilters[categoryKey].length;

						return (
							<div
								key={category}
								className="border border-concrete/10 rounded-xl overflow-hidden bg-black-deep/30"
							>
								{/* Category Header */}
								<button
									onClick={() => toggleCategory(categoryKey)}
									className="w-full flex items-center justify-between p-4 hover:bg-concrete/5 transition-colors group"
								>
									<div className="flex items-center gap-3">
										<h3 className="text-white font-bold text-lg capitalize">
											{category}
										</h3>
										{activeCount > 0 && (
											<span className="px-2.5 py-0.5 bg-rust-orange text-white text-xs font-bold rounded-full">
												{activeCount}
											</span>
										)}
									</div>
									<motion.div
										animate={{ rotate: isExpanded ? 180 : 0 }}
										transition={{ duration: 0.2 }}
									>
										<ChevronDown
											className="text-steel-light group-hover:text-white transition-colors"
											size={20}
										/>
									</motion.div>
								</button>

								{/* Category Content */}
								<AnimatePresence>
									{isExpanded && (
										<motion.div
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: "auto", opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											transition={{ duration: 0.2 }}
											className="overflow-hidden"
										>
											<div className="p-4 pt-0 flex flex-wrap gap-2.5">
												{values.map((value) => {
													const isSelected =
														selectedFilters[categoryKey].includes(value);

													return (
														<button
															key={value}
															onClick={() => toggleFilter(categoryKey, value)}
															className={`
                                px-4 py-2.5 rounded-full font-semibold text-sm transition-all
                                ${
																	isSelected
																		? "bg-gradient-to-r from-rust-orange to-rust-light text-white shadow-lg shadow-rust-orange/30 scale-105"
																		: "bg-concrete/80 hover:bg-concrete text-white/90 hover:text-white hover:scale-105"
																}
                              `}
														>
															{value}
														</button>
													);
												})}
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						);
					})}
				</div>
			</div>

			{/* Results Count */}
			<div className="flex items-center justify-between mb-8">
				<p className="text-steel-light text-lg">
					Showing{" "}
					<span className="text-white font-bold">{filteredItems.length}</span>{" "}
					of <span className="text-white font-bold">{items.length}</span>{" "}
					{filteredItems.length === 1 ? "image" : "images"}
				</p>
			</div>

			{/* Gallery Grid */}
			<motion.div
				layout
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
			>
				<AnimatePresence>
					{filteredItems.map((item, index) => (
						<motion.div
							key={item.id}
							layout
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.9 }}
							transition={{ duration: 0.3 }}
							className="relative group cursor-pointer overflow-hidden rounded-lg aspect-[4/5]"
							onClick={() => openLightbox(index)}
						>
							<img
								src={item.imageUrl}
								alt={item.title}
								className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
							/>

							{/* Overlay */}
							<div className="absolute inset-0 bg-gradient-to-t from-black-deep/90 via-black-deep/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
								<h3 className="text-white text-xl font-bold mb-2">
									{item.title}
								</h3>
								{item.description && (
									<p className="text-steel-light text-sm">{item.description}</p>
								)}
							</div>
						</motion.div>
					))}
				</AnimatePresence>
			</motion.div>

			{/* No Results */}
			{filteredItems.length === 0 && (
				<div className="text-center py-20">
					<p className="text-steel-light text-xl">
						No images match your selected filters.
					</p>
					<button
						onClick={clearAllFilters}
						className="mt-4 text-rust-orange hover:text-rust-light font-semibold"
					>
						Clear all filters
					</button>
				</div>
			)}

			{/* Lightbox */}
			<Lightbox
				isOpen={lightboxOpen}
				onClose={() => setLightboxOpen(false)}
				images={filteredItems}
				currentIndex={currentImageIndex}
				onNavigate={navigate}
			/>
		</div>
	);
}
