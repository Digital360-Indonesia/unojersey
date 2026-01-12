# UNO JERSEY - Integration Guide

## Overview

UNO JERSEY website uses a **hybrid architecture** combining pure HTML/CSS/JavaScript for static pages and React (Vite) for the interactive jersey customization feature.

```
/uj-rev
├── /public                    # HTML pages (static)
│   ├── index.html            # Homepage
│   ├── temukan.html          # Quiz/Find page
│   ├── /css                  # Shared styles
│   ├── /js                   # Vanilla JS components
│   └── /assets               # Images, logos, videos
│
├── /kreasikan-app            # React application
│   ├── /src                  # React components
│   ├── /dist                 # Build output (after npm run build)
│   └── package.json
│
└── INTEGRATION_GUIDE.md      # This file
```

---

## Architecture Summary

### HTML Pages (index.html, temukan.html)

**Technology Stack:**
- Pure HTML5/CSS3
- Vanilla JavaScript (ES6+)
- Three.js (3D footer animation)
- GSAP (scroll animations)
- No build process required

**Features:**
- Hero section with animations
- Products grid
- Portfolio showcase
- Contact footer with 3D canvas
- Quiz functionality (temukan.html)

### React App (kreasikan-app)

**Technology Stack:**
- React 18+
- Vite (build tool)
- Tailwind CSS (styling)
- React Three Fiber (for 3D jersey - optional)

**Features:**
- Interactive jersey customizer
- Real-time preview
- Color/style selection
- Order submission

---

## Design System

### Shared CSS Variables

The `design-system.css` file contains all design tokens used across both HTML and React portions.

**Location:** `/public/css/design-system.css`

**Key Variables:**

```css
/* Colors */
--color-primary: #E63946;      /* Energetic red for CTAs */
--color-primary-hover: #C1121F;
--color-secondary: #1D3557;    /* Deep blue */
--color-dark: #1A1A1A;
--color-light: #FFFFFF;
--color-gray-100: #FAFAFA;     /* Main background */

/* Typography */
--font-heading: 'Bebas Neue', sans-serif;
--font-subheading: 'Poppins', sans-serif;
--font-body: 'Inter', sans-serif;

/* Spacing */
--spacing-xs: 8px;
--spacing-sm: 16px;
--spacing-md: 24px;
--spacing-lg: 48px;
--spacing-xl: 96px;

/* Navigation */
--nav-height: 80px;
```

**Importing in React:**

```jsx
// In src/styles/index.css
@import '/css/design-system.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Navigation Flow

### Homepage → Other Pages

```html
<!-- From index.html -->
<a href="/temukan.html">Temukan</a>
<a href="/kreasikan/index.html">Kreasikan</a>
<a href="#products">Products</a>
```

### Temukan → Kreasikan (with Parameters)

```javascript
// temukan.js submits to Kreasikan:
const params = new URLSearchParams({
  jerseyType: 'basketball',
  style: 'bold',
  name: userName,
  phone: userPhone
});
window.location.href = `/kreasikan/index.html?${params.toString()}`;
```

### Kreasikan Reading Parameters

```jsx
// App.jsx in React app
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get('type');        // 'basketball'
  const style = urlParams.get('style');      // 'bold'
  const name = urlParams.get('name');        // user name
  const phone = urlParams.get('phone');      // user phone

  if (type) setJerseyType(type);
  // ...
}, []);
```

---

## Development Workflow

### 1. HTML Pages Development

**No build step required!**

```bash
# Simply open in browser or use a simple server
cd public
python -m http.server 8000
# or
npx serve .
```

**File Structure:**
```
/public
├── index.html          # Edit directly
├── temukan.html        # Edit directly
├── /css
│   ├── design-system.css    # Shared tokens
│   ├── homepage.css         # Homepage styles
│   └── temukan.css          # Temukan page styles
└── /js
    ├── main.js              # Global JS
    └── /components
        ├── navbar.js        # Shared nav
        ├── hero.js
        ├── products.js
        ├── portfolio.js
        └── footer.js
```

### 2. React App Development

```bash
# Navigate to React app
cd kreasikan-app

# Install dependencies (first time only)
npm install

# Start dev server
npm run dev
# Opens at http://localhost:3000

# Build for production
npm run build
# Outputs to /dist
```

---

## Build & Deployment

### Build React App

```bash
cd kreasikan-app
npm run build
```

This creates a `/dist` folder with the compiled React app.

### Final Project Structure for Deployment

```
/ (server root)
├── index.html                 # Homepage
├── temukan.html               # Quiz page
├── /kreasikan                 # React app (copy /dist contents here)
│   ├── index.html
│  ── assets/
│   └── ...
├── /css
│   └── design-system.css
├── /js
│   └── ...
└── /assets
    └── /images
```

### Deployment Steps

1. **Build React app:**
   ```bash
   cd kreasikan-app
   npm run build
   ```

2. **Copy React build to public:**
   ```bash
   cp -r kreasikan-app/dist public/kreasikan
   ```

3. **Deploy entire `public` folder:**
   - Upload everything in `/public` to your web server
   - Or use Netlify/Vercel (point to `/public` as publish directory)

### Vite Config Note

The `vite.config.js` is configured with `base: '/kreasikan/'` so the React app works correctly when deployed as a subdirectory.

```javascript
// kreasikan-app/vite.config.js
export default defineConfig({
  base: '/kreasikan/',  // Important for subdirectory deployment
  // ...
});
```

---

## Shared Components

### Navbar Component

**Vanilla JS Version** (`/public/js/components/navbar.js`):
- Used in: `index.html`, `temukan.html`
- Features: Scroll effects, mobile menu, smooth scroll

**React Version** (`/kreasikan-app/src/components/Navbar.jsx`):
- Used in: React app
- Features: Same functionality, React-based

### Footer Component

**Location:** `/public/js/components/footer.js`
- Features: Three.js 3D particle animation
- Used in: `index.html` (can be added to other pages)

---

## Data Flow Between Pages

### Temukan → Kreasikan Flow

```
User takes quiz
    ↓
