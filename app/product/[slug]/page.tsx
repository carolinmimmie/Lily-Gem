import ProductDetail from "@/app/components/ProductDetail";
import { client } from "@/sanity/lib/client";
import { Product } from "@/types/product";
import { groq } from "next-sanity";
import React from "react";

// Vi definierar en typ för props som sidan får av Next.js.
// 'params' är ett objekt, och i detta fall innehåller det en egenskap 'slug' som är en sträng.
interface ProductPageProps {
  params: {
    slug: string;
  };
}

// Next.js anropar denna funktion och skickar in params-objektet automatiskt.
const ProductPage = async ({ params }: ProductPageProps) => {
  // GROQ-fråga: hämta en produkt från Sanity där slug.current matchar den slug som finns i URL:en.
  const query = groq`*[_type == "product" && slug.current == $slug][0]`;

  // Hämta produkten från Sanity och spara den i 'product'.
  // Vi skickar med params.slug som värdet för variabeln $slug i frågan.
  const product: Product = await client.fetch(query, { slug: params.slug });
  console.log(product);

  // Rendera ProductDetail-komponenten med den hämtade produkten.
  return (
    <div>
      <ProductDetail product={product} />
    </div>
  );
};

export default ProductPage;
