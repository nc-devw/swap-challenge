import React from "react";

import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/assets/logo.png";

const Header = () => {
  return (
    <div className="py-4 px-12 shadow bg-white">
      <div className="flex text-white font-semibold items-center text-neutral-900">
        <div className="flex-[1] flex">
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <Image
              src={Logo}
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
            />
          </div>
          <span className="ml-2">Belo Challenge</span>
        </div>
        <div className="flex-[4] flex gap-5">
          <Link href="/">Home</Link>
          <Link href="/swap">Swap</Link>
          <Link href="/swap-status">Swap Status</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
