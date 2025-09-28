// app/shop/category/[slug]/page.tsx
import ProductCard from "@/app/components/ProductCard";
import Section from "@/app/components/Section";
import { getProductsByCategory } from "@/lib/api";
import { Product } from "@/types/product";
import React from "react";

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  // plocka ut slug direkt
  const { slug } = params;

  // vänta in data
  const products: Product[] = await getProductsByCategory(slug);

  // titel från första produktens kategori
  const title = products[0]?.category.title ?? "Products";

  return (
    <Section title={title}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </Section>
  );
}
