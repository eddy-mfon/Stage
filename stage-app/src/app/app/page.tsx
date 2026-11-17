'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Home,
  Compass,
  Sparkles,
  Moon,
  Palette,
  ShoppingBag,
  ArrowLeft,
  Share2
} from 'lucide-react';
import HomeFeedView from '@/components/app-views/HomeFeedView';
import ExploreBubblesView from '@/components/app-views/ExploreBubblesView';
import ShopTheLookView from '@/components/app-views/ShopTheLookView';
import DropsView from '@/components/app-views/DropsView';
import CustomizerView from '@/components/app-views/CustomizerView';
import StorefrontModal from '@/components/app-views/StorefrontModal';
import CartAndCheckoutView from '@/components/app-views/CartAndCheckoutView';
import { CartItem } from '@/types';

export default function AppPage() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeStorefrontId, setActiveStorefrontId] = useState<string | null>(null);
  const [highlightProductId, setHighlightProductId] = useState<string | undefined>(undefined);
  
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: {
        id: 'p1',
        name: 'Black Two-Piece Drape',
        price: 25000,
        sellerId: 'bc',
        sellerName: "Bella's Closet",
        sellerAvatar: 'BC',
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=70',
        aspectRatio: 0.78,
      },
      quantity: 1,
    },
    {
      product: {
        id: 'p3',
        name: 'Amber Glow Soy Candle',
        price: 8500,
        sellerId: 'gm',
        sellerName: 'Gifted by Mimi',
        sellerAvatar: 'GM',
        category: 'Gifts',
        image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&auto=format&fit=crop&q=70',
        aspectRatio: 0.84,
      },
      quantity: 1,
      customization: {
        engravedName: 'Amara',
        colorName: 'Amber',
      },
    },
  ]);

  const handleOpenStorefront = (businessId: string, initialProductId?: string) => {
    setActiveStorefrontId(businessId);
    setHighlightProductId(initialProductId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: any) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1, customization: product.customization }];
    });
  };

  const handleUpdateQty = (productId: string, qty: number) => {
    if (qty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.product.id === productId ? { ...item, quantity: qty } : item))
      );
    }
  };

  const handleClearCart = () => setCartItems([]);

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const navItems = [
    { id: 'home', label: 'Feed', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'look', label: 'Shop Look', icon: Sparkles },
    { id: 'drops', label: 'Drops', icon: Moon },
    { id: 'custom', label: 'Customise', icon: Palette },
  ];

  return (
    <div className="min-h-screen bg-[#EBE1CF] flex flex-col w-full">
      
      {/* Top Application Header */}
      <header className="sticky top-0 z-50 bg-[#FAF4E8]/95 backdrop-blur-md border-b border-[#40214B]/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-bold text-[#6D5B70] hover:text-[#40214B] bg-[#F3EAD9] px-3.5 py-1.5 rounded-full transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Landing Page</span>
          </Link>

          <button
            onClick={() => {
              setActiveStorefrontId(null);
              setActiveTab('home');
            }}
            className="flex items-center gap-2 group text-left"
          >
            <div className="w-8 h-8 rounded-full bg-[#40214B] text-[#EE9A22] flex items-center justify-center transition-transform group-hover:scale-105">
              <Sparkles className="w-4 h-4 fill-[#EE9A22]" />
            </div>
            <span className="font-['Fraunces'] text-2xl font-bold tracking-[0.14em] text-[#40214B]">
              STAGE
            </span>
          </button>
        </div>

        {/* Center navigation for large screens */}
        <nav className="hidden md:flex items-center gap-2 bg-[#F3EAD9]/80 p-1 rounded-full border border-[#40214B]/10">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id && !activeStorefrontId;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveStorefrontId(null);
                  setActiveTab(item.id);
                }}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#40214B] text-[#FAF4E8] shadow-xs'
                    : 'text-[#6D5B70] hover:text-[#40214B]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action icons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('cart')}
            className="relative p-2.5 rounded-full bg-[#FAF4E8] border border-[#40214B]/15 text-[#40214B] hover:bg-white shadow-2xs transition-colors"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#E2532F] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Full-width Responsive Stage App Surface */}
      <main className="flex-1 w-full bg-[#FAF4E8]">
        {activeStorefrontId ? (
          <StorefrontModal
            businessId={activeStorefrontId}
            highlightProductId={highlightProductId}
            onBack={() => setActiveStorefrontId(null)}
            onAddToCart={handleAddToCart}
          />
        ) : activeTab === 'cart' ? (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
            <CartAndCheckoutView
              items={cartItems}
              onUpdateQty={handleUpdateQty}
              onClearCart={handleClearCart}
              onBack={() => setActiveTab('home')}
            />
          </div>
        ) : activeTab === 'home' ? (
          <HomeFeedView
            onOpenStorefront={handleOpenStorefront}
            onAddToCart={handleAddToCart}
          />
        ) : activeTab === 'explore' ? (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
            <ExploreBubblesView
              onOpenStorefront={handleOpenStorefront}
              onSelectProduct={(pId) => {}}
            />
          </div>
        ) : activeTab === 'look' ? (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
            <ShopTheLookView onAddToCart={handleAddToCart} />
          </div>
        ) : activeTab === 'drops' ? (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
            <DropsView />
          </div>
        ) : activeTab === 'custom' ? (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
            <CustomizerView onAddToCart={handleAddToCart} />
          </div>
        ) : null}
      </main>

      {/* Floating Bottom Pill Nav (Visible on Mobile & Tablet) */}
      <div className="md:hidden fixed bottom-4 inset-x-4 z-40">
        <nav className="bg-white/95 backdrop-blur-md rounded-full px-2 py-1.5 shadow-[0_12px_30px_-8px_rgba(40,15,55,0.38),0_0_0_1px_rgba(64,33,75,0.08)] flex items-center justify-around border border-white/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id && !activeStorefrontId;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveStorefrontId(null);
                  setActiveTab(item.id);
                }}
                className={`relative flex flex-col items-center justify-center p-2 rounded-full transition-all ${
                  isActive ? 'text-[#40214B] scale-105' : 'text-[#8D7A90] hover:text-[#40214B]'
                }`}
                title={item.label}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {isActive && (
                  <div className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#EE9A22]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

    </div>
  );
}
