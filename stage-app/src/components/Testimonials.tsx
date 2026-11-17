'use client';

import React from 'react';
import { TESTIMONIALS } from '@/data/mockData';
import { Star, ShieldCheck, Heart } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-[#FAF4E8]/60 border-t border-[#40214B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#EE9A22] mb-3">
            <Heart className="w-4 h-4 fill-[#EE9A22]" />
            Real Relationships, Real Sales
          </div>
          <h2 className="font-['Fraunces'] text-3xl sm:text-5xl font-semibold text-[#2A1830] tracking-tight mb-4">
            Hear from performers and the audience rooting for them.
          </h2>
          <p className="text-base text-[#6D5B70]">
            Proof that when creators bring their authentic voice and craftsmanship forward, strangers become loyal supporters.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-[#FAF4E8] p-8 rounded-3xl border border-[#40214B]/10 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#EE9A22] mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-['Fraunces'] text-lg text-[#2A1830] font-normal italic leading-relaxed mb-6">
                  “{item.quote}”
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-[#40214B]/10">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#EE9A22]"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm text-[#2A1830]">{item.name}</h3>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#40214B]" />
                  </div>
                  <p className="text-xs text-[#7A697D]">{item.role}</p>
                </div>
                <span className="ml-auto text-[10px] font-bold uppercase tracking-wider bg-[#EBE1CF] text-[#40214B] px-2.5 py-1 rounded-full">
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
