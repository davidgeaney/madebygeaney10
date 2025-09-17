"use client";

import React from 'react';
import Projects from './Projects';

const WorkHero = () => {
  return (
    <div className="pt-8 pb-20 md:pb-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-background text-foreground">
      <div className="w-full max-w-[1600px] mx-auto">
        {/* Page Title */}
        <div className="mt-28 md:mt-32 lg:mt-36 mb-12 md:mb-16 flex items-center">
          <span className="text-2xl md:text-3xl lg:text-4xl font-medium mr-48 md:mr-64 lg:mr-80">(01)</span>
          <div className="flex-1 text-left">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-medium">
              Selected works 24' - present
            </h1>
          </div>
          <div className="text-4xl ml-8 md:ml-16 lg:ml-24">
            ↓
          </div>
        </div>

        {/* Projects Section */}
        <Projects />
      </div>
    </div>
  );
};

export default WorkHero;
