import React, { useState } from "react";

const budgetOptions = [
	{ value: "", label: "Select your budget" },
	{ value: "under-5k", label: "Under $5,000" },
	{ value: "5k-10k", label: "$5,000 - $10,000" },
	{ value: "10k-25k", label: "$10,000 - $25,000" },
	{ value: "25k+", label: "$25,000+" },
];

export default function ContactForm() {
	const [form, setForm] = useState({
		name: "",
		email: "",
		phone: "",
		company: "",
		description: "",
		budget: "",
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Wire up to Notion here
		alert("Form submitted! (Wire up to Notion API)");
	};

	return (
		<div className="flex justify-center items-center ">
			<div className="card w-full max-w-lg shadow-xl bg-base-100">
				<div className="card-body">
					<h2 className="card-title text-3xl mb-4">Contact Me</h2>
					<form onSubmit={handleSubmit} className="space-y-4">
						<input
							type="text"
							name="name"
							placeholder="Your Name"
							className="input input-bordered w-full"
							required
							value={form.name}
							onChange={handleChange}
						/>
						<input
							type="email"
							name="email"
							placeholder="Email Address"
							className="input input-bordered w-full"
							required
							value={form.email}
							onChange={handleChange}
						/>
						<input
							type="tel"
							name="phone"
							placeholder="Phone (optional)"
							className="input input-bordered w-full"
							value={form.phone}
							onChange={handleChange}
						/>
						<input
							type="text"
							name="company"
							placeholder="Company Name (optional)"
							className="input input-bordered w-full"
							value={form.company}
							onChange={handleChange}
						/>
						<textarea
							name="description"
							placeholder="Brief project description"
							className="textarea textarea-bordered w-full"
							required
							value={form.description}
							onChange={handleChange}
							rows={4}
						/>
						<select
							name="budget"
							className="select select-bordered w-full"
							required
							value={form.budget}
							onChange={handleChange}
						>
							{budgetOptions.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
						</select>
						<button className="btn btn-primary w-full" type="submit">
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
