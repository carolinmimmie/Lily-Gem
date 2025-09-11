import { Product } from "@/types/product";
import React from "react";
import ProductCard from "./ProductCard";
import Section from "./Section";

interface NewsProps {
  newsProducts: Product[];
}

const News = ({ newsProducts }: NewsProps) => {
  return (
    <Section title="News">
      {newsProducts.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </Section>
  );
};

export default News;
