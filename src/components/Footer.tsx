import React from "react";
import { BaseComponentProps } from "../utils";

interface FooterProps extends BaseComponentProps {
  children: React.ReactNode;
}

export default function Footer({ children, isDarkMode }: FooterProps) {
  return (
    <footer
      className={`footer-container ${isDarkMode ? "dark-mode" : "light-mode"}`}
    >
      {children}
    </footer>
  );
}
