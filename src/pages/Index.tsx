import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ParallaxDivider from "@/components/ParallaxDivider";
import ProjectsSection from "@/components/ProjectsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutSection from "@/components/AboutSection";
import ArticlesSection from "@/components/ArticlesSection";
import MapSection from "@/components/MapSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ParallaxDivider text="نصمم مساحات تنبض بالحياة وتعكس ذوقك الراقي" />
      <ProjectsSection />
      <TestimonialsSection />
      <AboutSection />
      <ArticlesSection />
      <MapSection />
      <ContactSection />
      <Footer />
      <FloatingContact />
      <ChatBot />
    </div>
  );
};

export default Index;
