import Hero from "@/components/sections/Hero";
import Portfolio from "@/components/sections/Portfolio";
import ContactCTA from "@/components/sections/ContactCTA";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="m-0 p-0">
        <Hero />
        <div className="relative">
          <Portfolio />
          <div className="px-4 -mt-px">
            <ContactCTA />
          </div>
        </div>
      </main>
    </div>
  );
}