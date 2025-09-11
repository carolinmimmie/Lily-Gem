import { Product } from "@/types/product";
import React from "react";
import ProductCard from "./ProductCard";
import Section from "./Section";

interface BestsellersProps {
  bestSellingProducts: Product[];
}

const Bestsellers = ({ bestSellingProducts }: BestsellersProps) => {
  return (
    <Section title="Bestsellers">
      {bestSellingProducts.map((product) => (
        <ProductCard product={product} key={product._id}></ProductCard>
      ))}
    </Section>
  );
};

export default Bestsellers;
