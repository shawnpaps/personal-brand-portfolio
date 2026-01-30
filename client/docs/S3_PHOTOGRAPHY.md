# S3 Photography Integration Documentation

## Overview

The photography portfolio is now integrated with AWS S3 to dynamically load and display photos from your S3 bucket. This allows you to update your portfolio by simply uploading photos to S3 without needing to rebuild or redeploy the website.

## Architecture

### Components

1. **API Route** (`src/pages/api/photos.ts`)
   - Server-side endpoint that fetches photos from S3
   - Uses query parameter to specify folder
   - Uses AWS SDK to list objects in the bucket
   - Filters for image files only (jpg, jpeg, png, webp, gif)
   - Returns JSON array of photo metadata

2. **React Component** (`src/components/react/S3PhotoGallery.tsx`)
   - Client-side component that fetches photos from the API route
   - Displays photos in a responsive masonry grid layout
   - Handles loading states, errors, and empty states
   - Opens lightbox when photos are clicked

3. **Lightbox Component** (`src/components/react/ImageLightbox.tsx`)
   - Full-screen photo viewer
   - Keyboard navigation (arrows, escape)
   - Click navigation with prev/next buttons
   - Photo counter display

4. **Photography Page** (`src/pages/photography.astro`)
   - Main portfolio page
   - Embeds S3PhotoGallery component
   - Passes folder name as prop ("main-portfolio")

## S3 Bucket Configuration

### Bucket Details
- **Name**: `spm-portfolio-photography`
- **Region**: `us-east-2` (US East Ohio)
- **Base URL**: `https://spm-portfolio-photography.s3.us-east-2.amazonaws.com/`

### Folder Structure
```
spm-portfolio-photography/
└── main-portfolio/
    ├── photo1.jpg
    ├── photo2.jpg
    └── photo3.jpg
```

### Required Permissions

The S3 bucket must have:
1. **Public Read Access** for objects (or CloudFront distribution)
2. **AWS Credentials** configured for the API to list objects

#### Bucket Policy Example
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::spm-portfolio-photography/*"
    }
  ]
}
```

#### IAM Policy for API (ListObjects)
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::spm-portfolio-photography",
        "arn:aws:s3:::spm-portfolio-photography/*"
      ]
    }
  ]
}
```

## Environment Variables

### Required for API Route

Create a `.env` file in the `client` directory:

```bash
# AWS Credentials (if not using IAM role)
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_REGION=us-east-2
```

**Note**: When deploying to production (e.g., Vercel, Netlify), set these as environment variables in your hosting platform's dashboard.

## Usage

### Display Photos from S3

```astro
---
import S3PhotoGallery from "../components/react/S3PhotoGallery";
---

<S3PhotoGallery folder="main-portfolio" client:load />
```

### Props

- `folder` (optional, default: "main-portfolio") - The S3 folder path to load photos from

## Adding New Photos

1. **Upload to S3**:
   ```bash
   aws s3 cp photo.jpg s3://spm-portfolio-photography/main-portfolio/
   ```

2. **Via AWS Console**:
   - Navigate to S3 bucket
   - Open `main-portfolio` folder
   - Click "Upload"
   - Drag and drop your photos

3. **Refresh the Website**:
   - Photos appear automatically (no rebuild needed)
   - May take a few seconds for cache to clear

## Supported Image Formats

- `.jpg` / `.jpeg`
- `.png`
- `.webp`
- `.gif`

## Features

### Masonry Grid Layout
- Responsive columns: 1 (mobile) → 2 (tablet) → 3 (desktop) → 4 (large screens)
- Maintains aspect ratios
- No cropping or distortion

### Lightbox
- Full-screen viewing
- Keyboard navigation:
  - `←` Previous photo
  - `→` Next photo
  - `Esc` Close lightbox
- Click navigation buttons
- Photo counter (e.g., "3 / 15")

### Performance
- Lazy loading images
- Only loads visible images initially
- Optimized S3 URLs
- Client-side caching

### User Experience
- Loading spinner while fetching
- Error messages if API fails
- Empty state if no photos found
- Hover effects with photo names
- Smooth transitions

## API Endpoint Details

### Endpoint
```
GET /api/photos?folder={folder-path}
```

### Examples
- `/api/photos?folder=main-portfolio` - Photos in main-portfolio folder
- `/api/photos?folder=events/wedding` - Photos in events/wedding subfolder
- `/api/photos` - All photos in bucket root (no folder parameter)

### Response Format
```json
[
  {
    "key": "main-portfolio/photo1.jpg",
    "url": "https://spm-portfolio-photography.s3.us-east-2.amazonaws.com/main-portfolio/photo1.jpg",
    "name": "photo1.jpg",
    "size": 2048576,
    "lastModified": "2024-01-15T10:30:00.000Z"
  }
]
```

### Error Response
```json
{
  "error": "Error message here"
}
```

## Troubleshooting

### Photos Not Showing

1. **Check S3 bucket permissions**
   - Ensure objects are publicly readable
   - Verify bucket policy is correct

2. **Check AWS credentials**
   - Ensure environment variables are set
   - Verify IAM user has ListBucket permission

3. **Check region**
   - Must match bucket region (us-east-2)

4. **Check folder name**
   - Folder name is case-sensitive
   - Must match exactly

### API Errors

1. **403 Forbidden**
   - Missing or incorrect AWS credentials
   - IAM user lacks permissions

2. **404 Not Found**
   - Folder doesn't exist in S3
   - Check folder path spelling

3. **Network Error**
   - Check internet connection
   - Verify S3 endpoint is accessible

### Performance Issues

1. **Slow Loading**
   - Consider using CloudFront CDN
   - Optimize image sizes before upload
   - Use WebP format for better compression

2. **Too Many Photos**
   - Implement pagination (see below)
   - Organize into subfolders by category

## Future Enhancements

### Pagination
Add support for loading photos in batches:
```typescript
// In API route
const command = new ListObjectsV2Command({
  Bucket: BUCKET_NAME,
  Prefix: folderPath,
  MaxKeys: 50, // Limit results
  ContinuationToken: params.nextToken // For next page
});
```

### Image Metadata
Store and display metadata:
- Photo title
- Description
- Tags/categories
- Date taken
- Camera settings

### Filtering
Add client-side filtering by:
- Date
- Tags
- Subfolder
- File size

### CloudFront Integration
Use CloudFront for:
- Faster global delivery
- Automatic image optimization
- SSL/HTTPS
- Custom domain

## Related Documentation

- [Mux Video Integration](./MUX_SETUP.md)
- [Tailwind v4 Configuration](./TAILWIND_V4_CONFIG.md)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS SDK for JavaScript](https://docs.aws.amazon.com/sdk-for-javascript/)

## Security Best Practices

1. **Never commit AWS credentials to Git**
2. **Use IAM roles when possible** (e.g., in Lambda, EC2)
3. **Restrict IAM permissions** to only what's needed
4. **Enable S3 bucket versioning** for backup
5. **Use CloudFront signed URLs** for private content
6. **Rotate credentials regularly**
7. **Monitor S3 access logs** for suspicious activity