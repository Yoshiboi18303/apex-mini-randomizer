import React from "react";

interface BannerProps {
  message: string;
  isDarkMode: boolean;
  children?: React.ReactNode | null;
}

export default function Banner({
  message,
  isDarkMode,
  children = null,
}: BannerProps): JSX.Element {
  return (
    <div
      className={`banner-container ${isDarkMode ? "dark-mode" : "light-mode"}`}
    >
      <h3 className="description">{message}</h3>
      {children && <>{children}</>}
    </div>
  );
}
