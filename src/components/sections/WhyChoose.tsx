import React from 'react';
import { whyChooseData, WhyChooseItem } from '../../data/whyChoose';
import Reveal from '../shared/Reveal';
import '../../styles/content-sections.css';

const renderIcon = (type: WhyChooseItem['iconType']) => {
  switch (type) {
    case 'expertise':
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      );
    case 'design':
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      );
    case 'process':
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m12 2 10 5.5-10 5.5L2 7.5z" />
          <path d="m2 12.5 10 5.5 10-5.5" />
          <path d="m2 17.5 10 5.5 10-5.5" />
        </svg>
      );
    case 'quality':
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case 'communication':
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 10h.01" />
          <path d="M12 10h.01" />
          <path d="M16 10h.01" />
        </svg>
      );
    case 'team':
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
  }
};

export const WhyChooseSection: React.FC = () => {
  return (
    <section
      className="bespoke-section-wrapper bespoke-why-choose-section"
      aria-label="Why Choose Mitjen"
    >
      <div className="bespoke-container">
        {/* Section Header */}
        <Reveal staggerIndex={0}>
          <div className="bespoke-why-choose-header">
            <div className="bespoke-why-choose-kicker">
              <span className="bespoke-why-choose-kicker-dot" aria-hidden="true" />
              <span>WHY CHOOSE MITJEN</span>
            </div>
            <h2 className="bespoke-why-choose-title">
              <span>What Makes Mitjen Interiors Different?</span>
            </h2>
            <p className="bespoke-why-choose-subtitle">
              Every interior project comes with its own needs and expectations. At Mitjen Interiors, we bring experience, thoughtful planning and careful execution together to create spaces that work for the people who use them.
            </p>
          </div>
        </Reveal>

        {/* 6-Card Grid */}
        <div className="bespoke-why-choose-grid">
          {whyChooseData.map((item, index) => (
            <Reveal key={item.id} staggerIndex={index + 1}>
              <div className="bespoke-why-choose-card">
                {/* Card Top Row: Icon + Tag + Index */}
                <div className="bespoke-why-choose-card-top">
                  <div className="bespoke-why-choose-icon-badge">
                    {renderIcon(item.iconType)}
                  </div>
                  <div className="bespoke-why-choose-card-meta">
                    <span className="bespoke-why-choose-tag">{item.tag}</span>
                    <span className="bespoke-why-choose-num">{item.index}</span>
                  </div>
                </div>

                {/* Card Content */}
                <h3 className="bespoke-why-choose-card-title">{item.title}</h3>
                <p className="bespoke-why-choose-card-text">{item.subtitle}</p>

                {/* Subtle bottom accent line on hover */}
                <div className="bespoke-why-choose-card-accent" aria-hidden="true" />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom Architectural Summary Bar */}
        <Reveal staggerIndex={7}>
          <div className="bespoke-why-choose-footer-banner">
            <div className="bespoke-why-choose-footer-text">
              <span className="bespoke-why-choose-footer-quote-mark" aria-hidden="true">
                “
              </span>
              <p className="bespoke-why-choose-footer-quote">
                Every space has a purpose. Our approach is to understand it, plan it thoughtfully and bring the design to life with care.
              </p>
            </div>
            <a
              href="/#approach"
              className="bespoke-why-choose-btn"
              aria-label="Explore our interior design approach"
            >
              <span>EXPLORE OUR APPROACH</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default WhyChooseSection;
