'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import ServicesHero from '@/components/sections/ServicesHero';
import ContactCTA from '@/components/sections/ContactCTA';
import MobileMenu from '@/components/ui/MobileMenu';

const ContactPanel = dynamic(() => import('@/components/ContactPanel'), { ssr: false });

export default function ServicesPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Menu */}
      <MobileMenu onContactClick={() => setIsContactOpen(true)} />
      
      <main className="m-0 p-0">
        <ServicesHero />
        <ContactCTA />
        <ContactPanel 
          isOpen={isContactOpen} 
          onClose={() => setIsContactOpen(false)} 
        />
      </main>
    </div>
  );
}
