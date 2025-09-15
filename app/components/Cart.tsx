import React, { useContext } from "react";
import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi2";
import Image from "next/image";
import { CartContext } from "../context/CartContext";
import { urlFor } from "@/sanity/lib/image";

const Cart = () => {
  const {
    showCart,
    setShowCart,
    cartItems,
    totalPrice,
    toggleCartItemQuantity,
    removeItemFromCart,
  } = useContext(CartContext);

  const handleClose = () => {
    setShowCart(!showCart);
  };
  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={handleClose}
      ></div>
      <div className="fixed top-0 right-0 h-screen w-full sm:w-[30%] bg-white z-50 flex flex-col gap-6 tracking-widest">
        <div className=" border-b border-gray-300">
          <div className="p-4 flex justify-center align-middle gap-2 uppercase text-xs">
            <button onClick={handleClose} className="text-[14px]">
              <AiOutlineLeft />
            </button>
            <span>Continue Shopping</span>
          </div>
        </div>

        {/* mappar våra cartitems */}

        {cartItems.map((cartitem) => (
          <div key={cartitem.product._id} className="border-b border-gray-300">
            <div className="flex gap-4 p-4 justify-between">
              <div className="relative h-[60px] w-[48px]">
                <Image
                  src={urlFor(
                    cartitem.product.images && cartitem.product.images[0]
                  ).url()}
                  alt=""
                  fill
                ></Image>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-xs font-extralight">
                  {cartitem.product.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {cartitem.product.price} kr
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center justify-center pointer text-[14px] gap-6 mt-auto">
                  <span
                    onClick={() =>
                      toggleCartItemQuantity(cartitem.product._id, "minus")
                    }
                  >
                    <AiOutlineMinus />
                  </span>
                  <span>{cartitem.quantity}</span>
                  <span
                    className="text-[14px]"
                    onClick={() =>
                      toggleCartItemQuantity(cartitem.product._id, "plus")
                    }
                  >
                    <AiOutlinePlus />
                  </span>
                  <button
                    onClick={() => {
                      removeItemFromCart(cartitem);
                    }}
                  >
                    <HiOutlineTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {cartItems.length > 0 && (
          <div className="flex flex-col gap-4 p-4 border-t border-gray-300 text-center mt-auto">
            <div>Amount: {totalPrice} kr</div>
            <div>
              <button className="bg-black text-white px-4 py-2 uppercase font-medium w-full">
                To checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
