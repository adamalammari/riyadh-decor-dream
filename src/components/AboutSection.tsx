import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Users, Clock, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Award, value: "+١٥٠", label: "مشروع منجز" },
  { icon: Users, value: "+١٢٠", label: "عميل سعيد" },
  { icon: Clock, value: "+١٠", label: "سنوات خبرة" },
  { icon: Star, value: "٤.٩", label: "تقييم العملاء" },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-text", {
        scrollTrigger: { trigger: ".about-text", start: "top 85%" },
        x: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".stat-item", {
        scrollTrigger: { trigger: ".stats-grid", start: "top 80%" },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="about-text font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            من <span className="gold-text">نحن</span>
          </h2>
          <div className="h-[2px] w-16 gold-gradient mx-auto mb-8" />
          <p className="about-text text-muted-foreground text-lg leading-relaxed">
            أثير ديكور هي شركة رائدة في مجال التصميم الداخلي والديكور في الرياض.
            نؤمن بأن كل مساحة تستحق أن تكون تحفة فنية تعكس ذوق صاحبها.
            فريقنا من المصممين المحترفين يعمل بشغف لتحويل رؤيتك إلى واقع مبهر.
          </p>
        </div>

        <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full gold-gradient flex items-center justify-center">
                <stat.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="font-heading text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
