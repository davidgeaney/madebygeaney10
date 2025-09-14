'use client';

import React, { useState, useEffect } from 'react';

interface ContactPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactPanel: React.FC<ContactPanelProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    workedWithArchitect: null as string | null,
    projectTypes: [] as string[],
    projectLocation: '',
    projectTimeline: '',
    budgetRange: '',
    builderEngaged: '',
    builderDetails: '',
    builderEngineer: '',
    additionalInfo: '',
    designBrief: '',
    heardAbout: '',
    heardAboutOther: '',
    additionalNotes: ''
  });

  const projectTypeOptions = [
    'New home',
    'Renovation + extensions',
    'Commercial project',
    'Interior Design Only',
    'Other / Unsure'
  ];

  const totalSteps = 8;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleArchitectSelection = (value: string) => {
    setFormData(prev => ({
      ...prev,
      workedWithArchitect: value
    }));
    handleNext();
  };

  const toggleProjectType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      projectTypes: prev.projectTypes.includes(type)
        ? prev.projectTypes.filter(t => t !== type)
        : [...prev.projectTypes, type]
    }));
  };

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when panel is open
      document.body.style.overflow = 'hidden';
      // Add a small delay to allow the component to mount before starting the animation
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'auto';
      };
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      handleNext();
    } else if (currentStep === 2) {
      handleNext();
    } else if (currentStep === 3) {
      // Handle form submission here when we reach the final step
      console.log('Form submitted:', formData);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      // Start the close animation
      setIsVisible(false);
      // Wait for the animation to complete before calling onClose
      const timer = setTimeout(() => {
        onClose();
      }, 300); // Match this duration with your CSS transition duration
      return () => clearTimeout(timer);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" style={{ overflow: 'hidden' }}>
      {/* Left side blurred content */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleBackdropClick}
        style={{
          transition: 'opacity 0.3s ease-in-out',
          zIndex: 49 // Ensure it's below the panel but above everything else
        }}
      />
      
      {/* Panel */}
      <div 
        className={`fixed inset-y-0 right-0 w-1/2 bg-black text-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          zIndex: 50 // Ensure it's above the overlay
        }}
      >
        <div className="h-full flex flex-col overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
          {/* Progress bar */}
          <div className="h-1 bg-gray-800 relative">
            <div 
              className="h-full bg-white absolute left-0 top-0 transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          
          {/* Header with close button */}
          <div className="px-8 py-6 flex justify-between items-start">
            <div>
              <h1 className="text-lg font-medium mb-4 text-white">(PROJECT DETAILS)</h1>
              <p className="text-sm text-white max-w-md leading-relaxed">
                To get started, we ask that you provide some
                initial information about your project to help
                us determine whether our studio is the
                right fit. Our team will review the details and
                be in touch to discuss next steps within 5
                business days.
              </p>
            </div>
            
            <div className="flex flex-col items-end">
              <button
                type="button"
                onClick={onClose}
                className="text-white hover:text-gray-300 focus:outline-none text-sm uppercase tracking-wider mb-4"
              >
                CLOSE
              </button>
              <div className="flex flex-col items-center gap-2">
                <div className="relative w-32 h-48 bg-gray-900 rounded overflow-hidden">
                  {/* Image placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-black/70 text-white text-xs px-3 py-1 rounded-full font-mono">
                  {`0${currentStep}/08`}
                </div>
              </div>
            </div>
          </div>
          
          {/* Form Content */}
          <div className="flex-1 px-8">
            {currentStep === 1 && (
              <div className="w-full max-w-2xl">
                <div className="mb-8">
                  <h2 className="text-lg font-medium text-white pb-3 border-b border-white/20">
                    YOUR PERSONAL DETAILS
                  </h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full bg-[#292929] rounded-sm py-4 px-5 text-white placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent h-14 border-0 shadow-none"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full bg-[#292929] rounded-sm py-4 px-5 text-white placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent h-14 border-0 shadow-none"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="block w-full bg-[#292929] rounded-sm py-4 px-5 text-white placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent h-14 border-0 shadow-none"
                    />
                  </div>
                </form>
              </div>
            )}

            {currentStep === 2 && (
              <div className="w-full max-w-2xl mt-16">
                <div className="mb-8">
                  <div className="flex justify-between items-center pb-3 border-b border-white/20">
                    <h2 className="text-lg font-medium text-white">
                      YOUR PERSONAL DETAILS
                    </h2>
                    <span className="text-sm text-white/70">(02/08)</span>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <h3 className="text-lg font-medium text-white">
                    Have you worked with an architect before? <span className="text-red-500">*</span>
                  </h3>
                  
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => handleChange({ target: { name: 'workedWithArchitect', value: 'true' } })}
                      className={`flex-1 py-4 text-center rounded-sm font-medium transition-colors ${
                        formData.workedWithArchitect === 'true'
                          ? 'bg-white text-black' 
                          : 'bg-[#292929] text-white hover:bg-[#3a3a3a]'
                      }`}
                    >
                      YES
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChange({ target: { name: 'workedWithArchitect', value: 'false' } })}
                      className={`flex-1 py-4 text-center rounded-sm font-medium transition-colors ${
                        formData.workedWithArchitect === 'false'
                          ? 'bg-white text-black' 
                          : 'bg-[#292929] text-white hover:bg-[#3a3a3a]'
                      }`}
                    >
                      NO
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="w-full max-w-2xl">
                <div className="mb-8">
                  <div className="flex justify-between items-center pb-3 border-b border-white/20">
                    <h2 className="text-lg font-medium text-white">
                      PROJECT PARTICULARS
                    </h2>
                    <span className="text-sm text-white/70">(03/08)</span>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium text-white">
                      What type of project are you looking for? <span className="text-red-500">*</span>
                    </h3>
                    <p className="text-sm text-gray-400">(select multiple if needed)</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {projectTypeOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleProjectType(option)}
                        className={`w-full py-4 px-6 text-left rounded-sm font-medium transition-colors ${
                          formData.projectTypes.includes(option)
                            ? 'bg-white text-black' 
                            : 'bg-[#292929] text-white hover:bg-[#3a3a3a]'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 8 && (
              <div className="w-full max-w-2xl">
                <div className="mb-8">
                  <div className="flex justify-between items-center pb-3 border-b border-white/20">
                    <h2 className="text-lg font-medium text-white">
                      ADDITIONAL INFORMATION
                    </h2>
                    <span className="text-sm text-white/70">(08/08)</span>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">
                      How did you hear about us? <span className="text-red-500">*</span>
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {['Friend', 'Family', 'Google', 'Instagram', 'Other'].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleChange({ target: { name: 'heardAbout', value: option } })}
                          className={`w-full py-4 px-6 text-center rounded-sm font-medium transition-colors ${
                            formData.heardAbout === option
                              ? 'bg-white text-black' 
                              : 'bg-[#292929] text-white hover:bg-[#3a3a3a]'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>

                    {formData.heardAbout === 'Other' && (
                      <div className="mt-6">
                        <input
                          type="text"
                          id="heardAboutOther"
                          name="heardAboutOther"
                          value={formData.heardAboutOther}
                          onChange={handleChange}
                          placeholder="Please specify"
                          className="w-full bg-[#292929] rounded-sm py-4 px-5 text-white placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent h-14 border-0 shadow-none"
                        />
                      </div>
                    )}

                    <div className="pt-6">
                      <label htmlFor="additionalNotes" className="block text-sm font-medium text-white mb-2">
                        Additional notes or comments (optional)
                      </label>
                      <input
                        type="text"
                        id="additionalNotes"
                        name="additionalNotes"
                        value={formData.additionalNotes || ''}
                        onChange={handleChange}
                        placeholder="Any other information you'd like to share"
                        className="w-full bg-[#292929] rounded-sm py-4 px-5 text-white placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent h-14 border-0 shadow-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 7 && (
              <div className="w-full max-w-2xl">
                <div className="mb-8">
                  <div className="flex justify-between items-center pb-3 border-b border-white/20">
                    <h2 className="text-lg font-medium text-white">
                      DESIGN BRIEF
                    </h2>
                    <span className="text-sm text-white/70">(07/08)</span>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <label htmlFor="designBrief" className="block text-sm font-medium text-white mb-2">
                      Design brief (provide any additional information, ideas and details you may have for your project here)
                    </label>
                    <textarea
                      id="designBrief"
                      name="designBrief"
                      value={formData.designBrief}
                      onChange={handleChange}
                      placeholder="Hi OH Architecture team, I would like to...."
                      className="w-full bg-[#292929] rounded-sm py-4 px-5 text-white placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent min-h-[200px] border-0 shadow-none resize-y"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="w-full max-w-2xl">
                <div className="mb-8">
                  <div className="flex justify-between items-center pb-3 border-b border-white/20">
                    <h2 className="text-lg font-medium text-white">
                      PROJECT TEAM
                    </h2>
                    <span className="text-sm text-white/70">(06/08)</span>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">
                      Have you engaged a builder? <span className="text-red-500">*</span>
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        {['Yes', 'Not yet, but we have someone in mind'].map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => handleChange({ target: { name: 'builderEngaged', value: option } })}
                            className={`w-full text-left py-4 px-6 rounded-sm font-medium transition-colors ${
                              formData.builderEngaged === option
                                ? 'bg-white text-black' 
                                : 'bg-[#292929] text-white hover:bg-[#3a3a3a]'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleChange({ target: { name: 'builderEngaged', value: 'No, we would like help with selecting a builder' } })}
                        className={`w-full text-left py-4 px-6 rounded-sm font-medium transition-colors ${
                          formData.builderEngaged === 'No, we would like help with selecting a builder'
                            ? 'bg-white text-black' 
                            : 'bg-[#292929] text-white hover:bg-[#3a3a3a]'
                        }`}
                      >
                        No, we would like help with selecting a builder
                      </button>
                    </div>
                  </div>

                  <div className="pt-6">
                    <label htmlFor="additionalInfo" className="block text-sm font-medium text-white mb-2">
                      Additional information about your project (optional)
                    </label>
                    <input
                      type="text"
                      id="additionalInfo"
                      name="additionalInfo"
                      value={formData.additionalInfo || ''}
                      onChange={handleChange}
                      placeholder="Tell us more about your project"
                      className="w-full bg-[#292929] rounded-sm py-4 px-5 text-white placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent h-14 border-0 shadow-none"
                    />
                  </div>

                  {formData.builderEngaged === 'Yes' && (
                    <div className="space-y-4 pt-4">
                      <div>
                        <label htmlFor="builderDetails" className="block text-sm font-medium text-white mb-2">
                          Builder details (if you answered yes above, please provide builder name and other details below)
                        </label>
                        <input
                          type="text"
                          id="builderDetails"
                          name="builderDetails"
                          value={formData.builderDetails}
                          onChange={handleChange}
                          placeholder="Builder / Engineer Name"
                          className="w-full bg-[#292929] rounded-sm py-4 px-5 text-white placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent h-14 border-0 shadow-none"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          id="builderEngineer"
                          name="builderEngineer"
                          value={formData.builderEngineer || ''}
                          onChange={handleChange}
                          placeholder="Builder / Engineer"
                          className="w-full bg-[#292929] rounded-sm py-4 px-5 text-white placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent h-14 border-0 shadow-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="w-full max-w-2xl">
                <div className="mb-8">
                  <div className="flex justify-between items-center pb-3 border-b border-white/20">
                    <h2 className="text-lg font-medium text-white">
                      PROJECT PARTICULARS
                    </h2>
                    <span className="text-sm text-white/70">(05/08)</span>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <h3 className="text-lg font-medium text-white">
                    Project budget range (if known) <span className="text-red-500">*</span>
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {['< $500k', '$500k - $1 Mil', '$1 Mil - $1.5 Mil', '$1.5 Mil - $2.5 Mil', '$2.5 Mil+'].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleChange({ target: { name: 'budgetRange', value: option } })}
                        className={`w-full py-4 px-6 text-center rounded-sm font-medium transition-colors ${
                          formData.budgetRange === option
                            ? 'bg-white text-black' 
                            : 'bg-[#292929] text-white hover:bg-[#3a3a3a]'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  <p className="text-xs text-gray-400">
                    Note: our design fees start from a minimum of $4,500-$6,000 p/m 2 . Project costs can vary significantly depending on your needs. We will create a custom proposal for your project, including detailed fees and inclusions, once after we meet to provide clarity on any costs moving forward.
                  </p>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="w-full max-w-2xl">
                <div className="mb-8">
                  <div className="flex justify-between items-center pb-3 border-b border-white/20">
                    <h2 className="text-lg font-medium text-white">
                      PROJECT PARTICULARS
                    </h2>
                    <span className="text-sm text-white/70">(04/08)</span>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <label htmlFor="projectLocation" className="block text-sm font-medium text-white mb-2">
                      Where are you planning to build your project? <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="projectLocation"
                      name="projectLocation"
                      value={formData.projectLocation}
                      onChange={handleChange}
                      placeholder="Enter location (e.g., Dublin, Ireland)"
                      className="w-full bg-[#292929] rounded-sm py-4 px-5 text-white placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent h-14 border-0 shadow-none"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="projectTimeline" className="block text-sm font-medium text-white mb-2">
                      Project timeline for designs and/or build (if known)
                    </label>
                    <input
                      type="text"
                      id="projectTimeline"
                      name="projectTimeline"
                      value={formData.projectTimeline}
                      onChange={handleChange}
                      placeholder="Enter your estimated timeline"
                      className="w-full bg-[#292929] rounded-sm py-4 px-5 text-white placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent h-14 border-0 shadow-none"
                    />
                  </div>

                  <p className="text-xs text-gray-400">
                    Note: our studio has an 8-12 week minimum wait time to commence new projects. Project timelines vary depending on a range of factors but we ask that you allow a minimum of 6 to 12 months from commencement to delivery of construction plans ready for build.
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Navigation Buttons */}
          <div className="p-4">
            <div className="max-w-lg mx-auto flex justify-end gap-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 text-sm font-medium text-white hover:text-gray-300"
                >
                  BACK
                </button>
              )}
              
              {currentStep === 1 ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-3 text-sm font-medium bg-white text-black rounded-full cursor-pointer flex items-center gap-2"
                >
                  NEXT→
                </button>
              ) : currentStep === 8 ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-3 text-sm font-medium bg-white text-black rounded-full cursor-pointer flex items-center gap-2"
                >
                  SUBMIT FORM →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={formData.workedWithArchitect === null}
                  className={`px-6 py-3 text-sm font-medium rounded-full flex items-center gap-2 ${
                    formData.workedWithArchitect === null
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-white text-black cursor-pointer'
                  }`}
                >
                  NEXT→
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPanel;
