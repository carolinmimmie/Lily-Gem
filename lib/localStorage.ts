import { CartItem } from "@/types/product";

export function saveCartToLocalStorage(cartItems: CartItem[]) {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

export function getCartFromLocalStorage(): CartItem[] {
  return JSON.parse(localStorage.getItem("cartItems") || "[]");
}
