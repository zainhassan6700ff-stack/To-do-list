import { UserRoundCheck } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-[#415E72]">
      <div className="container py-6 px-4 flex items-center justify-between">
        <h1 className="text-white font-semibold text-[32px] leading-[42px]">
          React CRUD
        </h1>
        <div className="flex flex-row justify-between items-center gap-4">
          <div className="border-[2px] border-white w-[34px] h-[34px] rounded-full bg-[#17313E] flex items-center justify-center">
            <UserRoundCheck size={20} color="white" />
          </div>
          <Link to="/signupForm">
            <button className="text-white font-semibold text-[20px] leading-[24px]">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
