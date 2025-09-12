import React, { useContext } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import Image from "next/image";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { showCart, setShowCart } = useContext(CartContext);
  const handleClose = () => {
    setShowCart(!showCart);
  };
  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={handleClose}
      ></div>
      <div className="fixed top-0 right-0 h-screen w-[30%] bg-white z-50 flex flex-col gap-6 p-4 ">
        <div className="flex justify-center align-middle gap-2 tracking-widest uppercase text-xs">
          <button onClick={handleClose}>
            <AiOutlineLeft />
          </button>
          <span>Continue Shopping</span>
        </div>
        <div className="relative h-[60px] w-[48px]">
          <Image src="/images/hero1.jpg" alt="" fill></Image>
        </div>
        <div>
          <h3>title</h3>
          <p>price</p>
        </div>
        <div>
          <span>-</span>
          <span>0</span>
          <span>+</span>
        </div>
        <div>
          <p>trashcan</p>
        </div>
        <div>Summa</div>
        <div>
          <button className="bg-black text-white px-4 py-2 uppercase font-medium">
            To checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
