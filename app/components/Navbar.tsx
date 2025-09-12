import Link from "next/link";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";

export const Navbar = () => {
  return (
    <nav className="w-full h-[70px] uppercase bg-white z-30 fixed shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className=" h-full flex justify-between items-center px-12 ">
        <Link href="/shop" className="text-[14px] font-light tracking-widest">
          Shop
        </Link>
        <Link
          href="/"
          className="text-xl md:text-3xl font-bold tracking-widest"
        >
          Lily Gem
        </Link>
        <button className="relative text-[26px] cursor-pointer">
          <AiOutlineShopping />
          <span className="absolute text-[11px] top-0 right-[-8px] bg-neutral-950 text-white w-[16px] h-[16px] rounded-3xl text-center font-bold">
            0
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
