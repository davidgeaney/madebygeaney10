'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import MobileMenu from '@/components/ui/MobileMenu';
import ImageSlider from '@/components/ui/ImageSlider';
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
  { name: 'Services, ', href: '/services', underlineWidth: '100%' },
  { name: 'About, ', href: '/about', underlineWidth: '100%' },
  { name: 'Journal (soon), ', href: '#', underlineWidth: '100%' },
  { name: 'Contact', href: '/contact', underlineWidth: '100%' },
];

const ServicesHero: React.FC = () => {
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

  // Show MobileMenu on mobile devices
  if (isMobile) {
    return (
      <div className="pt-8 pb-20 px-4 bg-background">
        <div className="w-full max-w-[1600px] mx-auto">
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
            <MobileMenu />
          </div>
          <div className="mt-16 mb-8">
            <h1 className="text-3xl font-medium">
              Services
            </h1>
          </div>
          <div className="space-y-8">
            <div className="space-y-8">
              <p className="text-2xl">
                {services.intro.text}
              </p>
              {/* Rest of the mobile content */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-8 pb-20 md:pb-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-background text-foreground">
      <div className="w-full max-w-[1600px] mx-auto">
        {/* Header */}
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
        {/* Intro Section */}
        <div className="mt-28 md:mt-32 lg:mt-36 mb-24 md:mb-32 flex flex-col md:flex-row items-start">
          <span className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4 md:mb-0 md:mr-12 lg:mr-24 md:w-16 flex-shrink-0">
            {services.intro.number}
          </span>
          <p className="text-xl md:text-3xl lg:text-4xl font-medium max-w-3xl ml-24">
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

      {/* Image Slider */}
      <div className="w-full px-4 md:px-8 mx-auto">
        <ImageSlider 
          images={[
            '/projects/classcoverimage.webp',
            '/projects/classcoverimage.webp',
            '/projects/classcoverimage.webp',
            '/projects/classcoverimage.webp'
          ]} 
          className="max-w-[95%] mx-auto"
        />
      </div>

      {/* Contact CTA */}
      <div className="mt-24 md:mt-32">
        <ContactCTA />
      </div>
    </div>
  );
};

export default ServicesHero;
