import Section from "./Section";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

interface LeavingSoonProps {
  leavingSoonProducts: Product[];
}

const LeavingSoon = ({ leavingSoonProducts }: LeavingSoonProps) => {
  return (
    <Section title="Leaving Soon">
      {leavingSoonProducts.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </Section>
  );
};

export default LeavingSoon;
