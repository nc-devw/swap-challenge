import React from "react";
import Image from "next/image";

interface IcronWrapperProps {
  className: string;
  src: string;
  alt: string;
}

const IconWrapper = ({ className, src, alt }: IcronWrapperProps) => {
  return (
    <div className={className}>
      <Image src={src} alt={alt} width="100%" height="100%" />
    </div>
  );
};

export default IconWrapper;
