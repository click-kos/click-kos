'use client';

import React from 'react';
import { useCart } from '@/context/CartContext'; 

function CartPage() {
  const { cartItems, removeFromCart } = useCart(); 
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
  <>
    {/* Header */}
    <div className="flex justify-center px-4 sm:px-8">
      <div className="bg-[#7965C1] rounded-2xl p-8 mb-8 text-white w-full max-w-screen-lg h-[100px] flex items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Your Cart</h1>
      </div>
    </div>

    {/* Main Cart Content */}
    <div className="p-4 sm:p-8 pb-32 max-w-screen-md mx-auto">
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">🛒 Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-4 bg-white shadow-sm"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded mx-auto md:mx-0"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-600 mb-1">{item.description}</p>
                <p className="text-sm font-medium text-gray-800">Price: R{item.price}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 text-sm self-start md:self-center"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* Sticky Total + Checkout */}
    {cartItems.length > 0 && (
      <div className="fixed bottom-0 left-0 w-full flex justify-center z-50 px-2">
        <div className="w-full max-w-screen-lg bg-white border-t border-gray-300 px-4 py-3 flex flex-col sm:flex-row justify-between items-center shadow-md rounded-t-lg">
          <div className="text-base sm:text-lg font-semibold mb-2 sm:mb-0">
            Total: <span className="text-black">R{total}</span>
          </div>
          <button className="bg-[#7965C1] hover:bg-[#5d4fa8] text-white text-sm sm:text-base font-semibold py-2 px-6 rounded-md transition duration-200">
            Checkout
          </button>
        </div>
      </div>
    )}
  </>
);

}

export default CartPage;

