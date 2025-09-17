import { Product } from "@/types/product";
import React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      href={`/product/${product.slug.current}`}
      className="flex flex-col gap-4 flex-1 min-w-[382px]"
    >
      <div className="relative w-full h-[400px]">
        <Image
          priority
          src={urlFor(product.images && product.images[0]).url()}
          alt={product.name}
          fill
          objectFit="cover"
        ></Image>
      </div>
      <div className="flex flex-col items-left gap-2">
        <h3 className="text-xs font-extralight tracking-widest">
          {product.name}
        </h3>
        <p className="text-xs font-light tracking-wide">{product.price} kr</p>
      </div>
    </Link>
  );
};

export default ProductCard;
