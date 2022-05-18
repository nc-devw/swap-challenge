import React from "react";
import UserProfile from "../UserProfile";

const Header = () => {
  return (
    <div className="bg-blue-600 py-4 px-12">
      <div className="flex text-white font-semibold items-center">
        <div className="flex-[1]">Exchange App</div>
        <div className="flex-[4] flex gap-5">
          <div>Home</div>
          <div>Swap</div>
          <div>Swap Status</div>
        </div>
        <div className="flex-[1] justify-end">
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default Header;
