import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import TestimonialCard from './TestimonialCard';
import { apiUrl } from '../../data/variables';

interface Testimonial {
	id: string;
	name: string;
	company: string;
	testimonial: string;
	avatar_url?: string;
}

const TestimonialsGrid = () => {
	const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

	useEffect(() => {
		const fetchTestimonials = async () => {
			try {
				const response = await fetch(`/api/testimonials`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				const data = await response.json();
				// Shuffle and take only 3 random testimonials
				const shuffled = data.sort(() => 0.5 - Math.random());
				setTestimonials(shuffled.slice(0, 3));
			} catch (error) {
				console.error('Error fetching testimonials:', error);
				// Fallback data for development
				const fallbackData = [
					{
						id: '1',
						name: 'Alex Chen',
						company: 'SoundWave Studios',
						testimonial:
							"Shawn's production skills are absolutely incredible. He transformed our raw tracks into something magical. The attention to detail and creative vision he brings is unmatched.",
						avatar_url:
							'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
					},
					{
						id: '2',
						name: 'Maya Rodriguez',
						company: 'Creative Collective',
						testimonial:
							'Working with Shawn was a game-changer for our brand. His photography captured the essence of our creative process perfectly. The warm, moody aesthetic he brings is exactly what we were looking for.',
						avatar_url:
							'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
					},
					{
						id: '3',
						name: 'Jordan Kim',
						company: 'BeatLab Records',
						testimonial:
							"Shawn's ability to blend technical precision with artistic vision is rare. He doesn't just produce music - he crafts experiences. Every track he touches becomes something special.",
						avatar_url:
							'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
					},
					{
						id: '4',
						name: 'Sarah Williams',
						company: 'Studio 404',
						testimonial:
							'The way Shawn captures emotion through his lens is extraordinary. Every photo tells a story, and his warm, moody style perfectly complements our artistic vision.',
						avatar_url:
							'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
					},
					{
						id: '5',
						name: 'Marcus Thompson',
						company: 'Rhythm Records',
						testimonial:
							"Shawn's production work is next level. He has an uncanny ability to understand exactly what a track needs and brings out its full potential.",
						avatar_url:
							'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
					},
				];
				// Shuffle and take only 3 random testimonials
				const shuffled = fallbackData.sort(() => 0.5 - Math.random());
				setTestimonials(shuffled.slice(0, 3));
			}
		};
		fetchTestimonials();
	}, []);

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<motion.div
				className="text-center mb-16"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}>
				<h2 className="font-display text-4xl md:text-5xl font-bold text-warm-400 mb-4 tracking-wider">
					WHAT CLIENTS SAY
				</h2>
				<div className="w-24 h-1 bg-gradient-to-r from-warm-500 to-warm-600 mx-auto"></div>
			</motion.div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{testimonials.map((testimonial, index) => (
					<TestimonialCard
						key={testimonial.id}
						testimonial={testimonial}
						index={index}
					/>
				))}
			</div>
		</div>
	);
};

export default TestimonialsGrid;
