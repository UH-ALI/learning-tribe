import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { FacultyDirectory } from "@/components/sections/FacultyDirectory";
import { TimetableSection } from "@/components/sections/TimetableSection";
import { SocialProof } from "@/components/sections/SocialProof";
import { LeadCapture } from "@/components/sections/LeadCapture";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";

// Funnel order: attention → trust → logistics → proof → capture.
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FacultyDirectory />
        <TimetableSection />
        <SocialProof />
        <LeadCapture />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
