import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useInquiry } from '../context/useInquiry';
import '../styles/Header.css';

export const Header: React.FC = () => {
  const [isSolid, setIsSolid] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const { openInquiry } = useInquiry();

  const isServicesActive = location.pathname.startsWith('/services');
  const isProjectsActive = location.pathname.toLowerCase().startsWith('/project') || location.pathname.toLowerCase().startsWith('/portfolio');
  const isHome = location.pathname === '/';

  // State for Desktop Services Dropdown and Mobile Services Accordion
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(() => isServicesActive);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimerRef = useRef<number | null>(null);

  const handleServicesMouseEnter = () => {
    if (dropdownTimerRef.current) {
      window.clearTimeout(dropdownTimerRef.current);
      dropdownTimerRef.current = null;
    }
    setIsServicesDropdownOpen(true);
  };

  const handleServicesMouseLeave = () => {
    dropdownTimerRef.current = window.setTimeout(() => {
      setIsServicesDropdownOpen(false);
    }, 180);
  };

  const toggleServicesDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsServicesDropdownOpen((prev) => !prev);
  };

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(e.target as Node)
      ) {
        setIsServicesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (dropdownTimerRef.current) {
        window.clearTimeout(dropdownTimerRef.current);
      }
    };
  }, []);

  // Scroll listener for solid navbar state
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const h = window.innerHeight;
      const threshold = isHome ? h * 0.4 : 30;
      setIsSolid(y > threshold && !isMenuOpen);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen, isHome]);

  // Lock background scroll and hide scrollup button when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('cs_menu_open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('cs_menu_open');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('cs_menu_open');
    };
  }, [isMenuOpen]);

  // Keyboard navigation: Escape key closes menu and dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isServicesDropdownOpen) {
          setIsServicesDropdownOpen(false);
        }
        if (isMenuOpen) {
          setIsMenuOpen(false);
          burgerRef.current?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, isServicesDropdownOpen]);

  // Close menus on route change
  /* oxlint-disable react/set-state-in-effect */
  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesDropdownOpen(false);
  }, [location.pathname]);

  // Touch Swipe Gesture State & Handler
  const touchStartYRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaYRef = useRef<number>(0);
  const touchDeltaXRef = useRef<number>(0);
  const navRef = useRef<HTMLElement>(null);
  const [dragTranslateY, setDragTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Swipe on closed header bar to pull open
  const handleHeaderTouchStart = (e: React.TouchEvent) => {
    if (isMenuOpen) return;
    touchStartYRef.current = e.touches[0].clientY;
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleHeaderTouchEnd = (e: React.TouchEvent) => {
    if (isMenuOpen || touchStartYRef.current === null) return;
    const endY = e.changedTouches[0].clientY;
    const dy = endY - touchStartYRef.current;
    if (dy > 45) {
      setIsMenuOpen(true);
    }
    touchStartYRef.current = null;
    touchStartXRef.current = null;
  };

  // Global edge-swipe from right edge to open mobile menu
  useEffect(() => {
    let edgeStartX = 0;
    let edgeStartY = 0;

    const handleWindowTouchStart = (e: TouchEvent) => {
      if (isMenuOpen) return;
      edgeStartX = e.touches[0].clientX;
      edgeStartY = e.touches[0].clientY;
    };

    const handleWindowTouchEnd = (e: TouchEvent) => {
      if (isMenuOpen) return;
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const dx = endX - edgeStartX;
      const dy = endY - edgeStartY;

      // Swiped inward from right edge (within 45px of edge, moving left > 50px)
      if (edgeStartX > window.innerWidth - 45 && dx < -50 && Math.abs(dx) > Math.abs(dy)) {
        setIsMenuOpen(true);
      }
    };

    window.addEventListener('touchstart', handleWindowTouchStart, { passive: true });
    window.addEventListener('touchend', handleWindowTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleWindowTouchStart);
      window.removeEventListener('touchend', handleWindowTouchEnd);
    };
  }, [isMenuOpen]);

  // Swipe on open navigation drawer to dismiss
  const handleNavTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaYRef.current = 0;
    touchDeltaXRef.current = 0;
  };

  const handleNavTouchMove = (e: React.TouchEvent) => {
    if (touchStartYRef.current === null || touchStartXRef.current === null) return;
    const curY = e.touches[0].clientY;
    const curX = e.touches[0].clientX;
    const dy = curY - touchStartYRef.current;
    const dx = curX - touchStartXRef.current;
    touchDeltaYRef.current = dy;
    touchDeltaXRef.current = dx;

    const nav = navRef.current;
    const isAtTop = !nav || nav.scrollTop <= 2;

    // If dragging upward (dy < 0) when at top of drawer, track finger with soft resistance
    if (dy < 0 && isAtTop && Math.abs(dy) > Math.abs(dx) * 0.7) {
      setIsDragging(true);
      setDragTranslateY(dy * 0.75);
    }
  };

  const handleNavTouchEnd = () => {
    const dy = touchDeltaYRef.current;
    const dx = touchDeltaXRef.current;
    const nav = navRef.current;
    const isAtTop = !nav || nav.scrollTop <= 6;

    // Check if swipe qualifies as a close gesture:
    // 1. Swiped UP by more than 40px when near top
    const isSwipeUp = isAtTop && dy < -40 && Math.abs(dy) > Math.abs(dx) * 0.7;
    // 2. Swiped HORIZONTALLY (left or right) by more than 50px
    const isSwipeHorizontal = Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2;

    if (isSwipeUp || isSwipeHorizontal) {
      closeMenu();
    }

    setIsDragging(false);
    setDragTranslateY(0);
    touchStartYRef.current = null;
    touchStartXRef.current = null;
    touchDeltaYRef.current = 0;
    touchDeltaXRef.current = 0;
  };

  const toggleMenu = () => {
    const nextState = !isMenuOpen;
    setIsMenuOpen(nextState);
    if (!nextState) {
      burgerRef.current?.focus();
    }
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      burgerRef.current?.focus();
    }
  };

  const closeAllMenus = () => {
    setIsServicesDropdownOpen(false);
    closeMenu();
  };

  return (
    <header
      id="hd"
      className={`${isSolid || !isHome ? 'solid' : ''} ${isMenuOpen ? 'menu-open' : ''}`}
      onTouchStart={handleHeaderTouchStart}
      onTouchEnd={handleHeaderTouchEnd}
    >
      {/* Official Gold & White Vector Brand Logo */}
      <Link className="logo" to="/" onClick={closeMenu} aria-label="Mitjen Interiors Home">
        <img
          src="/assets/img/logo2.svg"
          alt="Mitjen Interiors"
          className="header-logo-img"
          width="124"
          height="28"
        />
      </Link>

      {/* Navigation: Responsive Dual Desktop / Mobile Drawer Architecture */}
      <nav
        id="nav"
        ref={navRef}
        aria-label="Primary Navigation"
        className={`${isMenuOpen ? 'open' : ''} ${isDragging ? 'dragging' : ''}`}
        onTouchStart={handleNavTouchStart}
        onTouchMove={handleNavTouchMove}
        onTouchEnd={handleNavTouchEnd}
        style={
          isDragging && dragTranslateY !== 0
            ? { transform: `translateY(${dragTranslateY}px)`, transition: 'none' }
            : undefined
        }
      >
        {/* Luxury Swipe Indicator / Drag Handle Pill */}
        <div
          className="mobile-nav-drag-handle"
          onClick={closeMenu}
          aria-label="Swipe up to close navigation"
        >
          <span className="drag-handle-pill" />
          <span className="drag-handle-hint">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor">
              <path d="M1 5L5 1L9 5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Swipe up to close
          </span>
        </div>

        {/* Mobile Header Label */}
        <div className="mobile-nav-header">
          <span className="mobile-nav-kicker">STUDIO DIRECTORY</span>
        </div>

        {/* 1. Desktop Nav Links */}
        <div className="desktop-nav-items">
          <Link
            to="/"
            className={`nav-desktop-link ${location.pathname === '/' ? 'on' : ''}`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`nav-desktop-link ${location.pathname === '/about' ? 'on' : ''}`}
            onClick={closeAllMenus}
          >
            About Us
          </Link>

          {/* Desktop Services Dropdown */}
          <div
            className={`header-dropdown-container ${isServicesDropdownOpen ? 'is-open' : ''}`}
            onMouseEnter={handleServicesMouseEnter}
            onMouseLeave={handleServicesMouseLeave}
            ref={servicesDropdownRef}
          >
            <button
              type="button"
              className={`nav-desktop-link header-dropdown-toggle ${isServicesActive ? 'on' : ''}`}
              onClick={toggleServicesDropdown}
              aria-expanded={isServicesDropdownOpen}
              aria-haspopup="true"
              aria-label="Services and Practices Menu"
            >
              <span>Services</span>
              <svg
                className={`header-dropdown-chevron ${isServicesDropdownOpen ? 'rotate' : ''}`}
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M1 1L5 5L9 1" />
              </svg>
            </button>

            <div
              className={`header-dropdown-menu ${isServicesDropdownOpen ? 'is-open' : ''}`}
              role="menu"
              aria-label="Services Submenu"
            >
              <div className="header-dropdown-kicker">
                <span>OUR PRACTICES</span>
                <span className="dropdown-kicker-dot">·</span>
                <span>WORKS</span>
              </div>

              <Link
                to="/services/residential-interior-design"
                className={`header-dropdown-item ${location.pathname === '/services/residential-interior-design' ? 'is-active' : ''}`}
                onClick={closeAllMenus}
                role="menuitem"
              >
                <div className="dropdown-item-header">
                  <span className="dropdown-item-index">01</span>
                  <span className="dropdown-item-title">Residential Works</span>
                </div>
                <p className="dropdown-item-desc">
                  Bespoke villas, luxury apartments & private sanctuaries
                </p>
              </Link>

              <Link
                to="/services/commercial-interior-design"
                className={`header-dropdown-item ${location.pathname === '/services/commercial-interior-design' ? 'is-active' : ''}`}
                onClick={closeAllMenus}
                role="menuitem"
              >
                <div className="dropdown-item-header">
                  <span className="dropdown-item-index">02</span>
                  <span className="dropdown-item-title">Commercial Works</span>
                </div>
                <p className="dropdown-item-desc">
                  Flagship showrooms, hospitality & experiential venues
                </p>
              </Link>

              <Link
                to="/services/corporate-interior-design"
                className={`header-dropdown-item ${location.pathname === '/services/corporate-interior-design' ? 'is-active' : ''}`}
                onClick={closeAllMenus}
                role="menuitem"
              >
                <div className="dropdown-item-header">
                  <span className="dropdown-item-index">03</span>
                  <span className="dropdown-item-title">Corporate Works</span>
                </div>
                <p className="dropdown-item-desc">
                  Offices, executive headquarters & collaborative studios
                </p>
              </Link>
            </div>
          </div>

          {/* <Link
            to="/portfolio"
            className={`nav-desktop-link ${location.pathname === '/portfolio' ? 'on' : ''}`}
            onClick={closeAllMenus}
          >
            Portfolio
          </Link> */}
          <Link
            to="/projects"
            className={`nav-desktop-link ${isProjectsActive ? 'on' : ''}`}
            onClick={closeAllMenus}
          >
            Projects
          </Link>
          <Link
            to="/contact"
            className={`nav-desktop-link ${location.pathname === '/contact' ? 'on' : ''}`}
            onClick={closeAllMenus}
          >
            Contact Us
          </Link>
        </div>

        {/* 2. Mobile Nav Links List */}
        <div className="mobile-nav-links-list">
          <Link
            to="/"
            className={`mobile-nav-link ${location.pathname === '/' ? 'on' : ''}`}
            onClick={closeAllMenus}
          >
            <span>Home</span>
            <span style={{ fontSize: '0.9rem', opacity: 0.5 }}>01</span>
          </Link>

          <Link
            to="/about"
            className={`mobile-nav-link ${location.pathname === '/about' ? 'on' : ''}`}
            onClick={closeAllMenus}
          >
            <span>About Us</span>
            <span style={{ fontSize: '0.9rem', opacity: 0.5 }}>02</span>
          </Link>

          {/* Mobile Services Accordion */}
          <div className="mobile-services-container">
            <button
              type="button"
              className={`mobile-services-toggle ${isServicesActive ? 'is-active' : ''} ${isMobileServicesOpen ? 'is-expanded' : ''}`}
              onClick={() => setIsMobileServicesOpen((prev) => !prev)}
              aria-expanded={isMobileServicesOpen}
              aria-label="Toggle Services List"
            >
              <span>Services</span>
              <div className="mobile-services-arrow" aria-hidden="true">
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 1.5L6 6.5L11 1.5" />
                </svg>
              </div>
            </button>

            <div className={`mobile-services-drawer ${isMobileServicesOpen ? 'is-open' : ''}`}>
              <Link
                to="/services/residential-interior-design"
                className={`mobile-sub-link ${location.pathname === '/services/residential-interior-design' ? 'is-active' : ''}`}
                onClick={closeAllMenus}
              >
                <span className="mobile-sub-title">01 · Residential Works</span>
                <span className="mobile-sub-desc">Luxury villas, penthouses & private residences</span>
              </Link>

              <Link
                to="/services/commercial-interior-design"
                className={`mobile-sub-link ${location.pathname === '/services/commercial-interior-design' ? 'is-active' : ''}`}
                onClick={closeAllMenus}
              >
                <span className="mobile-sub-title">02 · Commercial Works</span>
                <span className="mobile-sub-desc">Showrooms, retail & hospitality venues</span>
              </Link>

              <Link
                to="/services/corporate-interior-design"
                className={`mobile-sub-link ${location.pathname === '/services/corporate-interior-design' ? 'is-active' : ''}`}
                onClick={closeAllMenus}
              >
                <span className="mobile-sub-title">03 · Corporate Works</span>
                <span className="mobile-sub-desc">Executive offices, studios & collaborative suites</span>
              </Link>
            </div>
          </div>

          {/* <Link
            to="/portfolio"
            className={`mobile-nav-link ${location.pathname === '/portfolio' ? 'on' : ''}`}
            onClick={closeAllMenus}
          >
            <span>Portfolio</span>
            <span style={{ fontSize: '0.9rem', opacity: 0.5 }}>04</span>
          </Link> */}

          <Link
            to="/projects"
            className={`mobile-nav-link ${isProjectsActive ? 'on' : ''}`}
            onClick={closeAllMenus}
          >
            <span>Projects</span>
            <span style={{ fontSize: '0.9rem', opacity: 0.5 }}>05</span>
          </Link>

          <Link
            to="/contact"
            className={`mobile-nav-link ${location.pathname === '/contact' ? 'on' : ''}`}
            onClick={closeAllMenus}
          >
            <span>Contact Us</span>
            <span style={{ fontSize: '0.9rem', opacity: 0.5 }}>06</span>
          </Link>
        </div>

        {/* 3. Mobile Nav Drawer Bottom (Primary Action & Contact Details) */}
        <div className="mobile-nav-bottom">
          <Link
            to="/contact"
            className="mobile-nav-cta-btn"
            onClick={closeMenu}
          >
            <span>GET IN TOUCH</span>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor">
              <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          <div className="mobile-nav-meta-grid">
            <div className="mobile-meta-item">
              <span className="mobile-meta-label">DIRECT LINE</span>
              <a href="tel:+918940555526" className="mobile-meta-value">
                +91 89405 55526
              </a>
            </div>

            <div className="mobile-meta-item">
              <span className="mobile-meta-label">WHATSAPP</span>
              <a
                href="https://wa.me/918940555526?text=Hi%20Mitijen%20Interiors%2C%20I%20would%20like%20to%20discuss%20my%20interior%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-meta-value"
              >
                Chat on WhatsApp →
              </a>
            </div>

            <div className="mobile-meta-item">
              <span className="mobile-meta-label">EMAIL</span>
              <a href="mailto:hello@mitijeninteriors.com" className="mobile-meta-value">
                hello@mitijeninteriors.com
              </a>
            </div>

            <div className="mobile-meta-item">
              <span className="mobile-meta-label">STUDIO</span>
              <span className="mobile-meta-value">
                Coimbatore, Tamil Nadu
              </span>
            </div>
          </div>

          {/* Bottom Swipe/Dismiss Pill */}
          <button
            type="button"
            className="mobile-nav-dismiss-pill"
            onClick={closeMenu}
            aria-label="Close navigation menu"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor">
              <path d="M1 1L13 13M1 13L13 1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Close Navigation</span>
          </button>
        </div>
      </nav>

      {/* Right Actions: Desktop Search + Desktop Gold CTA + Mobile Burger */}
      <div className="header-actions-wrap">
        {/* Search trigger button */}


        {/* Desktop Gold CTA Button */}
        <Link
          to="/contact"
          className="header-desktop-cta"
          onClick={closeMenu}
        >
          <span>GET IN TOUCH</span>
          <span className="cta-arrow-circle" aria-hidden="true">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor">
              <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>

        {/* Animated 3-Line Hamburger to X Menu Button */}
        <button
          ref={burgerRef}
          className={`burger ${isMenuOpen ? 'is-open' : ''}`}
          id="bg"
          aria-label={isMenuOpen ? 'Close menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="nav"
          onClick={toggleMenu}
        >
          <span className="burger-box" aria-hidden="true">
            <span className="burger-line burger-line-1" />
            <span className="burger-line burger-line-2" />
            <span className="burger-line burger-line-3" />
          </span>
        </button>
      </div>
    </header>
  );
};
export default Header;
