'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Hero from "@/components/sections/Hero";
import Portfolio from "@/components/sections/Portfolio";
import ContactCTA from "@/components/sections/ContactCTA";
import MobileMenu from '@/components/ui/MobileMenu';

const ContactPanel = dynamic(() => import('@/components/ContactPanel'), { ssr: false });

export default function HomePage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Menu */}
      <MobileMenu onContactClick={() => setIsContactOpen(true)} />
      
      <main className="m-0 p-0">
        <Hero />
        <Portfolio />
        <ContactCTA />
        <ContactPanel 
          isOpen={isContactOpen} 
          onClose={() => setIsContactOpen(false)} 
        />
      </main>
    </div>
  );
}