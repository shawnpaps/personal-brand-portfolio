import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FormData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

const ContactForm = () => {
	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		subject: '',
		message: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [errors, setErrors] = useState<Partial<FormData>>({});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		// Clear error when user starts typing
		if (errors[name as keyof FormData]) {
			setErrors((prev) => ({ ...prev, [name]: '' }));
		}
	};

	const validateForm = (): boolean => {
		const newErrors: Partial<FormData> = {};

		if (!formData.name.trim()) newErrors.name = 'Name is required';
		if (!formData.email.trim()) {
			newErrors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Email is invalid';
		}
		if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
		if (!formData.message.trim()) newErrors.message = 'Message is required';

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) return;

		setIsSubmitting(true);

		try {
			// TODO: Replace with your actual API endpoint
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				setIsSubmitted(true);
				setFormData({ name: '', email: '', subject: '', message: '' });
			} else {
				throw new Error('Failed to send message');
			}
		} catch (error) {
			console.error('Error sending message:', error);
			// Handle error state here
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isSubmitted) {
		return (
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				className="text-center py-12">
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
					className="w-20 h-20 bg-gradient-to-br from-warm-500 to-warm-600 rounded-full flex items-center justify-center mx-auto mb-6">
					<svg
						className="w-10 h-10 text-moody-900"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M5 13l4 4L19 7"></path>
					</svg>
				</motion.div>
				<motion.h3
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
					className="text-2xl font-heading font-bold text-warm-400 mb-4">
					Message Sent!
				</motion.h3>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6 }}
					className="text-moody-400 mb-8">
					Thank you for reaching out. I'll get back to you soon!
				</motion.p>
				<motion.button
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.8 }}
					onClick={() => setIsSubmitted(false)}
					className="px-6 py-3 bg-warm-500/10 border border-warm-500/30 text-warm-400 font-heading tracking-wider uppercase hover:bg-warm-500/20 transition-all duration-300 rounded-lg">
					Send Another Message
				</motion.button>
			</motion.div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className="max-w-2xl mx-auto mb-4">
			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Name Field */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.1 }}
					className="relative group">
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						placeholder="Your Name"
						className={`w-full px-6 py-4 bg-moody-800/50 backdrop-blur-sm border-2 rounded-xl text-moody-100 placeholder-moody-500 font-body focus:outline-none focus:border-warm-400 transition-all duration-300 ${
							errors.name
								? 'border-red-500/50'
								: 'border-warm-500/20 group-hover:border-warm-400/40'
						}`}
					/>
					<AnimatePresence>
						{errors.name && (
							<motion.p
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								className="absolute -bottom-6 left-0 text-red-400 text-sm">
								{errors.name}
							</motion.p>
						)}
					</AnimatePresence>
				</motion.div>

				{/* Email Field */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.2 }}
					className="relative group">
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						placeholder="Your Email"
						className={`w-full px-6 py-4 bg-moody-800/50 backdrop-blur-sm border-2 rounded-xl text-moody-100 placeholder-moody-500 font-body focus:outline-none focus:border-warm-400 transition-all duration-300 ${
							errors.email
								? 'border-red-500/50'
								: 'border-warm-500/20 group-hover:border-warm-400/40'
						}`}
					/>
					<AnimatePresence>
						{errors.email && (
							<motion.p
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								className="absolute -bottom-6 left-0 text-red-400 text-sm">
								{errors.email}
							</motion.p>
						)}
					</AnimatePresence>
				</motion.div>

				{/* Subject Field */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.3 }}
					className="relative group">
					<input
						type="text"
						name="subject"
						value={formData.subject}
						onChange={handleChange}
						placeholder="Subject"
						className={`w-full px-6 py-4 bg-moody-800/50 backdrop-blur-sm border-2 rounded-xl text-moody-100 placeholder-moody-500 font-body focus:outline-none focus:border-warm-400 transition-all duration-300 ${
							errors.subject
								? 'border-red-500/50'
								: 'border-warm-500/20 group-hover:border-warm-400/40'
						}`}
					/>
					<AnimatePresence>
						{errors.subject && (
							<motion.p
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								className="absolute -bottom-6 left-0 text-red-400 text-sm">
								{errors.subject}
							</motion.p>
						)}
					</AnimatePresence>
				</motion.div>

				{/* Message Field */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.4 }}
					className="relative group">
					<textarea
						name="message"
						value={formData.message}
						onChange={handleChange}
						placeholder="Your Message"
						rows={6}
						className={`w-full px-6 py-4 bg-moody-800/50 backdrop-blur-sm border-2 rounded-xl text-moody-100 placeholder-moody-500 font-body focus:outline-none focus:border-warm-400 transition-all duration-300 resize-none ${
							errors.message
								? 'border-red-500/50'
								: 'border-warm-500/20 group-hover:border-warm-400/40'
						}`}
					/>
					<AnimatePresence>
						{errors.message && (
							<motion.p
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								className="absolute -bottom-6 left-0 text-red-400 text-sm">
								{errors.message}
							</motion.p>
						)}
					</AnimatePresence>
				</motion.div>

				{/* Submit Button */}
				<motion.button
					type="submit"
					disabled={isSubmitting}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5 }}
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					className="w-full px-8 py-4 bg-gradient-to-r from-warm-500 to-warm-600 text-moody-900 font-heading font-semibold tracking-wider uppercase hover:from-warm-400 hover:to-warm-500 transition-all duration-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group">
					{/* Button Shine Effect */}
					<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

					<span className="relative z-10 flex items-center justify-center">
						{isSubmitting ? (
							<>
								<motion.div
									animate={{ rotate: 360 }}
									transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
									className="w-5 h-5 border-2 border-moody-900 border-t-transparent rounded-full mr-3"
								/>
								Sending...
							</>
						) : (
							'Send Message'
						)}
					</span>
				</motion.button>
			</form>
		</motion.div>
	);
};

export default ContactForm;
