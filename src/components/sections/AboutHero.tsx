import React from 'react';

export default function AboutHero() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-16 lg:mt-24">
      {/* Left side - Number */}
      <div className="lg:col-span-1 lg:col-start-2">
        <span className="text-3xl md:text-4xl lg:text-5xl font-normal text-foreground">(01)</span>
      </div>
      
      {/* Right side - Content */}
      <div className="lg:col-span-9 lg:col-start-3">
        <p className="text-[24px] md:text-[40px] leading-[1.3] font-medium text-black max-w-[90%] lg:max-w-[95%] -ml-4">
          I'm an independent designer and developer focused on high-end websites, digital products, and creative systems, built for quality, and impact. I work solo, so you work directly with me. No handoffs, no middlemen. Every project gets my full attention, from first idea to final delivery. I'm fast, but only when quality allows it. If it's not perfect, it doesn't ship.
        </p>
      </div>
    </div>
  );
}
