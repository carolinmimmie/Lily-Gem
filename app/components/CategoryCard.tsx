import React from "react";
import Image from "next/image";
import Section from "./Section";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { Category } from "@/types/product";
interface CategoryCardProps {
  categories: Category[];
}
const CategoryCard = ({ categories }: CategoryCardProps) => {
  return (
    <Section title="Shop by Category">
      {categories.map((cat: Category) => (
        <Link
          key={cat._id}
          href={`/shop/category/${cat.slug.current}`}
          className="flex flex-col gap-4 w-full max-w-[300px] mx-auto"
        >
          <div className="relative w-full h-[380px] sm:h-[480px]">
            <span className="absolute inset-0 z-10 flex items-center justify-center text-white text-3xl font-medium tracking-widest">
              {cat.title}
            </span>
            {cat.categoryImage && (
              <Image
                src={urlFor(cat.categoryImage).url()}
                alt={cat.title}
                fill
                style={{ objectFit: "cover" }}
              />
            )}
          </div>
        </Link>
      ))}
    </Section>
  );
};
export default CategoryCard;