Answers collected (sport, style, color, team size, budget)
    ↓
Style calculated (bold, classic, modern, minimal)
    ↓
User enters name & phone
    ↓
Form submits to /kreasikan/index.html with URL params:
    ?type=basketball&style=bold&name=JOHN&phone=08123456789
    ↓
React app reads params and pre-fills customizer
    ↓
User completes customization and orders
```

---

## Asset Management

### Images

**Location:** `/public/assets/images/`

```
/public/assets/images/
├── UNO-Black.png           # Logo (dark bg)
├── UNO-White.png           # Logo (light bg)
├── hero-jersey.png         # Hero section
├── products/               # Product category images
│   ├── basketball.jpg
│   ├── football.jpg
│   └── ...
└── portfolio/              # Portfolio showcase
    ├── 1.jpg
    ├── 2.jpg
    └── ...
```

### Accessing Assets

**In HTML:**
```html
<img src="/assets/images/UNO-Black.png" alt="Logo">
```

**In React:**
```jsx
<img src="/assets/images/UNO-Black.png" alt="Logo" />
```

---

## Fonts

**Google Fonts Used:**
- **Bebas Neue** - Headings (retro energy)
- **Poppins** - Subheadings (modern)
- **Inter** - Body text (premium readability)

**Loaded in:** All HTML pages and React index.html

```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## JavaScript Libraries

### HTML Pages

**CDN Links:**
```html
<!-- Three.js (3D graphics) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

<!-- GSAP (animations) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
```

### React App

**Installed via npm:**
```bash
npm install react react-dom
npm install @vitejs/plugin-react vite tailwindcss
```

---

## Styling Approach

### HTML Pages

Uses custom CSS with CSS variables from `design-system.css`:

```css
/* homepage.css */
.hero {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--color-gray-100) 0%, var(--color-gray-200) 100%);
}
```

### React App

Uses Tailwind CSS + shared design system:

```jsx
// Uses Tailwind classes
<div className="flex items-center gap-4">

// Can also use CSS variables
<div style={{ color: 'var(--color-primary)' }}>
```

---

## Key Integration Points

### 1. Design System Consistency

Both HTML and React portions use the same `design-system.css`. This ensures:
- Consistent colors
- Consistent typography
- Consistent spacing
- Consistent component styles

### 2. Navigation Links

All nav links use absolute paths from root:

```html
<!-- From any HTML page -->
<a href="/index.html">Home</a>
<a href="/temukan.html">Temukan</a>
<a href="/kreasikan/index.html">Kreasikan</a>
```

### 3. URL Parameter Passing

**Temukan → Kreasikan:**

```javascript
// temukan.js
const params = new URLSearchParams({
  jerseyType: this.answers.sport,
  style: this.answers.style,
  name: userName,
  phone: userPhone
});
window.location.href = `/kreasikan/index.html?${params.toString()}`;
```

**Kreasikan receiving:**

```jsx
// App.jsx
const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get('jerseyType');
const style = urlParams.get('style');
```

---

## Common Tasks

### Add a New Section to Homepage

1. Add HTML to `/public/index.html`
2. Add styles to `/public/css/homepage.css`
3. Add animations to `/public/js/components/[section].js`

### Modify Design Tokens

Edit `/public/css/design-system.css` - changes reflect across both HTML and React portions.

### Update Logo

Replace files in `/public/assets/images/`:
- `UNO-Black.png` (for light backgrounds)
- `UNO-White.png` (for dark backgrounds)

### Add New Product Category

1. Add image to `/public/assets/images/products/`
2. Add to products grid in `/public/index.html`
3. Update `JERSEY_TYPES` in `/kreasikan-app/src/components/JerseyCustomizer.jsx`

---

## Testing Checklist

- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Temukan quiz flows to Kreasikan
- [ ] Kreasikan receives URL parameters correctly
- [ ] Mobile menu works on all pages
- [ ] 3D footer animation renders
- [ ] GSAP scroll animations trigger
- [ ] React app builds without errors
- [ ] Design system variables consistent across pages

---

## Troubleshooting

### React app shows blank page

**Issue:** Path mismatch after build

**Solution:**
- Check `vite.config.js` has `base: '/kreasikan/'`
- Ensure `/dist` contents are copied to `/public/kreasikan/`

### Design system not working in React

**Issue:** CSS variables not available

**Solution:**
- Check `@import '/css/design-system.css';` in `src/styles/index.css`
- Verify path is correct (should work if `/public` is served from root)

### Navigation not working

**Issue:** Links broken on different pages

**Solution:**
- Use absolute paths from root: `/index.html`, `/temukan.html`
- Don't use relative paths like `../index.html`

### Temukan quiz not redirecting

**Issue:** Form submission handler

**Solution:**
- Check browser console for errors
- Verify `window.location.href` is being called
- Ensure params are being formatted correctly

---

## Contact & Support

For questions about this hybrid architecture:
- Review this guide
- Check file comments
- Test locally before deploying

---

## Quick Reference

| Task | Command |
|------|---------|
| Start HTML dev server | `cd public && python -m http.server 8000` |
| Start React dev server | `cd kreasikan-app && npm run dev` |
| Build React app | `cd kreasikan-app && npm run build` |
| Copy React build | `cp -r kreasikan-app/dist public/kreasikan` |

---

**Last Updated:** 2024
**Version:** 1.0.0
