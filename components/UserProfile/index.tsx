import React from "react";
import AvatarProfile from "../../public/assets/AvatarProfile";

const UserProfile = () => {
  return (
    <div className="flex items-center">
      <div className="w-12 h-12">
        <AvatarProfile className="w-100 h-100" />
      </div>
      <span>Balance: 99USD</span>
    </div>
  );
};

export default UserProfile;
