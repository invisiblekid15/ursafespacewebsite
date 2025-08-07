import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  style = {},
  ...props
}) => {
  const baseClasses =
    "font-medium transition-all duration-300 ease-in-out rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-[rgb(142,152,103)] text-[rgb(252,250,247)] border-transparent hover:bg-[rgb(141,105,89)] hover:transform hover:-translate-y-0.5 hover:shadow-lg focus:ring-[rgb(142,152,103)]",
    secondary:
      "bg-[rgb(141,105,89)] text-[rgb(252,250,247)] border-transparent hover:bg-[rgb(13,5,3)] hover:transform hover:-translate-y-0.5 hover:shadow-lg focus:ring-[rgb(141,105,89)]",
    outline:
      "bg-transparent text-[rgb(13,5,3)] border-[rgb(141,105,89)] hover:bg-[rgb(141,105,89)] hover:text-[rgb(252,250,247)] focus:ring-[rgb(141,105,89)]",
  };

  // Default padding only if no inline styles are provided
  const defaultPadding = {
    sm: {
      paddingTop: "0.375rem",
      paddingBottom: "0.375rem",
      paddingLeft: "0.75rem",
      paddingRight: "0.75rem",
    },
    md: {
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
      paddingLeft: "1rem",
      paddingRight: "1rem",
    },
    lg: {
      paddingTop: "0.75rem",
      paddingBottom: "0.75rem",
      paddingLeft: "1.5rem",
      paddingRight: "1.5rem",
    },
  };

  const buttonStyle = {
    fontFamily:
      'var(--font-nunito), "Nunito", "Nunito Placeholder", sans-serif',
    ...defaultPadding[size],
    ...style, // This will override default padding if provided
  };

  const classes =
    `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  return (
    <button className={classes} style={buttonStyle} {...props}>
      {children}
    </button>
  );
};

export default Button;
