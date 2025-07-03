import type { APIRoute } from 'astro';

interface ContactFormData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export const POST: APIRoute = async ({ request }) => {
	try {
		const formData: ContactFormData = await request.json();

		// Validate required fields
		if (
			!formData.name ||
			!formData.email ||
			!formData.subject ||
			!formData.message
		) {
			return new Response(
				JSON.stringify({ error: 'Missing required fields' }),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		// Validate email format
		const emailRegex = /\S+@\S+\.\S+/;
		if (!emailRegex.test(formData.email)) {
			return new Response(JSON.stringify({ error: 'Invalid email format' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		// Send to Notion via webhook
		const notionWebhookUrl = import.meta.env.NOTION_WEBHOOK_URL;
		if (notionWebhookUrl) {
			try {
				const notionPayload = {
					properties: {
						Name: {
							title: [
								{
									text: {
										content: formData.name,
									},
								},
							],
						},
						Email: {
							email: formData.email,
						},
						Subject: {
							rich_text: [
								{
									text: {
										content: formData.subject,
									},
								},
							],
						},
						Message: {
							rich_text: [
								{
									text: {
										content: formData.message,
									},
								},
							],
						},
						Status: {
							select: {
								name: 'New',
							},
						},
						Date: {
							date: {
								start: new Date().toISOString(),
							},
						},
					},
				};

				const notionResponse = await fetch(notionWebhookUrl, {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${import.meta.env.NOTION_API_KEY}`,
						'Content-Type': 'application/json',
						'Notion-Version': '2022-06-28',
					},
					body: JSON.stringify(notionPayload),
				});

				if (!notionResponse.ok) {
					console.error('Notion webhook failed:', await notionResponse.text());
				}
			} catch (error) {
				console.error('Error sending to Notion:', error);
			}
		}

		// Send automated email via Mailgun
		const mailgunApiKey = import.meta.env.MAILGUN_API_KEY;
		const mailgunDomain = import.meta.env.MAILGUN_DOMAIN;

		if (mailgunApiKey && mailgunDomain) {
			try {
				// Send confirmation email to user
				const userEmailData = new URLSearchParams({
					from: `Shawn Papineau <noreply@${mailgunDomain}>`,
					to: formData.email,
					subject: 'Thank you for reaching out!',
					html: `
						<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
							<h2 style="color: #f97316;">Thank you for your message!</h2>
							<p>Hi ${formData.name},</p>
							<p>I've received your message and will get back to you as soon as possible.</p>
							<p><strong>Your message:</strong></p>
							<div style="background: #f3f4f6; padding: 15px; border-left: 4px solid #f97316; margin: 20px 0;">
								<p><strong>Subject:</strong> ${formData.subject}</p>
								<p><strong>Message:</strong></p>
								<p>${formData.message.replace(/\n/g, '<br>')}</p>
							</div>
							<p>Best regards,<br>Shawn Papineau</p>
						</div>
					`,
				});

				await fetch(`https://api.mailgun.net/v3/${mailgunDomain}/messages`, {
					method: 'POST',
					headers: {
						Authorization: `Basic ${btoa(`api:${mailgunApiKey}`)}`,
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: userEmailData,
				});

				// Send notification email to you
				const notificationEmailData = new URLSearchParams({
					from: `Contact Form <noreply@${mailgunDomain}>`,
					to: import.meta.env.NOTIFICATION_EMAIL || 'contact@shawnpapineau.com',
					subject: `New Contact Form Submission: ${formData.subject}`,
					html: `
						<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
							<h2 style="color: #f97316;">New Contact Form Submission</h2>
							<div style="background: #f3f4f6; padding: 20px; border-radius: 8px;">
								<p><strong>Name:</strong> ${formData.name}</p>
								<p><strong>Email:</strong> ${formData.email}</p>
								<p><strong>Subject:</strong> ${formData.subject}</p>
								<p><strong>Message:</strong></p>
								<p>${formData.message.replace(/\n/g, '<br>')}</p>
								<p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
							</div>
						</div>
					`,
				});

				await fetch(`https://api.mailgun.net/v3/${mailgunDomain}/messages`, {
					method: 'POST',
					headers: {
						Authorization: `Basic ${btoa(`api:${mailgunApiKey}`)}`,
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: notificationEmailData,
				});
			} catch (error) {
				console.error('Error sending email via Mailgun:', error);
			}
		}

		return new Response(
			JSON.stringify({ success: true, message: 'Message sent successfully' }),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	} catch (error) {
		console.error('Contact form error:', error);
		return new Response(JSON.stringify({ error: 'Internal server error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};
