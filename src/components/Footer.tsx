import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Check, Mail, MapPin, Phone } from "lucide-react";
import { useInquiry } from "../context/useInquiry";
import "../styles/Footer.css";

export default function Footer() {
  const { openInquiry } = useInquiry();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="mitjen-footer" aria-label="Site Footer">
        <div className="mitjen-footer-glow" aria-hidden="true" />

        <div className="mitjen-footer-inner">
          {/* 1. Pre-Footer Architectural CTA Band */}
          <div className="mitjen-footer-cta-band">
            <div className="mitjen-footer-cta-copy">
              <span className="mitjen-footer-eyebrow">
                <span className="mitjen-footer-eyebrow-line" aria-hidden="true" />
                START YOUR PROJECT
              </span>
              <h2 className="mitjen-footer-cta-heading">
                Crafting timeless spaces across <em>Coimbatore &amp; Bangalore.</em>
              </h2>
            </div>

            <div className="mitjen-footer-cta-actions">
              <button
                type="button"
                className="mitjen-footer-btn-primary"
                onClick={() => openInquiry()}
              >
                <span>Book a Consultation</span>
                <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
              </button>

              <Link to="/projects" className="mitjen-footer-btn-secondary">
                <span>Explore Portfolio</span>
                <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* 2. Main 12-Column Architectural Grid */}
          <div className="mitjen-footer-grid">
            {/* Brand & Live Studio Status */}
            <div className="mitjen-footer-col-brand">
              <Link to="/" className="mitjen-footer-brand-mark" aria-label="Mitjen Interiors Home">
                <span className="mitjen-footer-monogram" aria-hidden="true">M</span>
                <span className="mitjen-footer-brand-name">Mitjen</span>
              </Link>

              <p className="mitjen-footer-brand-desc">
                Bespoke residential, commercial, and corporate interior architecture—engineered with
                German CNC joinery and hand-buffed Italian PU finishes.
              </p>

              <div className="mitjen-studio-status">
                <span className="mitjen-status-dot" aria-hidden="true" />
                <span className="mitjen-status-text">
                  Mon – Sat • 9:30 AM – 7:00 PM IST
                </span>
              </div>

              <div className="mitjen-footer-socials" aria-label="Direct contact and social channels">
                <a
                  href="tel:+918940555526"
                  className="mitjen-social-btn"
                  aria-label="Call Mitjen Interiors"
                  title="Call +91 89405 55526"
                >
                  <Phone size={16} strokeWidth={1.8} />
                </a>
                <a
                  href="mailto:info@mitjeninteriors.com"
                  className="mitjen-social-btn"
                  aria-label="Email Mitjen Interiors"
                  title="Email us"
                >
                  <Mail size={16} strokeWidth={1.8} />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mitjen-social-btn"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mitjen-social-btn"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Studio Navigation */}
            <div>
              <h3 className="mitjen-footer-col-title">Studio</h3>
              <ul className="mitjen-footer-links" aria-label="Studio navigation">
                <li>
                  <Link to="/" className="mitjen-footer-link">
                    <span>Home</span>
                    <ArrowRight size={13} className="mitjen-footer-link-arrow" aria-hidden="true" />
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="mitjen-footer-link">
                    <span>About Us</span>
                    <ArrowRight size={13} className="mitjen-footer-link-arrow" aria-hidden="true" />
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="mitjen-footer-link">
                    <span>Projects</span>
                    <ArrowRight size={13} className="mitjen-footer-link-arrow" aria-hidden="true" />
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="mitjen-footer-link">
                    <span>FAQ</span>
                    <ArrowRight size={13} className="mitjen-footer-link-arrow" aria-hidden="true" />
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="mitjen-footer-link">
                    <span>Contact Studio</span>
                    <ArrowRight size={13} className="mitjen-footer-link-arrow" aria-hidden="true" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Specializations */}
            <div>
              <h3 className="mitjen-footer-col-title">Specializations</h3>
              <ul className="mitjen-footer-links" aria-label="Design specializations">
                <li>
                  <Link to="/services/residential-interior-design" className="mitjen-footer-link">
                    <span>Residential Design</span>
                    <ArrowRight size={13} className="mitjen-footer-link-arrow" aria-hidden="true" />
                  </Link>
                </li>
                <li>
                  <Link to="/services/commercial-interior-design" className="mitjen-footer-link">
                    <span>Commercial &amp; Retail</span>
                    <ArrowRight size={13} className="mitjen-footer-link-arrow" aria-hidden="true" />
                  </Link>
                </li>
                <li>
                  <Link to="/services/corporate-interior-design" className="mitjen-footer-link">
                    <span>Corporate Workspaces</span>
                    <ArrowRight size={13} className="mitjen-footer-link-arrow" aria-hidden="true" />
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="mitjen-footer-link">
                    <span>All Services</span>
                    <ArrowRight size={13} className="mitjen-footer-link-arrow" aria-hidden="true" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Visit Us & Newsletter */}
            <div className="mitjen-footer-col-studio">
              <div className="mitjen-studio-card">
                <span className="mitjen-studio-card-label">
                  <MapPin size={11} style={{ display: "inline", marginRight: 5, verticalAlign: "-1px" }} aria-hidden="true" />
                  Design Studio
                </span>
                <a
                  href="https://www.google.com/maps/place/craft+interior+studio/@11.0221026,77.021977,19z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mitjen-studio-address"
                >
                  Craft Interior Studio, Alamelu Nagar,<br />
                  Coimbatore, Tamil Nadu — 641015
                </a>

                <div className="mitjen-studio-contact-row">
                  <a href="tel:+918940555526" className="mitjen-studio-phone">
                    +91 89405 55526
                  </a>
                  <a
                    href="https://www.google.com/maps/place/craft+interior+studio/@11.0221026,77.021977,19z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mitjen-studio-map-link"
                  >
                    Directions <ArrowUpRight size={12} aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div>
                <span className="mitjen-newsletter-label">
                  Receive curated project releases &amp; material notes:
                </span>
                {subscribed ? (
                  <div className="mitjen-newsletter-success" role="status">
                    <Check size={15} strokeWidth={2.5} aria-hidden="true" />
                    <span>Thank you — you’re on our studio list.</span>
                  </div>
                ) : (
                  <form className="mitjen-newsletter-form" onSubmit={handleSubscribe}>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      autoComplete="email"
                      required
                      aria-label="Email address for studio updates"
                      className="mitjen-newsletter-input"
                    />
                    <button
                      type="submit"
                      className="mitjen-newsletter-submit"
                      aria-label="Subscribe to studio updates"
                    >
                      <ArrowRight size={15} strokeWidth={2.2} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* 3. Oversized Architectural Brand Signature */}
          <div className="mitjen-footer-wordmark-wrap" aria-hidden="true">
            <span className="mitjen-footer-wordmark">MITJEN INTERIORS</span>
          </div>

          {/* 4. Bottom Legal & Coordinates Bar */}
          <div className="mitjen-footer-bottom">
            <div className="mitjen-footer-copyright">
              &copy; {new Date().getFullYear()} <strong>Mitjen Interiors</strong>. All rights reserved.
            </div>

            <div className="mitjen-footer-coords">
              11.0221° N, 77.0220° E &bull; CBE / BLR
            </div>

            <div className="mitjen-footer-bottom-links">
              <Link to="/contact" className="mitjen-footer-bottom-link">Inquiries</Link>
              <Link to="/pricing" className="mitjen-footer-bottom-link">Packages</Link>
              <button
                type="button"
                onClick={scrollToTop}
                className="mitjen-footer-bottom-link"
              >
                Back to Top &uarr;
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Preserve legacy scroll-to-top floating button */}
      <button
        aria-label="Scroll to top"
        className="cs_scrollup_btn cs_center"
        id="scrollToTopBtn"
        name="ScrollToTopBtn"
        type="button"
        onClick={scrollToTop}
      >
        <svg fill="none" height="18" viewBox="0 0 16 16" width="18" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 15V1M8 1L1 8M8 1L15 8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      </button>
    </>
  );
}
