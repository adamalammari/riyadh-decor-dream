import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Palette, Home, Lightbulb, Ruler } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Home,
    title: "تصميم داخلي",
    desc: "نصمم مساحات داخلية تجمع بين الجمال والوظيفة بأسلوب عصري فريد",
  },
  {
    icon: Palette,
    title: "اختيار الألوان",
    desc: "نختار لك لوحة ألوان متناسقة تعكس شخصيتك وتضفي الدفء على منزلك",
  },
  {
    icon: Lightbulb,
    title: "تصميم الإضاءة",
    desc: "نبتكر حلول إضاءة ذكية تبرز جمال التصميم وتخلق أجواء مميزة",
  },
  {
    icon: Ruler,
    title: "تنفيذ كامل",
    desc: "نتولى تنفيذ المشروع من البداية حتى التسليم بأعلى معايير الجودة",
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-title", {
        scrollTrigger: { trigger: ".service-title", start: "top 85%" },
        y: 50,
        opacity: 0,
        duration: 1,
      });

      gsap.from(".service-card", {
        scrollTrigger: { trigger: ".services-grid", start: "top 80%" },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="service-title font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            خدماتنا <span className="gold-text">المميزة</span>
          </h2>
          <div className="h-[2px] w-16 gold-gradient mx-auto" />
        </div>

        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className="service-card glass-card rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-500 group hover:-translate-y-2"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gold-gradient flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
