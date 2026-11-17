'use client';

import React from 'react';
import Link from 'next/link';
import { Feather, Radio, Palette, Heart, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';

export default function WhatWeDo() {
  const steps = [
    {
      icon: Feather,
      title: 'The Opening Note',
      description: 'Before seeing a price, customers read why you started or what you want people to feel. You connect as a person first.',
    },
    {
      icon: Radio,
      title: 'Shout Bubbles',
      description: 'Explore is an active field of businesses. Every few seconds, makers shout their latest restock, fresh drops, or studio news.',
    },
    {
      icon: Palette,
      title: 'Live Customization',
      description: 'Shoppers personalize items in real-time. Type a name or message, choose colours, and see the finished piece right on screen.',
    },
    {
      icon: Heart,
      title: 'Theatrical Drops',
      description: 'Instead of items quietly appearing in feeds, schedule a moment. Shoppers peek behind the curtain and watch the countdown.',
    },
    {
      icon: ShoppingBag,
      title: 'Direct Message Orders',
      description: 'Items stay neatly grouped by maker. When checking out, orders route straight to your WhatsApp or Telegram with zero commission cuts.',
    },
    {
      icon: ShieldCheck,
      title: 'Trust Cannot Be Bought',
      description: 'Discovery is guided by genuine peer proof and real craft. No brand can pay to push down authentic independent creators.',
    },
  ];

  return (
    <section id="what-we-do" className="py-20 md:py-28 bg-[#FAF4E8]/60 border-y border-[#40214B]/10">
      <div className="max-w-6xl mx-auto px-5">
        
        {/* Simple Section Header */}
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EE9A22] block mb-2">
            What We Do
          </span>
          <h2 className="font-['Fraunces'] text-3xl sm:text-5xl font-semibold text-[#2A1830] tracking-tight mb-4">
            A real home online, built around people.
          </h2>
          <p className="text-base text-[#6D5B70] leading-relaxed">
            Most online platforms turn creators into identical tiles and charge money just to stay visible. Stage gives you a stage where customers root for you.
          </p>
        </div>

        {/* Feature Grid with Simple Copy */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAF4E8] p-7 rounded-3xl border border-[#40214B]/10 hover:border-[#40214B]/30 hover:bg-white transition-all shadow-2xs hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-[#EBE1CF] text-[#40214B] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-['Fraunces'] text-xl font-bold text-[#2A1830] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7A697D] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* How It Helps the Customer: Step-by-Step Flow */}
        <div id="how-it-works" className="mt-20 pt-16 border-t border-[#40214B]/10">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EE9A22] block mb-2">
              How We Help
            </span>
            <h3 className="font-['Fraunces'] text-2xl sm:text-4xl font-semibold text-[#2A1830]">
              From first look to doorstep, kept clear and simple.
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[#FAF4E8] p-6 rounded-2xl border border-[#40214B]/10">
              <span className="font-['Fraunces'] text-2xl font-bold text-[#EE9A22] block mb-2">01</span>
              <h4 className="font-bold text-sm text-[#2A1830] mb-1">Meet the Maker</h4>
              <p className="text-xs text-[#7A697D] leading-normal">
                Discover independent shops on the feed or floating in bubbles. Read their opening note before checking prices.
              </p>
            </div>

            <div className="bg-[#FAF4E8] p-6 rounded-2xl border border-[#40214B]/10">
              <span className="font-['Fraunces'] text-2xl font-bold text-[#EE9A22] block mb-2">02</span>
              <h4 className="font-bold text-sm text-[#2A1830] mb-1">Make It Personal</h4>
              <p className="text-xs text-[#7A697D] leading-normal">
                Customise gifts, select styles, or join scheduled drop nights where pieces are revealed all at once.
              </p>
            </div>

            <div className="bg-[#FAF4E8] p-6 rounded-2xl border border-[#40214B]/10">
              <span className="font-['Fraunces'] text-2xl font-bold text-[#EE9A22] block mb-2">03</span>
              <h4 className="font-bold text-sm text-[#2A1830] mb-1">Direct Checkout</h4>
              <p className="text-xs text-[#7A697D] leading-normal">
                Your order is formatted clearly and sent directly to the creator on WhatsApp or Telegram for quick personal fulfillment.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/app"
              className="inline-flex items-center gap-2 bg-[#40214B] hover:bg-[#2A1830] text-[#FAF4E8] font-bold text-xs sm:text-sm px-7 py-3 rounded-full transition-all shadow-sm hover:shadow-md"
            >
              Try the Experience in the App
              <ArrowRight className="w-4 h-4 text-[#EE9A22]" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
