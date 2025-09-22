'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLink {
  name: string;
  href: string;
  isContact?: boolean;
}

interface MobileMenuProps {
  onContactClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onContactClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks: NavLink[] = [
    { name: 'Home', href: '/' },
    { name: 'Work', href: '/work' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '#', isContact: true },
  ];

  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com' },
    { name: 'LinkedIn', href: 'https://linkedin.com' },
    { name: 'Twitter', href: 'https://twitter.com' },
    { name: 'Dribbble', href: 'https://dribbble.com' },
  ];

  return (
    <div className="md:hidden">
      {/* Modern Hamburger Button - Only shows two lines */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-white/80 hover:bg-gray-100 transition-colors focus:outline-none group border border-gray-200 shadow-sm"
        aria-label="Open menu"
      >
        <div className="space-y-1.5">
          <span className="block w-5 h-[1.5px] bg-black transition-transform duration-300 group-hover:translate-x-0.5"></span>
          <span className="block w-5 h-[1.5px] bg-black transition-transform duration-300 group-hover:translate-x-0.5"></span>
        </div>
      </button>

      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />
      
      {/* Dropdown Menu */}
      <div 
        className={`fixed top-4 right-4 w-72 bg-white rounded-2xl shadow-2xl z-50 transition-all duration-300 ease-out transform ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0 pointer-events-none'}`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
          aria-label="Close menu"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        
        <nav className="p-6 pt-12">
          {navLinks.map((link) => (
            <div key={link.name}>
              {link.isContact ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onContactClick();
                    setIsOpen(false);
                  }}
                  className="w-full text-left flex items-center justify-between text-3xl font-medium leading-none text-gray-500 hover:text-black transition-colors"
                >
                  <span>{link.name}</span>
                </button>
              ) : (
                <Link
                  href={link.href}
                  className={`flex items-center justify-between text-3xl font-medium leading-none ${pathname === link.href ? 'text-black' : 'text-gray-500 hover:text-black'} transition-colors`}
                >
                  <span>{link.name}</span>
                  {pathname === link.href && (
                    <span className="w-2 h-2 bg-black rounded-full ml-3 flex-shrink-0"></span>
                  )}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
