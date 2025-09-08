import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
import Portfolio from "@/components/sections/Portfolio";
import ContactCTA from "@/components/sections/ContactCTA";
import ContactForm from "@/components/sections/ContactForm";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <Hero />
        <Portfolio />
        <ContactCTA />
        
        <section className="bg-background">
          <div className="max-w-[800px] mx-auto">
            <ContactForm />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}