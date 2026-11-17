'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Smartphone, Theater } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-24 md:py-32 bg-[#FAF4E8] border-t border-[#40214B]/10 text-center px-5">
      <div className="max-w-4xl mx-auto">
        
        {/* Simple Badge */}
        <div className="inline-flex items-center gap-1.5 bg-[#EBE1CF] px-3.5 py-1 rounded-full text-xs font-bold text-[#40214B] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#EE9A22] fill-[#EE9A22]" />
          <span>Stage Web App</span>
        </div>

        {/* Large, unboxed, straight-on-the-page CTA Headline */}
        <h2 className="font-['Fraunces'] text-4xl sm:text-6xl md:text-7xl font-semibold text-[#2A1830] tracking-tight leading-[1.08] mb-6">
          Ready to step onto <br />
          <span className="italic font-normal text-[#40214B]">the Stage?</span>
        </h2>

        {/* Clear, simple subtext */}
        <p className="max-w-xl mx-auto text-base sm:text-lg text-[#6D5B70] leading-relaxed mb-10">
          Whether you make things with your hands or love discovering unique creators — our web app is live, interactive, and free to explore.
        </p>

        {/* Direct, prominent action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Link
            href="/app"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#40214B] hover:bg-[#2A1830] text-[#FAF4E8] font-bold text-sm sm:text-base px-8 py-4 rounded-full transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
          >
            <Smartphone className="w-4 h-4 text-[#EE9A22]" />
            Launch The Web App
            <ArrowRight className="w-4 h-4 text-[#EE9A22]" />
          </Link>

          <Link
            href="/app"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F3EAD9] hover:bg-white text-[#40214B] font-bold text-sm sm:text-base px-7 py-4 rounded-full border border-[#40214B]/15 transition-all"
          >
            <Theater className="w-4 h-4 text-[#40214B]" />
            Explore As Shopper
          </Link>
        </div>

        <p className="mt-8 text-xs text-[#7A697D]">
          Works on all devices · No signup needed to browse
        </p>

      </div>
    </section>
  );
}
