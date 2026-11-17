'use client';

import React, { useState } from 'react';
import { LOOK_PINS } from '@/data/mockData';
import { Plus, Check, Sparkles, ShoppingBag, Share2, Info } from 'lucide-react';

interface ShopTheLookProps {
  onAddToCart: (item: any) => void;
}

export default function ShopTheLookView({ onAddToCart }: ShopTheLookProps) {
  const [selectedPinId, setSelectedPinId] = useState<string>('lp1');
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const selectedPin = LOOK_PINS.find((p) => p.id === selectedPinId) || LOOK_PINS[0];

  const toggleAdd = (pinId: string) => {
    setAddedItems((prev) => {
      const next = new Set(prev);
      if (next.has(pinId)) {
        next.delete(pinId);
      } else {
        next.add(pinId);
        const pin = LOOK_PINS.find(p => p.id === pinId);
        if (pin) {
          onAddToCart({
            id: pin.id,
            name: pin.name,
            price: pin.price,
            sellerId: pin.bizId,
            sellerName: pin.biz,
            category: 'Fashion',
            image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=70',
          });
        }
      }
      return next;
    });
  };

  const addAllRemaining = () => {
    LOOK_PINS.forEach((p) => {
      if (!addedItems.has(p.id)) {
        toggleAdd(p.id);
      }
    });
  };

  const totalPrice = LOOK_PINS.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="pb-28">
      
      {/* Header */}
      <div className="p-4 bg-[#FAF4E8] border-b border-[#40214B]/10 flex items-center justify-between">
        <div>
          <h2 className="font-['Fraunces'] text-2xl font-bold text-[#40214B]">
            Shop the Look
          </h2>
          <p className="text-xs text-[#7A697D]">
            Styled by <span className="font-bold text-[#40214B]">Bella’s Closet</span>
          </p>
        </div>
        <button className="p-2 rounded-full bg-[#F3EAD9] text-[#40214B] hover:bg-white shadow-2xs">
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Styled Model Look Canvas with Interactive Hotspots */}
      <div className="relative mx-4 my-4 rounded-3xl overflow-hidden bg-[#2B2220] shadow-lg border border-[#40214B]/10 h-[380px] sm:h-[420px]">
        <img
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80"
          alt="Styled Look"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Hint Pill */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
          <Sparkles className="w-3 h-3 text-[#EE9A22]" />
          Tap a glowing dot to shop each piece
        </div>

        {/* Interactive Hotspot Dots */}
        {LOOK_PINS.map((pin) => {
          const isSelected = selectedPin.id === pin.id;
          return (
            <button
              key={pin.id}
              onClick={() => setSelectedPinId(pin.id)}
              style={{ top: pin.top, left: pin.left }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isSelected
                  ? 'scale-125 z-20 ring-4 ring-[#EE9A22] bg-[#FAF4E8] text-[#40214B]'
                  : 'bg-white/80 text-[#2B1204] hover:scale-110 z-10'
              } shadow-lg`}
            >
              <div className="w-3 h-3 rounded-full bg-[#40214B] animate-ping opacity-75" />
              <div className="absolute w-2.5 h-2.5 rounded-full bg-[#EE9A22]" />
            </button>
          );
        })}

        {/* Floating Quick-Card for active selected pin */}
        <div className="absolute bottom-4 inset-x-4 bg-[#FAF4E8]/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#40214B]/15 shadow-xl flex items-center justify-between">
          <div className="truncate mr-2">
            <span className="text-[10px] font-extrabold uppercase text-[#EE9A22] block">
              {selectedPin.biz}
            </span>
            <b className="text-xs text-[#2A1830] block truncate">{selectedPin.name}</b>
            <span className="text-xs font-bold text-[#40214B]">
              ₦{selectedPin.price.toLocaleString()}
            </span>
          </div>

          <button
            onClick={() => toggleAdd(selectedPin.id)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
              addedItems.has(selectedPin.id)
                ? 'bg-[#E2532F] text-white'
                : 'bg-[#40214B] text-[#FAF4E8] hover:bg-[#2A1830]'
            }`}
          >
            {addedItems.has(selectedPin.id) ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" /> Add
              </>
            )}
          </button>
        </div>
      </div>

      {/* Styled Pieces List breakdown */}
      <div className="px-4 space-y-2.5">
        <div className="flex items-center justify-between text-xs font-bold text-[#40214B] px-1">
          <span>Pieces in this Look ({LOOK_PINS.length})</span>
          <span>Total: ₦{totalPrice.toLocaleString()}</span>
        </div>

        {LOOK_PINS.map((pin) => {
          const isAdded = addedItems.has(pin.id);
          const isSelected = selectedPin.id === pin.id;
          return (
            <div
              key={pin.id}
              onClick={() => setSelectedPinId(pin.id)}
              className={`p-3 rounded-2xl flex items-center justify-between transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-[#FAF4E8] border-[#40214B] shadow-xs'
                  : 'bg-[#F3EAD9] border-transparent hover:bg-[#FAF4E8]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2B2220] overflow-hidden shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&auto=format&fit=crop&q=70"
                    alt={pin.name}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: pin.bgPos }}
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2A1830]">{pin.name}</h4>
                  <p className="text-[10px] text-[#7A697D]">From {pin.biz}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#40214B]">
                  ₦{pin.price.toLocaleString()}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleAdd(pin.id);
                  }}
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                    isAdded ? 'bg-[#E2532F] text-white' : 'bg-[#FAF4E8] text-[#40214B] hover:bg-[#40214B] hover:text-white'
                  }`}
                >
                  {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          );
        })}

        {/* Global CTA */}
        <div className="pt-3">
          <button
            onClick={addAllRemaining}
            className="w-full bg-[#40214B] hover:bg-[#2A1830] text-[#FAF4E8] font-bold text-xs py-3 rounded-full flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <ShoppingBag className="w-4 h-4 text-[#EE9A22]" />
            {addedItems.size === LOOK_PINS.length
              ? 'All 3 items in Bag'
              : `Add all pieces · ₦${totalPrice.toLocaleString()}`}
          </button>
        </div>

      </div>

    </div>
  );
}
