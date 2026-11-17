'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Theater, HeartHandshake, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-16 pb-20 md:pt-24 md:pb-28 text-center px-5">
      <div className="max-w-4xl mx-auto">
        
        {/* Simple badge */}
        <div className="inline-flex items-center gap-1.5 bg-[#FAF4E8] border border-[#40214B]/15 px-3.5 py-1 rounded-full shadow-2xs mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#EE9A22] fill-[#EE9A22]" />
          <span className="text-xs uppercase tracking-widest font-bold text-[#40214B]">
            Where Small Businesses Shine
          </span>
        </div>

        {/* Clear, direct headline */}
        <h1 className="font-['Fraunces'] text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-[#2A1830] leading-[1.08] mb-6">
          Discover a person, <br />
          <span className="italic font-normal text-[#40214B]">not just a product.</span>
        </h1>

        {/* Straight to the point explanation */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#6D5B70] leading-relaxed mb-10">
          Stage gives independent creators a real storefront online. Instead of scrolling past nameless products, you meet the person behind the craft, read their story, and order directly from them.
        </p>

        {/* Two plain, obvious paths */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-12">
          
          <Link
            href="/app"
            className="group flex flex-col items-start p-6 text-left rounded-3xl bg-[#FAF4E8] hover:bg-white border-2 border-[#40214B]/10 hover:border-[#40214B] transition-all shadow-xs hover:shadow-lg hover:-translate-y-0.5"
          >
            <div className="w-9 h-9 rounded-2xl bg-[#EE9A22]/20 text-[#EE9A22] flex items-center justify-center mb-3">
              <Theater className="w-4 h-4 text-[#C97D12]" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#EE9A22] mb-0.5">
              Shoppers
            </span>
            <h3 className="font-['Fraunces'] text-xl font-bold text-[#2A1830] flex items-center gap-1.5 mb-1">
              I’m here for the show
              <ArrowRight className="w-4 h-4 text-[#40214B] group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-[#7A697D]">
              Explore maker stories, custom goods, and live product drops.
            </p>
          </Link>

          <Link
            href="/app"
            className="group flex flex-col items-start p-6 text-left rounded-3xl bg-[#FAF4E8] hover:bg-white border-2 border-[#40214B]/10 hover:border-[#40214B] transition-all shadow-xs hover:shadow-lg hover:-translate-y-0.5"
          >
            <div className="w-9 h-9 rounded-2xl bg-[#40214B]/10 text-[#40214B] flex items-center justify-center mb-3">
              <HeartHandshake className="w-4 h-4 text-[#40214B]" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#40214B] mb-0.5">
              Creators & Brands
            </span>
            <h3 className="font-['Fraunces'] text-xl font-bold text-[#2A1830] flex items-center gap-1.5 mb-1">
              I’m here to perform
              <ArrowRight className="w-4 h-4 text-[#40214B] group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-[#7A697D]">
              Set up your Stage, share your story, and receive orders on WhatsApp.
            </p>
          </Link>

        </div>

        {/* Honest trust points */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#7A697D]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#40214B]" /> No paid ads altering search rankings
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#EE9A22]" /> Talk and order directly with the maker
          </span>
        </div>

      </div>
    </section>
  );
}
