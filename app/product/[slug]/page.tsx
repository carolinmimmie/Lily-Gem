import ProductDetail from "@/app/components/ProductDetail";
import { client } from "@/sanity/lib/client";
import { Product } from "@/types/product";
import { groq } from "next-sanity";
import { use } from "react"; // React 18 server component hook som kan “vänta” på Promises
import React from "react";

// Vi definierar server componenten.
// Viktigt: INTE async function, utan vi använder React 18 'use' för async-data.
export default function ProductPage({
  params,
}: {
  // Här deklarerar vi params som en Promise. Next.js App Router skickar props som Promise
  params: Promise<{ slug: string }>;
}) {
  // 'use' löser promisen direkt och ger oss värdet { slug: string }
  const { slug } = use(params);

  // GROQ-query för att hämta produkt från Sanity
  // client.fetch returnerar en Promise, som vi också löser direkt med 'use'
  const query = groq`*[_type == "product" && slug.current == $slug][0]`;
  const product: Product = use(client.fetch(query, { slug }));

  // Returnerar ProductDetail-komponenten med den hämtade produkten
  return (
    <div>
      <ProductDetail product={product} />
    </div>
  );
}
