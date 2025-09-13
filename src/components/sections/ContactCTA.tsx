"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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

const ContactCTA = () => {
  return (
    <section className="bg-background text-text-primary">
      <div className="container px-0">
        <div className="border-t border-border -mt-10" />
        <div className="flex justify-between items-center py-12 md:py-16">
          <a
            href="mailto:hello@jillesdesign.com"
            aria-label="Get in touch by email"
            className="text-5xl sm:text-6xl md:text-8xl lg:text-[96px] font-medium leading-[1.1] tracking-tighter text-text-primary hover:text-accent transition-colors duration-300 ease-in-out"
          >
            Get in touch
          </a>
          <a
            href="mailto:hello@jillesdesign.com"
            aria-label="Get in touch by email"
            className="group text-5xl sm:text-6xl md:text-8xl lg:text-[96px] font-normal leading-[1.1] text-text-primary hover:text-accent transition-colors duration-300 ease-in-out"
          >
            <span className="inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl transition-transform duration-300 ease-in-out group-hover:translate-x-4">
              →
            </span>
          </a>
        </div>
        <div className="border-b border-border mb-8" />
        
        <footer className="bg-background text-foreground pb-16">
          <div className="w-full max-w-[1800px] mx-auto px-4">
            <div className="flex flex-col space-y-12">
              {/* Mobile Layout */}
              <div className="sm:hidden">
                {/* Jilles Design & Clock */}
                <div className="mb-8">
                  <p className="text-sm text-text-muted leading-relaxed mb-2">
                    Jilles Design
                    <br />
                    Amsterdam
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
                          <Link href={link.href} className="text-sm text-foreground hover:text-accent transition-colors duration-300 ease-in-out block">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-text-muted mb-4">Services</h3>
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
                <div className="mt-8 pt-8 border-t border-border">
                  <h3 className="text-sm text-text-muted mb-4">Accepting new projects</h3>
                  <ul className="space-y-3">
                    {contactLinks.map((link) => (
                      <li key={link.label}>
                        <a 
                          href={link.href} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sm text-foreground hover:text-accent transition-colors duration-300 ease-in-out flex items-center"
                        >
                          {link.label}
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
                    Jilles Design
                    <br />
                    Amsterdam
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
                        <Link href={link.href} className="text-sm font-normal text-foreground hover:text-accent transition-colors duration-300 ease-in-out py-1 block">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col space-y-6">
                  <h3 className="text-sm text-text-muted">Services</h3>
                  <div className="flex flex-col">
                    {services.map((service) => (
                      <p key={service} className="text-sm text-foreground mb-2">
                        {service}
                      </p>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col space-y-6">
                  <h3 className="text-sm text-text-muted">Accepting new projects</h3>
                  <ul className="space-y-2">
                    {contactLinks.map((link) => (
                      <li key={link.label}>
                        <a 
                          href={link.href} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sm text-foreground hover:text-accent transition-colors duration-300 ease-in-out flex items-center"
                        >
                          {link.label}
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
    </section>
  );
};

export default ContactCTA;