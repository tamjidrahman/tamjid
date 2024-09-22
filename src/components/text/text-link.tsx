import React, { FC, ReactNode } from "react";

interface TextLinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}

const TextLink: FC<TextLinkProps> = ({
  href,
  children,
  external = false,
  className = "",
}) => {
  const baseStyles = "text-accent hover:underline"; // Define your base styles here

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseStyles} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <a href={href} className={`${baseStyles} ${className}`}>
      {children}
    </a>
  );
};

export default TextLink;
