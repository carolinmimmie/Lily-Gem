import React from "react";
import Image from "next/image";
import Button from "./Button";

const DualHero = () => {
  return (
    <div className="relative flex flex-col sm:flex-row w-full h-[660px]">
      <div className="relative w-full sm:w-1/2 h-full">
        <Image src="/images/dualhero1.jpg" alt="hero1" fill objectFit="cover" />
      </div>
      <div className="relative w-full sm:w-1/2 h-full">
        <Image src="/images/dualhero2.jpg" alt="hero2" fill objectFit="cover" />
      </div>
      <Button titleText="Gift guide" buttonText="Shop Now" href="/shop" />
    </div>
  );
};

export default DualHero;
