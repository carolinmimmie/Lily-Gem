// app/shop/category/[slug]/page.tsx
import ProductCard from "@/app/components/ProductCard";
import Section from "@/app/components/Section";
import { getProductsByCategory } from "@/lib/api";
import { Product } from "@/types/product";
import { use } from "react";
import React from "react";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Hämta slug från params
  const { slug } = use(params);

  // Anropa service-funktion istället för att skriva query direkt
  const products: Product[] = use(getProductsByCategory(slug));

  // Hämta titel från första produktens kategori
  const title = products[0]?.category.title ?? "Products";

  return (
    <Section title={title}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </Section>
  );
}
