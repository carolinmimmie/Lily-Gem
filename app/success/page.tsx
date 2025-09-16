import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-22 items-center px-2 py-40 sm:py-60 tracking-widest">
      <div className="flex flex-col items-center gap-6">
        <h2 className="uppercase "> Your Order is on Its Way! </h2>
        <p className="text-center">
          Thank you for choosing our jewelry. Your treasures will arrive soon!
        </p>
      </div>
      <div>
        <Link href="/">
          <button className="bg-black text-white px-4 py-2 uppercase font-medium cursor-pointer w-full">
            Back to Shop
          </button>
        </Link>
      </div>
    </div>
  );
};

export default page;
