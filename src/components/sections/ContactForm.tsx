"use client";

import { useState, FormEvent } from "react";

const projectTypes = [
  "Website design",
  "Webflow / Framer development",
  "Product design",
  "Brand or visual identity",
  "Ongoing freelance / design partner for studio or agency",
  "Something else",
];

const budgetOptions = [
  "$5,000 – $7,500",
  "$7,500 – $12,000",
  "$12,000 – $20,000",
  "$20,000+",
  "Not sure yet – let’s talk",
];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState(projectTypes[0]);
  const [budget, setBudget] =useState(budgetOptions[0]);
  const [details, setDetails] = useState("");

  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);
    setErrors({});

    const newErrors: { name?: string; email?: string } = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate success/error
    if (Math.random() > 0.2) {
      setSubmissionStatus("success");
      setName("");
      setEmail("");
      setProjectType(projectTypes[0]);
      setBudget(budgetOptions[0]);
      setDetails("");
    } else {
      setSubmissionStatus("error");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-background text-foreground p-6 sm:p-10 md:p-20 lg:p-24 w-full mx-auto font-primary">
      <h2 className="text-[32px] md:text-[40px] leading-tight font-normal text-text-primary mb-12 md:mb-16">
        Open for new projects <br />& creative partnerships.
      </h2>

      <div className="w-full">
        {submissionStatus === null && (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-base font-medium text-text-primary">Name *</label>
              <input id="name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-input bg-background p-4 text-base text-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
              {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-base font-medium text-text-primary">Email *</label>
              <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-input bg-background p-4 text-base text-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
              {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="project_type" className="text-base font-medium text-text-primary">What are you looking for?</label>
              <div className="relative">
                <select id="project_type" name="project_type" value={projectType} onChange={(e) => setProjectType(e.target.value)} className="w-full appearance-none border border-input bg-background p-4 text-base text-foreground focus:outline-none focus:ring-1 focus:ring-ring pr-10">
                  {projectTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="budget" className="text-base font-medium text-text-primary">Budget</label>
              <div className="relative">
                <select id="budget" name="budget" value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full appearance-none border border-input bg-background p-4 text-base text-foreground focus:outline-none focus:ring-1 focus:ring-ring pr-10">
                  {budgetOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col gap-2">
              <label htmlFor="details" className="text-base font-medium text-text-primary">Project details</label>
              <textarea id="details" name="details" value={details} onChange={(e) => setDetails(e.target.value)} className="w-full border border-input bg-background p-4 text-base text-foreground h-32 resize-none focus:outline-none focus:ring-1 focus:ring-ring" />
            </div>

            <div className="md:col-span-2 mt-2">
              <button type="submit" disabled={isSubmitting} className="text-base font-medium text-text-primary hover:text-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        )}

        {submissionStatus === "success" && (
          <div className="p-4 text-lg text-text-primary">
            Thank you! Your submission has been received!
          </div>
        )}

        {submissionStatus === "error" && (
          <div className="p-4 text-lg text-destructive">
            Oops! Something went wrong while submitting the form.
          </div>
        )}
      </div>

      <div className="mt-16 md:mt-24 pt-10 border-t border-border">
        <p className="text-base text-text-secondary mb-4">Want to contact me directly?</p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-2">
          <a href="mailto:hello@jillesdesign.com" className="text-base text-text-primary hover:text-accent transition-colors flex items-center gap-2">
            Send an email <span>→</span>
          </a>
          <a href="https://cal.com/jilles-design/15min" target="_blank" rel="noopener noreferrer" className="text-base text-text-primary hover:text-accent transition-colors flex items-center gap-2">
            Schedule a call <span>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}