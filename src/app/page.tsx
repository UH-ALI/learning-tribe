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

// Story order: who teaches (the deciding factor for parents) → how we teach →
// proof → logistics → the crash-course offer → one sign-up area for both
// offers → reassurance.
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TribeMarquee />
        <FacultyDirectory />
        <WhyUs />
        <SocialProof />
        <TimetableSection />
        <CrashCourses />
        <LeadCapture />
        <Faq />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
