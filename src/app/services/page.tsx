import React from 'react';
import ServicesHero from '@/components/sections/ServicesHero';
import ContactCTA from '@/components/sections/ContactCTA';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="m-0 p-0">
        <ServicesHero />
        <ContactCTA />
      </main>
    </div>
  );
}
