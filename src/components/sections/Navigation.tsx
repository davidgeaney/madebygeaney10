"use client";

import React, { useState } from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Journal (soon)", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const Logo = () => (
    <Link href="/" className="text-base font-medium text-text-primary hover:text-accent transition-colors" aria-label="Jilles Design Home">
       Jilles Design
    </Link>
  );

  const CtaButton = ({ isMobile = false }: { isMobile?: boolean }) => (
    <a 
      href="mailto:hello@jillesdesign.com" 
      className={`transition-colors whitespace-nowrap ${isMobile ? 'text-3xl font-normal text-text-primary hover:text-accent' : 'text-xs md:text-sm font-medium text-text-secondary hover:text-text-primary'}`}
    >
      Start your project →
    </a>
  );

  const navLinks = (isMobile = false) => {
    return navItems.map((item) => {
      const isCurrent = (pathname === '/' && item.href === '/') || (item.href !== '/' && pathname.startsWith(item.href));
      const isMuted = item.label.includes('soon');
      
      const commonClasses = isMobile ? 'text-3xl font-normal' : 'text-sm font-book';
      const stateClasses = isMuted 
        ? 'text-text-muted cursor-default pointer-events-none' 
        : isCurrent && !isMobile
          ? 'text-text-primary' 
          : isMobile
            ? 'text-text-primary hover:text-accent'
            : 'text-text-secondary hover:text-text-primary';
      
      const Tag = item.href.startsWith('/') ? Link : 'a';

      return (
        <Tag
          key={item.label}
          href={item.href}
          className={`transition-colors ${commonClasses} ${stateClasses}`}
          {...(isMobile && { onClick: () => setIsMenuOpen(false) })}
          {...(item.label === 'Contact' && { 'data-modal-target': 'modal-a' })}
        >
          {item.label}
        </Tag>
      );
    });
  };

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-40 bg-background/90 backdrop-blur-sm border border-border/50 rounded-full mx-4">
        <div className="container mx-auto px-10 h-[68px] flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Logo />
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks()}
            </nav>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:block whitespace-nowrap">
              <CtaButton />
            </div>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden flex items-center justify-center w-10 h-10 -mr-1"
              aria-label="Open menu"
            >
              <Menu size={20} className="text-text-primary" />
            </button>
          </div>
        </div>
      </header>
      
      <div className={`fixed inset-0 z-50 bg-background lg:hidden transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="container mx-auto px-10 h-[68px] flex items-center justify-between">
          <Logo />
          <button onClick={() => setIsMenuOpen(false)} className="p-2 -mr-2" aria-label="Close menu">
            <X size={24} className="text-text-primary" />
          </button>
        </div>
        <div className="px-10 pt-16">
          <nav className="flex flex-col items-start gap-8">
            {navLinks(true)}
            <div className="pt-8">
                <CtaButton isMobile={true} />
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}