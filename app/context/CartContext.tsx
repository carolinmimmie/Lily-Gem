"use client";

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
}

// -------------------------------
// Skapa Context
// -------------------------------
// Här skapar vi själva contextet med ett startvärde.
// Vi måste ge TS en default för setShowCart, även om den inte används direkt.
export const CartContext = createContext<CartContextType>({
  showCart: false, // startvärde: carten är dold
  setShowCart: () => {}, // tom funktion för default
});

// -------------------------------
// Provider-komponenten
// -------------------------------
// CartProvider omsluter alla komponenter som behöver tillgång till cart-context.
// Alla barnkomponenter kan nu använda useContext(CartContext) för att komma åt
// showCart och setShowCart.
export const CartProvider = ({ children }: CartProviderProps) => {
  const [showCart, setShowCart] = useState(false);

  return (
    <CartContext.Provider value={{ showCart, setShowCart }}>
      {children}
    </CartContext.Provider>
  );
};
