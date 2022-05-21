import React from "react";
import UserProfile from "../UserProfile";

import Link from "next/link";

const Header = () => {
  return (
    <div className="py-4 px-12 shadow">
      <div className="flex text-white font-semibold items-center text-neutral-900">
        <div className="flex-[1]">Exchange App</div>
        <div className="flex-[4] flex gap-5">
          <Link href="/">Home</Link>
          <Link href="/swap">Swap</Link>
          <Link href="/swap-status">Swap Status</Link>
        </div>
        <div className="flex-[1] justify-end">
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default Header;
