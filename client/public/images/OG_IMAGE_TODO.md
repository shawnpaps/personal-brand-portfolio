# Open Graph Image - TODO

## Required for SEO Optimization

Create an Open Graph image for social media sharing.

### File Requirements

**Filename**: `og-default.jpg`
**Location**: `/public/images/og-default.jpg`
**Dimensions**: 1200px × 630px (2:1 ratio)
**Format**: JPG or PNG
**Max File Size**: < 1MB recommended

### Design Guidelines

#### Content to Include
1. **sudo.create logo** (centered or left-aligned)
2. **Tagline**: "Big Tech Power. Creative Studio Soul."
3. **Location**: "Tampa • Plant City • Lakeland"
4. **Services**: "Web Design & Development"

#### Visual Style
- Background: Dark theme matching website (#0a0a0a)
- Use the dot matrix pattern if possible
- Brand colors: Sunset theme from DaisyUI
- High contrast text (white on dark)
- Professional but creative aesthetic

#### Typography
- Bold, readable fonts
- Large enough to read in social media previews
- Consistent with brand identity

### Design Tools

**Quick Options**:
- Canva (use 1200x630 template)
- Figma (create frame at 1200x630)
- Photoshop/GIMP
- Online OG image generators

### Testing

Once created, test the image at:
- https://www.opengraph.xyz/
- https://developers.facebook.com/tools/debug/
- https://cards-dev.twitter.com/validator

### Current Status

⚠️ **NOT CREATED YET** - Using placeholder path in meta tags

The RootLayout.astro currently references:
```astro
ogImage = "/images/og-default.jpg"
```

**Priority**: High - Improves social media sharing and click-through rates

---

### Alternative Approach

If you want page-specific OG images:

1. Create multiple OG images:
   - `og-home.jpg` (homepage)
   - `og-businesses.jpg` (businesses page)
   - `og-creators.jpg` (creators page)
   - `og-studios.jpg` (studios page)
   - `og-contact.jpg` (contact page)

2. Update page frontmatter:
   ```astro
   <RootLayout
     title="..."
     description="..."
     ogImage="/images/og-businesses.jpg"
   />
   ```

---

**Last Updated**: January 2025