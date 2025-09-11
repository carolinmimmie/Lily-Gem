import React from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { urlFor } from "@/sanity/lib/image";

interface ProductsProps {
  products: Product[];
}

const Products = ({ products }: ProductsProps) => {
  return (
    <section className="w-full">
      <h2>Bestsellers</h2>
      <div className="flex bg-amber-500">
        {products.map((product) => (
          <div key={product._id}>
            <div className="">
              {/* Om product.images finns och det finns minst en bild, använd den
              första bilden. */}
              <Image
                src={urlFor(product.images && product.images[0]).url()}
                alt={product.name}
                height={100}
                width={100}
                className="object-cover"
              ></Image>
            </div>
            <div className="">
              <h2>{product.name}</h2>
              <p>{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
