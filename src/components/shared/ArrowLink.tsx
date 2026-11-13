import React from 'react';

export interface ArrowLinkProps {
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  className?: string;
  target?: string;
  rel?: string;
  'aria-label'?: string;
}

export const ArrowLink: React.FC<ArrowLinkProps> = ({
  children,
  href,
  onClick,
  className = '',
  target,
  rel,
  'aria-label': ariaLabel,
}) => {
  const arrowSvg = (
    <svg
      className="arrow-icon"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2 6H10M10 6L6.5 2.5M10 6L6.5 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const combinedClasses = `bespoke-arrow-link ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={combinedClasses}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
      >
        <span>{children}</span>
        {arrowSvg}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={combinedClasses}
      aria-label={ariaLabel}
    >
      <span>{children}</span>
      {arrowSvg}
    </button>
  );
};

export default ArrowLink;
