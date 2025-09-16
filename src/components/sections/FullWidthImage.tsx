import React from 'react';

interface FullWidthImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function FullWidthImage({ src, alt, className = '' }: FullWidthImageProps) {
  return (
    <div className={`w-full h-[600px] md:h-[800px] relative overflow-hidden ${className}`}>
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
}
