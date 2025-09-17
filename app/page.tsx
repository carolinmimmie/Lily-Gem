import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { Category, Product } from "@/types/product";
import Hero from "./components/Hero";
import Bestsellers from "./components/Bestsellers";
import DualHero from "./components/DualHero";
import News from "./components/News";
import LeavingSoon from "./components/LeavingSoon";
import Form from "./components/Form";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

export default async function Home() {
  // const products: Product[] = await client.fetch(groq`*[_type=="product"]`);
  // console.log(products);

  // Fetcha kategorierna
  // Fetcha Nyheter

  // Fetcha producten är en sanity funtion

  const newsProducts: Product[] = await client.fetch(
    groq`*[_type=="product"] | order(_createdAt desc) [0...4]`
  );
  const leavingSoonProducts: Product[] = await client.fetch(
    groq`*[_type=="product"] | order(_createdAt asc) [0...4]`
  );
  const bestSellingProducts: Product[] = await client.fetch(
    groq`*[_type=="product"] | order(rand) [0...4]`
  );
  const categories = await client.fetch(
    groq`*[_type=="category"] | order(title asc)`
  );

  console.log(categories);
  return (
    <div>
      <Hero
        imageUrl="/images/hero1.jpg"
        titleText="New Collection"
        buttonText="Show Now"
      />
      <News newsProducts={newsProducts} />
      <Hero
        imageUrl="/images/hero2.jpg"
        titleText="Most loved items"
        buttonText="Show now"
      />
      <LeavingSoon leavingSoonProducts={leavingSoonProducts} />
      <DualHero />
      <Bestsellers bestSellingProducts={bestSellingProducts} />
      {categories.map((cat: Category) => (
        <div key={cat._id} className="flex">
          <Link
            href={`/shop/category/${cat.slug.current}`}
            className="text-center text-xs font-light hover:underline relative w-full h-64"
          >
            <span>{cat.title}</span>
            {cat.categoryImage && (
              <Image
                src={urlFor(cat.categoryImage).url()}
                alt={cat.title}
                fill
                style={{ objectFit: "cover" }}
              />
            )}
          </Link>
        </div>
      ))}

      <Form />
    </div>
  );
}
