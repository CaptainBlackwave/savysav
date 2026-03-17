'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/header';
import { CheckCircle, DollarSign, Hash, Copy, Mail } from 'lucide-react';
import { useState } from 'react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id') || '';
  const amount = searchParams.get('amount') || '0';
  const [copied, setCopied] = useState(false);

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-600">Thank you for your order</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 flex items-center">
              <Hash className="w-4 h-4 mr-2" />
              Order ID
            </span>
            <button
              onClick={copyOrderId}
              className="flex items-center text-rose-500 hover:text-rose-600"
            >
              {copied ? (
                <span className="text-sm">Copied!</span>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1" />
                  <span className="text-sm">Copy</span>
                </>
              )}
            </button>
          </div>
          <p className="text-2xl font-mono font-bold text-gray-800">{orderId}</p>
        </div>

        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Total Amount
            </span>
            <span className="text-2xl font-bold text-gray-800">${parseFloat(amount).toFixed(2)}</span>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-purple-50 to-rose-50">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Mail className="w-5 h-5 mr-2 text-purple-500" />
            Next Steps: Send Interac e-Transfer
          </h2>
          
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 border border-purple-100">
              <p className="text-sm text-gray-600 mb-2">1. Send an Interac e-Transfer of</p>
              <p className="text-2xl font-bold text-gray-800">${parseFloat(amount).toFixed(2)}</p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-purple-100">
              <p className="text-sm text-gray-600 mb-2">2. To email address:</p>
              <p className="text-lg font-semibold text-gray-800">savysav@gmail.com</p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-purple-100">
              <p className="text-sm text-gray-600 mb-2">3. In the message/note, include:</p>
              <p className="text-lg font-mono font-semibold text-gray-800">{orderId}</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> Include your Order ID in the e-Transfer message 
              so we can match your payment to your order.
            </p>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            We&apos;ll process your order once we receive your payment. 
            You&apos;ll receive a confirmation email once your order is ready!
          </p>
        </div>
      </div>

      <Link
        href="/"
        className="block w-full mt-6 py-3 px-6 text-center bg-gradient-to-r from-rose-400 to-purple-500 text-white font-semibold rounded-lg hover:from-rose-500 hover:to-purple-600 transition"
      >
        Continue Shopping
      </Link>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <>
      <Header />
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
        </div>
      }>
        <OrderSuccessContent />
      </Suspense>
    </>
  );
}
