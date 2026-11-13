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

## Walkthrough Hero (Scroll-Scrubbed Video)

The homepage features a pinned, full-bleed scroll-scrubbed video walkthrough hero (`<VideoWalkthroughHero />`), replacing the legacy image-marquee strip. As the visitor scrolls, the camera glides continuously through the modern residence while room titles dynamically transition over the footage.

### Pipeline & Encoding

- **Source video:** Place your footage at `raw/walkthrough.mp4` (git-ignored).
- **Run encoding:**
  ```bash
  npm run encode:video
  ```
  This command invokes `scripts/encode-video.mjs` to generate:
  - `public/hero/walkthrough.mp4`: H.264 desktop version with every frame an IDR keyframe (`-g 1`, CRF 24) for instant bi-directional scrubbing.
  - `public/hero/walkthrough-mobile.mp4`: 1080w mobile version (`-g 1`, CRF 28) optimized for cellular bandwidth.
  - `public/hero/walkthrough.webm`: Multi-threaded VP9 encode (`-g 1`, CRF 34).
  - `public/hero/poster.webp`: High-resolution first-frame poster preloaded via `<link rel="preload">` for instantaneous paint.
  - `public/hero/frames/` & `frames.json`: 240 WebP frame sequence (1280px wide) used for iOS Safari, data-saver connections, and jank fallback.

### Cache Headers

For deployment on Vercel, Netlify, or Apache/Nginx, configure aggressive caching on `/hero/*`:
```http
Cache-Control: public, max-age=31536000, immutable
```

### Reverting to Legacy Marquee

To instantly revert back to the original image-marquee strip, open `src/pages/Home.tsx` and toggle the feature flag:
```ts
const SHOW_LEGACY_MARQUEE = true;
```

### Tuning Notes

- **Scrub feels laggy:** In `src/components/VideoWalkthroughHero.tsx`, raise the smoothing constant from `6` to `10` in `useScrollScrubVideo({ smoothing: 10 })`, or verify the source video was encoded with `-g 1`.
- **Page feels too long or short:** In `src/hooks/useScrollScrubVideo.ts`, adjust the pin distance end value (`+=600%` desktop, `+=450%` mobile).
- **A title is early or late:** In `src/data/rooms.ts`, adjust the `{ from, to }` progress milestones inside `WALKTHROUGH_ROOMS`.
- **Big download on mobile:** In `scripts/encode-video.mjs`, raise mobile CRF to `30`, extract 960px frames, or lower frame target from `240` to `180`.


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
