import React from "react";
import Image from "next/image";
import Button from "./Button";

interface HeroProps {
  imageUrl: string;
  titleText: string;
  buttonText: string;
}

const Hero = ({ imageUrl, titleText, buttonText }: HeroProps) => {
  return (
    <header className="relative w-full h-[66vh]">
      <Image
        src={imageUrl}
        alt="hero image"
        fill
        className="object-cover"
      ></Image>
      <Button titleText={titleText} buttonText={buttonText} href="/shop" />
    </header>
  );
};

export default Hero;
