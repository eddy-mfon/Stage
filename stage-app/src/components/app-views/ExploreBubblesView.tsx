'use client';

import React, { useState, useEffect } from 'react';
import { Search, Volume2, X, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { BUSINESSES, PRODUCTS } from '@/data/mockData';
import { Business } from '@/types';

interface ExploreProps {
  onOpenStorefront: (businessId: string) => void;
  onSelectProduct: (productId: string) => void;
}

export default function ExploreBubblesView({ onOpenStorefront, onSelectProduct }: ExploreProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSheetBiz, setActiveSheetBiz] = useState<Business | null>(null);
  const [activeShoutIndex, setActiveShoutIndex] = useState(0);

  const categories = ['All', 'Fashion', 'Gifts', 'Bags', 'Decor'];

  // Rotate shouts automatically every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveShoutIndex((prev) => (prev + 1) % BUSINESSES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const filteredBusinesses = BUSINESSES.filter((b) => {
    const matchesCat = selectedCategory === 'All' || b.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      searchQuery === '' ||
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const activeShoutBiz = BUSINESSES[activeShoutIndex];

  return (
    <div className="relative pb-24 min-h-[640px]">
      
      {/* Search & Header */}
      <div className="p-4 bg-[#FAF4E8]">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-['Fraunces'] text-2xl font-bold text-[#40214B]">
            Explore
          </h2>
          <span className="text-[11px] font-semibold text-[#EE9A22] bg-[#FAF4E8] px-2.5 py-1 rounded-full border border-[#EE9A22]/20">
            Live Galaxy
          </span>
        </div>
        <p className="text-xs text-[#7A697D] mb-3">
          Bigger bubbles are busier on Stage today.
        </p>

        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A697D]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search makers, scents, bespoke bags…"
            className="w-full pl-10 pr-4 py-2 bg-white rounded-full text-xs border border-[#40214B]/15 focus:outline-none focus:border-[#40214B] shadow-2xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#40214B] text-[#FAF4E8]'
                  : 'bg-[#F3EAD9] text-[#7A697D] hover:bg-[#FAF4E8]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Rotating Shout Notification */}
      {activeShoutBiz?.shout && (
        <div className="mx-4 mb-2 p-3 bg-gradient-to-r from-[#EE9A22] to-[#E2532F] rounded-2xl text-white shadow-md transition-all flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Volume2 className="w-4 h-4 text-white animate-pulse" />
            </div>
            <div className="truncate">
              <div className="text-[11px] font-bold truncate">
                {activeShoutBiz.name}: {activeShoutBiz.shout.title}
              </div>
              <div className="text-[10px] text-white/90 truncate">
                {activeShoutBiz.shout.message}
              </div>
            </div>
          </div>
          <button
            onClick={() => onOpenStorefront(activeShoutBiz.id)}
            className="shrink-0 ml-2 bg-white text-[#2B1204] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs hover:bg-[#FAF4E8]"
          >
            Peek
          </button>
        </div>
      )}

      {/* Floating Bubble Canvas */}
      <div className="relative w-full h-[400px] sm:h-[450px] overflow-hidden bg-gradient-to-b from-[#FAF4E8] via-[#F3EAD9] to-[#FAF4E8] rounded-3xl mx-auto border border-[#40214B]/10 my-2">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#40214B 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        {filteredBusinesses.map((biz, idx) => {
          const isSelected = activeSheetBiz?.id === biz.id;
          return (
            <div
              key={biz.id}
              onClick={() => setActiveSheetBiz(biz)}
              style={{
                top: `${biz.position.y}%`,
                left: `${biz.position.x}%`,
                width: `${biz.bubbleSize}px`,
                height: `${biz.bubbleSize}px`,
                transform: 'translate(-50%, -50%)',
              }}
              className={`absolute rounded-full cursor-pointer transition-all duration-300 bubble-drift flex flex-col items-center justify-center text-center p-2 shadow-lg ${
                isSelected
                  ? 'ring-4 ring-[#EE9A22] scale-110 z-20'
                  : 'hover:scale-105 z-10'
              }`}
            >
              {/* Bubble Background with blur & tint */}
              <div
                className="absolute inset-0 rounded-full opacity-90 transition-transform"
                style={{
                  background: `radial-gradient(circle at 35% 35%, #fff 0%, ${biz.themeColor} 100%)`,
                }}
              />

              {/* Bubble Content */}
              <div className="relative z-10 text-white flex flex-col items-center">
                <span className="font-['Fraunces'] text-lg sm:text-xl font-bold tracking-wider leading-none drop-shadow-xs">
                  {biz.initials}
                </span>
                <span className="text-[10px] sm:text-xs font-bold leading-tight mt-1 max-w-[85%] truncate drop-shadow-xs">
                  {biz.name}
                </span>
                <span className="text-[9px] bg-black/30 backdrop-blur-xs px-2 py-0.5 rounded-full mt-1">
                  {biz.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Preview Bottom Sheet when a bubble is tapped */}
      {activeSheetBiz && (
        <div className="fixed inset-x-0 bottom-0 z-40 bg-[#FAF4E8] border-t-2 border-[#40214B] rounded-t-3xl p-5 shadow-2xl transition-transform animate-in slide-in-from-bottom">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-['Fraunces'] font-bold text-lg shadow-sm"
                style={{ backgroundColor: activeSheetBiz.themeColor }}
              >
                {activeSheetBiz.initials}
              </div>
              <div>
                <h3 className="font-['Fraunces'] text-lg font-bold text-[#2A1830] leading-tight">
                  {activeSheetBiz.name}
                </h3>
                <p className="text-xs text-[#7A697D]">
                  {activeSheetBiz.category} · {activeSheetBiz.followers.toLocaleString()} Followers
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveSheetBiz(null)}
              className="p-1 rounded-full text-[#7A697D] hover:bg-[#F3EAD9]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Opening Note snippet */}
          <div className="p-3 bg-[#F3EAD9] rounded-2xl mb-4 border border-[#40214B]/10">
            <span className="text-[10px] font-bold uppercase text-[#EE9A22] block mb-1">
              Opening Note
            </span>
            <p className="text-xs text-[#40214B] italic leading-relaxed">
              “{activeSheetBiz.openingNote}”
            </p>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                onOpenStorefront(activeSheetBiz.id);
                setActiveSheetBiz(null);
              }}
              className="w-full bg-[#40214B] hover:bg-[#2A1830] text-[#FAF4E8] font-bold text-xs py-2.5 rounded-full shadow-md transition-all"
            >
              View Full Stage
            </button>

            <a
              href={`https://wa.me/${activeSheetBiz.contactHandle.replace('+', '')}?text=Hi%20${encodeURIComponent(activeSheetBiz.name)},%20I%20found%20you%20on%20Stage!`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full border border-[#40214B] text-[#40214B] hover:bg-[#40214B]/10 font-bold text-xs py-2.5 rounded-full text-center transition-all"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}

    </div>
  );
}
