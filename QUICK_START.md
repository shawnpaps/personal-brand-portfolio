# Quick Start Guide 🚀

## Video Player Setup (5 minutes)

### 1. Get Your Mux Credentials
1. Go to [Mux Dashboard](https://dashboard.mux.com)
2. Navigate to **Settings** → **Access Tokens**
3. Click **Generate new token**
4. Select **Mux Video** → **Read** permission
5. Copy your **Token ID** and **Token Secret**

### 2. Add Environment Variables
Create `client/.env` file:
```env
MUX_TOKEN_ID=your_token_id_here
MUX_TOKEN_SECRET=your_token_secret_here
```

### 3. Test the Setup
```bash
cd client
npm run dev
```

Visit: `http://localhost:4321/admin/mux-videos`

You should see your Mux videos! 🎉

### 4. Update Your Videos
1. Copy playback IDs from the Video Manager
2. Edit `client/src/data/videography.json`
3. Replace `placeholder-video-XXX` with real playback IDs
4. Update thumbnails: `https://image.mux.com/{PLAYBACK_ID}/thumbnail.jpg`

**Example:**
```json
{
  "id": "video-1",
  "title": "My Awesome Video",
  "muxPlaybackId": "abc123def456",
  "thumbnailUrl": "https://image.mux.com/abc123def456/thumbnail.jpg"
}
```

## Photography Filters (Already Working!)

The photography page filters are already set up and looking great! 

Visit: `http://localhost:4321/photography`

**Features:**
- ✅ Collapsible filter categories
- ✅ Active filter pills with one-click removal
- ✅ Smooth animations
- ✅ Glass-morphism design
- ✅ Mobile responsive

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   └── react/
│   │       ├── VideoPlayer.tsx        # Video player component
│   │       ├── MuxVideoManager.tsx    # Admin video manager
│   │       └── FilterableGallery.tsx  # Photography filters
│   ├── pages/
│   │   ├── api/
│   │   │   └── get-videos.ts          # Mux API endpoint
│   │   ├── admin/
│   │   │   └── mux-videos.astro       # Video manager page
│   │   ├── photography.astro          # Photography gallery
│   │   └── videography.astro          # Video portfolio
│   └── data/
│       ├── photography.json           # Photo data
│       └── videography.json           # Video data
└── .env                                # Environment variables (create this!)
```

## Common Tasks

### Add a New Video
1. Upload to Mux
2. Get playback ID from `/admin/mux-videos`
3. Add entry to `videography.json`
4. Use format: `https://image.mux.com/{PLAYBACK_ID}/thumbnail.jpg`

### Add a New Photo
1. Upload image to hosting (or use placeholder)
2. Add entry to `photography.json`
3. Include tags: `mood`, `aesthetic`, `subject`, `industry`

### Customize Filters
Edit filter categories in:
- `photography.astro` (line 8-14)
- `FilterableGallery.tsx` (receives categories as props)

## Troubleshooting

### "Mux API credentials not configured"
- Check `.env` file exists in `client/` directory
- Verify variable names: `MUX_TOKEN_ID` and `MUX_TOKEN_SECRET`
- Restart dev server: `npm run dev`

### CORS Errors
- Already fixed! ✅
- If still occurring, check that API endpoint is at `/api/get-videos`

### Video Won't Play
- Check video status in `/admin/mux-videos` (should be "ready")
- Verify playback ID is correct
- Check browser console for errors

### Filters Not Working
- Check that `photography.json` has proper tags
- Verify tags match filter categories in `photography.astro`

## Deployment

### Before Deploying
1. Test locally: `npm run build && npm run preview`
2. Verify all placeholders are replaced
3. Check that images load
4. Test video playback

### On Vercel/Netlify
1. Add environment variables in dashboard:
   - `MUX_TOKEN_ID`
   - `MUX_TOKEN_SECRET`
2. Deploy
3. Test at `yourdomain.com/admin/mux-videos`

## Resources

- 📖 [Full Mux Setup Guide](./docs/MUX_VIDEO_SETUP.md)
- 📝 [Recent Updates](./docs/RECENT_UPDATES.md)
- 🎥 [Mux Documentation](https://docs.mux.com)

## Need Help?

Check the documentation in `/docs`:
- `MUX_VIDEO_SETUP.md` - Detailed video setup
- `RECENT_UPDATES.md` - What changed and why

## What's Working Now

✅ Video Player with Mux integration
✅ Video Manager admin page
✅ Beautiful photography filters
✅ CORS errors fixed
✅ Error handling
✅ Copy-to-clipboard functionality
✅ Video previews
✅ Responsive design
✅ Dark theme with rust-orange accents

---

**You're all set! Start by adding your Mux credentials and exploring the Video Manager.** 🎬