"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Work', href: '/work' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Journal (soon)', href: '#' },
  { name: 'Contact', href: '/contact' },
];

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com' },
  { name: 'LinkedIn', href: 'https://linkedin.com' },
  { name: 'Twitter', href: 'https://twitter.com' },
  { name: 'Dribbble', href: 'https://dribbble.com' },
];

const Hero = () => {
  const pathname = usePathname();
  return (
    <div className="pt-6 pb-10 px-4 bg-background text-foreground">
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
              className={`text-base font-normal transition-colors ${pathname === link.href ? 'text-foreground' : 'text-text-muted hover:text-foreground'}`}
            >
              {link.name}
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
              className={`text-base font-normal transition-colors ${pathname === link.href ? 'text-foreground' : 'text-text-muted hover:text-foreground'}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* About Section */}
        <div className="max-w-lg">
          <p className="text-base font-medium text-muted-foreground">About Jilles</p>
          <p className="text-base font-normal text-text-muted max-w-sm">
          An independent designer & developer building clean, high-end websites and digital products. Partnering with brands, startups, and studios who value premium design, solid execution, and long-term quality.
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