# Shawn Paps Media - Portfolio Website Specification

## Project Overview
Build a bold, interactive portfolio website for Shawn Paps Media - a studio specializing in immersive online experiences for brands with grit (barbers, coffee shops, construction trades). The site showcases web design, photography, and videography services with a dark, grungy, moody aesthetic.

---

## Technology Stack

### Core Technologies (Already Configured)
- **Framework**: Astro (for performance and static generation)
- **UI Library**: React (for interactive components)
- **Styling**: Tailwind CSS (utility-first styling)
- **Animation**: Framer Motion (smooth, interactive animations)

### Additional Integrations Required
- **Media Hosting**: Mux (for both photo and video storage)
  - Mux Video API for video playback and streaming
  - Mux Image API for photo storage, optimization, and delivery
  - Unified media management through single platform
- **Form Handling**: Formik (for contact form validation)
- **Form Backend**: Notion API (for leads database integration)

### Technology Usage Guidelines
The implementing agent should choose the most appropriate technology for each component:
- **Use React** when components require:
  - Complex interactivity (filters, galleries, forms)
  - State management
  - Animation with Framer Motion
  - Real-time user input handling
- **Use Astro Components** when:
  - Content is primarily static
  - SEO is critical
  - No client-side state is needed
  - Performance is paramount

---

## Design Language

### Visual Identity
- **Aesthetic**: Dark, grungy, moody, bold, almost provocative
- **Goal**: Make viewers say "wow" - this should be memorable and interactive
- **Photography Style**: Dark, grungy, moody - the website design should reflect this

