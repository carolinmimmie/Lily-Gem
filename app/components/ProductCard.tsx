import { Product } from "@/types/product";
import React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="flex flex-col gap-4 flex-1 min-w-[250px]">
      <div className="relative w-full h-[300px]">
        <Image
          src={urlFor(product.images && product.images[0]).url()}
          alt={product.name}
          fill
          objectFit="cover"
        ></Image>
      </div>
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-sm font-extralight tracking-widest">
          {product.name}
        </h3>
        <p className="text-sm font-light tracking-wide">{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
