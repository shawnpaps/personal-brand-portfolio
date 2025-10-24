import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const budgetOptions = [
	{ value: "", label: "Select your budget" },
	{ value: "under-5k", label: "Under $5,000" },
	{ value: "5k-10k", label: "$5,000 - $10,000" },
	{ value: "10k-25k", label: "$10,000 - $25,000" },
	{ value: "25k+", label: "$25,000+" },
];

// Rate limiting constants
const MAX_SUBMISSIONS = 3;
const TIME_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MIN_FORM_FILL_TIME = 3000; // 3 seconds minimum

// Validation schema
const validationSchema = Yup.object({
	name: Yup.string()
		.min(2, "Name must be at least 2 characters")
		.max(100, "Name must be less than 100 characters")
		.required("Name is required")
		.matches(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters"),
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required")
		.max(255, "Email is too long"),
	phone: Yup.string()
		.matches(/^[\d\s()+-]*$/, "Phone number contains invalid characters")
		.max(20, "Phone number is too long"),
	company: Yup.string()
		.max(100, "Company name is too long")
		.matches(
			/^[a-zA-Z0-9\s&.,'-]*$/,
			"Company name contains invalid characters",
		),
	description: Yup.string()
		.min(10, "Description must be at least 10 characters")
		.max(1000, "Description must be less than 1000 characters")
		.required("Project description is required"),
	budget: Yup.string().required("Please select a budget range"),
	// Honeypot field - should always be empty
	website: Yup.string().max(0, "Invalid submission"),
});

interface FormValues {
	name: string;
	email: string;
	phone: string;
	company: string;
	description: string;
	budget: string;
	website: string; // Honeypot
}

export default function ContactForm() {
	const [submitStatus, setSubmitStatus] = useState<
		"idle" | "success" | "error" | "rate-limited"
	>("idle");
	const [formLoadTime, setFormLoadTime] = useState<number>(Date.now());
	const [isBlocked, setIsBlocked] = useState(false);

	useEffect(() => {
		// Record when form was loaded
		setFormLoadTime(Date.now());

		// Check if user is rate limited
		checkRateLimit();
	}, []);

	const checkRateLimit = () => {
		if (typeof window === "undefined") return false;

		const submissions = getSubmissionHistory();
		const now = Date.now();

		// Filter submissions within the time window
		const recentSubmissions = submissions.filter(
			(timestamp) => now - timestamp < TIME_WINDOW,
		);

		if (recentSubmissions.length >= MAX_SUBMISSIONS) {
			setIsBlocked(true);
			setSubmitStatus("rate-limited");
			return true;
		}

		return false;
	};

	const getSubmissionHistory = (): number[] => {
		if (typeof window === "undefined") return [];

		const stored = localStorage.getItem("form_submissions");
		if (!stored) return [];

		try {
			return JSON.parse(stored);
		} catch {
			return [];
		}
	};

	const addSubmissionToHistory = () => {
		if (typeof window === "undefined") return;

		const submissions = getSubmissionHistory();
		const now = Date.now();

		// Add current submission and clean old ones
		const updated = [...submissions, now].filter(
			(timestamp) => now - timestamp < TIME_WINDOW,
		);

		localStorage.setItem("form_submissions", JSON.stringify(updated));
	};

	const handleSubmit = async (
		values: FormValues,
		{ setSubmitting, resetForm }: any,
	) => {
		try {
			// Check rate limiting
			if (checkRateLimit()) {
				setSubmitting(false);
				return;
			}

			// Check minimum form fill time (bot detection)
			const timeSpent = Date.now() - formLoadTime;
			if (timeSpent < MIN_FORM_FILL_TIME) {
				console.warn("Form submitted too quickly");
				setSubmitStatus("error");
				setSubmitting(false);
				return;
			}

			// Check honeypot
			if (values.website) {
				console.warn("Honeypot triggered");
				setSubmitStatus("error");
				setSubmitting(false);
				return;
			}

			// Prepare form data
			const formData = new FormData();
			formData.append("name", values.name.trim());
			formData.append("email", values.email.trim());
			formData.append("phone", values.phone.trim() || "Not provided");
			formData.append("company", values.company.trim() || "Not provided");
			formData.append("description", values.description.trim());
			formData.append("budget", values.budget);
			formData.append(
				"_subject",
				`New Contact Form Submission from ${values.name}`,
			);
			formData.append("_captcha", "false");
			formData.append("_template", "table");

			// Submit form
			const response = await fetch(
				"https://formsubmit.co/spapineau@spaptechnology.com",
				{
					method: "POST",
					body: formData,
					headers: {
						Accept: "application/json",
					},
				},
			);

			if (response.ok) {
				setSubmitStatus("success");
				addSubmissionToHistory();
				resetForm();
				// Reset form load time for next submission
				setFormLoadTime(Date.now());
			} else {
				setSubmitStatus("error");
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			setSubmitStatus("error");
		} finally {
			setSubmitting(false);
		}
	};

	const initialValues: FormValues = {
		name: "",
		email: "",
		phone: "",
		company: "",
		description: "",
		budget: "",
		website: "", // Honeypot
	};

	return (
		<div className="flex justify-center items-center">
			<div className="card w-full max-w-lg shadow-xl bg-base-100">
				<div className="card-body">
					<h2 className="card-title text-3xl mb-4">Contact Me</h2>

					{submitStatus === "success" && (
						<div className="alert alert-success mb-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="stroke-current shrink-0 h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<span>Thanks! Your message has been sent successfully.</span>
						</div>
					)}

					{submitStatus === "error" && (
						<div className="alert alert-error mb-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="stroke-current shrink-0 h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<span>Oops! Something went wrong. Please try again.</span>
						</div>
					)}

					{submitStatus === "rate-limited" && (
						<div className="alert alert-warning mb-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="stroke-current shrink-0 h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								/>
							</svg>
							<span>
								You've reached the maximum number of submissions. Please try
								again later.
							</span>
						</div>
					)}

					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						{({ isSubmitting, errors, touched }) => (
							<Form className="space-y-4">
								<div>
									<Field
										type="text"
										name="name"
										placeholder="Your Name"
										className={`input input-bordered w-full ${
											errors.name && touched.name ? "input-error" : ""
										}`}
										disabled={isSubmitting || isBlocked}
									/>
									<ErrorMessage
										name="name"
										component="div"
										className="text-error text-sm mt-1"
									/>
								</div>

								<div>
									<Field
										type="email"
										name="email"
										placeholder="Email Address"
										className={`input input-bordered w-full ${
											errors.email && touched.email ? "input-error" : ""
										}`}
										disabled={isSubmitting || isBlocked}
									/>
									<ErrorMessage
										name="email"
										component="div"
										className="text-error text-sm mt-1"
									/>
								</div>

								<div>
									<Field
										type="tel"
										name="phone"
										placeholder="Phone (optional)"
										className={`input input-bordered w-full ${
											errors.phone && touched.phone ? "input-error" : ""
										}`}
										disabled={isSubmitting || isBlocked}
									/>
									<ErrorMessage
										name="phone"
										component="div"
										className="text-error text-sm mt-1"
									/>
								</div>

								<div>
									<Field
										type="text"
										name="company"
										placeholder="Company Name (optional)"
										className={`input input-bordered w-full ${
											errors.company && touched.company ? "input-error" : ""
										}`}
										disabled={isSubmitting || isBlocked}
									/>
									<ErrorMessage
										name="company"
										component="div"
										className="text-error text-sm mt-1"
									/>
								</div>

								<div>
									<Field
										as="textarea"
										name="description"
										placeholder="Brief project description"
										className={`textarea textarea-bordered w-full ${
											errors.description && touched.description
												? "textarea-error"
												: ""
										}`}
										rows={4}
										disabled={isSubmitting || isBlocked}
									/>
									<ErrorMessage
										name="description"
										component="div"
										className="text-error text-sm mt-1"
									/>
								</div>

								<div>
									<Field
										as="select"
										name="budget"
										className={`select select-bordered w-full ${
											errors.budget && touched.budget ? "select-error" : ""
										}`}
										disabled={isSubmitting || isBlocked}
									>
										{budgetOptions.map((opt) => (
											<option key={opt.value} value={opt.value}>
												{opt.label}
											</option>
										))}
									</Field>
									<ErrorMessage
										name="budget"
										component="div"
										className="text-error text-sm mt-1"
									/>
								</div>

								{/* Honeypot field - hidden from users */}
								<div className="hidden">
									<Field
										type="text"
										name="website"
										placeholder="Website"
										tabIndex={-1}
										autoComplete="off"
									/>
								</div>

								<button
									className="btn btn-primary w-full"
									type="submit"
									disabled={isSubmitting || isBlocked}
								>
									{isSubmitting ? (
										<>
											<span className="loading loading-spinner"></span>
											Sending...
										</>
									) : (
										"Submit"
									)}
								</button>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
}
