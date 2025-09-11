import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between tracking-widest py-8 px-16">
        <div className="flex flex-col gap-6 mb-6">
          <Link
            href="/"
            className="text-xl md:text-3xl  font-bold tracking-widest uppercase"
          >
            Lily Gem
          </Link>
        </div>
        <div className="flex flex-col gap-6">
          <h4 className="font-extralight uppercase text-xs">About</h4>
          <div className="flex flex-col gap-4 text-xs font-light pb-12">
            <p>Lily Gem Story</p>
            <p>Our Commitment</p>
            <p>Join Our Team</p>
            <p>Partners</p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h4 className="font-extralight uppercase text-xs">Support</h4>
          <div className="flex flex-col gap-4 text-xs font-light pb-12">
            <p>Get in Touch</p>
            <p>Help Center</p>
            <p>Return Policy</p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h4 className="font-extralight uppercase text-xs">Social</h4>
          <div className="flex flex-col gap-4 text-xs font-light pb-12">
            <p>Instagram</p>
            <p>TikTok</p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h4 className="font-extralight uppercase text-xs">
            Terms & conditionals
          </h4>
          <div className="flex flex-col gap-4 text-xs font-light pb-12">
            <p>Privacy Policy</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col text-center pb-6">
        <h2 className="text-xl font-extralight tracking-wide">Lily Gem</h2>
        <div>
          <p className="text-[10px] font-extralight">
            2025 Lily Gem © All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
