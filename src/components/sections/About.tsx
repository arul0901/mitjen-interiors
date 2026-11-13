import React from 'react';
import { Compass, Heart } from 'lucide-react';
import { aboutData } from '../../data/services';
import Reveal from '../shared/Reveal';
import '../../styles/content-sections.css';

export const AboutSection: React.FC = () => {
  const { eyebrow, title, description, features, leadImage, leadImageAlt, stats } = aboutData;

  const renderIcon = (iconType: string) => {
    if (iconType === 'heart') {
      return <Heart size={20} strokeWidth={1.5} aria-hidden="true" />;
    }
    return <Compass size={20} strokeWidth={1.5} aria-hidden="true" />;
  };

  return (
    <section className="bespoke-section-wrapper bespoke-about-section" aria-labelledby="about-bespoke-title">
      <div className="bespoke-container">
        <Reveal staggerIndex={0}>
          <div className="bespoke-panel">
            <div className="bespoke-about-grid">
              {/* Left Column: Heading, Description, Studio Stats & Flush Baseline Photo */}
              <div
                className="bespoke-about-intro-col"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <div>
                  <span className="bespoke-eyebrow">{eyebrow}</span>
                  <h2 id="about-bespoke-title" className="bespoke-h2">
                    {title}
                  </h2>
                  <p className="bespoke-desc">
                    {description}
                  </p>

                  {/* Studio Stats Strip to balance content density */}
                  {stats && stats.length > 0 && (
                    <div className="bespoke-about-stats-strip">
                      {stats.map((s) => (
                        <div key={s.label} className="bespoke-stat-mini">
                          <span className="stat-mini-val">{s.value}</span>
                          <span className="stat-mini-label">{s.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Editorial Photo on Desktop that expands to match cards baseline exactly */}
                {leadImage && (
                  <div className="bespoke-about-lead-img-wrap">
                    <img
                      src={leadImage}
                      alt={leadImageAlt || 'Bespoke architecture interior living space'}
                      className="bespoke-about-lead-img"
                      loading="lazy"
                      width="600"
                      height="338"
                    />
                    <div className="bespoke-about-lead-tag" aria-hidden="true">
                      <span>ARCHITECTURAL DISCIPLINE</span>
                      <span>•</span>
                      <span>EST. 2010</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Two Feature Cards: Enriched with Highlights and Tags to fill empty space */}
              {features.map((feature, index) => (
                <Reveal key={feature.id} staggerIndex={index + 1} className="h-full">
                  <a
                    href={feature.href || '/services'}
                    className="bespoke-card bespoke-about-card group"
                    aria-label={`${feature.title} - ${feature.copy}`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                    }}
                  >
                    <div>
                      {/* Photo Header with Floating Frosted Icon Badge */}
                      <div className="bespoke-about-card-img-wrap">
                        <img
                          src={feature.image}
                          alt={feature.alt || `${feature.title} interior space`}
                          className="bespoke-about-card-img"
                          loading="lazy"
                          width="600"
                          height="375"
                        />
                        <div className="bespoke-about-card-badge" aria-hidden="true">
                          {renderIcon(feature.icon)}
                        </div>
                      </div>

                      <h3 className="bespoke-card-title">{feature.title}</h3>
                      <p className="bespoke-card-copy">{feature.copy}</p>

                      {/* 3-Point Architectural Feature Checklist to eliminate empty space */}
                      {feature.highlights && feature.highlights.length > 0 && (
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
                      )}

                      {/* Pill Tags Row */}
                      {feature.tags && feature.tags.length > 0 && (
                        <div className="bespoke-card-tag-row">
                          {feature.tags.map((tag) => (
                            <span key={tag} className="bespoke-card-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Integrated Footer with Divider */}
                    <div className="bespoke-card-footer">
                      <span className="bespoke-arrow-link" aria-hidden="true">
                        <span>{feature.linkText}</span>
                        <svg
                          className="arrow-icon"
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 6H10M10 6L6.5 2.5M10 6L6.5 9.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </a>
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
