import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { useState } from "react";

const contactSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, "Name must be at least 2 characters")
		.required("Name is required"),
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	businessName: Yup.string(),
	serviceInterest: Yup.string().required("Please select a service"),
	clientType: Yup.string().required("Please select a client type"),
	projectDetails: Yup.string()
		.min(20, "Please provide at least 20 characters")
		.required("Project details are required"),
	source: Yup.string(),
});

interface FormValues {
	name: string;
	email: string;
	businessName: string;
	serviceInterest: string;
	clientType: string;
	projectDetails: string;
	source: string;
}

export default function ContactForm() {
	const [submitStatus, setSubmitStatus] = useState<
		"idle" | "success" | "error"
	>("idle");

	const initialValues: FormValues = {
		name: "",
		email: "",
		businessName: "",
		serviceInterest: "",
		clientType: "",
		projectDetails: "",
		source: "",
	};

	const handleSubmit = async (
		values: FormValues,
		{ setSubmitting, resetForm }: any,
	) => {
		try {
			// Log to console as requested
			console.log("Form Submission:", values);

			// Show success message
			alert("Form submitted successfully! Check the console for details.");
			setSubmitStatus("success");
			resetForm();

			// Reset success message after 5 seconds
			setTimeout(() => setSubmitStatus("idle"), 5000);
		} catch (error) {
			console.error("Form submission error:", error);
			setSubmitStatus("error");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={contactSchema}
			onSubmit={handleSubmit}
		>
			{({ isSubmitting, errors, touched }) => (
				<Form className="space-y-6">
					{/* Name */}
					<div>
						<label
							htmlFor="name"
							className="block text-white font-semibold mb-2"
						>
							Name *
						</label>
						<Field
							type="text"
							name="name"
							id="name"
							className={`w-full bg-black-soft border ${
								errors.name && touched.name
									? "border-rust-orange"
									: "border-concrete"
							} rounded-lg px-4 py-3 text-white focus:border-rust-orange focus:outline-none transition-colors`}
							placeholder="Your name"
						/>
						<ErrorMessage
							name="name"
							component="div"
							className="text-rust-orange text-sm mt-1"
						/>
					</div>

					{/* Email */}
					<div>
						<label
							htmlFor="email"
							className="block text-white font-semibold mb-2"
						>
							Email *
						</label>
						<Field
							type="email"
							name="email"
							id="email"
							className={`w-full bg-black-soft border ${
								errors.email && touched.email
									? "border-rust-orange"
									: "border-concrete"
							} rounded-lg px-4 py-3 text-white focus:border-rust-orange focus:outline-none transition-colors`}
							placeholder="your@email.com"
						/>
						<ErrorMessage
							name="email"
							component="div"
							className="text-rust-orange text-sm mt-1"
						/>
					</div>

					{/* Business Name */}
					<div>
						<label
							htmlFor="businessName"
							className="block text-white font-semibold mb-2"
						>
							Business Name
						</label>
						<Field
							type="text"
							name="businessName"
							id="businessName"
							className="w-full bg-black-soft border border-concrete rounded-lg px-4 py-3 text-white focus:border-rust-orange focus:outline-none transition-colors"
							placeholder="Your business (optional)"
						/>
					</div>

					{/* Service Interest */}
					<div>
						<label
							htmlFor="serviceInterest"
							className="block text-white font-semibold mb-2"
						>
							Service Interest *
						</label>
						<Field
							as="select"
							name="serviceInterest"
							id="serviceInterest"
							className={`w-full bg-black-soft border ${
								errors.serviceInterest && touched.serviceInterest
									? "border-rust-orange"
									: "border-concrete"
							} rounded-lg px-4 py-3 text-white focus:border-rust-orange focus:outline-none transition-colors`}
						>
							<option value="">Select a service</option>
							<option value="web-design">Web Design</option>
							<option value="photography">Photography</option>
							<option value="videography">Videography</option>
							<option value="multiple">Multiple Services</option>
						</Field>
						<ErrorMessage
							name="serviceInterest"
							component="div"
							className="text-rust-orange text-sm mt-1"
						/>
					</div>

					{/* Client Type */}
					<div>
						<label
							htmlFor="clientType"
							className="block text-white font-semibold mb-2"
						>
							Client Type *
						</label>
						<Field
							as="select"
							name="clientType"
							id="clientType"
							className={`w-full bg-black-soft border ${
								errors.clientType && touched.clientType
									? "border-rust-orange"
									: "border-concrete"
							} rounded-lg px-4 py-3 text-white focus:border-rust-orange focus:outline-none transition-colors`}
						>
							<option value="">Select client type</option>
							<option value="creator">Creator</option>
							<option value="small-business">Small Business</option>
							<option value="event">Event</option>
							<option value="other">Other</option>
						</Field>
						<ErrorMessage
							name="clientType"
							component="div"
							className="text-rust-orange text-sm mt-1"
						/>
					</div>

					{/* Project Details */}
					<div>
						<label
							htmlFor="projectDetails"
							className="block text-white font-semibold mb-2"
						>
							Project Details *
						</label>
						<Field
							as="textarea"
							name="projectDetails"
							id="projectDetails"
							rows={5}
							className={`w-full bg-black-soft border ${
								errors.projectDetails && touched.projectDetails
									? "border-rust-orange"
									: "border-concrete"
							} rounded-lg px-4 py-3 text-white focus:border-rust-orange focus:outline-none transition-colors resize-none`}
							placeholder="Tell us about your project..."
						/>
						<ErrorMessage
							name="projectDetails"
							component="div"
							className="text-rust-orange text-sm mt-1"
						/>
					</div>

					{/* Source */}
					<div>
						<label
							htmlFor="source"
							className="block text-white font-semibold mb-2"
						>
							How Did You Hear About Us?
						</label>
						<Field
							type="text"
							name="source"
							id="source"
							className="w-full bg-black-soft border border-concrete rounded-lg px-4 py-3 text-white focus:border-rust-orange focus:outline-none transition-colors"
							placeholder="Instagram, referral, Google, etc. (optional)"
						/>
					</div>

					{/* Submit Button */}
					<motion.button
						type="submit"
						disabled={isSubmitting}
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className={`w-full bg-rust-orange hover:bg-rust-light text-white font-bold py-4 rounded-lg transition-colors ${
							isSubmitting ? "opacity-50 cursor-not-allowed" : ""
						}`}
					>
						{isSubmitting ? "Sending..." : "Send Message"}
					</motion.button>

					{/* Status Messages */}
					{submitStatus === "success" && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							className="bg-copper/20 border border-copper-light rounded-lg p-4 text-white text-center"
						>
							Message sent successfully! We'll get back to you soon.
						</motion.div>
					)}

					{submitStatus === "error" && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							className="bg-rust-orange/20 border border-rust-orange rounded-lg p-4 text-white text-center"
						>
							There was an error sending your message. Please try again.
						</motion.div>
					)}
				</Form>
			)}
		</Formik>
	);
}
