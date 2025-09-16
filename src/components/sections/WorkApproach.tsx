import React from 'react';

const approachPoints = [
  {
    number: '01',
    title: 'One-to-one partnerships',
    description: 'You deal with me. No middlemen, no confusion. One clear line of communication, full accountability from start to finish.'
  },
  {
    number: '02',
    title: 'Precision over pace',
    description: 'I don\'t rush projects just to get them out the door. I\'d rather take a little longer and make something great.'
  },
  {
    number: '03',
    title: 'Trusted by studios',
    description: 'Studios and agencies bring me in when quality matters. I integrate easily, and deliver work they can trust.'
  },
  {
    number: '04',
    title: 'Built to last',
    description: 'Everything I create is meant to hold up. Clear, thoughtful systems that still look good a couple of years down the line.'
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
          
          <div className="lg:col-span-9 lg:col-start-3">
            <h2 className="text-[32px] md:text-[56px] leading-[1.2] font-medium text-black max-w-5xl mb-12">
              A closer look at how I work with teams, studios, and founders who care about quality.
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
              {approachPoints.map((point, index) => (
                <div key={index} className="flex gap-0">
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-[#9EA5AD] mb-3">{point.number}→ {point.title}</h3>
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
