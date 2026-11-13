import React from 'react';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  eyebrowClassName?: string;
  align?: 'left' | 'center' | 'right';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  className = '',
  titleClassName = '',
  eyebrowClassName = '',
  align = 'left',
}) => {
  const alignmentClass =
    align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';

  return (
    <div className={`bespoke-section-heading ${alignmentClass} ${className}`.trim()}>
      {eyebrow && (
        <span className={`bespoke-eyebrow ${eyebrowClassName}`.trim()}>
          {eyebrow}
        </span>
      )}
      <h2 className={`bespoke-h2 ${titleClassName}`.trim()}>{title}</h2>
      {description && <p className="bespoke-desc">{description}</p>}
    </div>
  );
};

export default SectionHeading;

