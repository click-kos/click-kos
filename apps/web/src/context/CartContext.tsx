"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface cartItem {
    id: number;
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
    removeFromCart: (id: number) => void;
    cartCount: number;
    
}

const CartContext =createContext<CartContextType | undefined>(undefined);

export const useCart =(): CartContextType => {
    const context = useContext(CartContext);
    if(!context) {
        throw new Error ("useCart must be used within a CartProvider")
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
    setCartItems(prev => [...prev,item]);
    setCartCount(prev => prev + 1);
}

const removeFromCart =(id: number) => {
    setCartItems(prev =>prev.filter(item =>item.id !== id));
    setCartCount(prev => (prev > 0 ? prev - 1 : 0));
}

return (
    <CartContext.Provider value = {{cartItems, addToCart, removeFromCart, cartCount}}>
        {children}
    </CartContext.Provider>
);

};

