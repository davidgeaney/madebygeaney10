'use client';

import React, { useRef } from 'react';
import Image from 'next/image';

interface ImageSliderProps {
  images: string[];
  className?: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, className = '' }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    isDown = true;
    startX = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft = sliderRef.current.scrollLeft;
    sliderRef.current.style.cursor = 'grabbing';
  };

  const handleMouseLeave = () => {
    if (!sliderRef.current) return;
    isDown = false;
    sliderRef.current.style.cursor = 'grab';
  };

  const handleMouseUp = () => {
    if (!sliderRef.current) return;
    isDown = false;
    sliderRef.current.style.cursor = 'grab';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll faster
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div 
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto py-8 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {images.map((src, index) => (
          <div key={index} className="flex-shrink-0 relative" style={{ width: '90vw', height: '70vh' }}>
            <Image
              src={src}
              alt={`Project image ${index + 1}`}
              fill
              className="object-cover rounded-lg"
              quality={90}
              priority={index < 3}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
