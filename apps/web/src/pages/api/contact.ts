import type { APIRoute } from 'astro';
import { getCMSBaseUrl } from '@/lib/cms';

export const prerender = false;

const formDataToPayload = (formData: FormData) => ({
	name: formData.get('name'),
	email: formData.get('email'),
	company: formData.get('company') || undefined,
	phone: formData.get('phone') || undefined,
	serviceInterest: formData
		.getAll('serviceInterest')
		.map((entry) => String(entry)),
	budgetRange: formData.get('budgetRange') || undefined,
	timeline: formData.get('timeline') || undefined,
	message: formData.get('message'),
	subscribe: formData.get('subscribe') === 'true',
});

export const POST: APIRoute = async ({ request }) => {
	try {
		const baseUrl = getCMSBaseUrl();
		let payloadBody;

		if (request.headers.get('content-type')?.includes('application/json')) {
			const json = await request.json();
			payloadBody = {
				name: json.name,
				email: json.email,
				company: json.company ?? undefined,
				phone: json.phone ?? undefined,
				serviceInterest: Array.isArray(json.serviceInterest)
					? json.serviceInterest
					: json.serviceInterest
						? [json.serviceInterest]
						: [],
				budgetRange: json.budgetRange ?? undefined,
				timeline: json.timeline ?? undefined,
				message: json.message,
				subscribe: Boolean(json.subscribe),
			};
		} else {
			const formData = await request.formData();
			payloadBody = formDataToPayload(formData);
		}

		if (!payloadBody.name || !payloadBody.email || !payloadBody.message) {
			return new Response(
				JSON.stringify({ success: false, error: 'Missing required fields.' }),
				{ status: 400 }
			);
		}

		const contactUrl = new URL('/api/contact-submissions', baseUrl);
		const payloadResponse = await fetch(contactUrl.toString(), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payloadBody),
		});

		if (!payloadResponse.ok) {
			const errorText = await payloadResponse.text();
			console.error(
				'Failed to create contact submission in Payload:',
				errorText
			);
			return new Response(JSON.stringify({ success: false }), { status: 502 });
		}

		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		console.error('Contact form submission failed', error);
		return new Response(JSON.stringify({ success: false }), { status: 500 });
	}
};
