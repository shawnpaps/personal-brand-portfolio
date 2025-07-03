import type { APIRoute } from 'astro';

interface ContactFormData {
	name: string;
	email: string;
	workType: string;
	workLink: string;
	notes: string;
	emailConsent: boolean;
}

export const POST: APIRoute = async ({ request }) => {
	try {
		const formData: ContactFormData = await request.json();

		// Validate required fields
		if (!formData.name || !formData.email || !formData.workType) {
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

		// Send to Notion via API
		const notionApiKey = import.meta.env.NOTION_API_KEY;
		const notionDatabaseId = import.meta.env.NOTION_DATABASE_ID;

		if (notionApiKey && notionDatabaseId) {
			try {
				const notionPayload = {
					parent: {
						database_id: notionDatabaseId,
					},
					properties: {
						'Company Name': {
							title: [
								{
									text: {
										content: formData.name,
									},
								},
							],
						},
						'Contact Name': {
							rich_text: [
								{
									text: {
										content: formData.name,
									},
								},
							],
						},
						'Contact Email': {
							email: formData.email,
						},
						Tags: {
							multi_select: [
								{
									name:
										formData.workType === 'photography'
											? 'Photography'
											: formData.workType === 'audio'
											? 'Producer'
											: 'Other',
								},
							],
						},
						'Client Message': {
							rich_text: [
								{
									text: {
										content: formData.notes || 'No additional notes provided',
									},
								},
							],
						},
						'Subscribe to Emails': {
							checkbox: formData.emailConsent,
						},
						'Lead Status': {
							status: {
								name: 'Need To Call',
							},
						},
						'Date of First Contact': {
							date: {
								start: new Date().toISOString(),
							},
						},
					},
				};

				const notionResponse = await fetch('https://api.notion.com/v1/pages', {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${notionApiKey}`,
						'Content-Type': 'application/json',
						'Notion-Version': '2022-06-28',
					},
					body: JSON.stringify(notionPayload),
				});

				if (!notionResponse.ok) {
					const errorText = await notionResponse.text();
					console.error('Notion API failed:', {
						status: notionResponse.status,
						statusText: notionResponse.statusText,
						error: errorText,
						payload: notionPayload,
						databaseId: notionDatabaseId,
					});
				} else {
					console.log('Successfully created Notion page');
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
					subject: 'Thank you for your project inquiry!',
					html: `
						<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
							<h2 style="color: #f97316;">Thank you for your project inquiry!</h2>
							<p>Hi ${formData.name},</p>
							<p>I've received your project inquiry and will review your work. I'll get back to you as soon as possible with next steps.</p>
							<p><strong>Project Details:</strong></p>
							<div style="background: #f3f4f6; padding: 15px; border-left: 4px solid #f97316; margin: 20px 0;">
								<p><strong>Type of Work:</strong> ${
									formData.workType.charAt(0).toUpperCase() +
									formData.workType.slice(1)
								}</p>
								<p><strong>Work Reference:</strong> <a href="${
									formData.workLink
								}" style="color: #f97316;">${formData.workLink}</a></p>
								${
									formData.notes
										? `<p><strong>Additional Notes:</strong></p><p>${formData.notes.replace(
												/\n/g,
												'<br>'
										  )}</p>`
										: ''
								}
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
					subject: `New Project Inquiry: ${formData.workType} work from ${formData.name}`,
					html: `
						<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
							<h2 style="color: #f97316;">New Project Inquiry</h2>
							<div style="background: #f3f4f6; padding: 20px; border-radius: 8px;">
								<p><strong>Name:</strong> ${formData.name}</p>
								<p><strong>Email:</strong> ${formData.email}</p>
								<p><strong>Type of Work:</strong> ${
									formData.workType.charAt(0).toUpperCase() +
									formData.workType.slice(1)
								}</p>
								<p><strong>Work Reference:</strong> <a href="${
									formData.workLink
								}" style="color: #f97316;">${formData.workLink}</a></p>
								${
									formData.notes
										? `<p><strong>Additional Notes:</strong></p><p>${formData.notes.replace(
												/\n/g,
												'<br>'
										  )}</p>`
										: ''
								}
								<p><strong>Email Consent:</strong> ${formData.emailConsent ? 'Yes' : 'No'}</p>
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
