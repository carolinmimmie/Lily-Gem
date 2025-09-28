"use client";
import { client } from "@/sanity/lib/client";
import React, { ChangeEvent, useState } from "react";

const Admin = () => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "",
    images: "",
    description: "",
    price: 0,
  });
  // Gemensam handleChange-funktion för alla inputs
  // e representerar det event som sker när användaren skriver i inputen
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement> // Typ för input och select
  ) => {
    const { name, value } = e.target; // Hämtar 'name' och 'value' från inputen som ändras
    // Uppdaterar state
    setFormData((prev) => ({
      ...prev, // Behåll alla tidigare värden
      [name]: value, // Uppdatera endast fältet som har ändrats (baserat på inputens 'name')
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Förhindra att sidan laddas om

    try {
      await client.create({
        _type: "product",
        name: formData.name,
        slug: {
          _type: "slug",
          current: formData.slug,
        },
        description: formData.description,
        price: formData.price,
        images: [
          {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: formData.images, // om du har ett asset-ID
            },
          },
        ],
        category: formData.category, // rätt fält
      });

      alert("Product added successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    }
  };

  return (
    <section className="my-8 px-4 sm:px-8 lg:px-16">
      <h2 className="text-2xl font-light tracking-wide mb-4 text-center">
        Admin
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-400 px-3 py-2 "
          />
        </div>
        <div>
          <label htmlFor="slug">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="w-full border border-gray-400 px-3 py-2 "
          />
        </div>
        <div>
          <label htmlFor="category">Catgory</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-400 px-3 py-2 "
          />
        </div>
        <div>
          <label htmlFor="images">Image</label>
          <input
            type="text"
            name="images"
            value={formData.images}
            onChange={handleChange}
            className="w-full border border-gray-400 px-3 py-2 "
          />
        </div>
        <div>
          <label htmlFor="description">Descripton</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-400 px-3 py-2 "
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-400 px-3 py-2 "
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 uppercase font-medium cursor-pointer"
        >
          Add product
        </button>
      </form>
    </section>
  );
};

export default Admin;
