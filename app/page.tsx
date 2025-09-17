import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Hero from "./components/Hero";
import Bestsellers from "./components/Bestsellers";
import DualHero from "./components/DualHero";
import News from "./components/News";
import LeavingSoon from "./components/LeavingSoon";
import Form from "./components/Form";
import { Product } from "@/types/product";
import CategoryCard from "./components/CategoryCard";

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
      <CategoryCard categories={categories} />

      <Form />
    </div>
  );
}
