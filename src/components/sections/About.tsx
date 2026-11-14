import React from 'react';
import { Compass, Heart } from 'lucide-react';
import { aboutData } from '../../data/services';
import Reveal from '../shared/Reveal';
import '../../styles/content-sections.css';

export const AboutSection: React.FC = () => {
  const { eyebrow, title, description, leftPicture, leftPictureAlt, leftPictureBadge, features } = aboutData;

  const renderIcon = (iconType: string) => {
    if (iconType === 'heart') {
      return <Heart size={24} strokeWidth={1.5} aria-hidden="true" />;
    }
    return <Compass size={24} strokeWidth={1.5} aria-hidden="true" />;
  };

  return (
    <section className="bespoke-section-wrapper bespoke-about-section" aria-labelledby="about-bespoke-title">
      <div className="bespoke-container">
        <Reveal staggerIndex={0}>
          <div className="bespoke-panel">
            <div className="bespoke-about-grid">
              {/* Left Column: Heading, Description & Left Side Picture ONLY */}
              <div className="bespoke-about-left-col">
                <div>
                  <span className="bespoke-eyebrow">{eyebrow}</span>
                  <h2 id="about-bespoke-title" className="bespoke-h2">
                    {title}
                  </h2>
                  <p className="bespoke-desc">
                    {description}
                  </p>
                </div>

                {/* Picture on Left Side ONLY: Anchors to flush baseline with adjacent cards */}
                <div className="bespoke-about-left-photo-wrap">
                  <img
                    src={leftPicture}
                    alt={leftPictureAlt || 'Mitjen Interiors bespoke living space'}
                    className="bespoke-about-left-photo"
                    loading="lazy"
                    width="600"
                    height="400"
                  />
                  <div className="bespoke-about-photo-badge" aria-hidden="true">
                    <span>{leftPictureBadge}</span>
                  </div>
                </div>
              </div>

              {/* Right Side Feature Cards: Clean, Rich, NO Pictures, Zero Empty Space */}
              {features.map((feature, index) => (
                <Reveal key={feature.id} staggerIndex={index + 1} className="h-full">
                  <div
                    className="bespoke-about-card"
                    aria-label={`${feature.title} - ${feature.copy}`}
                  >
                    <div>
                      {/* Responsive Card Header: Compact & Aligned */}
                      <div className="bespoke-card-header">
                        <div className="bespoke-icon-circle" aria-hidden="true">
                          {renderIcon(feature.icon)}
                        </div>
                        <div className="bespoke-card-title-group">
                          <span className="bespoke-eyebrow" style={{ fontSize: '10px', marginBottom: '2px', display: 'block' }}>
                            {feature.subtitle}
                          </span>
                          <h3 className="bespoke-card-title">{feature.title}</h3>
                        </div>
                      </div>

                      <p className="bespoke-card-copy">{feature.copy}</p>

                      {/* 3-Point Architectural Feature Checklist */}
                      <ul className="bespoke-card-feature-list">
                        {feature.highlights.map((h) => (
                          <li key={h} className="bespoke-card-feature-item">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              <path
                                d="M2.5 7.5L5.5 10.5L11.5 3.5"
                                stroke="var(--accent)"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Pill Tags Row */}
                      <div className="bespoke-card-tag-row">
                        {feature.tags.map((tag) => (
                          <span key={tag} className="bespoke-card-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Integrated Action Footer with Balanced Luxury Button Group */}
                    <div className="bespoke-card-footer">
                      <div className="bespoke-card-btn-row">
                        <a
                          href={feature.href}
                          className="bespoke-card-sub-btn"
                          aria-label={`Explore ${feature.title}`}
                        >
                          <span>{feature.linkText}</span>
                        </a>
                        {feature.secondaryLinkText && (
                          <a
                            href={feature.secondaryHref}
                            className="bespoke-card-sub-btn bespoke-card-sub-btn-dark"
                            aria-label={`View ${feature.secondaryLinkText}`}
                          >
                            <span>{feature.secondaryLinkText}</span>
                          </a>
                        )}
                      </div>
                      {feature.accentLinkText && (
                        <a
                          href={feature.accentHref}
                          className="bespoke-card-cta-btn"
                          aria-label="Connect now with Mitjen Interiors"
                        >
                          <span>{feature.accentLinkText}</span>
                          <span className="bespoke-card-cta-arrow" aria-hidden="true">
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default AboutSection;
