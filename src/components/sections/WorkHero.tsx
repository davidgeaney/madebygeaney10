"use client";

import React from 'react';
import Projects from './Projects';

const WorkHero = () => {
  return (
    <div className="pt-8 pb-20 md:pb-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-background text-foreground">
      <div className="w-full max-w-[1600px] mx-auto">
        {/* Page Title */}
        <div className="mt-16 md:mt-32 lg:mt-36 mb-12 md:mb-16">
          {/* Number on top for mobile, side for desktop */}
          <div className="flex flex-col md:flex-row md:items-center">
            <span className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4 md:mb-0 md:mr-12 lg:mr-24 xl:mr-48">
              (01)
            </span>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
                Selected works 24' - present
              </h1>
            </div>
            <div className="hidden md:block text-4xl ml-8 md:ml-16 lg:ml-24">
              ↓
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <Projects />
      </div>
    </div>
  );
};

export default WorkHero;
