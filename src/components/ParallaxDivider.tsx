import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ParallaxDivider = ({ text }: { text: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".parallax-text",
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="relative py-20 overflow-hidden bg-charcoal"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 35px, hsl(36 60% 48% / 0.1) 35px, hsl(36 60% 48% / 0.1) 36px)"
        }} />
      </div>
      <div className="container mx-auto text-center relative z-10">
        <p className="parallax-text font-heading text-3xl md:text-5xl font-bold text-primary-foreground/90 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
};

export default ParallaxDivider;
