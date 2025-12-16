# Mux Video Gallery Setup Guide

This guide will help you set up the Mux API integration for your video gallery.

## Prerequisites

- A Mux account (sign up at https://mux.com)
- Mux API access tokens

## Step 1: Get Your Mux API Credentials

1. Go to your Mux Dashboard: https://dashboard.mux.com
2. Navigate to **Settings** → **Access Tokens**
3. Click **Generate new token**
4. Select the following permissions:
   - **Mux Video**: Read
5. Copy your **Token ID** and **Token Secret** (you won't be able to see the secret again!)

## Step 2: Configure Environment Variables

1. Create a `.env` file in the `client` directory:
   ```bash
   cp .env.example .env
   ```

2. Add your Mux credentials to the `.env` file:
   ```
   MUX_TOKEN_ID=your_actual_token_id
   MUX_TOKEN_SECRET=your_actual_token_secret
   ```

3. Make sure `.env` is in your `.gitignore` (it should be by default)

## Step 3: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

2. Navigate to the page where you've added the `VideoGallery` component

3. The component will automatically fetch your videos from Mux and display them

## How It Works

### API Endpoint (`/api/get-videos`)
- Uses Basic Authentication with your Mux credentials
- Fetches all video assets from Mux API
- Filters for videos with status "ready" and valid playback IDs
- Returns a simplified list of videos with essential metadata

### VideoGallery Component
- Fetches videos from the API endpoint on mount
- Displays videos in a responsive grid (1 column on mobile, 2 on tablet, 3 on desktop)
- Uses `@mux/mux-player-react` for video playback
- Shows loading and error states

## Customization

### Change Grid Layout
Edit the grid classes in `VideoGallery.tsx`:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

### Filter Videos
Modify the filter logic in `get-videos.ts`:
```typescript
.filter((asset: any) => 
  asset.status === "ready" && 
  asset.playback_ids?.length > 0
)
```

### Add More Metadata
Extend the video transformation in `get-videos.ts`:
```typescript
.map((asset: any) => ({
  id: asset.id,
  playbackId: asset.playback_ids[0].id,
  duration: asset.duration,
  aspectRatio: asset.aspect_ratio,
  createdAt: asset.created_at,
  // Add more fields:
  // tracks: asset.tracks,
  // status: asset.status,
  // max_stored_resolution: asset.max_stored_resolution,
}))
```

## Troubleshooting

### Error: "Mux API credentials not configured"
- Make sure your `.env` file exists in the `client` directory
- Verify the environment variable names are exactly `MUX_TOKEN_ID` and `MUX_TOKEN_SECRET`
- Restart your development server after creating/modifying `.env`

### Error: "Mux API error: 401"
- Your credentials are invalid or expired
- Generate new access tokens from the Mux dashboard
- Make sure you copied both the Token ID and Token Secret correctly

### Error: "Mux API error: 403"
- Your access token doesn't have the required permissions
- Create a new token with "Mux Video: Read" permission

### No videos showing up
- Check if you have uploaded videos to your Mux account
- Verify videos are in "ready" status (check Mux dashboard)
- Ensure videos have playback IDs assigned

## API Reference

### Mux List Assets API
- **Endpoint**: `GET https://api.mux.com/video/v1/assets`
- **Documentation**: https://docs.mux.com/api-reference/video#tag/assets/operation/list-assets
- **Authentication**: Basic Auth (Token ID:Token Secret)

### Response Format
Our API returns:
```json
{
  "videos": [
    {
      "id": "asset_id",
      "playbackId": "playback_id",
      "duration": 120.5,
      "aspectRatio": "16:9",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

## Security Notes

- Never commit your `.env` file to version control
- Keep your Mux Token Secret confidential
- Use environment variables for all sensitive credentials
- Consider using different tokens for development and production
- Rotate your access tokens periodically

## Additional Resources

- [Mux Documentation](https://docs.mux.com)
- [Mux Player React](https://github.com/muxinc/elements/tree/main/packages/mux-player-react)
- [Mux API Reference](https://docs.mux.com/api-reference)