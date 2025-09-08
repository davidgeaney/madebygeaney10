"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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
  { href: "mailto:hello@jillesdesign.com", label: "Send an email \u00A0→" },
  { href: "https://cal.com/jilles-design/15min", label: "Schedule a call \u00A0→" },
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
                setTime({ hours: timeObj.hour || '--', minutes: timeObj.minute || '--', seconds: timeObj.second || '--' });

                const tzFormatter = new Intl.DateTimeFormat('en-GB', {
                    timeZone: 'Europe/Amsterdam',
                    timeZoneName: 'shortOffset',
                });
                const tzParts = tzFormatter.formatToParts(now);
                const tzValue = tzParts.find(p => p.type === 'timeZoneName')?.value;
                if (tzValue) setTimezone(tzValue);
            } catch (error) {
                // In some environments, Intl might not support the timezone
                console.error("Error updating clock:", error);
                setTimezone("GMT+2"); // Fallback
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


export default function Footer() {
  return (
    <footer className="bg-background text-foreground pt-12 pb-32">
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="flex flex-col">
           <div className="border-t border-border" />
          <div className="flex justify-between items-center py-10 md:py-16">
            <a href="mailto:hello@jillesdesign.com" className="text-5xl md:text-7xl font-normal text-text-primary hover:text-accent transition-colors duration-300 ease-in-out">
              Get in touch
            </a>
            <a href="mailto:hello@jillesdesign.com" className="text-5xl md:text-7xl font-normal text-text-primary hover:text-accent transition-colors duration-300 ease-in-out">
              →
            </a>
          </div>
          <div className="border-t border-border" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 pt-24">
          <div className="flex flex-col space-y-4">
            <p className="text-sm text-text-muted leading-relaxed">
              Jilles Design
              <br />
              Amsterdam
            </p>
            <TimezoneClock />
          </div>

          <div className="flex flex-col space-y-6">
            <h3 className="text-sm text-text-secondary">Navigation</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-accent transition-colors duration-300 ease-in-out">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col space-y-6">
            <h3 className="text-sm text-text-secondary">Services at a glance</h3>
            <div className="flex flex-col space-y-2">
              {services.map((service) => (
                <p key={service} className="text-sm text-text-secondary">
                  {service}
                </p>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col space-y-6">
            <h3 className="text-sm text-text-secondary">Accepting new projects</h3>
            <ul className="space-y-2">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-text-secondary hover:text-accent transition-colors duration-300 ease-in-out">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}