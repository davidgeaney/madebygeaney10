import WorkHero from "@/components/sections/WorkHero";
import ContactCTA from "@/components/sections/ContactCTA";

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="m-0 p-0">
        <WorkHero />
        <div className="relative">
          <div>
            <ContactCTA />
          </div>
        </div>
      </main>
    </div>
  );
}
