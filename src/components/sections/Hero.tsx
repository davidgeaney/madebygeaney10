import React from 'react';

const Hero = () => {
  return (
    <section className="bg-background text-foreground pt-[160px] pb-[120px]">
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="max-w-[980px]">
          <p className="font-medium text-[#999999] text-sm mb-6 tracking-wide">
            About Jilles
          </p>
          <h1 className="text-[48px] lg:text-[64px] xl:text-[72px] font-normal text-primary leading-[1.1] tracking-[-0.02em] mb-12">
            An independent designer &amp; developer building clean, high-end websites and digital products. Partnering with brands, startups, and studios who value premium design, solid execution, and long-term quality.
          </h1>
          <a
            href="mailto:hello@jillesdesign.com"
            className="inline-block text-base font-medium text-primary hover:text-accent transition-colors duration-300"
          >
            Start your project&nbsp;&nbsp;→
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;