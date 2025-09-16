"use client";
import { CartItem, Product } from "@/types/product";
import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

// -------------------------------
// Typ för Provider-komponenten
// -------------------------------
// Denna interface beskriver vilka props CartProvider tar emot.
// Här är det bara 'children', dvs de komponenter som omsluts av Provider.
interface CartProviderProps {
  children: ReactNode;
}

// -------------------------------
// Typ för Context-värdena
// -------------------------------
// Detta interface beskriver vad som finns tillgängligt i vårt context.
// showCart: boolean som anger om carten är synlig eller inte
// setShowCart: funktion för att uppdatera showCart
export interface CartContextType {
  showCart: boolean;
  setShowCart: Dispatch<SetStateAction<boolean>>;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  cartItems: CartItem[];
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
  addProduct: (product: Product, quantity: number) => void;
  totalQuantity: number;
  setTotalQuantity: Dispatch<SetStateAction<number>>;
  totalPrice: number;
  setTotalPrice: Dispatch<SetStateAction<number>>;
  toggleCartItemQuantity: (id: string, value: "plus" | "minus") => void;
  removeItemFromCart: (product: CartItem) => void;
  handleCheckout: (cartItems: CartItem[]) => Promise<void>;
}

// -------------------------------
// Skapa Context
// -------------------------------
// Här skapar vi själva contextet med ett startvärde.
// Vi måste ge TS en default för setShowCart, även om den inte används direkt.
export const CartContext = createContext<CartContextType>({
  showCart: false, // startvärde: carten är dold
  setShowCart: () => {}, // tom funktion för default
  quantity: 1, // startvärde: carten är dold
  setQuantity: () => {}, // tom funktion för default
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  cartItems: [],
  setCartItems: () => {},
  addProduct: () => {},
  totalQuantity: 0,
  setTotalQuantity: () => {},
  totalPrice: 0,
  setTotalPrice: () => {},
  toggleCartItemQuantity: () => {},
  removeItemFromCart: () => {},
  handleCheckout: async () => {},
});

// -------------------------------
// Provider-komponenten
// -------------------------------
// CartProvider omsluter alla komponenter som behöver tillgång till cart-context.
// Alla barnkomponenter kan nu använda useContext(CartContext) för att komma åt
// showCart och setShowCart.
export const CartProvider = ({ children }: CartProviderProps) => {
  const [showCart, setShowCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  // state för våran cart som börjar med en tom lista
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Funktioner för Quantity
  // Öka quantity
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Minska quantity
  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity - 1 < 1) return 1;
      return prevQuantity - 1;
    });
  };

  const addProduct = (product: Product, quantity: number) => {
    // Kolla om produkten redan finns i cart
    const checkProductInCart = cartItems.find(
      (item) => item.product._id === product._id
    );
    setTotalQuantity((prev) => prev + quantity);
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );

    if (checkProductInCart) {
      // Om produkten finns, uppdatera quantity
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem.product._id === product._id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + quantity, // öka quantity
          };
        } else {
          return cartItem;
        }
      });

      setCartItems(updatedCartItems);
    } else {
      // Om produkten inte finns, lägg till ny CartItem
      const newCartItem = { product, quantity };
      setCartItems([...cartItems, newCartItem]);
    }

    console.log(cartItems);
    console.log(product);
    console.log(quantity);
  };

  // Definierar en funktion som tar ett produkt-ID och ett värde ("plus" eller "minus")
  // för att ändra kvantiteten på en produkt i kundvagnen.
  const toggleCartItemQuantity = (id: string, value: "plus" | "minus") => {
    // 1️⃣ Hitta det cart-item som matchar produktens _id
    // cartItems är en array med objekt som har en 'product' egenskap
    // .find() returnerar det första elementet som matchar villkoret, annars undefined
    const foundProduct = cartItems.find((item) => item.product._id === id);

    // 2️⃣ Om produkten inte finns i carten, gör inget och avsluta funktionen
    if (!foundProduct) return;

    // 3️⃣ Hitta index för det item vi vill uppdatera
    // .findIndex() returnerar index för första elementet som matchar villkoret
    const index = cartItems.findIndex((item) => item.product._id === id);

    // 4️⃣ Skapa en ny array med samma innehåll som cartItems
    // [...] → sprider ut alla element från cartItems i en ny array
    const updatedCartItems = [...cartItems];

    // 5️⃣ Om vi vill öka quantity
    if (value === "plus") {
      // Uppdaterar objektet på position 'index' i den nya arrayen
      updatedCartItems[index] = {
        // ... → sprider ut alla befintliga egenskaper från originalobjektet
        ...updatedCartItems[index],
        // Ändrar bara 'quantity' genom att öka med 1
        quantity: updatedCartItems[index].quantity + 1,
      };

      // Uppdatera state för cartItems med den nya arrayen
      setCartItems([
        // ...updatedCartItems → sprider ut alla element från updatedCartItems
        ...updatedCartItems,
      ]);

      // Uppdatera totalpriset
      // prevTotalPrice är det tidigare state-värdet
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + foundProduct.product.price
      );

      // Uppdatera total kvantitet
      setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + 1);
    }

    // 6️⃣ Om vi vill minska quantity
    else if (value === "minus") {
      // Uppdaterar objektet på position 'index' i den nya arrayen
      updatedCartItems[index] = {
        ...updatedCartItems[index], // behåll alla andra egenskaper
        quantity: updatedCartItems[index].quantity - 1, // minska quantity med 1
      };

      // Endast minska om quantity är större än 1
      if (foundProduct.quantity > 1) {
        // Uppdatera state för cartItems med den nya arrayen
        setCartItems([
          ...updatedCartItems, // sprid ut alla element
        ]);

        // Minska totalpriset med produktens pris
        setTotalPrice(
          (prevTotalPrice) => prevTotalPrice - foundProduct.product.price
        );

        // Minska total kvantitet
        setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - 1);
      }
    }
  };

  const removeItemFromCart = (product: CartItem) => {
    // Hitta produkten i cartItems
    const foundProduct = cartItems.find(
      (item) => item.product._id === product.product._id
    );

    // Om produkten inte finns eller saknar pris, gör inget
    if (!foundProduct || foundProduct.product.price === undefined) return;

    // Skapa en ny array utan produkten vi vill ta bort
    const newCartItems = cartItems.filter(
      (item) => item.product._id !== product.product._id
    );

    // Uppdatera cartItems state
    setCartItems(newCartItems);

    // Uppdatera totalpriset
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.product.price * foundProduct.quantity
    );

    // Uppdatera total quantity
    setTotalQuantity(
      (prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity
    );
  };

  const handleCheckout = async (cartItems: CartItem[]) => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: cartItems }),
      });

      const data = await res.json().catch(() => null);

      if (!data || !data.url) {
        console.error(
          "Stripe session URL saknas eller fetch returnerade fel:",
          data
        );
        return;
      }

      // Redirecta användaren till Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      console.error("Error initiating checkout:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        showCart,
        setShowCart,
        quantity,
        setQuantity,
        increaseQuantity,
        decreaseQuantity,
        cartItems,
        setCartItems,
        addProduct,
        totalQuantity,
        setTotalQuantity,
        totalPrice,
        setTotalPrice,
        toggleCartItemQuantity,
        removeItemFromCart,
        handleCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
