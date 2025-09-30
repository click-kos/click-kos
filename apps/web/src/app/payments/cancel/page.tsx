'use client';

import React from 'react';

function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="text-yellow-500 text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Cancelled</h1>
        <p className="text-gray-600 mb-6">
          Your payment was cancelled. No charges have been made to your account.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          You can continue shopping and checkout again when ready.
        </p>
        <div className="space-y-3">
          <a
            href="/"
            className="block text-gray-600 hover:text-gray-800 font-medium"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  );
}

export default PaymentCancelPage;
