# UNO JERSEY - Hybrid Website Project

Custom premium quality jerseys for your team. Basketball, Football, Futsal, Volleyball and more.

## Project Overview

UNO JERSEY is a hybrid website combining:
- **Static HTML pages** for homepage and quiz (no build required)
- **React app** for interactive jersey customization (built with Vite)

## Technology Stack

### HTML Pages (index.html, temukan.html)
- Pure HTML5/CSS3
- Vanilla JavaScript (ES6+)
- Three.js (3D footer animation)
- GSAP (scroll animations)

### React App (kreasikan-app)
- React 18+
- Vite (build tool)
- Tailwind CSS
- React Three Fiber (optional 3D)

## Project Structure

```
/uj-rev
├── /public                    # HTML pages (static)
│   ├── index.html            # Homepage
│   ├── temukan.html          # Quiz/Find page
│   ├── /css
│   │   ├── design-system.css # Shared design tokens
│   │   ├── homepage.css
│   │   └── temukan.css
│   ├── /js
│   │   ├── main.js
│   │   └── /components
│   │       ├── navbar.js
│   │       ├── hero.js
│   │       ├── products.js
│   │       ├── portfolio.js
│   │       └── footer.js
│   └── /assets
│       └── /images
│           ├── UNO-Black.png
│           ├── UNO-White.png
│           ├── products/
│           └── portfolio/
│
├── /kreasikan-app            # React application
│   ├── /src
│   │   ├── /components
│   │   │   ├── Navbar.jsx
│   │   │   └── JerseyCustomizer.jsx
│   │   ├── /styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── /dist                 # Build output
│   ├── package.json
│   └── vite.config.js
│
├── INTEGRATION_GUIDE.md      # Detailed integration docs
└── README.md                 # This file
```

## Getting Started

### HTML Pages (No build required)

```bash
cd public
python -m http.server 8000
# or
npx serve .
```

Open http://localhost:8000

### React App

```bash
cd kreasikan-app
npm install
npm run dev
```

Open http://localhost:3000

## Building for Production

```bash
# Build React app
cd kreasikan-app
npm run build

# Copy to public folder
cp -r dist ../public/kreasikan

# Deploy entire /public folder
```

## Design System

All design tokens are defined in `/public/css/design-system.css`:

- **Colors:** Primary (#E63946), Secondary (#1D3557), Light (#FAFAFA)
- **Typography:** Bebas Neue (headings), Inter (body)
- **Spacing:** 8px base unit system
- **Components:** Buttons, cards, forms, navigation

## Pages

| Page | Path | Technology |
|------|------|------------|
| Homepage | `/index.html` | HTML/CSS/JS |
| Products | `/index.html#products` | HTML/CSS/JS |
| Portfolio | `/index.html#portfolio` | HTML/CSS/JS |
| Temukan (Quiz) | `/temukan.html` | HTML/CSS/JS |
| Kreasikan (Customizer) | `/kreasikan/index.html` | React |

## Key Features

- **Hero Section:** Animated landing with call-to-action
- **Products Grid:** Jersey category selection
- **Portfolio Showcase:** Lightbox gallery
- **Quiz System:** Find your jersey style
- **Jersey Customizer:** Interactive 3D design tool
- **3D Footer:** Three.js particle animation

## Data Flow

```
Temukan (Quiz)
    ↓ URL parameters
Kreasikan (React App)
    ↓
Customization Complete
    ↓
WhatsApp Order
```

## Navigation

- **Homepage → Products:** Smooth scroll to #products
- **Homepage → Kreasikan:** Navigate to `/kreasikan/index.html`
- **Temukan → Kreasikan:** Pass URL parameters (type, style, name, phone)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start React dev server |
| `npm run build` | Build React app for production |
| `npm run preview` | Preview React build |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow the hybrid architecture patterns
2. Use design system variables for consistency
3. Test both HTML and React portions
4. Update INTEGRATION_GUIDE.md for structural changes

## Documentation

See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for:
- Detailed architecture explanation
- Development workflow
- Deployment steps
- Data flow between pages
- Troubleshooting

## License

© 2024 UNO JERSEY. All rights reserved.
