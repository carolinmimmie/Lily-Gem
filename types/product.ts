// Definierar Sanity-bilder
export interface SanityImage {
  _key: string;
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

// Definierar kategori-objektet
export interface Category {
  _id: string;
  title: string;
  slug: {
    _type: "slug";
    current: string;
  };
  description: string;
}

// Produktinterface med kategori
export interface Product {
  _id: string;
  _type: "product";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name: string;
  slug: {
    _type: "slug";
    current: string;
  };
  description: string;
  price: number;
  images: SanityImage[];
  category: Category; // ← referensen expanderad till hela objektet
}

export interface CartItem {
  product: Product;
  quantity: number;
}
