# Mux Video Integration Setup Guide

## Overview

This project uses [Mux](https://mux.com) for video hosting and streaming. This guide will help you set up Mux integration and manage your video content.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Environment Configuration](#environment-configuration)
- [Managing Videos](#managing-videos)
- [Using Videos on Your Site](#using-videos-on-your-site)
- [Troubleshooting](#troubleshooting)

## Prerequisites

1. A Mux account (sign up at https://mux.com)
2. Videos uploaded to your Mux account
3. Node.js and npm installed

## Initial Setup

### 1. Create Mux API Credentials

1. Log into your Mux dashboard at https://dashboard.mux.com
2. Navigate to **Settings** → **Access Tokens**
3. Click **Generate new token**
4. Give it a name (e.g., "Portfolio API")
5. Select permissions: **Mux Video** → **Read**
6. Click **Generate Token**
7. Copy both the **Token ID** and **Token Secret** (you won't see the secret again!)

### 2. Configure Environment Variables

Create or update your `.env` file in the `client` directory:

```env
MUX_TOKEN_ID=your_token_id_here
MUX_TOKEN_SECRET=your_token_secret_here
```

**Important:** Never commit your `.env` file to version control! It should already be in `.gitignore`.

### 3. Install Dependencies

The required packages should already be installed, but if needed:

```bash
cd client
npm install @mux/mux-player-react
```

## Managing Videos

### Accessing the Video Manager

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:4321/admin/mux-videos`

### Video Manager Features

The Mux Video Manager provides:

- **Video List**: View all videos in your Mux account
- **Playback IDs**: Copy playback IDs with one click
- **Video Previews**: Watch videos directly in the manager
- **Video Details**: Duration, resolution, status, creation date
- **Stream Links**: Direct access to HLS streams

### Getting Playback IDs

1. Go to `/admin/mux-videos`
2. Find your video in the list
3. Click the **Copy** button next to the Playback ID
4. Use this ID in your `videography.json` file

## Using Videos on Your Site

### Update videography.json

Open `client/src/data/videography.json` and replace placeholder IDs:

```json
{
  "id": "video-1",
  "title": "Your Video Title",
  "description": "Your video description",
  "thumbnailUrl": "https://image.mux.com/YOUR_PLAYBACK_ID/thumbnail.jpg",
  "muxPlaybackId": "YOUR_ACTUAL_PLAYBACK_ID_HERE",
  "muxAssetId": "YOUR_ASSET_ID_HERE",
  "duration": "1:32",
  "type": ["brand"],
  "industry": ["barbers"],
  "client": "Client Name",
  "date": "2025-01"
}
```

### VideoPlayer Component

The `VideoPlayer` component automatically handles:

- **Placeholder videos**: Shows a thumbnail with a play icon
- **Real videos**: Plays the video using Mux Player
- **Error handling**: Displays error messages if video fails to load

Example usage in an Astro file:

```astro
---
import VideoPlayer from '../components/react/VideoPlayer';
---

<VideoPlayer
  playbackId="YOUR_PLAYBACK_ID"
  thumbnailUrl="https://image.mux.com/YOUR_PLAYBACK_ID/thumbnail.jpg"
  title="My Video"
  description="Video description"
  client:visible
/>
```

## API Endpoints

### GET /api/get-videos

Fetches all video assets from your Mux account.

**Response:**
```json
{
  "videos": [
    {
      "id": "asset-id",
      "playback_ids": [
        {
          "id": "playback-id",
          "policy": "public"
        }
      ],
      "duration": 92.5,
      "status": "ready",
      "created_at": "2025-01-15T10:30:00Z",
      "max_stored_resolution": "1080p"
    }
  ]
}
```

## Mux Thumbnails

Mux automatically generates thumbnails for your videos. Use this URL format:

```
https://image.mux.com/{PLAYBACK_ID}/thumbnail.jpg
```

Additional parameters:
- `?time=5` - Thumbnail at 5 seconds
- `?width=640` - Resize to 640px wide
- `?fit_mode=smartcrop` - Smart crop to aspect ratio

Example:
```
https://image.mux.com/abc123/thumbnail.jpg?time=10&width=1280
```

## Troubleshooting

### CORS Errors

If you see CORS errors in the console:
- Make sure your API endpoint includes proper CORS headers (already configured)
- Check that environment variables are set correctly
- Restart your dev server after updating `.env`

### "Mux API credentials not configured"

- Verify `.env` file exists in the `client` directory
- Check that variable names are exactly: `MUX_TOKEN_ID` and `MUX_TOKEN_SECRET`
- Restart your development server

### "Failed to fetch videos"

- Verify your Mux API credentials are correct
- Check that your token has "Read" permissions for Mux Video
- Ensure your Mux account has uploaded videos

### Video Won't Play

- Verify the video status is "ready" in the Video Manager
- Check that the playback ID is correct
- Ensure the video has a public playback policy
- Check browser console for specific error messages

### Authentication Failed (401)

- Your token ID or secret is incorrect
- Generate new credentials in Mux dashboard
- Update your `.env` file

## Best Practices

1. **Use Public Playback Policy** for videos on your public portfolio
2. **Generate Thumbnails** at key moments using `?time=` parameter
3. **Test Locally** before deploying to production
4. **Keep Credentials Secure** - never commit `.env` to Git
5. **Use Video Manager** to verify videos before adding to site

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add environment variables in your hosting platform's dashboard
2. Set `MUX_TOKEN_ID` and `MUX_TOKEN_SECRET`
3. Redeploy your site
4. Test the video manager at `yourdomain.com/admin/mux-videos`

## Resources

- [Mux Documentation](https://docs.mux.com)
- [Mux Player React Docs](https://docs.mux.com/guides/video/mux-player#react)
- [Mux API Reference](https://docs.mux.com/api-reference)
- [Mux Dashboard](https://dashboard.mux.com)

## Support

For issues with:
- **Mux Service**: Contact Mux support
- **This Integration**: Check this documentation or review the code
- **Video Manager**: Visit `/admin/mux-videos` for real-time diagnostics

---

**Last Updated:** January 2025