import ProductDetail from "@/app/components/ProductDetail";
import { client } from "@/sanity/lib/client";
import { Product } from "@/types/product";
import { groq } from "next-sanity";
import React from "react";

// Async server component
export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const query = groq`*[_type == "product" && slug.current == $slug][0]`;
  const product: Product = await client.fetch(query, { slug: params.slug });

  return (
    <div>
      <ProductDetail product={product} />
    </div>
  );
}
