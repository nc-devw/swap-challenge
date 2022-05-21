import React, { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => {
  return <div className="w-100 rounded-lg m-12 shadow">{children}</div>;
};

export default Card;
