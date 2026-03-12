import { useEffect, useRef } from "react";
import gsap from "gsap";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-title", { y: 80, opacity: 0, duration: 1.2, delay: 0.3 })
        .from(".hero-subtitle", { y: 50, opacity: 0, duration: 1 }, "-=0.6")
        .from(".hero-line", { scaleX: 0, duration: 0.8, transformOrigin: "center" }, "-=0.4")
        .from(".hero-btn", { y: 30, opacity: 0, duration: 0.8 }, "-=0.4");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" ref={heroRef} className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="hero-overlay absolute inset-0" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <h1 className="hero-title font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 leading-tight">
          أثير <span className="gold-text">ديكور</span>
        </h1>
        <div className="hero-line h-[2px] w-24 gold-gradient mb-6" />
        <p className="hero-subtitle text-lg md:text-2xl text-primary-foreground/80 max-w-2xl mb-10 leading-relaxed">
          نحوّل مساحاتك إلى تحف فنية تنبض بالحياة والأناقة
          <br />
          <span className="text-base text-primary-foreground/60">الرياض، المملكة العربية السعودية</span>
        </p>
        <button
          onClick={scrollToContact}
          className="hero-btn gold-gradient text-primary-foreground px-10 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
        >
          ابدأ مشروعك الآن
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/40 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-primary-foreground/60 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
