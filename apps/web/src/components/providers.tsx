"use client";

import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";
import { CartProvider } from '../context/CartContext';


export default function Providers({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <CartProvider> 
        {children}
        <Toaster richColors />
      </CartProvider>
      
    </ThemeProvider>
  );
}
