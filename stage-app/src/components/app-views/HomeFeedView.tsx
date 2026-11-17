'use client';

import React, { useState } from 'react';
import { Heart, Plus, MessageSquare, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { PRODUCTS, BUSINESSES } from '@/data/mockData';

interface FeedProps {
  onOpenStorefront: (businessId: string, initialProductId?: string) => void;
  onAddToCart: (product: any) => void;
}

export default function HomeFeedView({ onOpenStorefront, onAddToCart }: FeedProps) {
  const [activeTab, setActiveTab] = useState('All');
  const [likedPins, setLikedPins] = useState<Set<string>>(new Set(['p1', 'p3']));
  const [followedBiz, setFollowedBiz] = useState<Set<string>>(new Set(['bc']));

  const categories = ['All', 'Fashion', 'Gifts', 'Bags', 'Decor', 'Following'];

  const toggleHeart = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPins(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleFollow = (bizId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFollowedBiz(prev => {
      const next = new Set(prev);
      if (next.has(bizId)) next.delete(bizId);
      else next.add(bizId);
      return next;
    });
  };

  const filteredProducts = PRODUCTS.filter(p => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Following') return followedBiz.has(p.sellerId);
    return p.category.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div className="pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      
      {/* Category Filter Tabs */}
      <div className="sticky top-16 z-30 bg-[#FAF4E8]/95 backdrop-blur-md py-3 mb-6 border-b border-[#40214B]/10 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === cat
                    ? 'bg-[#40214B] text-[#FAF4E8] shadow-xs'
                    : 'bg-[#F3EAD9] text-[#7A697D] hover:bg-[#FAF4E8] hover:text-[#40214B]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#7A697D]">
            <Sparkles className="w-3.5 h-3.5 text-[#EE9A22]" />
            Click any pin to visit the maker's Stage
          </span>
        </div>
      </div>

      {/* Full Fluid Responsive Pinterest-Style Masonry Grid */}
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 space-y-4">
        
        {/* Dynamic Shout Card inside the stream */}
        <div className="break-inside-avoid bg-[#EE9A22] text-[#2B1204] p-5 rounded-3xl relative shadow-xs hover:shadow-md transition-all">
          <div className="w-8 h-8 rounded-full bg-[#40214B] text-[#EE9A22] flex items-center justify-center mb-3">
            <MessageSquare className="w-4 h-4" />
          </div>
          <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#40214B] block mb-1">
            Creator Shout
          </span>
          <h4 className="font-['Fraunces'] text-xl font-bold leading-tight mb-1.5">
            Back in stock!
          </h4>
          <p className="text-xs font-medium leading-relaxed mb-4 text-[#2B1204]/90">
            Kicks by Jay just restocked 18 authenticated sneaker grails.
          </p>
          <div className="flex items-center justify-between pt-3 border-t border-[#2B1204]/15">
            <span className="text-xs font-bold">KJ · Kicks by Jay</span>
            <button
              onClick={() => onOpenStorefront('kj')}
              className="text-xs font-bold bg-[#2B1204] text-[#FAF4E8] px-3 py-1.5 rounded-full hover:bg-black transition-colors"
            >
              Visit Stage →
            </button>
          </div>
        </div>

        {/* Product Pins */}
        {filteredProducts.map((p) => {
          const isLiked = likedPins.has(p.id);
          return (
            <div
              key={p.id}
              onClick={() => onOpenStorefront(p.sellerId, p.id)}
              className="group break-inside-avoid bg-[#FAF4E8] rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer border border-[#40214B]/10 flex flex-col justify-between"
            >
              {/* Product Visual */}
              <div className="relative w-full overflow-hidden bg-[#2B2220]">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ aspectRatio: p.aspectRatio }}
                  loading="lazy"
                />

                {/* Subtle vignette on hover */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Heart Button */}
                <button
                  onClick={(e) => toggleHeart(p.id, e)}
                  className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-sm ${
                    isLiked ? 'bg-[#E2532F] text-white' : 'bg-white/80 text-[#40214B] hover:bg-white'
                  }`}
                  aria-label="Save item"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </button>

                {/* Customizer Tag */}
                {p.isCustomizable && (
                  <span className="absolute top-3 left-3 bg-[#EE9A22] text-[#2B1204] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
                    Customizable
                  </span>
                )}

                {/* Price Pill */}
                <span className="absolute bottom-3 left-3 bg-[#FAF4E8]/95 backdrop-blur-md text-[#40214B] text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                  ₦{p.price.toLocaleString()}
                </span>
              </div>

              {/* Pin Details & Direct Seller Action */}
              <div className="p-3.5">
                <h4 className="text-sm font-bold text-[#2A1830] truncate group-hover:text-[#40214B] transition-colors">
                  {p.name}
                </h4>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#40214B]/10 text-xs text-[#7A697D]">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-5 h-5 rounded-full bg-[#40214B] text-[#EE9A22] text-[9px] font-bold flex items-center justify-center shrink-0">
                      {p.sellerAvatar}
                    </span>
                    <span className="font-semibold text-[#40214B] hover:underline truncate">
                      {p.sellerName}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold text-[#EE9A22] shrink-0 flex items-center gap-0.5">
                    View & Buy →
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Feature Performer Card inside stream */}
        <div className="break-inside-avoid bg-[#FAF4E8] border border-[#40214B]/15 p-5 rounded-3xl shadow-xs">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-8 h-8 rounded-full bg-[#40214B] text-[#EE9A22] text-xs font-bold flex items-center justify-center">
              BC
            </span>
            <div className="truncate">
              <b className="text-sm block text-[#2A1830] truncate">Bella's Closet</b>
              <small className="text-xs text-[#7A697D] block">Lagos · Tailoring</small>
            </div>
          </div>
          <p className="text-xs text-[#40214B] italic leading-relaxed mb-4">
            “Every piece is cut and finished right here in our studio.”
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onOpenStorefront('bc')}
              className="py-2 rounded-full text-xs font-bold bg-[#40214B] text-white hover:bg-[#2A1830] transition-colors"
            >
              Visit Store
            </button>
            <button
              onClick={(e) => toggleFollow('bc', e)}
              className={`py-2 rounded-full text-xs font-bold transition-all border border-[#40214B] ${
                followedBiz.has('bc')
                  ? 'bg-transparent text-[#40214B]'
                  : 'bg-[#FAF4E8] text-[#40214B] hover:bg-[#F3EAD9]'
              }`}
            >
              {followedBiz.has('bc') ? 'Following' : 'Follow'}
            </button>
          </div>
        </div>

        {/* Promo Inspiration Pin */}
        <div className="break-inside-avoid bg-[#40214B] text-[#FAF4E8] p-6 rounded-3xl flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xs uppercase tracking-wider font-extrabold text-[#EE9A22] block mb-2">
              Featured Category
            </span>
            <h4 className="font-['Fraunces'] text-xl font-bold leading-tight mb-2 text-[#FAF4E8]">
              Gifts that say “I thought of you.”
            </h4>
            <p className="text-xs text-[#DCCBE2] leading-relaxed mb-4">
              38 independent shops are ready with bespoke gift boxes and hand-poured scents.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('Gifts')}
            className="text-xs font-bold text-[#2A1830] bg-[#EE9A22] py-2 px-4 rounded-full self-start hover:bg-white transition-colors"
          >
            Browse Gifts
          </button>
        </div>

      </div>

    </div>
  );
}
