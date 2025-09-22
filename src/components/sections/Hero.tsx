"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import MobileMenu from '../ui/MobileMenu';

const ContactPanel = dynamic(() => import('../ContactPanel'), { ssr: false });

const navLinks = [
  { name: 'Home', href: '/', underlineWidth: '70%' },
  { name: 'Work', href: '/work', underlineWidth: '45%' },
  { name: 'About', href: '/about', underlineWidth: '50%' },
  { name: 'Services', href: '/services', underlineWidth: '70%' },
  { name: 'Journal (soon)', href: '#', underlineWidth: '100%' },
  { name: 'Contact', href: '#', onClick: true, underlineWidth: '65%' },
];

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com', underlineWidth: '100%' },
  { name: 'LinkedIn', href: 'https://linkedin.com', underlineWidth: '90%' },
  { name: 'Twitter', href: 'https://twitter.com', underlineWidth: '75%' },
  { name: 'Dribbble', href: 'https://dribbble.com', underlineWidth: '90%' },
];

const Hero = () => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="pt-8 pb-10 px-4 sm:px-6 md:px-8 lg:px-12 bg-background text-foreground">
      {/* Mobile Menu */}
      <MobileMenu onContactClick={() => setIsContactOpen(true)} />
      
      <div className="w-full max-w-[1600px] mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-10 lg:gap-20">
        {/* Logo */}
        <div className="flex justify-between items-center md:block">
          <Image 
            src="/madebygeaneylogo.svg" 
            alt="MADE BY GEANEY" 
            width={90} 
            height={18}
            className="h-[18px] w-auto"
            priority
          />
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden md:flex flex-col">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={(e) => {
                if (link.onClick) {
                  e.preventDefault();
                  setIsContactOpen(true);
                }
              }}
              className={`group relative text-base font-normal transition-colors cursor-pointer ${pathname === link.href ? 'text-foreground' : 'text-text-muted hover:text-foreground'}`}
            >
              {link.name}
              {pathname !== link.href && (
                <span 
                  className="absolute left-0 -bottom-0.5 h-[0.5px] w-0 bg-foreground transition-all duration-300 ease-out group-hover:w-[var(--underline-width)]"
                  style={{ '--underline-width': link.underlineWidth } as React.CSSProperties}
                ></span>
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Social Links - Hidden on mobile */}
        <div className="hidden md:flex flex-col">
          {socialLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`group relative text-base font-normal transition-colors ${pathname === link.href ? 'text-foreground' : 'text-text-muted hover:text-foreground'}`}
            >
              {link.name}
              <span 
                className="absolute left-0 -bottom-0.5 h-[0.5px] w-0 bg-foreground transition-all duration-300 ease-out group-hover:w-[var(--underline-width)]"
                style={{ '--underline-width': link.underlineWidth } as React.CSSProperties}
              ></span>
            </a>
          ))}
        </div>

        {/* About Section - Full width on mobile, normal on desktop */}
        <div className="md:max-w-lg w-full mt-8 md:mt-0">
          <p className="text-base font-medium text-muted-foreground">About Us</p>
          <p className="text-base font-normal text-text-muted max-w-sm">
            We build fully custom websites quickly and efficiently. Working with businesses that care about smart design, strong functionality, and results they can see.
          </p>
        </div>

        {/* Start Project Button - Hidden on mobile, visible on desktop */}
        <div className="hidden md:block whitespace-nowrap">
          <a
            href="mailto:hello@jillesdesign.com"
            className="group relative inline-flex items-center text-sm md:text-base font-medium text-text-primary transition-colors"
          >
            Start your project <span className="ml-1">→</span>
            <span className="absolute left-0 -bottom-0.5 h-[0.5px] w-0 bg-foreground transition-all duration-300 ease-out group-hover:w-full"></span>
          </a>
        </div>
      </div>
      <ContactPanel 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </div>
  );
};

export default Hero;