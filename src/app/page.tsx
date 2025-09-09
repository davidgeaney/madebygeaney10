import Hero from "@/components/sections/Hero";
import Portfolio from "@/components/sections/Portfolio";
import ContactCTA from "@/components/sections/ContactCTA";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="m-0 p-0">
        <Hero />
        <Portfolio />
        <div className="px-4">
          <ContactCTA />
        </div>
      </main>
      
      <div className="px-4">
        <Footer />
      </div>
    </div>
  );
}