"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";

import Cart from "./Cart";
import { CartContext } from "../context/CartContext";
import SearchModal from "./SearchModal";
import { Product } from "@/types/product";

interface NavBarProps {
  products: Product[];
}

export const Navbar = ({ products }: NavBarProps) => {
  //Kalla på contextet
  const {
    showCart,
    setShowCart,
    totalQuantity,
    showSearchModal,
    setShowSearchModal,
  } = useContext(CartContext);

  const handleCartOpen = () => {
    setShowCart(!showCart);
    console.log(setShowCart);
  };

  const handleSearchModalOpen = () => {
    setShowSearchModal(!showSearchModal);
  };

  return (
    <>
      <nav className="w-full h-[70px] uppercase bg-gray-50 border-t border-gray-200">
        <div className=" h-full flex justify-between items-center px-12 ">
          <Link href="/shop" className="text-[14px] font-light tracking-widest">
            Shop
          </Link>
          {/* <Link href="/admin">Admin</Link> */}
          <Link
            href="/"
            className="text-xl md:text-3xl font-bold tracking-widest"
          >
            Lily Gem
          </Link>
          <div className="flex gap-4">
            <button onClick={handleSearchModalOpen}>
              <CiSearch className="text-[26px] cursor-pointer" />
            </button>
            <button
              className="relative text-[26px] cursor-pointer"
              onClick={handleCartOpen}
            >
              <AiOutlineShopping />
              <span className="absolute text-[11px] top-0 right-[-8px] bg-neutral-950 text-white w-[16px] h-[16px] rounded-3xl text-center font-bold">
                {totalQuantity}
              </span>
            </button>
          </div>
        </div>
      </nav>
      {showCart && <Cart />}
      {showSearchModal && <SearchModal products={products} />}
    </>
  );
};

export default Navbar;
