import React from 'react';

// Helper function to get the correct image URL based on environment
const getImageUrl = (path: string) => {
  // Always use relative path for now
  return path;
};

// Project images with direct paths
const projectImages = [
  { 
    id: 1, 
    title: 'Davidson van de ven', 
    description: 'Website for a freelance photographer',
    image: getImageUrl('/projects/creacyphotographyimage.webp'),
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
    image: getImageUrl('/projects/creacynew.webp'),
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
  fallbackImage?: string;
  alt: string;
}

console.log('Environment:', process.env.NODE_ENV);
console.log('Project images:', projectImages);

const Projects = () => {
  return (
    <div className="space-y-4 md:space-y-8 w-full px-0">
      {projectImages.map((project) => (
        <div 
          key={project.id} 
          className="relative w-full aspect-[4/3] md:aspect-video bg-gray-100 rounded-xl overflow-hidden"
        >
          <div className="relative w-full h-full">
            <div className="w-full h-full relative">
              <div className="w-full h-full bg-gray-200">
                <img
                  src={project.image}
                  alt={project.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Image failed to load:', project.image);
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.parentElement?.querySelector('.image-fallback');
                    if (fallback) {
                      fallback.classList.remove('hidden');
                    }
                  }}
                />
                {/* Fallback content in case image fails to load */}
                <div className="image-fallback hidden w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-500 text-sm">{project.title}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
