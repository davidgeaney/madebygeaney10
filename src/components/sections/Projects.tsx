import React from 'react';
import Image from 'next/image';

// Helper function to get image URL with cache-busting
const getImageUrl = (path: string) => {
  return `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${path}?t=${Date.now()}`;
};

// Project images with direct URLs
const projectImages = [
  { 
    id: 1, 
    title: 'Davidson van de ven', 
    description: 'Website for a freelance photographer',
    image: getImageUrl('/projects/creacyphotographyproject.webp'),
    alt: 'Davidson van de ven photography website'
  },
  { 
    id: 2, 
    title: 'Class Cover', 
    description: 'Education platform for teachers',
    image: getImageUrl('/projects/classcoverimage.webp'),
    alt: 'Class Cover education platform'
  },
  { 
    id: 3, 
    title: 'Creacy', 
    description: 'Creative agency website',
    image: getImageUrl('/projects/creacyphotographyproject.webp'),
    alt: 'Creacy creative agency'
  },
  { 
    id: 4, 
    title: 'Smile Dublin', 
    description: 'Dental practice website',
    image: getImageUrl('/projects/smiledublinimage.webp'),
    alt: 'Smile Dublin dental practice'
  },
];

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const Projects = () => {
  return (
    <div className="space-y-8 w-full px-0">
      {projectImages.map((project) => (
        <div key={project.id} className="relative w-full h-auto md:h-[120vh] min-h-[500px] md:min-h-[1000px] bg-gray-100 rounded-xl overflow-hidden">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="relative w-full h-full">
              <img
                src={project.image}
                alt={project.alt}
                className="absolute inset-0 w-full h-full object-cover object-center"
                onError={(e) => {
                  console.error('Image failed to load:', project.image);
                  console.log('Error details:', e);
                }}
                onLoad={(e) => {
                  console.log('Image loaded successfully:', project.image);
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
