'use client';

import React, { useState } from 'react';
import { Clock, Check, Sparkles, ShoppingBag } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CustomizerProps {
  onAddToCart: (customizedItem: any) => void;
}

export default function CustomizerView({ onAddToCart }: CustomizerProps) {
  const [engravedName, setEngravedName] = useState('Amara');
  const [selectedFont, setSelectedFont] = useState<'script' | 'serif' | 'block'>('script');
  const [selectedColor, setSelectedColor] = useState({
    name: 'Amber',
    fill: '#D98B2B',
  });
  const [isAdded, setIsAdded] = useState(false);

  const colors = [
    { name: 'Amber', fill: '#D98B2B' },
    { name: 'Blush', fill: '#E6A79E' },
    { name: 'Sage', fill: '#9FB28C' },
    { name: 'Ink', fill: '#2F2436' },
  ];

  const fonts = [
    { id: 'script', label: 'Script', family: "'Pinyon Script', cursive" },
    { id: 'serif', label: 'Serif', family: "'Fraunces', Georgia, serif" },
    { id: 'block', label: 'Block', family: "'Bricolage Grotesque', sans-serif" },
  ];

  const basePrice = 8500;
  const customFee = engravedName.trim().length > 0 ? 1500 : 0;
  const totalPrice = basePrice + customFee;

  const handleAdd = () => {
    setIsAdded(true);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.8 },
      colors: [selectedColor.fill, '#EE9A22', '#40214B'],
    });

    onAddToCart({
      id: 'p3-custom',
      name: `Amber Glow Candle (${engravedName || 'Bespoke'})`,
      price: totalPrice,
      sellerId: 'gm',
      sellerName: 'Gifted by Mimi',
      category: 'Gifts',
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&auto=format&fit=crop&q=70',
      customization: {
        engravedName,
        font: selectedFont,
        colorName: selectedColor.name,
      },
    });

    setTimeout(() => setIsAdded(false), 2500);
  };

  return (
    <div className="pb-28">
      
      {/* Header */}
      <div className="p-4 bg-[#FAF4E8] border-b border-[#40214B]/10">
        <h2 className="font-['Fraunces'] text-2xl font-bold text-[#40214B]">
          Make It Yours
        </h2>
        <p className="text-xs text-[#7A697D]">
          Live Bespoke Engraving · Gifted by Mimi
        </p>
      </div>

      {/* Real-time SVG Canvas Preview of Candle Jar */}
      <div className="mx-4 my-4 h-[260px] rounded-3xl bg-[radial-gradient(70%_62%_at_50%_42%,#FFF3DC,#EFDFC2_72%)] flex items-center justify-center relative overflow-hidden border border-[#40214B]/10 shadow-inner">
        
        <svg
          viewBox="0 0 240 260"
          className="w-56 h-auto drop-shadow-xl"
          role="img"
          aria-label="Interactive candle visualization"
        >
          <defs>
            <linearGradient id="glassG" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity=".4" />
              <stop offset=".2" stopColor="#fff" stopOpacity=".05" />
              <stop offset=".78" stopColor="#000" stopOpacity="0" />
              <stop offset="1" stopColor="#000" stopOpacity=".24" />
            </linearGradient>
            <radialGradient id="glow" cx=".5" cy=".5" r=".5">
              <stop offset="0" stopColor="#ffd27a" stopOpacity=".8" />
              <stop offset="1" stopColor="#ffd27a" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Shadow beneath jar */}
          <ellipse cx="120" cy="238" rx="80" ry="9" fill="#5a3a20" opacity=".22" />

          {/* Warm Flame Glow */}
          <circle cx="120" cy="50" r="48" fill="url(#glow)" />
          
          {/* Candle Wick */}
          <path d="M120 80V60" stroke="#3a2a22" strokeWidth="3" strokeLinecap="round" />

          {/* Animated Dancing Flame */}
          <g className="flame-anim">
            <path d="M120 22c9 12 12 20 12 27a12 12 0 0 1-24 0c0-7 3-14 12-27z" fill="#F7B23B" />
            <path d="M120 35c5 7 7 11 7 15a7 7 0 0 1-14 0c0-4 2-8 7-15z" fill="#FFF0B8" />
          </g>

          {/* Colored Glass Jar */}
          <rect
            x="50"
            y="78"
            width="140"
            height="154"
            rx="20"
            fill={selectedColor.fill}
            className="transition-colors duration-500"
          />
          <rect x="50" y="78" width="140" height="154" rx="20" fill="url(#glassG)" />
          <rect x="46" y="72" width="148" height="12" rx="6" fill="#C99A4E" />

          {/* Label Background */}
          <rect x="68" y="118" width="104" height="76" rx="8" fill="#FAF4E8" />
          <rect
            x="73"
            y="123"
            width="94"
            height="66"
            rx="5"
            fill="none"
            stroke="#40214B"
            strokeOpacity=".22"
          />

          {/* Live Dynamic Custom Engraved Label Text */}
          <text
            x="120"
            y="158"
            textAnchor="middle"
            fill="#40214B"
            style={{
              fontFamily:
                selectedFont === 'script'
                  ? "'Pinyon Script', cursive"
                  : selectedFont === 'serif'
                  ? "'Fraunces', serif"
                  : "'Bricolage Grotesque', sans-serif",
              fontSize: selectedFont === 'script' ? '24px' : selectedFont === 'serif' ? '18px' : '15px',
              fontWeight: selectedFont === 'block' ? 800 : 500,
            }}
          >
            {engravedName.trim() || 'Your Name'}
          </text>

          <text
            x="120"
            y="180"
            textAnchor="middle"
            fontSize="6.5"
            letterSpacing="1.6"
            fill="#7A697D"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700 }}
          >
            AMBER GLOW · 200 G
          </text>
        </svg>

        <span className="absolute top-3 right-3 bg-black/40 backdrop-blur-xs text-white text-[9px] font-bold px-2.5 py-1 rounded-full">
          Live Preview
        </span>
      </div>

      {/* Customization Controls Form */}
      <div className="px-4 space-y-4">
        
        {/* Input Name */}
        <div>
          <label className="text-xs font-bold text-[#40214B] block mb-1.5">
            Personalised Name or Message
          </label>
          <input
            type="text"
            value={engravedName}
            maxLength={14}
            onChange={(e) => setEngravedName(e.target.value)}
            placeholder="e.g. Amara, With Love…"
            className="w-full px-4 py-2.5 bg-white rounded-xl text-xs font-medium border border-[#40214B]/15 focus:outline-none focus:border-[#40214B] shadow-2xs text-[#2A1830]"
          />
          <span className="text-[10px] text-[#7A697D] mt-1 block">
            Max 14 characters. Real-time preview above.
          </span>
        </div>

        {/* Font Style Toggle */}
        <div>
          <span className="text-xs font-bold text-[#40214B] block mb-1.5">
            Lettering Typography
          </span>
          <div className="grid grid-cols-3 gap-2">
            {fonts.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFont(f.id as any)}
                className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                  selectedFont === f.id
                    ? 'bg-[#40214B] text-[#FAF4E8] border-[#40214B] shadow-xs'
                    : 'bg-[#F3EAD9] text-[#7A697D] border-transparent hover:bg-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Jar Colour Palette Selector */}
        <div>
          <span className="text-xs font-bold text-[#40214B] block mb-1.5">
            Jar Colour: <span className="text-[#EE9A22]">{selectedColor.name}</span>
          </span>
          <div className="flex gap-3">
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c)}
                style={{ backgroundColor: c.fill }}
                className={`w-10 h-10 rounded-full transition-all shadow-md ${
                  selectedColor.name === c.name
                    ? 'ring-4 ring-[#40214B] ring-offset-2 scale-110'
                    : 'hover:scale-105 opacity-90'
                }`}
                title={c.name}
              />
            ))}
          </div>
        </div>

        {/* Production notice */}
        <div className="flex items-center gap-2 text-[11px] text-[#7A697D] pt-1">
          <Clock className="w-4 h-4 text-[#EE9A22]" />
          <span>Made to order in Lagos studio. Ready in 3 days.</span>
        </div>

        {/* Submit to Cart Button */}
        <div className="pt-2">
          <button
            onClick={handleAdd}
            className={`w-full py-3.5 rounded-full font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
              isAdded
                ? 'bg-[#E2532F] text-white'
                : 'bg-[#40214B] hover:bg-[#2A1830] text-[#FAF4E8]'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                Custom Candle Added to Bag!
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-[#EE9A22]" />
                Add to Bag · ₦{totalPrice.toLocaleString()}
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
