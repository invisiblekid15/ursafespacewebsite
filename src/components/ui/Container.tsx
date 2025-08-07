import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  maxWidth = 'xl',
  padding = 'md'
}) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    '2xl': 'max-w-7xl',
    full: 'max-w-full'
  };

  const paddingClasses = {
    none: '',
    sm: 'px-4 py-8',
    md: 'px-6 py-12 lg:px-8',
    lg: 'px-8 py-16 lg:px-12',
    xl: 'px-8 py-20 lg:px-16'
  };

  const classes = `mx-auto ${maxWidthClasses[maxWidth]} ${paddingClasses[padding]} ${className}`.trim();

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Container;
