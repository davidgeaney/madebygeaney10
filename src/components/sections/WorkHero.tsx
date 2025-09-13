"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import MobileMenu from '../ui/MobileMenu';
import Projects from './Projects';

const navLinks = [
  { name: 'Home, ', href: '/', underlineWidth: '100%' },
  { name: 'Work, ', href: '/work', underlineWidth: '100%' },
  { name: 'About, ', href: '/about', underlineWidth: '100%' },
  { name: 'Services, ', href: '/services', underlineWidth: '100%' },
  { name: 'Journal (soon), ', href: '#', underlineWidth: '100%' },
  { name: 'Contact', href: '/contact', underlineWidth: '100%' },
];

const WorkHero = () => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Don't render anything on mobile as we'll use the MobileMenu
  if (isMobile) return null;

  // Projects are now managed in the Projects component

  return (
    <div className="pt-8 pb-20 md:pb-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-background text-foreground">
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo and Navigation Links */}
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

        {/* Page Title */}
        <div className="mt-28 md:mt-32 lg:mt-36 mb-12 md:mb-16 flex items-center">
          <span className="text-2xl md:text-3xl lg:text-4xl font-medium mr-48 md:mr-64 lg:mr-80">(01)</span>
          <div className="flex-1 text-left">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-medium">
              Selected works 18' - present
            </h1>
          </div>
          <div className="text-4xl ml-8 md:ml-16 lg:ml-24">
            ↓
          </div>
        </div>

        {/* Projects Section */}
        <Projects />
      </div>
    </div>
  );
};

export default WorkHero;
