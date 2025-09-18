"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

// Dynamically import the ContactPanel component with no SSR
const ContactPanel = dynamic(
  () => import('@/components/ContactPanel'),
  { ssr: false }
);

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/#", label: "Journal (soon)" },
  { href: "/#", label: "Contact" },
];

const services = [
  "Copywriting",
  "Art direction",
  "Website design",
  "Product design",
  "Development",
];

const contactLinks = [
  { href: "mailto:hello@jillesdesign.com", label: "Send an email →" },
  { href: "https://cal.com/jilles-design/15min", label: "Schedule a call →" },
];

const TimezoneClock = () => {
  const [time, setTime] = useState({ hours: '--', minutes: '--', seconds: '--' });
  const [timezone, setTimezone] = useState('');

  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date();
        const timeFormatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/Amsterdam',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        const timeParts = timeFormatter.formatToParts(now);
        const timeObj = timeParts.reduce((acc, part) => {
          if (part.type !== 'literal') {
            acc[part.type as 'hour' | 'minute' | 'second'] = part.value;
          }
          return acc;
        }, {} as Record<'hour' | 'minute' | 'second', string>);
        setTime({ 
          hours: timeObj.hour || '--', 
          minutes: timeObj.minute || '--', 
          seconds: timeObj.second || '--' 
        });

        const tzFormatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/Amsterdam',
          timeZoneName: 'shortOffset',
        });
        const tzParts = tzFormatter.formatToParts(now);
        const tzValue = tzParts.find(p => p.type === 'timeZoneName')?.value;
        if (tzValue) setTimezone(tzValue);
      } catch (error) {
        console.error("Error updating clock:", error);
        setTimezone("GMT+2");
      }
    };
    
    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <p className="text-sm text-text-muted">
      <span data-current-time-hours="">{time.hours}</span>:
      <span data-current-time-minutes="">{time.minutes}</span>:
      <span data-current-time-seconds="">{time.seconds}</span>{' '}
      <span data-current-time-timezone="" className="uppercase">{timezone}</span>
    </p>
  );
};

const AnimatedText = ({ text }: { text: string }) => {
  return (
    <span className="inline-block group">
      <style jsx>{"\n        @keyframes fadeInUp {\n          from {\n            opacity: 0;\n            transform: translateY(4px) scale(0.95);\n          }\n          to {\n            opacity: 1;\n            transform: translateY(0) scale(1);\n          }\n        }\n        .float-char {\n          display: inline-block;\n          opacity: 0;\n          transform: translateY(4px) scale(0.95);\n          animation: fadeInUp 0.4s forwards;\n          animation-timing-function: cubic-bezier(0.2, 0, 0.2, 1);\n          transition: transform 0.2s ease, opacity 0.2s ease;\n        }\n        .group:hover .float-char {\n          transform: translateY(-2px);\n        }\n      "}</style>
      {text.split('').map((char, i) => (
        <span 
          key={i} 
          className="float-char"
          style={{ 
            animationDelay: `${i * 50}ms`,
            animationFillMode: 'both',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

const ContactCTA = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const pathname = usePathname();
  return (
    <section className="bg-background text-text-primary">
      <div className="container px-4">
        <div className="border-t border-border" />
        <div className="flex justify-between items-center py-8 sm:py-10 md:py-12">
          <button
            onClick={() => setIsContactOpen(true)}
            aria-label="Open contact form"
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[96px] font-medium leading-[1.1] tracking-[-0.04em] text-text-primary text-left"
          >
            <AnimatedText text="Get in touch" />
          </button>
          <a
            href="mailto:hello@jillesdesign.com"
            aria-label="Get in touch by email"
            className="group text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[96px] font-normal leading-[1.1] text-text-primary"
          >
            <span className="inline-block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl transition-transform duration-200 ease-out group-hover:translate-x-2">
              →
            </span>
          </a>
        </div>
        <div className="border-b border-border" />
        <footer className="bg-background text-foreground pt-12 pb-6">
          <div className="w-full max-w-[1800px] mx-auto">
            <div className="flex flex-col space-y-12">
              {/* Mobile Layout */}
              <div className="sm:hidden">
                {/* Made By Geaney & Clock */}
                <div className="mb-8">
                  <p className="text-sm text-text-muted leading-relaxed mb-2">
                    Made By Geaney
                    <br />
                    Ireland
                  </p>
                  <div>
                    <TimezoneClock />
                  </div>
                </div>

                {/* Navigation and Services */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm text-text-muted mb-4">Navigation</h3>
                    <ul className="space-y-2">
                      {navLinks.map((link) => (
                        <li key={link.label}>
                          <Link 
                            href={link.href} 
                            className="relative group text-sm text-foreground transition-colors block"
                          >
                            {link.label}
                            <span className="absolute left-0 -bottom-0.5 h-[0.5px] w-0 bg-foreground transition-all duration-300 ease-out group-hover:w-full" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-text-muted mb-4">Services at a glance</h3>
                    <ul className="space-y-2">
                      {services.map((service) => (
                        <li key={service}>
                          <span className="text-sm text-foreground">
                            {service}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Accepting New Projects */}
                <div className="mt-6 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-10 px-4 sm:px-6 md:px-8 lg:px-10">
                  <h3 className="text-sm text-text-muted mb-4">Accepting new projects</h3>
                  <ul className="space-y-3">
                    {contactLinks.map((link) => (
                      <li key={link.label}>
                        <a 
                          href={link.href} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="relative group text-sm text-foreground transition-colors flex items-center"
                        >
                          <span className="relative">
                            {link.label.replace(' →', '')}
                            <span className="absolute left-0 -bottom-0.5 h-[0.5px] w-0 bg-foreground transition-all duration-300 ease-out group-hover:w-full" />
                          </span>
                          <span className="ml-1">→</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Desktop Layout - Hidden on mobile */}
              <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-8">
                <div className="flex flex-col space-y-4">
                  <p className="text-sm text-text-muted leading-relaxed">
                    Made By Geaney
                    <br />
                    Ireland
                  </p>
                  <div>
                    <TimezoneClock />
                  </div>
                </div>

                <div className="flex flex-col space-y-4">
                  <h3 className="text-sm text-text-muted">Navigation</h3>
                  <ul className="flex flex-col">
                    {navLinks.map((link) => (
                      <li key={link.label}>
                        <Link 
                          href={link.href} 
                          className="group relative text-sm font-normal text-foreground transition-colors block"
                        >
                          <span className="relative">
                            {link.label}
                            <span className="absolute left-0 -bottom-0.5 h-[0.5px] w-0 bg-foreground transition-all duration-300 ease-out group-hover:w-full" />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col space-y-6">
                  <h3 className="text-sm text-text-muted">Services at a glance</h3>
                  <div className="flex flex-col">
                    {services.map((service) => (
                      <p key={service} className="text-sm text-foreground">
                        {service}
                      </p>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col space-y-8">
                  <h3 className="text-sm text-text-muted">Accepting new projects</h3>
                  <ul className="space-y-2">
                    {contactLinks.map((link) => (
                      <li key={link.label}>
                        <a 
                          href={link.href} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="relative group text-sm text-foreground transition-colors flex items-center"
                        >
                          <span className="relative">
                            {link.label.replace(' →', '')}
                            <span className="absolute left-0 -bottom-0.5 h-[0.5px] w-0 bg-foreground transition-all duration-300 ease-out group-hover:w-full" />
                          </span>
                          <span className="ml-1">→</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </footer>
      </div>
      
      {/* Contact Panel */}
      <ContactPanel 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </section>
  );
};

export default ContactCTA;