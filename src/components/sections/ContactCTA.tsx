import React from 'react';

const ContactCTA = () => {
  return (
    <section className="bg-background text-text-primary py-20 md:py-32">
      <div className="container">
        <div className="border-t border-border" />
        <div className="flex justify-between items-center py-10">
          <a
            href="mailto:hello@jillesdesign.com"
            aria-label="Get in touch by email"
            className="text-6xl md:text-8xl lg:text-[96px] font-normal leading-[1.1] tracking-tighter text-text-primary hover:text-accent transition-colors duration-300 ease-in-out"
          >
            Get in touch
          </a>
          <a
            href="mailto:hello@jillesdesign.com"
            aria-label="Get in touch by email"
            className="group text-6xl md:text-8xl lg:text-[96px] font-normal leading-[1.1] text-text-primary hover:text-accent transition-colors duration-300 ease-in-out"
          >
            <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-4">
              →
            </span>
          </a>
        </div>
        <div className="border-b border-border" />
      </div>
    </section>
  );
};

export default ContactCTA;