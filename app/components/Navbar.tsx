"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";
import { CartContext } from "../context/CartContext";

export const Navbar = () => {
  //Kalla på contextet
  const { showCart, setShowCart } = useContext(CartContext);

  const handleOpen = () => {
    setShowCart(!showCart);
    console.log(setShowCart);
  };
  return (
    <>
      <nav className="w-full h-[70px] uppercase bg-gray-50 border-t border-gray-200">
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
          <button
            className="relative text-[26px] cursor-pointer"
            onClick={handleOpen}
          >
            <AiOutlineShopping />
            <span className="absolute text-[11px] top-0 right-[-8px] bg-neutral-950 text-white w-[16px] h-[16px] rounded-3xl text-center font-bold">
              0
            </span>
          </button>
        </div>
      </nav>
      {showCart && <Cart />}
    </>
  );
};

export default Navbar;
