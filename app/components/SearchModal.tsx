"use client";

import React, { useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { CartContext } from "../context/CartContext";
import { Product } from "@/types/product";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface SearchModalProps {
  products: Product[];
}

const SearchModal = ({ products }: SearchModalProps) => {
  const { searchTerm, setSearchTerm, showSearchModal, setShowSearchModal } =
    useContext(CartContext);

  const handleCloseSearchModal = () => {
    setShowSearchModal(!showSearchModal);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleCloseSearchModal}
      ></div>

      {/* Modal */}
      <div className="relative bg-white w-11/12 sm:w-9/12 p-4 shadow-lg">
        {/* Search input */}
        <form className="flex gap-4 mb-2">
          <CiSearch className="text-[26px]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="flex-1 text-sm tracking-wider focus:outline-none border-b border-gray-300"
          />
        </form>

        {/* Search results */}
        {searchTerm.trim() !== "" && (
          <div className="absolute top-full left-0 w-full bg-white shadow max-h-[300px] overflow-y-auto z-50">
            {filteredProducts.length === 0 && (
              <p className="p-2 text-sm text-gray-500">No products found</p>
            )}

            {filteredProducts.map((product) => (
              <Link
                key={product._id}
                href={`/product/${product.slug.current}`}
                onClick={handleCloseSearchModal}
              >
                <div className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer ">
                  {product.images[0] && (
                    <div className="relative min-w-[30px] min-h-[30px] max-w-[30px] ">
                      <Image
                        src={urlFor(product.images[0]).url()}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span>{product.name}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
