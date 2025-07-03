# Contact Form Setup Guide

This contact form integrates with Notion (for lead management) and Mailgun (for automated emails).

## Environment Variables

Create a `.env` file in the `astro-client` directory with the following variables:

```env
# Notion Integration
NOTION_API_KEY=your_notion_integration_token_here
NOTION_DATABASE_ID=your_database_id_here

# Mailgun Integration
MAILGUN_API_KEY=your_mailgun_api_key_here
MAILGUN_DOMAIN=your_mailgun_domain_here

# Email Configuration
NOTIFICATION_EMAIL=your_email@example.com
```

## Notion Setup

1. **Create a Notion Database** with the following properties:

   - `Contact Name` (Title)
   - `Contact Email` (Email)
   - `Tags` (Multi-select: Professional Photography, Music Production/Audio Engineering, Other...)
   - `Work Link` (URL) - Optional
   - `Client Message` (Rich text)
   - `Subscribe To Emails` (Checkbox)
   - `Lead Status` (Select: needs contact, In Progress, Completed, etc.)
   - `Date` (Date)

2. **Get Notion API Key**:

   - Go to https://www.notion.so/my-integrations
   - Create a new integration
   - Copy the "Internal Integration Token"

3. **Get Database ID**:

   - Open your database in Notion
   - Copy the ID from the URL: `https://notion.so/workspace/DATABASE_ID?v=...`
   - The ID is the part between the last `/` and `?v=`

4. **Share Database with Integration**:

   - In your database, click "Share" → "Invite"
   - Add your integration to the database

5. **Test the Connection**:
   - Visit `/api/test-notion` in your browser
   - You should see a success response with your database details

## Mailgun Setup

1. **Create Mailgun Account**:

   - Sign up at https://www.mailgun.com/
   - Verify your domain or use the sandbox domain

2. **Get API Key**:

   - Go to Settings → API Keys
   - Copy your Private API Key

3. **Get Domain**:
   - Use your verified domain or the sandbox domain provided

## Features

### Contact Form

- ✅ Beautiful animated form with validation
- ✅ Real-time error feedback
- ✅ Loading states and success confirmation
- ✅ Responsive design with warm/moody aesthetic
- ✅ Work type selection (Photography, Audio, Other)
- ✅ Work reference link field
- ✅ Additional notes field
- ✅ Email consent checkbox (defaulted to true)

### Notion Integration

- ✅ Automatically creates new entries in your Notion database
- ✅ Includes all form data with timestamps
- ✅ Status tracking for lead management
- ✅ Work type categorization
- ✅ Email consent tracking

### Mailgun Integration

- ✅ Sends confirmation email to the person who submitted the form
- ✅ Sends notification email to you with all form details
- ✅ Professional HTML email templates
- ✅ Automatic email formatting and styling
- ✅ Project-specific email subjects and content

## Customization

### Email Templates

Edit the email templates in `src/pages/api/contact.ts`:

- User confirmation email (lines 95-110)
- Notification email (lines 125-140)

### Form Validation

Modify validation rules in `src/components/react/ContactForm.tsx`:

- Required field validation
- Email format validation
- URL format validation for work links
- Custom validation rules

### Styling

The form uses your existing warm/moody color palette:

- `warm-400`, `warm-500`, `warm-600` for accents
- `moody-800`, `moody-900` for backgrounds
- `font-heading`, `font-body` for typography

## Testing

1. Fill out the contact form on your website
2. Check your Notion database for the new entry
3. Verify you received the notification email
4. Check the sender received the confirmation email

## Troubleshooting

### Form not submitting

- Check browser console for errors
- Verify API endpoint is accessible
- Ensure all environment variables are set

### Notion integration not working

- Verify API key is correct
- Check database ID is correct
- Ensure integration has access to the database
- Check Notion API version compatibility
- Verify database properties match the expected structure

### Mailgun emails not sending

- Verify API key and domain are correct
- Check Mailgun logs for delivery issues
- Ensure domain is verified in Mailgun
- Check sending limits and quotas
