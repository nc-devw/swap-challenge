import React from "react";
import AccountBalanceWallet from "../../public/assets/AccountBalanceWallet";

const UserProfile = () => {
  return (
    <div className="flex items-center">
      <div>
        <AccountBalanceWallet className="w-6 h-6" />
      </div>
      <span>Balance: 99USD</span>
    </div>
  );
};

export default UserProfile;
