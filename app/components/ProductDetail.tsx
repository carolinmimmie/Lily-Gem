import { Product } from "@/types/product";
import React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface ProductDetailProps {
  product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 pt-11 ">
      <div className="relative h-[600px] w-full sm:w-1/2 ">
        <Image
          src={urlFor(product.images && product.images[0]).url()}
          alt={product.name}
          fill
          objectFit="cover"
        ></Image>
      </div>
      <div className="flex flex-col sm:w-1/2 p-4">
        <h4>{product.name}</h4>
        <p>{product.description}</p>
        <button className="bg-black text-white px-4 py-2">Add to cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;
