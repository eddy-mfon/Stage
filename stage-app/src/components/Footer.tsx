'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2A1830] text-[#FAF4E8] pt-16 pb-12 border-t border-[#40214B]">
      <div className="max-w-6xl mx-auto px-5">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#FAF4E8] text-[#40214B] flex items-center justify-center">
                <Sparkles className="w-4 h-4 fill-[#EE9A22] text-[#EE9A22]" />
              </div>
              <span className="font-['Fraunces'] text-2xl font-bold tracking-[0.16em] text-[#FAF4E8]">
                STAGE
              </span>
            </Link>
            <p className="text-xs text-[#B2A2B5] leading-relaxed">
              Where independent creators take the spotlight and shoppers find a person, not just a product.
            </p>
          </div>

          {/* App Views Col */}
          <div>
            <h4 className="font-['Fraunces'] text-sm font-bold uppercase tracking-wider text-[#EE9A22] mb-3">
              App Experiences
            </h4>
            <ul className="space-y-2 text-xs text-[#DCCBE2]">
              <li><Link href="/app" className="hover:text-white transition-colors">Pinterest-Style Feed</Link></li>
              <li><Link href="/app" className="hover:text-white transition-colors">Shout Bubbles Galaxy</Link></li>
              <li><Link href="/app" className="hover:text-white transition-colors">Shop the Look</Link></li>
              <li><Link href="/app" className="hover:text-white transition-colors">Drop Night with Curtains</Link></li>
              <li><Link href="/app" className="hover:text-white transition-colors">Live Product Customizer</Link></li>
            </ul>
          </div>

          {/* For Creators */}
          <div>
            <h4 className="font-['Fraunces'] text-sm font-bold uppercase tracking-wider text-[#EE9A22] mb-3">
              For Makers
            </h4>
            <ul className="space-y-2 text-xs text-[#DCCBE2]">
              <li><Link href="/app" className="hover:text-white transition-colors">Set up your Stage</Link></li>
              <li><a href="#what-we-do" className="hover:text-white transition-colors">The Opening Note</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">WhatsApp Order Routing</a></li>
              <li><a href="#what-we-do" className="hover:text-white transition-colors">Zero Commission Cuts</a></li>
            </ul>
          </div>

          {/* Ethos */}
          <div>
            <h4 className="font-['Fraunces'] text-sm font-bold uppercase tracking-wider text-[#EE9A22] mb-3">
              Our Promise
            </h4>
            <p className="text-xs text-[#B2A2B5] leading-relaxed mb-3">
              Money can buy tools and amplification. It can never buy trust, ranking, or relevance.
            </p>
            <span className="inline-block text-[11px] text-[#EE9A22] bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              Real creators · Real craft
            </span>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#B2A2B5] gap-4">
          <p>© 2026 STAGE. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-xs">
            <span>Built with care for independent businesses.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
