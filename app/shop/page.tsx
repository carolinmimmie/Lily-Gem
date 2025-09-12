import { client } from "@/sanity/lib/client";
import { Category, Product } from "@/types/product";
import { groq } from "next-sanity";
import React from "react";
import ProductCard from "../components/ProductCard";
import Section from "../components/Section";
import Link from "next/link";

const ShopPage = async () => {
  const products: Product[] = await client.fetch(groq`*[_type=="product"]`);
  console.log(products);
  // Fetcha alla kategorier
  const categories = await client.fetch(
    groq`*[_type=="category"] | order(title asc)`
  );
  return (
    <Section title="Shop">
      <p className="text-xs text-center w-4/5 mx-auto mt-[-8px] font-extralight">
        Discover our curated collection of unique pieces, crafted to bring style
        and elegance to your everyday life. Browse through our latest arrivals
        and find something special just for you.
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
      {/* Visa kategorier */}
      <div className="flex gap-4 justify-center flex-wrap mb-6"></div>
      {products.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </Section>
  );
};

export default ShopPage;
