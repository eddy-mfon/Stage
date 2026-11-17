'use client';

import React, { useState } from 'react';
import { ArrowLeft, Trash2, Send, MessageCircle, ShoppingBag, CheckCircle, Sparkles } from 'lucide-react';
import { CartItem } from '@/types';
import confetti from 'canvas-confetti';

interface CartProps {
  items: CartItem[];
  onUpdateQty: (productId: string, qty: number) => void;
  onClearCart: () => void;
  onBack: () => void;
}

export default function CartAndCheckoutView({ items, onUpdateQty, onClearCart, onBack }: CartProps) {
  const [checkedOut, setCheckedOut] = useState(false);
  const [activeTab, setActiveTab] = useState<'cart' | 'orders'>('cart');

  // Group cart items by seller
  const groupedBySeller: { [sellerId: string]: { sellerName: string; items: CartItem[]; subtotal: number } } = {};

  items.forEach((item) => {
    const sId = item.product.sellerId;
    if (!groupedBySeller[sId]) {
      groupedBySeller[sId] = {
        sellerName: item.product.sellerName,
        items: [],
        subtotal: 0,
      };
    }
    groupedBySeller[sId].items.push(item);
    groupedBySeller[sId].subtotal += item.product.price * item.quantity;
  });

  const grandTotal = items.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);

  const handleCheckoutToWhatsApp = (sellerName: string, sellerItems: CartItem[]) => {
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#25D366', '#EE9A22', '#40214B']
    });

    const itemListText = sellerItems
      .map((it) => `- ${it.product.name} (x${it.quantity}) : ₦${(it.product.price * it.quantity).toLocaleString()}${it.customization?.engravedName ? ` [Custom: ${it.customization.engravedName}, ${it.customization.colorName}]` : ''}`)
      .join('%0A');

    const total = sellerItems.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
    const message = `Hello%20${encodeURIComponent(sellerName)}!%20I%20am%20placing%20an%20order%20from%20Stage:%0A%0A${itemListText}%0A%0ASubtotal:%20₦${total.toLocaleString()}%0A%0APlease%20confirm%20availability%20and%20payment%20details!`;

    window.open(`https://wa.me/2348012345678?text=${message}`, '_blank');
    setCheckedOut(true);
  };

  return (
    <div className="pb-28">
      
      {/* Top Header */}
      <div className="p-4 bg-[#FAF4E8] border-b border-[#40214B]/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="p-1 rounded-full text-[#40214B] hover:bg-[#F3EAD9]">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="font-['Fraunces'] text-2xl font-bold text-[#40214B]">
            Your Bag
          </h2>
        </div>

        {items.length > 0 && (
          <button
            onClick={onClearCart}
            className="text-xs text-[#E2532F] font-bold hover:underline flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-[#F3EAD9] text-[#7A697D] flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8 opacity-60" />
          </div>
          <h3 className="font-['Fraunces'] text-lg font-bold text-[#2A1830] mb-1">
            Your stage bag is empty
          </h3>
          <p className="text-xs text-[#7A697D] max-w-xs mx-auto mb-6">
            Explore the feed or creator bubbles to add unique handcrafted pieces.
          </p>
          <button
            onClick={onBack}
            className="bg-[#40214B] text-[#FAF4E8] text-xs font-bold px-6 py-2.5 rounded-full shadow-md"
          >
            Explore Feeds
          </button>
        </div>
      ) : (
        <div className="p-4 space-y-6">
          
          {/* Note on Multi-seller transparency (Spec §6.5) */}
          <div className="p-3 bg-[#F3EAD9] rounded-2xl text-[11px] text-[#40214B] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#EE9A22] shrink-0" />
            <span>Items are grouped by individual maker. Stage never holds payments directly.</span>
          </div>

          {/* Grouped by Seller Cards */}
          {Object.entries(groupedBySeller).map(([sellerId, data]) => (
            <div
              key={sellerId}
              className="bg-[#FAF4E8] rounded-3xl p-4 border border-[#40214B]/15 shadow-sm space-y-3"
            >
              {/* Seller Sub-header */}
              <div className="flex items-center justify-between pb-2 border-b border-[#40214B]/10">
                <span className="font-['Fraunces'] font-bold text-sm text-[#40214B]">
                  Stage: {data.sellerName}
                </span>
                <span className="text-xs font-bold text-[#7A697D]">
                  Subtotal: ₦{data.subtotal.toLocaleString()}
                </span>
              </div>

              {/* Items list for this seller */}
              <div className="space-y-2.5">
                {data.items.map((it) => (
                  <div key={it.product.id} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 truncate">
                      <img
                        src={it.product.image}
                        alt={it.product.name}
                        className="w-10 h-10 rounded-xl object-cover shrink-0"
                      />
                      <div className="truncate">
                        <b className="text-[#2A1830] block truncate">{it.product.name}</b>
                        {it.customization && (
                          <span className="text-[10px] text-[#EE9A22] block">
                            Custom: “{it.customization.engravedName}” ({it.customization.colorName})
                          </span>
                        )}
                        <span className="text-[10px] text-[#7A697D]">
                          ₦{it.product.price.toLocaleString()} each
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center bg-[#F3EAD9] rounded-full px-2 py-0.5 text-xs font-bold">
                        <button
                          onClick={() => onUpdateQty(it.product.id, it.quantity - 1)}
                          className="px-1 text-[#40214B]"
                        >
                          -
                        </button>
                        <span className="px-1.5">{it.quantity}</span>
                        <button
                          onClick={() => onUpdateQty(it.product.id, it.quantity + 1)}
                          className="px-1 text-[#40214B]"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order via WhatsApp direct button */}
              <div className="pt-2">
                <button
                  onClick={() => handleCheckoutToWhatsApp(data.sellerName, data.items)}
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs py-2.5 rounded-full flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Order from {data.sellerName} on WhatsApp
                </button>
              </div>
            </div>
          ))}

          {/* Grand Total Summary Box */}
          <div className="p-4 bg-[#40214B] text-[#FAF4E8] rounded-3xl shadow-lg">
            <div className="flex items-center justify-between mb-2 text-xs">
              <span>Overall Total ({items.length} items)</span>
              <span className="font-['Fraunces'] text-xl font-bold text-[#EE9A22]">
                ₦{grandTotal.toLocaleString()}
              </span>
            </div>
            <p className="text-[10px] text-[#DCCBE2] leading-normal">
              Each seller processes delivery directly with you over WhatsApp or Telegram.
            </p>
          </div>

        </div>
      )}

    </div>
  );
}
