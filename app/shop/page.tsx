import React from "react";
import ProductCard from "../components/ProductCard";
import Link from "next/link";

import { Product, Category } from "@/types/product";
import { getAllCategories, getAllProducts } from "@/lib/api";

const ShopPage = async () => {
  const products: Product[] = await getAllProducts();
  const categories: Category[] = await getAllCategories();

  return (
    <section className="my-8 px-4 sm:px-8 lg:px-16">
      <h2 className="text-2xl font-light tracking-wide mb-4 text-center">
        Shop
      </h2>
      <div className="flex flex-col gap-4 pb-4">
        <p className="text-xs text-center w-4/5 mx-auto mt-[-8px] font-extralight">
          Discover our curated collection of unique pieces, crafted to bring
          style and elegance to your everyday life. Browse through our latest
          arrivals and find something special just for you.
        </p>
        <div className="w-full flex justify-center gap-6 text-center">
          {categories.map((cat: Category) => (
            <Link
              key={cat._id}
              href={`/shop/category/${cat.slug.current}`}
              className="text-center text-xs font-light hover:underline"
            >
              {cat.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Visa produkter */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </section>
  );
};

export default ShopPage;
