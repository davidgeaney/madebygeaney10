'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import AboutHero from '@/components/sections/AboutHero';
import FullWidthImage from '@/components/sections/FullWidthImage';
import WorkApproach from '@/components/sections/WorkApproach';
import ContactCTA from '@/components/sections/ContactCTA';

const navLinks = [
  { name: 'Home', href: '/', underlineWidth: '70%' },
  { name: 'Work', href: '/work', underlineWidth: '45%' },
  { name: 'About', href: '/about', underlineWidth: '50%' },
  { name: 'Services', href: '/services', underlineWidth: '70%' },
  { name: 'Journal (soon)', href: '#', underlineWidth: '100%' },
  { name: 'Contact', href: '/contact', underlineWidth: '65%' },
];

export default function AboutPage() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-40">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image 
                src="/madebygeaneylogo.svg" 
                alt="MADE BY GEANEY" 
                width={90} 
                height={18}
                className="h-[18px] w-auto"
                priority
              />
            </Link>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative group text-base font-normal transition-colors ${pathname === link.href ? 'text-foreground' : 'text-text-muted hover:text-foreground'}`}
                >
                  {link.name}
                  {pathname !== link.href && (
                    <span 
                      className="absolute left-0 -bottom-0.5 h-[0.5px] w-0 bg-foreground transition-all duration-300 ease-out group-hover:w-[var(--underline-width)]"
                      style={{ '--underline-width': link.underlineWidth } as React.CSSProperties}
                    />
                  )}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* CTA Button */}
          <div className="hidden md:block w-full md:w-auto">
            <a
              href="mailto:hello@madebygeaney.com"
              className="inline-flex items-center text-md font-medium hover:text-accent transition-colors w-full md:w-auto justify-center md:justify-start"
            >
              Start your project <span className="ml-1">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Background pattern */}
      <div className="fixed inset-0 -z-10 opacity-5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
        <div className="absolute inset-0 bg-grid-white/20 [mask-image:linear-gradient(0deg,#000,transparent)]" />
      </div>
      
      <main className="m-0 p-0">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-32 md:pt-48">
          <AboutHero />
          
          {/* Full Width Image Section */}
          <div className="mt-24 md:mt-32">
            <FullWidthImage 
              src="/projects/classcoverimage.webp"
              alt="ClassCover project showcase"
              className="mt-16"
            />
          </div>
          
          <WorkApproach />
        </div>
        
        <ContactCTA />
      </main>
    </div>
  );
}
