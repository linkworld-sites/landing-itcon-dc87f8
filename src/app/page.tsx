import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MarqueeRail from "@/components/MarqueeRail";
import Services from "@/components/Services";
import Differentiators from "@/components/Differentiators";
import CaseStudies from "@/components/CaseStudies";
import About from "@/components/About";
import Process from "@/components/Process";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-stage font-body text-chalk overflow-x-hidden">
      <Navigation />
      <Hero />
      <MarqueeRail />
      <Services />
      <Differentiators />
      <CaseStudies />
      <About />
      <Process />
      <ContactSection />
      <Footer />
    </main>
  );
}
