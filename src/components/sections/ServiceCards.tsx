import React from 'react';
import { servicesData } from '../../data/services';
import Reveal from '../shared/Reveal';
import '../../styles/content-sections.css';

export const ServiceCards: React.FC = () => {
  return (
    <section className="bespoke-section-wrapper bespoke-services-section" aria-label="Our Architecture & Interior Services">
      <div className="bespoke-container">
        <div className="bespoke-services-grid">
          {servicesData.map((service, index) => (
            <Reveal key={service.id} staggerIndex={index}>
              <a
                href={service.href || '/portfolio'}
                className="bespoke-service-card group"
                aria-label={`${service.title} - ${service.copy}`}
              >
                {/* Full-bleed Photo */}
                <img
                  src={service.image}
                  alt={service.alt || `${service.title} interior architecture`}
                  className="bespoke-service-card-img"
                  loading="lazy"
                  width="1600"
                  height="1000"
                />

                {/* Left-to-right Taupe Gradient Overlay */}
                <div className="bespoke-service-card-overlay" aria-hidden="true" />

                {/* Bottom-left Content */}
                <div className="bespoke-service-card-content">
                  <h3 className="bespoke-service-card-title">
                    <span>{service.titleLines[0]}</span>
                    <br />
                    <span>{service.titleLines[1]}</span>
                  </h3>

                  <p className="bespoke-service-card-copy">
                    {service.copy}
                  </p>

                  <div className="bespoke-service-card-link" aria-hidden="true">
                    <span>{service.linkText || 'VIEW PROJECTS'}</span>
                    <svg
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
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
