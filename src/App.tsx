import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { InquiryProvider } from "./context/InquiryContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Portfolio from "./pages/Portfolio";
import PortfolioDetails from "./pages/PortfolioDetails";
import Team from "./pages/Team";
import TeamDetails from "./pages/TeamDetails";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";


function LegacyPageEffects() {
  const location = useLocation();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const legacyWindow = window as Window & {
        gsapAnimationCleanup?: () => void;
        lenisInstance?: { scrollTo: (target: number, options?: { immediate?: boolean }) => void };
      };

      // Close transient UI when navigation is performed through React Router.
      document.querySelectorAll(".cs_nav_list_wrapper.active, .cs_menu_toggle.active, .cs_menu_dropdown_toggle.active").forEach((node) => {
        node.classList.remove("active");
      });
      document.querySelector(".cs_header_search")?.classList.remove("active");

      // Dispose page-scoped animation triggers before the next React route is initialized.
      legacyWindow.gsapAnimationCleanup?.();
      if (legacyWindow.lenisInstance) {
        legacyWindow.lenisInstance.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }

      // The legacy template queries the DOM directly, so initialize it only
      // after React has committed the route's markup. The flag also handles
      // the rare case where the module entry commits before the legacy bundle.
      (window as Window & { __mitjenPageReadyRequested?: boolean }).__mitjenPageReadyRequested = true;
      window.dispatchEvent(new Event("mitjen:page-ready"));
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname]);

  return null;
}

function NotFound() {
  return (
    <main className="container py-5" style={{ minHeight: "60vh" }}>
      <p className="cs_section_subtitle cs_bold cs_accent_color text-uppercase">404 — Page not found</p>
      <h1 className="cs_section_title cs_fs_53 cs_semibold text-uppercase">THIS PAGE DOESN’T EXIST.</h1>
      <p>The link may be outdated or the page may have moved.</p>
      <a href="/" className="cs_btn_style_1 cs_fs_14 cs_bold cs_primary_font cs_radius_50">
        <span>BACK TO HOME</span>
      </a>
    </main>
  );
}

/**
 * The legacy template is kept for its original visual interactions, but its
 * DOM initializers are bridged to React route commits in LegacyPageEffects.
 */
export default function App() {
  return (
    <InquiryProvider>
      <BrowserRouter>
        <LegacyPageEffects />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/details" element={<ServiceDetails />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/details" element={<PortfolioDetails />} />
          <Route path="/team" element={<Team />} />
          <Route path="/team/details" element={<TeamDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/details" element={<BlogDetails />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />

          {/* Preserve the original static/PHP URLs for bookmarks and shared links. */}
          <Route path="/index.php" element={<Navigate to="/" replace />} />
          <Route path="/index.html" element={<Navigate to="/" replace />} />
          <Route path="/about.php" element={<Navigate to="/about" replace />} />
          <Route path="/about-us" element={<Navigate to="/about" replace />} />
          <Route path="/about-us.html" element={<Navigate to="/about" replace />} />
          <Route path="/services.html" element={<Navigate to="/services" replace />} />
          <Route path="/services.php" element={<Navigate to="/services" replace />} />
          <Route path="/service.php" element={<Navigate to="/services/details" replace />} />
          <Route path="/service-details" element={<Navigate to="/services/details" replace />} />
          <Route path="/service-details.html" element={<Navigate to="/services/details" replace />} />
          <Route path="/project.php" element={<Navigate to="/portfolio" replace />} />
          <Route path="/portfolio.html" element={<Navigate to="/portfolio" replace />} />
          <Route path="/portfolio-details" element={<Navigate to="/portfolio/details" replace />} />
          <Route path="/portfolio-details.html" element={<Navigate to="/portfolio/details" replace />} />
          <Route path="/team.html" element={<Navigate to="/team" replace />} />
          <Route path="/team-details" element={<Navigate to="/team/details" replace />} />
          <Route path="/team-details.html" element={<Navigate to="/team/details" replace />} />
          <Route path="/blog.html" element={<Navigate to="/blog" replace />} />
          <Route path="/blog-details" element={<Navigate to="/blog/details" replace />} />
          <Route path="/blog-details.html" element={<Navigate to="/blog/details" replace />} />
          <Route path="/pricing.html" element={<Navigate to="/pricing" replace />} />
          <Route path="/faq.html" element={<Navigate to="/faq" replace />} />
          <Route path="/contact.php" element={<Navigate to="/contact" replace />} />
          <Route path="/contact-us" element={<Navigate to="/contact" replace />} />
          <Route path="/contact-us.html" element={<Navigate to="/contact" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </InquiryProvider>
  );
}
