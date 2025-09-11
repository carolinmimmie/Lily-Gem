import { Product } from "@/types/product";
import React from "react";
import ProductCard from "./ProductCard";
import Section from "./Section";

interface CategoryProductsProps {
  categoryProducts: Product[];
}

const Categories = ({ categoryProducts }: CategoryProductsProps) => {
  return (
    <Section title="Shop after Category">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {categoryProducts.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </Section>
  );
};

export default Categories;
