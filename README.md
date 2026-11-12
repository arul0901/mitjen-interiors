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

## 3D Fly-Through Hero

The homepage (`/`) features an interactive, real-time 3D architectural fly-through of a luxury single-storey residence (`FlyThroughStage`) mounted seamlessly below the headline hero section. As the visitor scrolls down the page, the camera glides along Catmull-Rom 3D splines through the rooms (Living Room $\rightarrow$ Kitchen & Dining $\rightarrow$ Master Bedroom $\rightarrow$ Covered Terrace & Pool Deck), accompanied by a continuous day-to-night lighting shift tied to scroll progress.

### Strict Zero-UI Design
The stage contains strictly 3D visuals only:
- **No on-screen controls**: No room indicators, lines, dots, arrows, previous/next buttons, or progress bars.
- **No text/labels**: No room captions, labels, badges, or scroll/drag prompts.
- **No spinners**: An under-canvas still poster (`public/rooms/01-living.webp`) fades out over 600ms once the 3D scene finishes mounting.
- **Clean interaction**: Driven 100% by native page scroll with smooth damping (`lambda: 4.0`), cubic-bezier inertia matching the site menu, plus a subtle, invisible mouse parallax on desktop ($\pm 0.15\text{m}$, lerp 0.05). No custom cursor states or touch hijacking.

### Scene Architecture & Scale
- **Real 1:1 Scale**: 1 unit = 1 meter, ceiling height 2.8m, camera height ~1.5m.
- **Open-Concept Portals**: Wide 2.8m+ openings between zones so the camera never clips partition walls.
- **PBR Materials**: Scandinavian white oak floors, crisp off-white architectural plaster, dark aluminum window mullions, bouclé linen upholstery, travertine coffee table, and an infinity pool with crystal turquoise reflections.
- **Poly Haven HDRIs**:
  - `daylight.hdr` (`public/hdri/daylight.hdr`): Morning to midday ambient fill and reflections (CC0).
  - `dusk.hdr` (`public/hdri/dusk.hdr`): Twilight dusk reflections (CC0).
- **Procedural Model**: Zero multi-megabyte GLTF load lag; sub-250KB gzipped lazy chunk.

### Lighting & Day-to-Night Progression
Driven smoothly by `progress` ($0.0 \rightarrow 1.0$):
1. **$0.00 - 0.25$ (Living Room - Morning)**: Warm directional morning sun angle from the left, soft ambient fill, glowing window planes.
2. **$0.25 - 0.50$ (Kitchen/Dining - Midday)**: High neutral natural daylight, sharp island highlights.
3. **$0.50 - 0.75$ (Master Bedroom - Golden Hour)**: Low angled golden sunset light, warm interior bedside lamps fade in.
4. **$0.75 - 1.00$ (Terrace - Dusk / Blue Hour)**: Deep blue-hour twilight sky, glowing underwater pool perimeter ribbon, warm interior lamps.

### Performance & Fallbacks
- **GSAP ScrollTrigger Pin**: The stage pins for 400vh on desktop (300vh on mobile) with `anticipatePin: 1` and `pinSpacing: true`, integrating with Lenis smooth scroll without layout shifts or parent overflow clipping.
- **Device Gating**: On mobile or low-end hardware (`hardwareConcurrency <= 4` or `deviceMemory <= 4`), post-processing (Bloom, SMAA, Vignette) is automatically bypassed and DPR is capped at 1.25.
- **Off-Screen Pause**: `frameloop` switches from `"always"` to `"never"` via `IntersectionObserver` and `visibilitychange` when offscreen or the tab is hidden.
- **prefers-reduced-motion**: Disables pin, sway, and idle creep; displays a static living room camera view.
- **WebGL Fallback**: If WebGL is unavailable or blocked, crossfades smoothly across 4 pre-rendered stills as the user scrolls past.

### Tuning & Configuration
- **Waypoints & Splines**: Edit `CAMERA_PATH_POINTS` and `CAMERA_LOOKAT_POINTS` in [`src/data/houseRooms.ts`](./src/data/houseRooms.ts).
- **Pin Length**: Adjust `pinDistanceDesktop` (default `+=400%`) or `pinDistanceMobile` (default `+=300%`) in [`src/hooks/useScrollProgress.ts`](./src/hooks/useScrollProgress.ts).
- **Time-of-Day Keyframes**: Adjust colors, sun coordinates, and lamp intensities in `TIME_OF_DAY_KEYFRAMES` in [`src/data/houseRooms.ts`](./src/data/houseRooms.ts).
- **Bloom & Post-Processing**: Tune `luminanceThreshold`, `intensity`, and `mipmapBlur` in [`src/components/FlyThroughStage.tsx`](./src/components/FlyThroughStage.tsx).
- **Reverting to Marquee**: In [`src/pages/Home.tsx`](./src/pages/Home.tsx), set `const SHOW_LEGACY_MARQUEE = true;`.

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
