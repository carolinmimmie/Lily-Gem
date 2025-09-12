import { Product } from "@/types/product";
import React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface ProductDetailProps {
  product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 px-8 pb-12 pt-26 tracking-widest">
      <div className="relative h-[400px] sm:h-[770px] w-full sm:w-1/2 ">
        <Image
          src={urlFor(product.images && product.images[0]).url()}
          alt={product.name}
          fill
          objectFit="cover"
        ></Image>
      </div>
      <div className="flex flex-col sm:w-1/2 justify-between gap-4">
        <div className="flex flex-col gap-4  sm:gap-10">
          <h4 className="text-xl font-extralight">{product.name}</h4>
          <p className="font-medium">{product.price} kr</p>
          <p className="text-sm font-light ">{product.description}</p>
        </div>

        <div className="flex flex-col gap-22">
          <div className="flex gap-2 items-center text-center justify-center pointer">
            <span>
              <AiOutlineMinus />
            </span>
            <span>0</span>
            <span>
              <AiOutlinePlus />
            </span>
          </div>
          <button className="bg-black text-white px-4 py-2 uppercase font-medium">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
