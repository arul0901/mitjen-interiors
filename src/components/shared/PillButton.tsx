import React from 'react';

export interface PillButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  target?: string;
  rel?: string;
  'aria-label'?: string;
}

export const PillButton: React.FC<PillButtonProps> = ({
  children,
  href,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  target,
  rel,
  'aria-label': ariaLabel,
}) => {
  const arrowSvg = (
    <svg
      className="btn-arrow-icon"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2.5 7H11.5M11.5 7L7 2.5M11.5 7L7 11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const combinedClasses = `bespoke-pill-btn ${className}`.trim();

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
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      aria-label={ariaLabel}
    >
      <span>{children}</span>
      {arrowSvg}
    </button>
  );
};

export default PillButton;
