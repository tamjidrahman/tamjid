import React, { FC, ReactNode } from "react";
import { TransitionLink } from "../ui/utils/TransitionLink";
import Link from "next/link";

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
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseStyles} ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <TransitionLink href={href} className={`${baseStyles} ${className}`}>
      {children}
    </TransitionLink>
  );
};

export default TextLink;
