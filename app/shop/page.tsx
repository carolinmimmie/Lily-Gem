import { client } from "@/sanity/lib/client";
import { Product } from "@/types/product";
import { groq } from "next-sanity";
import React from "react";
import ProductCard from "../components/ProductCard";

const ShopPage = async () => {
  const products: Product[] = await client.fetch(groq`*[_type=="product"]`);
  console.log(products);
  return (
    <div className="px-8 pb-12 pt-26 tracking-widest flex flex-col gap-6">
      <h2 className="text-2xl font-light tracking-wide text-center">Shop</h2>
      <p className="text-xs text-center w-4/5 mx-auto">
        Discover our curated collection of unique pieces, crafted to bring style
        and elegance to your everyday life. Browse through our latest arrivals
        and find something special just for you.
      </p>
      <div className="flex flex-wrap gap-4">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
