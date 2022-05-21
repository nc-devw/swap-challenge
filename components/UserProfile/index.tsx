import React from "react";
import AccountBalanceWallet from "../../public/assets/icons/AccountBalanceWallet";

const UserProfile = () => {
  return (
    <div className="flex items-center">
      <div>
        <AccountBalanceWallet className="w-6 h-6" />
      </div>
      <span className="text-sm">99 USD</span>
    </div>
  );
};

export default UserProfile;
