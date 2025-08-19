const ProjectCard = ({
	title,
	description,
	image,
	link,
	testimonial,
}: {
	title: string;
	description: string;
	image: string;
	link: string;
	testimonial: string;
}) => {
	return (
		<div className="w-full h-[40rem] bg-black relative rounded-2xl overflow-hidden group hover:scale-105 transition-all duration-300 cursor-pointer">
			<img src={image} alt={title} className="w-full h-full object-cover" />
			<div className="absolute inset-0 bg-black/50 group-hover:bg-black/0 transition-all duration-300"></div>
			<div className="absolute inset-0 flex justify-between items-center p-20">
				<div className="flex-col flex items-start justify-between h-full">
					<ul>
						<li className="text-4xl font-orbitron">Year</li>
						<li>
							<span>Photography</span>
						</li>
						<li>
							<span>Creative Direction</span>
						</li>
						<li>
							<span>Web Design</span>
						</li>
					</ul>
					<div>
						<p className="text-7xl font-orbitron">{title}</p>
					</div>
				</div>
				<div className="flex-col flex items-end justify-center h-full">
					<ul>
						<li>
							<p className="text-2xl">{testimonial}</p>
						</li>
					</ul>
					<a
						href={link}
						className="text-2xl rounded-full px-4 py-2 mt-auto z-10 hover:bg-white/10 transition-all duration-300 btn btn-outline btn-primary">
						Read More{' '}
						<span className="text-2xl inline-flex items-center">→</span>
					</a>
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
