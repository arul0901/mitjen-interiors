# Mitjen Interiors — React migration

This project contains the selected main-site migration from the supplied HTML/PHP archive. The original page content and the original visual system are retained; this is a technical migration, not a redesign.

## Stack

- React + TypeScript + Vite
- React Router for route resolution and legacy URL redirects
- Original Bootstrap, Font Awesome, Odometer, Swiper and site CSS
- Original GSAP, ScrollTrigger, SplitText, Lenis, Swiper and jQuery integrations

## Run locally

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
npm run preview
```

## Main routes

| Route | Page component | Source content |
|---|---|---|
| `/` | `Home.tsx` | `index.php` |
| `/about` | `About.tsx` | `about.php` |
| `/services` | `Services.tsx` | `services.html` |
| `/services/details` | `ServiceDetails.tsx` | `service.php` |
| `/portfolio` | `Portfolio.tsx` | `project.php` |
| `/portfolio/details` | `PortfolioDetails.tsx` | `portfolio-details.html` |
| `/team` | `Team.tsx` | `team.html` |
| `/team/details` | `TeamDetails.tsx` | `team-details.html` |
| `/blog` | `Blog.tsx` | `blog.html` |
| `/blog/details` | `BlogDetails.tsx` | `blog-details.html` |
| `/pricing` | `Pricing.tsx` | `pricing.html` |
| `/faq` | `FAQ.tsx` | `faq.html` |
| `/contact` | `Contact.tsx` | `contact.php` |

The alternative homepage demos (`index-2.html`, `home-v2.html` through `home-v6.html`) are not active routes. All original pages remain in `original-source/` for reference.

## Parallax 3D Interior Hero

The landing page (`/`) features an interactive depth-parallax 3D interior hero stage (`ParallaxRoomStage`) built with Three.js, React Three Fiber (R3F), and custom GLSL displacement shaders. Flat 2D photographs are turned into interactive 3D spatial environments using AI-generated depth maps without needing heavy 3D meshes, GLTF models, or real-time lights.

### Features
- **Depth-Displacement Shader**: High-performance cover-fit vertex and fragment shaders with 6% base edge margin, 4-tap blurred depth sampling, and 2-step depth-refined parallax displacement clamped to $|\text{offset}| \le 0.02$.
- **Spatial Transitions**: Depth-aware room transitions where near objects switch first ($A \rightarrow B$), combined with a cinematic $4\%$ "walking through" zoom.
- **Natural Interaction**: Smoothed cursor parallax tracking (lerp 0.06), automatic Lissajous idle drift ($x=\sin(0.25t)\cdot 0.5, y=\cos(0.2t)\cdot 0.3$) after 2s of inactivity, and gyroscope tilt on mobile with iOS permission gating.
- **Autoplay & Physics Scrubbing**: 6000ms room autoplay with 1400ms `power3.inOut` GSAP transition, pointer drag/swipe with momentum decay (0.95), and ArrowLeft / ArrowRight keyboard navigation.
- **Architectural Framing**: Top and bottom architectural curved SVG masks (`#ffffff`) preserving pure white, minimal black/white aesthetics.
- **Robust Fallbacks & Accessibility**: Respects `prefers-reduced-motion` (freezes idle drift and transitions, limits parallax to 0.01), underlying poster image fallback that fades out over 600ms, procedural canvas fallbacks if an asset is missing, and automatic render pausing via IntersectionObserver and `visibilitychange` when offscreen.

### Rooms & Assets
1. **01-living.webp** (`public/rooms/01-living.webp`, `public/rooms/01-living-depth.png`) - Minimalist living room with oak floor and floor-to-ceiling windows.
2. **02-kitchen.webp** (`public/rooms/02-kitchen.webp`, `public/rooms/02-kitchen-depth.png`) - Contemporary minimalist kitchen with white marble island and dark accents.
3. **03-bedroom.webp** (`public/rooms/03-bedroom.webp`, `public/rooms/03-bedroom-depth.png`) - Serene neutral bedroom with natural linen textures and soft diffused light.
4. **04-bathroom.webp** (`public/rooms/04-bathroom.webp`, `public/rooms/04-bathroom-depth.png`) - Minimal luxury bathroom with freestanding tub and clean lines.
5. **05-dining.webp** (`public/rooms/05-dining.webp`, `public/rooms/05-dining-depth.png`) - Scandinavian architectural dining space with oak dining table.
6. **06-terrace.webp** (`public/rooms/06-terrace.webp`, `public/rooms/06-terrace-depth.png`) - Indoor-outdoor covered architectural terrace with garden views.

