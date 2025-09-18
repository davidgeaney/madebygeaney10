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
    projectType: '',
    serviceType: '',
    name: '',
    company: '',
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

  const totalSteps = 5;

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
      // Add a small delay to ensure the component is mounted before starting the animation
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 50);
      
      return () => {
        clearTimeout(timer);
      };
    } else {
      // Start the close animation
      setIsVisible(false);
      // Reset body scroll after animation completes
      const timer = setTimeout(() => {
        if (!isOpen) {
          document.body.style.overflow = 'auto';
        }
      }, 500); // Match this with the CSS transition duration
      
      return () => clearTimeout(timer);
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
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Log the form data
    console.log('Form submitted:', formData);
    
    // Here you would typically send the data to your backend
    // For now, we'll just show a success message
    alert('Thank you for your submission! We\'ll be in touch soon.');
    
    // Close the form
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      // Start the close animation
      setIsVisible(false);
      // Wait for the animation to complete before calling onClose
      setTimeout(() => {
        onClose();
      }, 500); // Match this with the CSS transition duration
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" style={{ overflow: 'hidden' }}>
      {/* Left side blurred content */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm transition-all duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleBackdropClick}
        style={{
          zIndex: 49,
          transitionProperty: 'opacity, backdrop-filter',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '500ms'
        }}
      />
      
      {/* Panel */}
      <div 
        className={`fixed inset-y-0 right-0 w-full md:w-1/2 bg-black text-white shadow-xl transform ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          zIndex: 50,
          willChange: 'transform',
          transition: 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)',
          maxWidth: '100%',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div 
          className="h-full flex flex-col overflow-y-auto" 
          style={{ 
            WebkitOverflowScrolling: 'touch',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 800ms ease-out 300ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 300ms'
          }}
        >
          {/* Progress bar - made more visible */}
          <div className="w-full h-[2px] bg-gray-800/70 relative overflow-visible">
            <div 
              className="h-full bg-white absolute left-0 top-0 transition-all duration-500 ease-out"
              style={{ 
                width: currentStep === 1 ? '10%' : `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
                minWidth: '4px',
                height: '2px',
                boxShadow: '0 0 8px rgba(255,255,255,0.8)'
              }}
            />
          </div>
          
          {/* Header with close button */}
          <div className="px-4 md:px-8 py-4 md:py-6 flex justify-between items-start">
            <div>
              <h1 className="text-sm font-bold mb-3 text-white">(LET'S TALK)</h1>
              <p className="text-sm font-medium text-white max-w-md leading-relaxed">
                Share some details about your web project and goals.
                We'll review your information and get back to you within
                a day to discuss how we can bring your vision to life.
                All inquiries are confidential and there's no obligation.
              </p>
            </div>
            
            <div className="flex flex-col items-end">
              <button
                type="button"
                onClick={onClose}
                className="text-white hover:text-gray-300 focus:outline-none text-sm uppercase tracking-wider p-2 -m-2"
              >
                CLOSE
              </button>
            </div>
          </div>
          
          {/* Form Content */}
          <div className="flex-1 px-4 md:px-8 flex flex-col justify-end pb-8">
            {currentStep === 1 && (
              <div className="w-full max-w-2xl mt-auto">
                <div className="mb-6 flex justify-between items-center border-b border-white/20 pb-3">
                  <h2 className="text-base font-medium text-white">What can we help you with?</h2>
                  <span className="text-sm text-white/70">(01/05)</span>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    {['Landing pages', 'Corporate Website', 'Web / App Design', 'Something else'].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            projectType: option === prev.projectType ? '' : option
                          }));
                          handleNext();
                        }}
                        className={`py-4 px-4 sm:px-6 text-center rounded-sm font-medium transition-colors text-sm sm:text-base ${
                          formData.projectType === option
                            ? 'bg-white text-black'
                            : 'bg-[#292929] text-white hover:bg-[#3a3a3a]'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </form>
              </div>
            )}

            {currentStep === 2 && (
              <div className="w-full max-w-2xl mt-auto">
                <div className="mb-8">
                  <div className="flex justify-between items-center pb-3 border-b border-white/20">
                    <h2 className="text-base font-medium text-white">
                      What can we help you with?
                    </h2>
                    <span className="text-sm text-white/70">(02/05)</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    {['Design + Dev', 'Only Design', 'Only Development'].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            serviceType: option
                          }));
                          handleNext();
                        }}
                        className={`py-4 px-4 sm:px-6 text-center rounded-sm font-medium transition-colors text-sm sm:text-base ${
                          formData.serviceType === option
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

            {currentStep === 3 && (
              <div className="w-full max-w-2xl mt-auto">
                <div className="mb-8">
                  <div className="flex justify-between items-center pb-3 border-b border-white/20">
                    <h2 className="text-base font-medium text-white">
                      What's your budget?
                    </h2>
                    <span className="text-sm text-white/70">(03/05)</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    {[
                      '€1,000 - €5,000',
                      '€5,000 - €10,000',
                      '€10,000 - €25,000',
                      '€25,000+'
                    ].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            budgetRange: option
                          }));
                          handleNext();
                        }}
                        className={`py-4 px-6 text-center rounded-sm font-medium transition-colors ${
                          formData.budgetRange === option
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
              <div className="w-full max-w-2xl mt-auto">
                <div className="mb-8">
                  <div className="flex justify-between items-center pb-3 border-b border-white/20">
                    <h2 className="text-base font-medium text-white">
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
                    
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
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
              <div className="w-full max-w-2xl mt-auto">
                <div className="mb-8">
                  <div className="flex justify-between items-center pb-3 border-b border-white/20">
                    <h2 className="text-base font-medium text-white">
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

            {currentStep === 5 && (
              <div className="w-full max-w-2xl mt-auto">
                <div className="mb-6">
                  <div className="flex justify-between items-center pb-3 border-b border-white/20">
                    <h2 className="text-base font-medium text-white">
                      Who are you?
                    </h2>
                    <span className="text-sm text-white/70">(05/05)</span>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-white mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full bg-[#292929] rounded-sm py-4 px-5 text-white placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent h-14 border-0 shadow-none"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company || ''}
                        onChange={handleChange}
                        className="block w-full bg-[#292929] rounded-sm py-4 px-5 text-white placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent h-14 border-0 shadow-none"
                        placeholder="Company Name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full bg-[#292929] rounded-sm py-4 px-5 text-white placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent h-14 border-0 shadow-none"
                        placeholder="you@company.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="block w-full bg-[#292929] rounded-sm py-4 px-5 text-white placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent h-14 border-0 shadow-none"
                        placeholder="+1 (___) ___-____"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <label htmlFor="projectDetails" className="block text-sm font-medium text-white mb-2">
                      Tell us about your project <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="projectDetails"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="block w-full bg-[#292929] rounded-sm py-4 px-5 text-white placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent border-0 shadow-none"
                      placeholder="Share some details about what you're looking to achieve..."
                    />
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="privacy"
                        name="privacy"
                        type="checkbox"
                        required
                        className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="privacy" className="text-gray-300">
                        By filling in the form you agree to our{' '}
                        <a href="/privacy" className="text-white hover:underline">
                          Privacy Policy
                        </a>
                        {' '}and{' '}
                        <a href="/terms" className="text-white hover:underline">
                          Terms of Service
                        </a>.
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {currentStep === 4 && (
              <div className="w-full max-w-2xl mt-auto">
                <div className="mb-8">
                  <div className="flex justify-between items-center pb-3 border-b border-white/20">
                    <h2 className="text-base font-medium text-white">
                      When should the project start?
                    </h2>
                    <span className="text-sm text-white/70">(04/05)</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    {[
                      'ASAP, needed it yesterday',
                      'I have some time'
                    ].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            projectTimeline: option
                          }));
                          handleNext();
                        }}
                        className={`py-4 px-6 text-center rounded-sm font-medium transition-colors ${
                          formData.projectTimeline === option
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
              
              {currentStep === totalSteps && (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-3 text-sm sm:text-base font-medium rounded-full bg-white text-black hover:bg-gray-100 transition-colors"
                >
                  SUBMIT
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
