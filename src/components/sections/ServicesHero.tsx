'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import MobileMenu from '@/components/ui/MobileMenu';
import ContactCTA from './ContactCTA';

const AnimatedText = ({ text }: { text: string }) => {
  return (
    <span className="inline-block group">
      <style jsx>{`
        @keyframes floatUp {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .float-char {
          display: inline-block;
          transition: transform 0.1s ease-in-out;
        }
        .group:hover .float-char {
          animation: floatUp 0.2s ease-in-out;
        }
      `}</style>
      {text.split('').map((char, i) => (
        <span 
          key={i} 
          className="float-char"
          style={{ 
            animationDelay: `${i * 20}ms`,
            animationFillMode: 'both',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

interface NavLink {
  name: string;
  href: string;
  underlineWidth: string;
}

interface SocialLink extends Omit<NavLink, 'href'> {
  href: string;
}

interface ServiceCategory {
  title: string;
  items: string[];
}

interface ServicesData {
  intro: {
    number: string;
    text: string;
  };
  categories: ServiceCategory[];
}

const services: ServicesData = {
  intro: {
    number: '(01)',
    text: 'Websites that look sharp, work hard, and last — designed from scratch with clean design, reliable code, and results that actually matter.'
  },
  categories: [
    {
      title: 'Design',
      items: [
        'Website design',
        'Product design',
        'Design systems',
        'Visual direction',
        'Design consulting'
      ]
    },
    {
      title: 'Development',
      items: [
        'Webflow development',
        'Framer development',
        'CMS setup',
        'SEO foundations',
        'Custom (GSAP) animations'
      ]
    },
    {
      title: 'Branding',
      items: [
        'Copywriting',
        'Visual identity',
        'Brand direction',
        'Typography & layout systems',
        'Moodboards & art direction'
      ]
    }
  ]
};

const navLinks: NavLink[] = [
  { name: 'Home, ', href: '/', underlineWidth: '100%' },
  { name: 'Work, ', href: '/work', underlineWidth: '100%' },
  { name: 'About, ', href: '/about', underlineWidth: '100%' },
  { name: 'Services, ', href: '/services', underlineWidth: '100%' },
  { name: 'Journal (soon), ', href: '#', underlineWidth: '100%' },
  { name: 'Contact', href: '/contact', underlineWidth: '100%' },
];

const socialLinks: SocialLink[] = [
  { name: 'Instagram', href: 'https://instagram.com', underlineWidth: '100%' },
  { name: 'LinkedIn', href: 'https://linkedin.com', underlineWidth: '90%' },
  { name: 'Twitter', href: 'https://twitter.com', underlineWidth: '75%' },
  { name: 'Dribbble', href: 'https://dribbble.com', underlineWidth: '90%' },
];

const ServicesHero: React.FC = () => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set initial state on component mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Navigation bar with logo and CTA
  const renderNavigation = () => (
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
            className="group relative inline-flex items-center text-md font-medium text-text-primary transition-colors w-full md:w-auto justify-center md:justify-start"
          >
            Start your project <span className="ml-1">→</span>
            <span className="absolute left-0 -bottom-0.5 h-[0.5px] w-0 bg-foreground transition-all duration-300 ease-out group-hover:w-full"></span>
          </a>
        </div>
      </div>
    </div>
  );

  // Mobile View
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return (
      <div className="min-h-screen bg-background">
        {/* Mobile Menu */}
        <MobileMenu />
        
        {/* Desktop Navigation */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
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
            
            {/* CTA Button for mobile */}
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
          
          <div className="mt-2 mb-12 px-4" style={{ marginTop: '0.5rem' }}>
            <span className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 block">
              {services.intro.number}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-16 leading-tight">
              {services.intro.text}
            </h1>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {services.categories.slice(0, 2).map((category, index) => (
                  <div key={index} className="mb-6">
                    <h2 className="text-sm font-normal mb-2 text-text-muted">{category.title}</h2>
                    <ul className="space-y-1">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-xs text-foreground leading-tight">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-6">
                  <h2 className="text-sm font-normal mb-2 text-text-muted">
                    {services.categories[2].title}
                  </h2>
                  <ul className="space-y-1">
                    {services.categories[2].items.map((item, index) => (
                      <li key={index} className="text-xs text-foreground leading-tight">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-sm font-normal mb-2 text-text-muted">
                    <a 
                      href="mailto:hello@madebygeaney.com" 
                      className="hover:opacity-80 transition-opacity whitespace-nowrap text-xs"
                    >
                      Let's Work Together →
                    </a>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      {renderNavigation()}
      
      <main className="m-0 p-0">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-20 md:pt-32">
        {/* Intro Section */}
        <div className="mt-0 md:mt-8 lg:mt-12 mb-16 md:mb-24 flex flex-col md:flex-row items-start">
          <span className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4 md:mb-0 md:mr-12 lg:mr-24 md:w-16 flex-shrink-0">
            {services.intro.number}
          </span>
          <p className="text-xl md:text-3xl lg:text-4xl font-medium max-w-3xl ml-32 md:ml-48 lg:ml-56">
            {services.intro.text}
          </p>
          <div className="hidden md:flex items-center justify-center ml-auto text-4xl">
            ↓
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16 mb-24 md:mb-32">
          {services.categories.map((category, index) => (
            <div key={index} className="mb-8 md:mb-0">
              <h2 className="text-lg md:text-xl font-normal mb-5 text-text-muted">{category.title}</h2>
              <ul>
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-base text-foreground leading-tight">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Let's Work Together Column */}
          <div className="mb-8 md:mb-0 ml-auto">
            <a 
              href="mailto:hello@madebygeaney.com" 
              className="block text-lg md:text-xl font-medium text-foreground"
            >
              Let's Work Together →
            </a>
          </div>
        </div>

        </div>
      </main>
    </div>
  );
};

export default ServicesHero;