Full image licenses and photographer attributions are documented in [`CREDITS.md`](./CREDITS.md).

### Generating Depth Maps
To re-generate or update the 8-bit grayscale depth maps using `Depth-Anything-V2-Small-hf`:

```bash
npm run depth
```

This runs `scripts/make_depth.py`, which:
1. Loads original or raw photos from `raw/` or `public/rooms/`.
2. Estimates metric relative disparity with Depth-Anything-V2.
3. Normalizes disparity to full 0–255 range (White = Near, Black = Far).
4. Applies a 1.5px Gaussian blur to eliminate high-frequency stair-stepping.
5. Saves 1280px 8-bit grayscale PNGs to `public/rooms/01-living-depth.png` through `06-terrace-depth.png`.

### Tuning Notes
- **Tears at edges**: Lower `uStrength` (default 0.035 desktop, 0.025 mobile) or increase Gaussian blur on the depth map.
- **Looks flat**: Increase `uStrength` toward 0.045 (never exceed 0.05).
- **Warped foreground objects** (table legs, thin lamps): Paint them flat white (255) in the depth map PNG to anchor them to the near plane.
- **Slow on phones**: Resize source images to 1920px instead of 2560px and cap device pixel ratio (DPR) at 1.5.

## Migration status

- The selected main page bodies have been converted into React TSX components.
- The PHP header/footer includes have been replaced with shared React components.
- Existing asset paths, CSS class names, page copy and image references have been retained.
- All 240 files from the archive's `assets/` directory are included under `public/assets/`.
- Existing internal links continue to use full-page navigation so the legacy DOM plugins can initialize on a fresh page load. React Router resolves direct route requests and redirects the older `.php` / `.html` URLs.
- The legacy JavaScript bundle now waits for the React page DOM before initializing navigation, background images, Swiper, Lenis, counters, accordions, GSAP/ScrollTrigger and the Web3Forms contact form handler.
- The mobile menu initializer avoids injecting duplicate controls and uses namespaced event listeners.
- The contact form uses Web3Forms with an accessible live status, submit-state protection and success/error handling.
- The copyright year is rendered directly by React.

## Forms and backend dependencies

- The Contact page is connected to the existing Web3Forms endpoint and access key from the source archive. This external service and key/domain configuration have not been verified from this environment.
- The forms on Services, Team Details, Blog, Blog Details and the footer newsletter still have `action="#"` in the supplied source. They are presentational template forms and need a real backend or form provider before production use. No submission service has been invented during migration.
- The frontend does not require PHP for its current pages. PHP can be removed from the hosting stack once any future server-side form, CMS or dynamic data requirements are handled separately.

## Brand/content note

Although the archive was named `axisbuilt-html.zip`, the website source itself contains **Mitjen Interiors / Craft Interior Studio** branding and Craft Interior Studio's Coimbatore contact information. Those details have been preserved as supplied. They have not been silently renamed to AxisBuilt.

## Verification status

- TypeScript/TSX syntax transpilation: passed for all 17 source files.
- A strict TypeScript source check using temporary module declarations: passed; actual package typings still need to be checked after dependency installation.
- Legacy JavaScript syntax check: passed.
- Local `/assets/...` references in page components: no missing files found.
- Page source structure: the main page section/image counts are retained from the selected source files.
- A full Vite production build and browser-level responsive/interaction test could not be completed in this execution environment because `npm install` could not reach `registry.npmjs.org` (DNS `EAI_AGAIN`). Run the commands above on a machine with npm registry access before deployment.

## Before production

1. Run `npm install` and `npm run build`.
2. Test every route and the legacy URL redirects.
3. Test mobile navigation, the search overlay, sliders, accordions, counters and scroll animations on desktop and mobile.
4. Submit a real contact-form test and verify the Web3Forms access-key domain configuration.
5. Connect the remaining template forms to their intended services or remove them if they are not required.
6. Confirm the brand name, logo, contact details and SEO copy with the site owner.
