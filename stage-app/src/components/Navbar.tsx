'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#EBE1CF]/90 border-b border-[#40214B]/10">
      <div className="max-w-6xl mx-auto px-5 h-18 flex items-center justify-between">
        
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-[#40214B] text-[#EE9A22] flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
            <Sparkles className="w-4 h-4 fill-[#EE9A22]" />
          </div>
          <span className="font-['Fraunces'] text-2xl font-bold tracking-[0.16em] text-[#40214B]">
            STAGE
          </span>
        </Link>

        {/* Simple navigation links */}
        <nav className="hidden sm:flex items-center gap-8 text-sm font-semibold text-[#6D5B70]">
          <a href="#what-we-do" className="hover:text-[#40214B] transition-colors">What we do</a>
          <a href="#how-it-works" className="hover:text-[#40214B] transition-colors">How it works</a>
          <a href="#creators" className="hover:text-[#40214B] transition-colors">People on Stage</a>
          <a href="#testimonials" className="hover:text-[#40214B] transition-colors">Stories</a>
        </nav>

        {/* Direct Action */}
        <Link
          href="/app"
          className="inline-flex items-center gap-2 bg-[#40214B] hover:bg-[#2A1830] text-[#FAF4E8] text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          Open App
          <ArrowRight className="w-3.5 h-3.5 text-[#EE9A22]" />
        </Link>

      </div>
    </header>
  );
}
