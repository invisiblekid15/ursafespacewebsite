import React from 'react';
import Container from './Container';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  background?: 'default' | 'light' | 'secondary';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  containerMaxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const Section: React.FC<SectionProps> = ({
  children,
  id,
  className = '',
  background = 'default',
  padding = 'lg',
  containerMaxWidth = 'xl'
}) => {
  const backgroundClasses = {
    default: 'bg-[rgb(252,250,247)]',
    light: 'bg-white',
    secondary: 'bg-[rgb(141,105,89)] text-[rgb(252,250,247)]'
  };

  const sectionClasses = `${backgroundClasses[background]} ${className}`.trim();

  return (
    <section id={id} className={sectionClasses}>
      <Container maxWidth={containerMaxWidth} padding={padding}>
        {children}
      </Container>
    </section>
  );
};

export default Section;
