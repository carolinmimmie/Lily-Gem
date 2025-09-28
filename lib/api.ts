import { client } from "@/sanity/lib/client";
import { Product, Category } from "@/types/product";
import { groq } from "next-sanity";

// Fetcha alla produkter
export const getAllProducts = async (): Promise<Product[]> => {
  const products: Product[] = await client.fetch(groq`*[_type=="product"]`);
  return products;
};

// Fetcha alla kategorier
export const getAllCategories = async (): Promise<Category[]> => {
  const categories: Category[] = await client.fetch(
    groq`*[_type=="category"] | order(title asc)`
  );
  return categories;
};

export const getProductsByCategory = async (
  slug: string
): Promise<Product[]> => {
  const query = groq`
    *[_type == "product" && category._ref in *[_type=="category" && slug.current == $slug]._id]{
      ...,
      "category": category->
    }
  `;
  return await client.fetch(query, { slug });
};
