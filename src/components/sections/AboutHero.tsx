import React from 'react';

export default function AboutHero() {
  return (
    <div className="w-full pt-8 md:pt-12 pb-16 md:pb-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <span className="text-3xl md:text-4xl lg:text-5xl font-normal text-foreground">(01)</span>
          </div>
          
          <div className="lg:col-span-8 lg:col-start-4">
            <p className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] leading-[1.4] font-medium text-black w-full max-w-none pr-0">
              We're a web design agency that builds clean, effective websites focused on results. Our approach is straightforward: we listen to your needs, understand your business, and create solutions that work. We believe in clear communication, fair pricing, and delivering real value. Every project receives our full attention, from initial concept to final launch. We focus on what matters most—creating websites that help your business succeed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
