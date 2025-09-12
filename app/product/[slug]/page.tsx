import ProductDetail from "@/app/components/ProductDetail";
import { client } from "@/sanity/lib/client";
import { Product } from "@/types/product";
import { groq } from "next-sanity";
import { use } from "react";
import React from "react";

// Nu är params deklarerat som Promise
export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // use löser promisen direkt
  const { slug } = use(params);

  // Hämtar produkten från Sanity
  const query = groq`*[_type == "product" && slug.current == $slug][0]`;
  const product: Product = use(client.fetch(query, { slug }));

  return (
    <div>
      <ProductDetail product={product} />
    </div>
  );
}
