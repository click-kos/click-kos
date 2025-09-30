"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { toast } from "sonner";

export interface cartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  cookTime: string;
  category: string;
  isPopular: boolean;
  image: string;
}

interface CartContextType {
  cartItems: cartItem[];
  addToCart: (item: cartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface cartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<cartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<cartItem[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);

  const addToCart = (item: cartItem) => {
    setCartItems((prev) => [...prev, item]);
    setCartCount((prev) => prev + 1);
    toast(`${item.name} added to cart`, {
      description: item.description,
      action: {
        label: "Undo",
        onClick: () => {
          removeFromCart(item.id);
        },
      },
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => {
      const newItems = [...prev];
      const index = newItems.findIndex((item) => item.id === id);
      if (index !== -1) {
        newItems.splice(index, 1);
      }
      return newItems;
    });
    setCartCount((prev) => (prev > 0 ? prev - 1 : 0));
    toast(`Item removed from cart`);
  };

  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
    toast('Cart cleared');
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
