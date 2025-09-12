"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const navLinks = [
  { name: 'Home', href: '/', underlineWidth: '70%' },
  { name: 'Work', href: '/work', underlineWidth: '45%' },
  { name: 'About', href: '/about', underlineWidth: '50%' },
  { name: 'Services', href: '/services', underlineWidth: '70%' },
  { name: 'Journal (soon)', href: '#', underlineWidth: '100%' },
  { name: 'Contact', href: '/contact', underlineWidth: '65%' },
];

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com', underlineWidth: '100%' },
  { name: 'LinkedIn', href: 'https://linkedin.com', underlineWidth: '90%' },
  { name: 'Twitter', href: 'https://twitter.com', underlineWidth: '75%' },
  { name: 'Dribbble', href: 'https://dribbble.com', underlineWidth: '90%' },
];

const Hero = () => {
  const pathname = usePathname();
  return (
    <div className="pt-6 pb-10 px-6 md:px-8 lg:px-12 bg-background text-foreground">
      <div className="w-full max-w-[1600px] mx-auto flex justify-between items-start gap-10 md:gap-20">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image 
            src="/madebygeaneylogo.svg" 
            alt="MADE BY GEANEY" 
            width={90} 
            height={18}
            className="h-[18px] w-auto"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`group relative text-base font-normal transition-colors ${pathname === link.href ? 'text-foreground' : 'text-text-muted hover:text-foreground'}`}
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

        {/* Social Links */}
        <div className="flex flex-col">
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

        {/* About Section */}
        <div className="max-w-lg">
          <p className="text-base font-medium text-muted-foreground">About Us</p>
          <p className="text-base font-normal text-text-muted max-w-sm">
          We build fully custom websites quickly and efficiently. Working with businesses that care about smart design, strong functionality, and results they can see.
          </p>
        </div>

        {/* Start Project Button */}
        <div className="flex-shrink-0">
          <a
            href="mailto:hello@jillesdesign.com"
            className="inline-flex items-center text-md font-medium hover:text-accent transition-colors"
          >
            Start your project <span className="ml-1">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;