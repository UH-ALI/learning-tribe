import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TribeMarquee } from "@/components/sections/TribeMarquee";
import { WhyUs } from "@/components/sections/WhyUs";
import { FacultyDirectory } from "@/components/sections/FacultyDirectory";
import { TimetableSection } from "@/components/sections/TimetableSection";
import { CrashCourses } from "@/components/sections/CrashCourses";
import { SocialProof } from "@/components/sections/SocialProof";
import { LeadCapture } from "@/components/sections/LeadCapture";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";

// Funnel order: attention → values → trust → logistics → crash-course offer →
// proof → capture → reassurance.
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TribeMarquee />
        <WhyUs />
        <FacultyDirectory />
        <TimetableSection />
        <CrashCourses />
        <SocialProof />
        <LeadCapture />
        <Faq />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
