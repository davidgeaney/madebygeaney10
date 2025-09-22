import React from 'react';

const approachPoints = [
  {
    number: '01',
    title: 'Clear communication',
    description: 'No account managers or middlemen—just direct communication with the team actually building your site.'
  },
  {
    number: '02',
    title: 'Focused on results',
    description: 'We build websites that drive business growth, not just look good. Every decision serves a purpose.'
  },
  {
    number: '03',
    title: 'No hidden costs',
    description: 'Honest pricing from the start. What we quote is what you pay, with no surprise fees or unnecessary add-ons.'
  },
  {
    number: '04',
    title: 'Built to perform',
    description: 'Fast, secure, and reliable websites that work perfectly on any device and stand the test of time.'
  }
];

export default function WorkApproach() {
  return (
    <div className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <span className="text-3xl md:text-4xl lg:text-5xl font-normal text-foreground">(02)</span>
          </div>
          
          <div className="lg:col-span-8 lg:col-start-4">
            <h2 className="text-2xl md:text-4xl leading-[1.2] font-medium text-black max-w-5xl mb-12">
              We build websites that work. Clear process, fair pricing, and no unnecessary extras.
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
              {approachPoints.map((point, index) => (
                <div key={index} className="flex gap-0">
                  <div className="flex-1">
                    <h3 className="text-xl font-normal text-[#9EA5AD] mb-3">{point.number}→ {point.title}</h3>
                    <p className="text-xl text-black leading-relaxed max-w-[90%] md:max-w-[90%] lg:max-w-[90%]">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
