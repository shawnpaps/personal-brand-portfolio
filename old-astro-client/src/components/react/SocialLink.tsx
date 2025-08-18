import React from 'react';

const SocialLink = ({ href, icon }: { href: string; icon: any }) => {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="w-14 h-14 bg-moody-800/50 border border-warm-500/20 rounded-full flex items-center justify-center text-warm-400 hover:bg-warm-500/10 hover:border-warm-400 transition-all duration-300 transform hover:scale-110">
			{icon}
		</a>
	);
};

export default SocialLink;
