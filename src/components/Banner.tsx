import React from "react";

interface BannerProps {
  message: string;
  children?: React.ReactNode | null;
}

export default function Banner({
  message,
  children = null,
}: BannerProps): JSX.Element {
  return (
    <div className={`banner-container`}>
      <h3 className="description">{message}</h3>
      {children && <>{children}</>}
    </div>
  );
}
