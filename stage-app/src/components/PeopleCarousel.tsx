'use client';

import React, { useState } from 'react';
import { CAROUSEL_PEOPLE } from '@/data/mockData';
import { ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';

export default function PeopleCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? CAROUSEL_PEOPLE.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx === CAROUSEL_PEOPLE.length - 1 ? 0 : prevIdx + 1));
  };

  return (
    <section id="creators" className="py-20 md:py-28 overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-5">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EE9A22] block mb-2">
              People On Our Platform
            </span>
            <h2 className="font-['Fraunces'] text-3xl sm:text-5xl font-semibold text-[#2A1830] tracking-tight">
              Meet real makers sharing their passion.
            </h2>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border border-[#40214B]/20 bg-[#FAF4E8] hover:bg-white text-[#40214B] flex items-center justify-center transition-all shadow-2xs hover:shadow-md active:scale-95"
              aria-label="Previous person"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="w-11 h-11 rounded-full border border-[#40214B]/20 bg-[#FAF4E8] hover:bg-white text-[#40214B] flex items-center justify-center transition-all shadow-2xs hover:shadow-md active:scale-95"
              aria-label="Next person"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CAROUSEL_PEOPLE.slice(0, 3).map((person, idx) => (
            <div
              key={person.id}
              className="group rounded-3xl overflow-hidden bg-[#FAF4E8] border border-[#40214B]/10 hover:border-[#40214B]/30 transition-all shadow-xs hover:shadow-lg flex flex-col justify-between"
            >
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#2B2220]">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A1830] via-transparent to-transparent opacity-85" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-[#FAF4E8] bg-[#EE9A22] px-2.5 py-0.5 rounded-full inline-block mb-1 shadow-2xs">
                    {person.niche}
                  </span>
                  <h3 className="font-['Fraunces'] text-2xl font-bold leading-tight">
                    {person.name}
                  </h3>
                  <p className="text-xs text-[#FAF4E8]/80">{person.handle}</p>
                </div>
              </div>

              <div className="p-6 bg-[#FAF4E8] flex-1 flex flex-col justify-between">
                <div className="flex items-start gap-3">
                  <Quote className="w-4 h-4 text-[#EE9A22] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-[#40214B] font-medium italic leading-relaxed">
                    “{person.note}”
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#40214B]/10 flex items-center justify-between text-xs text-[#7A697D]">
                  <span>Live on Stage</span>
                  <span className="font-bold text-[#40214B] group-hover:text-[#EE9A22] transition-colors">
                    View on App →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
