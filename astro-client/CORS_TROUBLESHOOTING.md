# CORS Troubleshooting Guide

## ✅ CORS Issues Fixed

### Problem

You were experiencing CORS errors in production specifically from:

- `/api/testimonials` endpoint
- `/api/apple-token` endpoint
- Other API endpoints

### Root Cause

The API endpoints were missing proper CORS headers, which are required for cross-origin requests in production environments.

## 🔧 Fixes Implemented

### 1. Added CORS Headers to All API Endpoints

**Before:**

```typescript
return new Response(JSON.stringify(data), {
	headers: { 'Content-Type': 'application/json' },
});
```

**After:**

```typescript
return new Response(JSON.stringify(data), {
	status: 200,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		'Cache-Control': 'public, max-age=300',
	},
});
```

### 2. Added OPTIONS Handlers for Preflight Requests

Each API endpoint now includes an OPTIONS handler to handle CORS preflight requests:

```typescript
export const OPTIONS: APIRoute = async () => {
	return new Response(null, {
		status: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		},
	});
};
```

### 3. Created CORS Utility Functions

Created `src/utils/cors.ts` with helper functions for consistent CORS handling:

- `corsHeaders` - Standard CORS headers
- `createApiResponse()` - Helper for API responses with CORS
- `createErrorResponse()` - Helper for error responses with CORS
- `handleOptions()` - Standard OPTIONS handler

### 4. Added Netlify Configuration

Created `netlify.toml` with:

- CORS headers at the edge
- Proper API routing
- Cache headers for performance
- Security headers

### 5. Updated All API Endpoints

Fixed CORS headers in:

- ✅ `/api/testimonials.ts`
- ✅ `/api/apple-token.ts`
- ✅ `/api/fetch-music.ts`
- ✅ `/api/contact.ts`
- ✅ `/api/test-notion.ts`

## 🚀 Performance Improvements

### Caching Strategy

- **Testimonials**: 5 minutes cache (frequently updated)
- **Apple Token**: 1 hour cache (tokens are reusable)
- **Music Tracks**: 10 minutes cache (moderate updates)
- **Static Assets**: 1 year cache (immutable)

### Error Handling

- Proper error responses with CORS headers
- Detailed error logging for debugging
- Graceful fallbacks for failed requests

## 🔍 Testing CORS Fixes

### 1. Test in Development

```bash
npm run dev
# Check browser console for CORS errors
```

### 2. Test in Production

```bash
npm run build
npm run preview
# Test API endpoints
```

### 3. Test Specific Endpoints

```bash
# Test OPTIONS preflight
curl -X OPTIONS https://shawnpapsmedia.com/api/testimonials

# Test GET requests
curl https://shawnpapsmedia.com/api/testimonials
curl https://shawnpapsmedia.com/api/apple-token
```

## 🛠️ Additional Optimizations

### 1. Edge CORS Headers

Netlify configuration adds CORS headers at the edge for better performance.

### 2. Preflight Caching

`Access-Control-Max-Age: 86400` caches preflight responses for 24 hours.

### 3. Security Headers

Added security headers to prevent common attacks:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`

## 📊 Monitoring

### 1. Browser Console

Check for CORS errors in browser developer tools.

### 2. Network Tab

Monitor API requests and responses for proper headers.

### 3. Netlify Logs

Check Netlify function logs for API errors.

## 🔧 Future Improvements

### 1. Environment-Specific CORS

```typescript
const allowedOrigins =
	process.env.NODE_ENV === 'production'
		? ['https://shawnpapsmedia.com']
		: ['http://localhost:4321', 'http://localhost:3000'];
```

### 2. Rate Limiting

Add rate limiting to prevent abuse:

```typescript
// Add to API endpoints
const rateLimit = new Map();
// Implement rate limiting logic
```

### 3. API Versioning

Consider API versioning for future changes:

```typescript
// /api/v1/testimonials
// /api/v2/testimonials
```

## 🎯 Expected Results

After these fixes:

- ✅ No more CORS errors in production
- ✅ Faster API responses with caching
- ✅ Better error handling and logging
- ✅ Improved security with headers
- ✅ Consistent CORS handling across all endpoints

## 🚨 Common Issues & Solutions

### Issue: Still getting CORS errors

**Solution**: Check that the deployment includes the updated files and Netlify configuration.

### Issue: API endpoints not responding

**Solution**: Verify the Netlify function routing in `netlify.toml`.

### Issue: Cache not working

**Solution**: Check that cache headers are properly set and not overridden.

### Issue: Preflight requests failing

**Solution**: Ensure OPTIONS handlers are properly implemented for all endpoints.

## 📞 Support

If you continue to experience CORS issues:

1. Check browser console for specific error messages
2. Verify all files are deployed correctly
3. Test endpoints individually
4. Check Netlify function logs
5. Ensure environment variables are set correctly
