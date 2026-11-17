'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhatWeDo from '@/components/WhatWeDo';
import PeopleCarousel from '@/components/PeopleCarousel';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#EBE1CF]">
      {/* 1. Minimalist Top Navigation */}
      <Navbar />

      {/* 2. Hero Section: Direct Statement of What We Do & Dual Entry Fork */}
      <Hero />

      {/* 3. What We Do & How We Are Helping the Customer */}
      <WhatWeDo />

      {/* 4. Carousel of Creators/People on Our Platform */}
      <PeopleCarousel />

      {/* 5. Testimonials from Performers & Audience */}
      <Testimonials />

      {/* 6. CTA: Call to Action leading directly to /app */}
      <CTA />

      {/* 7. Footer */}
      <Footer />
    </main>
  );
}
