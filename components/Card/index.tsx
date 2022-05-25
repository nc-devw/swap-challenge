import React, { ReactNode } from "react";

const Card = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={`rounded-lg m-12 border shadow bg-white ${className}`}>
      {children}
    </div>
  );
};

export default Card;