### Color Palette
- **Primary**: Deep blacks (#0a0a0a, #121212)
- **Accent**: Consider industrial/gritty colors:
  - Rust orange (#d4512a, #e8673f)
  - Concrete gray (#3a3a3a, #525252)
  - Oxidized copper (#2d5a4a, #4a7c59)
  - Raw steel (#6b7280, #9ca3af)
- **Contrast**: Strategic use of bright accent colors against dark backgrounds

### Typography
- **Headline**: Bold, aggressive, possibly condensed sans-serif
  - Consider: Inter Black, Druk, Bebas Neue, Oswald, or similar heavy weights
- **Body**: Clean, readable sans-serif with good contrast
  - Consider: Inter, Space Grotesk, or IBM Plex Sans
- **Accent/Display**: Optional industrial or stencil-style font for impact moments

### Interactive Elements
- Scroll-triggered animations
- Hover effects that feel substantial (not subtle)
- Parallax effects where appropriate
- Video backgrounds or ambient motion
- Smooth page transitions
- Micro-interactions on buttons and CTAs

---

## Site Structure & Features

### 1. Landing Page (/)

**Purpose**: Immediately communicate who Shawn Paps Media is and why they're different.

**Sections** (in recommended order):

1. **Hero Section**
   - Full viewport height
   - Strong headline communicating value proposition
   - Possibly: video background or dynamic image carousel from portfolio
   - Clear CTA button ("Start Your Project" or "See Our Work")
   - Technology: Astro component with optional React for interactive elements

2. **What We Do & Who We Serve**
   - Brief, punchy copy explaining services
   - Highlight target clients: barbers, coffee shops, construction trades, creators
   - Visual elements showing client types or work examples
   - Technology: Astro component with Framer Motion scroll animations

3. **Why We're Not Another Agency**
   - Bold statement/manifesto about approach
   - Differentiation from typical agencies
   - Emphasis on authenticity, grit, and substance over polish
   - Technology: Astro component, possibly with animated reveals

4. **Our Media Solves Problems**
   - Section emphasizing creative direction and strategy
   - "Not just pretty pictures" - frame work as solutions
   - Could include case study snippets or problem/solution pairs
   - Technology: React component if interactive, otherwise Astro

5. **Services Overview**
   - Three service cards: Web Design, Photography, Videography
   - Each card links to respective portfolio/service page
   - Hover effects with previews of work
   - Technology: React component with Framer Motion

6. **Trusted By Section**
   - Logo grid or carousel of clients/brands worked with
   - Social proof without being corporate
   - Technology: Astro component with CSS animations

7. **Testimonials**
   - 2-3 powerful client testimonials
   - Include client name, business, and possibly photo
   - Design: Large, bold quote text on dark background
   - Technology: React carousel component or Astro static grid

8. **Call to Action**
   - Final conversion section
   - Strong CTA: "Ready to Create Something Bold?"
   - Button to contact form or booking link
   - Technology: Astro component

**Technical Notes**:
- Implement smooth scroll behavior between sections
- Use Intersection Observer for scroll-triggered animations
- Optimize images and videos for fast loading
- Consider lazy loading for below-fold content

---

### 2. Navigation

**Desktop Navigation**:
- Fixed header that appears/hides on scroll
- Logo/brand on left
- Main nav items on right:
  - **Media** (dropdown)
    - Photography
    - Videography
  - **Clients** (dropdown)
    - Creators
    - Small Businesses
    - Events
  - **Web Design**
  - **Customer Stories**
  - **Contact**

**Mobile Navigation**:
- Hamburger menu icon
- Full-screen overlay menu when opened
- Same structure as desktop but vertical
- Smooth open/close animations
- Technology: React component for state management and animations

**Dropdown Behavior**:
- Hover to open on desktop
- Click to open on mobile
- Smooth transitions
- Dark background with accent highlights on hover

**Technical Implementation**:
- React component for state management
- Framer Motion for menu animations
- Tailwind for responsive styling
- Consider backdrop blur effects

---

### 3. Photography Portfolio Page (/photography)

**Concept**: Lookbook-style gallery with advanced filtering

**Layout**:
- Hero section introducing photography style
- Filter bar with multiple criteria:
  - **Mood**: Dark, Moody, Energetic, Intimate, Raw
  - **Aesthetic**: Grungy, Industrial, Urban, Cinematic, Editorial
  - **Subject**: People, Spaces, Products, Events, Lifestyle
  - **Industry**: Barbers, Coffee Shops, Construction, Music/Bands
- Grid layout (masonry or justified grid)
- Lightbox view for full-screen image viewing
- Image metadata overlay on hover

**Filtering System**:
- Multi-select filters (can select multiple moods/aesthetics)
- Real-time filtering without page reload
- Smooth transitions when filters change
- "Clear Filters" button
- Technology: React component with state management

**Image Organization**:
- Images stored on Mux Image API
- Mux handles optimization and multiple size delivery automatically
- Lazy loading as user scrolls
- Mux serves images in optimal formats (WebP/AVIF with fallbacks)

**Lightbox Features**:
- Full-screen image view
- Image title and description
- Navigate between images (prev/next)
- Close on ESC key or click outside
- Share functionality (optional)
- Technology: React component with Framer Motion

**Technical Notes**:
- Pre-generate filter tags for all images
- Implement efficient filtering algorithm
- Consider pagination or infinite scroll for large collections
- Optimize images before upload (multiple sizes)

---

### 4. Videography Portfolio Page (/videography)

**Concept**: Video showcase with Mux integration

**Layout**:
- Hero with featured video (auto-play, muted, looping)
- Grid of video thumbnails (generated by Mux)
- Filter options similar to photography:
  - **Type**: Brand Video, Event Coverage, Behind-the-Scenes, Promo
  - **Industry**: Barbers, Coffee Shops, Construction, Creators
- Video player modal or inline expansion
- Project details: client, date, scope

**Mux Integration**:
- Use Mux Video API for video storage and streaming
- Mux automatically generates thumbnails
- Adaptive bitrate streaming (optimal quality per connection)
- Playback analytics (optional, for internal use)

**Video Player**:
- Custom-styled Mux player (white-label, no branding)
- Play/pause, volume, fullscreen controls
- Minimal UI that matches site aesthetic
- Technology: React component with Mux React SDK

**Technical Notes**:
- Videos should be compressed for web before uploading to Mux
- Thumbnail images from Mux stored/cached
- Consider animated thumbnails on hover
- Lazy load video player until user clicks

---

### 5. Client Type Pages (/clients/creators, /clients/small-businesses, /clients/events)

**Purpose**: Show work tailored to specific client types

**Structure** (same for each client type):
- Hero section explaining approach for this client type
- Problem/solution framework specific to their needs
- Gallery of relevant work (filtered photography + videography)
- Case studies or featured projects (2-3)
- Testimonials from this client type
- CTA specific to this audience ("Let's Capture Your Story", "Elevate Your Brand")

**Content Customization**:
- **Creators**: Focus on personal branding, social content, authenticity
- **Small Businesses**: Focus on brand storytelling, customer connection, ROI
- **Events**: Focus on capturing energy, storytelling, deliverables

**Technical Implementation**:
- Astro pages with dynamic content routing
- Reusable components for consistent structure
- Filtered media galleries pulling from main photography/videography portfolios
- Technology: Astro for page structure, React for interactive galleries

---

### 6. Web Design Portfolio Page (/web-design)

**Concept**: Showcase web projects with interactive previews

**Layout**:
- Brief intro about web design philosophy
- Grid of project cards (3-4 featured projects)
- Each card shows:
  - Project thumbnail/mockup
  - Client name
  - Brief description
  - Tech stack used
  - Link to live site (if public)
- Hover effects: animated preview or expanded details

**Project Details**:
- Full-page or modal view for each project
- Hero image or video walkthrough
- Challenge, approach, solution framework
- Screenshots or embedded iframe preview
- Technologies used
- Outcome/results (if available)
- Link to live site

**Interactive Elements**:
- Hover to see animated preview
- Click to expand project details
- Filter by industry or tech stack (optional)
- Technology: React components with Framer Motion

**Technical Notes**:
- Store project thumbnails and mockups on R2
- Consider using video screen recordings for project previews
- Responsive previews (show mobile + desktop views)

---

### 7. Customer Stories Page (/customer-stories)

**Purpose**: Showcase detailed case studies demonstrating strategy, process, and results

**Concept**: In-depth narratives that prove "our media solves problems"

**Layout**:
- Hero section with headline: "Real Projects, Real Results" or "Stories of Bold Brands"
- Grid of case study cards (6-8 featured stories)
- Filter by service type: Web Design, Photography, Videography, Full Brand Package
- Filter by industry: Barbers, Coffee Shops, Construction, Creators, Events

**Case Study Card**:
- Featured image or video thumbnail
- Client name and industry
- Project type
- Brief one-sentence hook
- "Read Story" CTA
- Hover effect reveals more context

**Individual Case Study Structure** (detail page: `/customer-stories/[slug]`):

1. **Hero Section**
   - Large hero image or video
   - Client name and tagline
   - Project overview (1-2 sentences)
   - Services provided badges

2. **The Challenge**
   - What problem was the client facing?
   - Business context and pain points
   - Why they came to Shawn Paps Media
   - Quote from client about their situation

3. **The Approach**
   - Creative direction and strategy
   - Why certain decisions were made
   - Process highlights
   - Behind-the-scenes images or video (optional)

4. **The Solution**
   - Final deliverables showcase
   - Photo gallery or video embed (from Mux)
   - Design decisions explained
   - Technical implementation (for web projects)

5. **The Results**
   - Outcomes and metrics (if available)
     - Traffic increase, engagement, sales, brand perception
   - Client testimonial (featured prominently)
   - "After" comparison if applicable

6. **Project Details Sidebar** (or footer):
   - Client: [Name]
   - Industry: [Type]
   - Services: [Web, Photo, Video]
   - Timeline: [Duration]
   - Link to live site (if web project)

7. **Next Case Study CTA**
   - "See Another Story" with preview card
   - Navigation to next/previous case study

**Content Strategy**:
- 3-5 strong case studies to start
- Mix of different services and client types
- Emphasize strategic thinking, not just execution
- Show personality and approach to problem-solving
- Include metrics and tangible results where possible

**Visual Design**:
- Rich media: lots of images and video
- Bold typography for section headers
- Dark background with strategic content highlighting
- Immersive, story-driven layout
- Mix of full-width media and text blocks

**Technical Implementation**:
- Astro pages with dynamic routing: `[slug].astro`
- Case study data in markdown frontmatter or separate data file
- Mux for all images and videos within case studies
- React components for interactive elements (gallery, video player)
- Smooth page transitions between case studies
- Social share buttons for each story

**Technology Choice**:
- Astro for page structure and SEO
- React for interactive galleries and media players
- Framer Motion for scroll-triggered reveals
- Mux for all media assets

**SEO Considerations**:
- Unique meta descriptions for each case study
- Schema markup for case studies/articles
- Alt text for all images describing the work
- Client name and project type in URL slug

---

### 8. Contact Page (/contact)

**Purpose**: Capture leads and send to Notion database

**Layout**:
- Split layout or centered form
- Brief headline: "Let's Create Something Bold"
- Subtext about typical response time

**Form Fields**:
- Name (required)
- Email (required)
- Business Name (optional)
- Service Interest (dropdown: Web Design, Photography, Videography, Multiple)
- Client Type (dropdown: Creator, Small Business, Event, Other)
- Project Details (textarea, required)
- Budget Range (dropdown: Under $5k, $5k-$10k, $10k-$20k, $20k+, Not Sure)
- How Did You Hear About Us? (optional)

**Form Technology**:
- **Formik** for form state and validation
- **Yup** schema validation (consider using with Formik)
- Inline validation with helpful error messages
- Submit button with loading state

**Notion Integration**:
- Connect to Notion API
- Map form fields to Notion database properties
- Handle API authentication securely (use environment variables)
- Success message after submission
- Error handling with user-friendly messages

**Technical Implementation**:
- React component for entire form
- API route in Astro for server-side Notion API calls
- POST to `/api/contact` endpoint
- Validation on both client and server side
- Consider honeypot field for spam prevention

**Notion Database Structure** (recommended properties):
- Name (title)
- Email (email)
- Business Name (text)
- Service Interest (select/multi-select)
- Client Type (select)
- Project Details (text)
- Budget Range (select)
- Source (text)
- Status (select: New, Contacted, Qualified, Project, Closed)
- Date Submitted (date)

---

## Additional Features & Considerations

### Performance Optimization
- Mux handles image and video optimization automatically
- Lazy loading for images and videos
- Code splitting for React components
- Minimize JavaScript bundle size
- Use Astro's partial hydration for React components
- Mux adaptive streaming for optimal video delivery

### SEO & Meta
- Proper meta tags on all pages
- Open Graph images for social sharing
- Descriptive alt text for all images
- Semantic HTML structure
- XML sitemap
- Schema.org markup for business info

### Accessibility
- Keyboard navigation support
- ARIA labels where needed
- Focus states on interactive elements
- Sufficient color contrast (test dark text on dark backgrounds)
- Alt text for all images
- Video captions/transcripts (optional)

### Analytics (Optional)
- Track page views and user behavior
- Monitor video engagement via Mux analytics
- Form submission tracking
- Conversion funnel analysis

### Content Management
- All media assets stored in Mux (photos and videos)
- Establish naming convention for media files in Mux
- Metadata/tags system for filtering (stored in Mux or separate database)
- Consider how content will be updated (manual Mux uploads vs. CMS integration)

---

## File Structure Suggestion

```
/
├── src/
│   ├── components/
│   │   ├── astro/
│   │   │   ├── Hero.astro
│   │   │   ├── Services.astro
│   │   │   ├── Testimonials.astro
│   │   │   ├── CaseStudyCard.astro
│   │   │   └── Footer.astro
│   │   └── react/
│   │       ├── Navigation.tsx
│   │       ├── FilterableGallery.tsx
│   │       ├── VideoPlayer.tsx
│   │       ├── ContactForm.tsx
│   │       ├── Lightbox.tsx
│   │       └── CaseStudyFilter.tsx
│   ├── layouts/
│   │   ├── Layout.astro
│   │   └── CaseStudyLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── photography.astro
│   │   ├── videography.astro
│   │   ├── web-design.astro
│   │   ├── customer-stories.astro
│   │   ├── customer-stories/
│   │   │   └── [slug].astro
│   │   ├── contact.astro
│   │   ├── clients/
│   │   │   ├── creators.astro
│   │   │   ├── small-businesses.astro
│   │   │   └── events.astro
│   │   └── api/
│   │       └── contact.ts
│   ├── content/
│   │   └── case-studies/
│   │       ├── barber-shop-rebrand.md
│   │       ├── coffee-roaster-launch.md
│   │       └── construction-company-site.md
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       ├── mux.ts
│       ├── notion.ts
│       └── imageLoader.ts
├── public/
│   └── assets/
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

---

## Implementation Priorities

### Phase 1: Foundation
1. Set up navigation (mobile + desktop with dropdowns)
2. Build landing page structure and sections
3. Establish design system (colors, typography, spacing)
4. Implement basic animations with Framer Motion

### Phase 2: Core Features
1. Photography portfolio page with filtering
2. Videography portfolio page with Mux integration
3. Web design portfolio page
4. Customer Stories page with case study detail pages
5. Client type pages (using template approach)

### Phase 3: Integrations
1. Contact form with Formik
2. Notion API integration for lead capture
3. Mux setup for video hosting
4. R2 setup for image hosting

### Phase 4: Polish
1. Advanced animations and interactions
2. Performance optimization
3. SEO implementation
4. Accessibility audit
5. Cross-browser testing
6. Mobile responsiveness refinement

---

## Key Deliverables

- Fully functional, responsive website
- Dark, bold, interactive design that reflects photography aesthetic
- Filterable photography portfolio (lookbook style)
- Video portfolio with Mux integration
- Web design showcase
- Customer Stories page with detailed case studies
- Client-specific landing pages
- Working contact form connected to Notion
- Mobile-friendly navigation with dropdowns
- Optimized performance and SEO
- Unified media management through Mux (photos and videos)

---

## Notes for Implementing Agent

- **Autonomy**: Choose React vs. Astro based on component needs
- **Creativity**: Interpret "bold and provocative" design - push boundaries
- **Interactivity**: Prioritize engaging user experiences
- **Performance**: Balance visual impact with load times
- **Dark Aesthetic**: Use deep blacks, strategic lighting, grungy textures
- **Typography**: Bold, aggressive headlines with readable body text
- **Mobile First**: Ensure excellent mobile experience
- **Media Storage**: Use Mux for ALL photos and videos (unified platform)
- **Forms**: Use Formik for robust form handling
- **Case Studies**: Customer Stories should prove strategic value, not just showcase pretty work

This is a portfolio site for a creative professional - it should feel cinematic, intentional, and memorable. The website itself is a demonstration of Shawn Paps Media's capabilities.
