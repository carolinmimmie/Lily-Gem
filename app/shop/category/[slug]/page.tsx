import ProductCard from "@/app/components/ProductCard";
import Section from "@/app/components/Section";
import { client } from "@/sanity/lib/client";
import { Product } from "@/types/product";
import { groq } from "next-sanity";
import { use } from "react"; // React 18 server component hook som kan “vänta” på Promises
import React from "react";

// Vi definierar server componenten.
// Viktigt: INTE async function, utan vi använder React 18 'use' för async-data.
export default function CategoryPage({
  params,
}: {
  // Här deklarerar vi params som en Promise. Next.js App Router skickar props som Promise
  params: Promise<{ slug: string }>;
}) {
  // 'use' löser promisen direkt och ger oss värdet { slug: string }
  const { slug } = use(params);

  const query = groq`
*[_type == "product" && category._ref in *[_type=="category" && slug.current == $slug]._id]{
  ...,
  "category": category->   // här “->” gör att hela category-objektet hämtas
}
`;

  const products: Product[] = use(client.fetch(query, { slug }));
  const title = products[0]?.category.title;
  console.log(title);

  return (
    <Section title={title}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </Section>
  );
}
