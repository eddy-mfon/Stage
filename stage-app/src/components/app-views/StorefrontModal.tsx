'use client';

import React, { useState } from 'react';
import { ArrowLeft, Share2, Heart, Check, MessageCircle, Send, Sparkles, ShieldCheck, ShoppingBag, Plus } from 'lucide-react';
import { BUSINESSES, PRODUCTS } from '@/data/mockData';
import confetti from 'canvas-confetti';

interface StorefrontProps {
  businessId: string;
  highlightProductId?: string;
  onBack: () => void;
  onOpenCart?: () => void;
  onAddToCart: (product: any) => void;
}

export default function StorefrontModal({ businessId, highlightProductId, onBack, onOpenCart, onAddToCart }: StorefrontProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [addedItemIds, setAddedItemIds] = useState<Set<string>>(new Set());

  const business = BUSINESSES.find((b) => b.id === businessId) || BUSINESSES[0];
  const sellerProducts = PRODUCTS.filter((p) => p.sellerId === business.id);

  const categories = ['All', ...new Set(sellerProducts.map((p) => p.category))];

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    if (!isFollowing) {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.4 },
        colors: ['#40214B', '#EE9A22']
      });
    }
  };

  const handleAdd = (product: any) => {
    onAddToCart(product);
    setAddedItemIds((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedItemIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 2000);
  };

  const handleDirectBuyWhatsApp = (product: any) => {
    const text = `Hello%20${encodeURIComponent(business.name)}!%20I%20am%20on%20your%20Stage%20and%20want%20to%20order%20the%20${encodeURIComponent(product.name)}%20(₦${product.price.toLocaleString()}).%20Please%20confirm%20availability!`;
    window.open(`https://wa.me/${business.contactHandle.replace('+', '')}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-[#FAF4E8] min-h-screen pb-32">
      
      {/* Top Header Bar */}
      <div className="sticky top-16 z-30 bg-[#FAF4E8]/95 backdrop-blur-md px-4 sm:px-8 py-3.5 border-b border-[#40214B]/10 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#40214B] bg-[#F3EAD9] px-3.5 py-1.5 rounded-full hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Feed</span>
        </button>

        <span className="font-['Fraunces'] text-base font-bold text-[#40214B]">
          {business.name}’s Stage
        </span>

        <div className="flex items-center gap-2">
          {onOpenCart && (
            <button
              onClick={onOpenCart}
              className="p-2 rounded-full bg-[#FAF4E8] text-[#40214B] border border-[#40214B]/15 hover:bg-white shadow-2xs flex items-center gap-1.5 text-xs font-bold"
              aria-label="View Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
            </button>
          )}
          <button className="p-2 rounded-full bg-[#F3EAD9] text-[#40214B] hover:bg-white shadow-2xs">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Creator Hero Presentation */}
        <div className="bg-gradient-to-b from-[#F3EAD9] to-[#FAF4E8] p-6 sm:p-10 rounded-3xl border border-[#40214B]/10 text-center relative mb-8">
          
          <div
            className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white font-['Fraunces'] font-bold text-3xl shadow-lg border-4 border-white mb-4"
            style={{ backgroundColor: business.themeColor }}
          >
            {business.initials}
          </div>

          <div className="flex items-center justify-center gap-2 mb-1.5">
            <h1 className="font-['Fraunces'] text-2xl sm:text-4xl font-bold text-[#2A1830]">
              {business.name}
            </h1>
            {business.verified && (
              <span title="Verified Maker">
                <ShieldCheck className="w-5 h-5 text-[#EE9A22]" />
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-[#7A697D] max-w-md mx-auto mb-6">
            {business.bio} · {business.followers.toLocaleString()} Followers
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleFollow}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all shadow-xs ${
                isFollowing
                  ? 'bg-transparent border border-[#40214B] text-[#40214B]'
                  : 'bg-[#40214B] text-[#FAF4E8] hover:bg-[#2A1830]'
              }`}
            >
              {isFollowing ? 'Following' : 'Follow Stage'}
            </button>

            <a
              href={`https://wa.me/${business.contactHandle.replace('+', '')}?text=Hi%20${encodeURIComponent(business.name)},%20I%20am%20browsing%20your%20Stage!`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full text-xs font-bold bg-[#FAF4E8] text-[#40214B] border border-[#40214B]/20 flex items-center gap-2 hover:bg-white shadow-2xs"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              Chat Maker
            </a>
          </div>

        </div>

        {/* The Core Opening Note */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF4E8] border-2 border-[#EE9A22]/40 shadow-xs mb-8">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#EE9A22] mb-2">
            <Sparkles className="w-4 h-4 fill-[#EE9A22]" />
            {business.openingNotePrompt || 'The Opening Note'}
          </div>
          <p className="font-['Fraunces'] text-base sm:text-xl text-[#40214B] italic leading-relaxed">
            “{business.openingNote}”
          </p>
        </div>

        {/* Self-Named Category Tabs */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#40214B]/10">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  activeCategory === c
                    ? 'bg-[#40214B] text-white'
                    : 'bg-[#F3EAD9] text-[#7A697D] hover:bg-[#FAF4E8]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <span className="text-xs text-[#7A697D]">
            {sellerProducts.length} Products
          </span>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sellerProducts
            .filter((p) => activeCategory === 'All' || p.category === activeCategory)
            .map((p) => {
              const isAdded = addedItemIds.has(p.id);
              const isTargeted = highlightProductId === p.id;
              return (
                <div
                  key={p.id}
                  className={`group bg-[#F3EAD9] rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all border flex flex-col justify-between ${
                    isTargeted ? 'border-[#EE9A22] ring-2 ring-[#EE9A22]/20' : 'border-[#40214B]/10'
                  }`}
                >
                  <div className="relative w-full aspect-square overflow-hidden bg-[#2B2220]">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute bottom-3 left-3 bg-[#FAF4E8]/95 backdrop-blur-md text-[#40214B] text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                      ₦{p.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#2A1830] mb-1">
                        {p.name}
                      </h4>
                      <p className="text-xs text-[#7A697D] line-clamp-2 mb-4 leading-relaxed">
                        {p.description || 'Crafted with premium materials in small artisan batches.'}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#40214B]/10">
                      <button
                        onClick={() => handleAdd(p)}
                        className={`w-full py-2 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                          isAdded
                            ? 'bg-[#E2532F] text-white'
                            : 'bg-[#40214B] text-[#FAF4E8] hover:bg-[#2A1830]'
                        }`}
                      >
                        {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        {isAdded ? 'Added' : 'Add to Bag'}
                      </button>

                      <button
                        onClick={() => handleDirectBuyWhatsApp(p)}
                        className="w-full py-2 rounded-full text-xs font-bold bg-[#25D366] text-white hover:bg-[#20ba5a] flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

      </div>

    </div>
  );
}
