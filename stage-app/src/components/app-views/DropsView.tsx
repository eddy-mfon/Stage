'use client';

import React, { useState, useEffect } from 'react';
import { DROP_DATA } from '@/data/mockData';
import { Bell, Check, Eye, Clock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DropsView() {
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const [reminderSet, setReminderSet] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DROP_DATA.timeRemainingSeconds);
  const [upcomingReminders, setUpcomingReminders] = useState<Set<string>>(new Set());

  // Countdown timer decrement
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = String(Math.floor(timeLeft / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  const toggleCurtain = () => {
    const nextState = !isCurtainOpen;
    setIsCurtainOpen(nextState);
    if (nextState) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#EE9A22', '#40214B', '#FAF4E8']
      });
    }
  };

  const toggleUpcoming = (id: string) => {
    setUpcomingReminders((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="pb-28">
      
      {/* Header */}
      <div className="p-4 bg-[#FAF4E8] border-b border-[#40214B]/10 flex items-center justify-between">
        <div>
          <h2 className="font-['Fraunces'] text-2xl font-bold text-[#40214B]">
            Drops
          </h2>
          <p className="text-xs text-[#7A697D]">
            Curated small batches. Built for the moment.
          </p>
        </div>
        <span className="text-[11px] font-bold bg-[#EE9A22] text-[#2B1204] px-3 py-1 rounded-full shadow-2xs">
          Tonight
        </span>
      </div>

      {/* Theatrical Stage with Interactive Curtains */}
      <div className="relative mx-4 my-4 h-[300px] rounded-3xl overflow-hidden bg-[#1D0D26] shadow-xl border border-[#EE9A22]/30">
        
        {/* Theatre Stage Background */}
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_30%,#4D2560,#1D0D26_72%)]" />
        
        {/* Wooden stage floor */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#12071A] to-[#2C1436] border-t-2 border-[#EE9A22]" />

        {/* Spotlights */}
        <div
          className={`absolute inset-0 bg-[radial-gradient(48%_62%_at_50%_52%,rgba(255,224,160,0.5),transparent_72%)] transition-opacity duration-700 pointer-events-none ${
            isCurtainOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Mystery Teaser Model Silhouette */}
        <div
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-48 rounded-t-full overflow-hidden transition-all duration-700 ${
            isCurtainOpen ? 'opacity-100 blur-none scale-100' : 'opacity-20 blur-md scale-95'
          }`}
        >
          <img
            src={DROP_DATA.teaserImage}
            alt="Teaser silhouette"
            className="w-full h-full object-cover object-top filter brightness-90"
          />
        </div>

        {/* Curtains Left & Right with velvet pleats */}
        <div
          className={`absolute top-0 bottom-0 left-0 w-[52%] z-20 bg-[repeating-linear-gradient(90deg,#5B1F45_0_12px,#7C2E5E_12px_20px,#4A1838_20px_32px)] border-r-4 border-[#EE9A22] shadow-2xl transition-transform duration-1000 ease-out ${
            isCurtainOpen ? '-translate-x-[86%]' : 'translate-x-0'
          }`}
        />
        <div
          className={`absolute top-0 bottom-0 right-0 w-[52%] z-20 bg-[repeating-linear-gradient(90deg,#5B1F45_0_12px,#7C2E5E_12px_20px,#4A1838_20px_32px)] border-l-4 border-[#EE9A22] shadow-2xl transition-transform duration-1000 ease-out ${
            isCurtainOpen ? 'translate-x-[86%]' : 'translate-x-0'
          }`}
        />

        {/* Top Valance border */}
        <div className="absolute inset-x-0 top-0 h-7 z-30 bg-gradient-to-b from-[#3B1230] to-[#5B1F45] border-b-2 border-[#EE9A22]" />

        {/* Peek Behind Curtain Button */}
        <button
          onClick={toggleCurtain}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#FAF4E8] text-[#40214B] hover:bg-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 transition-transform active:scale-95 whitespace-nowrap"
        >
          <Eye className="w-3.5 h-3.5 text-[#EE9A22]" />
          {isCurtainOpen ? 'Close the curtain' : 'Peek behind the curtain'}
        </button>
      </div>

      {/* Drop Info & Countdown */}
      <div className="px-4">
        
        <div className="flex items-center gap-2 text-xs font-bold text-[#40214B] mb-1">
          <span className="w-5 h-5 rounded-full bg-[#40214B] text-[#EE9A22] text-[9px] flex items-center justify-center">
            {DROP_DATA.businessInitials}
          </span>
          <span>{DROP_DATA.businessName}</span>
        </div>

        <h3 className="font-['Fraunces'] text-2xl font-bold text-[#2A1830] leading-tight mb-1">
          {DROP_DATA.title}
        </h3>
        <p className="text-xs text-[#7A697D] leading-relaxed mb-4">
          {DROP_DATA.description}
        </p>

        {/* Live Countdown Display */}
        <div className="flex items-center justify-center gap-2 py-3 bg-[#F3EAD9] rounded-2xl mb-4 border border-[#40214B]/10">
          <div className="text-center min-w-[55px]">
            <span className="font-['Fraunces'] text-2xl font-bold text-[#40214B] block leading-none tabular-nums">
              {hours}
            </span>
            <small className="text-[10px] text-[#7A697D] uppercase font-bold">Hours</small>
          </div>
          <span className="text-lg font-bold text-[#40214B] pb-3">:</span>
          <div className="text-center min-w-[55px]">
            <span className="font-['Fraunces'] text-2xl font-bold text-[#40214B] block leading-none tabular-nums">
              {minutes}
            </span>
            <small className="text-[10px] text-[#7A697D] uppercase font-bold">Mins</small>
          </div>
          <span className="text-lg font-bold text-[#40214B] pb-3">:</span>
          <div className="text-center min-w-[55px]">
            <span className="font-['Fraunces'] text-2xl font-bold text-[#40214B] block leading-none tabular-nums">
              {seconds}
            </span>
            <small className="text-[10px] text-[#7A697D] uppercase font-bold">Secs</small>
          </div>
        </div>

        {/* Set Reminder Button */}
        <button
          onClick={() => setReminderSet(!reminderSet)}
          className={`w-full py-3 rounded-full font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
            reminderSet
              ? 'bg-[#EBE1CF] text-[#40214B] border border-[#40214B]'
              : 'bg-[#40214B] hover:bg-[#2A1830] text-[#FAF4E8]'
          }`}
        >
          {reminderSet ? (
            <>
              <Check className="w-4 h-4 text-[#40214B]" />
              Reminder Set · You will be notified at 7:00 PM
            </>
          ) : (
            <>
              <Bell className="w-4 h-4 text-[#EE9A22]" />
              Remind Me When Curtain Opens
            </>
          )}
        </button>

        {/* Upcoming Drops Section */}
        <div className="mt-8">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A697D] mb-3">
            Coming Up This Week
          </h4>
          <div className="space-y-2.5">
            {DROP_DATA.upcoming.map((up) => {
              const isReminded = upcomingReminders.has(up.id);
              return (
                <div
                  key={up.id}
                  className="p-3 bg-[#FAF4E8] rounded-2xl flex items-center justify-between border border-[#40214B]/10 shadow-2xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: up.color }}
                    >
                      {up.initials}
                    </span>
                    <div>
                      <b className="text-xs text-[#2A1830] block">{up.business}</b>
                      <small className="text-[10px] text-[#7A697D]">{up.tagline}</small>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleUpcoming(up.id)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isReminded ? 'bg-[#40214B] text-white' : 'border border-[#40214B]/30 text-[#40214B]'
                    }`}
                  >
                    {isReminded ? <Check className="w-3.5 h-3.5" /> : <Bell className="w-3.5 h-3.5" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
