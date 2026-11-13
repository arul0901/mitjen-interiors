import React from 'react';
import { Compass, Heart } from 'lucide-react';
import { aboutData } from '../../data/services';
import Reveal from '../shared/Reveal';
import ArrowLink from '../shared/ArrowLink';
import '../../styles/content-sections.css';

export const AboutSection: React.FC = () => {
  const { eyebrow, title, description, features } = aboutData;

  const renderIcon = (iconType: string) => {
    if (iconType === 'heart') {
      return <Heart size={24} strokeWidth={1.5} aria-hidden="true" />;
    }
    // 'line' / precision design icon
    return <Compass size={24} strokeWidth={1.5} aria-hidden="true" />;
  };

  return (
    <section className="bespoke-section-wrapper" aria-labelledby="about-bespoke-title">
      <div className="bespoke-container">
        <Reveal staggerIndex={0}>
          <div className="bespoke-panel p-6 sm:p-10" style={{ padding: 'clamp(24px, 4vw, 40px)' }}>
            <div className="bespoke-about-grid">
              {/* Left Column: Heading & Description */}
              <div className="flex flex-col justify-between" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span className="bespoke-eyebrow">{eyebrow}</span>
                  <h2 id="about-bespoke-title" className="bespoke-h2">
                    {title}
                  </h2>
                </div>
                <p className="bespoke-desc">
                  {description}
                </p>
              </div>

              {/* Two Feature Cards */}
              {features.map((feature, index) => (
                <Reveal key={feature.id} staggerIndex={index + 1} className="h-full">
                  <a
                    href={feature.href || '#'}
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
                      <div className="bespoke-icon-circle">
                        {renderIcon(feature.icon)}
                      </div>
                      <h3 className="bespoke-card-title">{feature.title}</h3>
                      <p className="bespoke-card-copy">{feature.copy}</p>
                    </div>

                    <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
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
