import Link from "next/link";
import React from "react";

interface ButtonProps {
  titleText?: string;
  buttonText: string;
  href: string;
  type?: "button" | "submit" | "reset";
}

const Button = ({ buttonText, titleText, href }: ButtonProps) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white space-y-4">
      <h2 className="text-5xl font-thin">{titleText}</h2>
      <Link href={href}>
        <button className="cursor-pointer text-white">{buttonText}</button>
      </Link>
    </div>
  );
};

export default Button;
