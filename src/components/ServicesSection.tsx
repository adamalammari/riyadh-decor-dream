import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Palette, Home, Lightbulb, Ruler, Sofa, PaintBucket } from "lucide-react";

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
  {
    icon: Sofa,
    title: "تأثيث فاخر",
    desc: "نوفر أرقى قطع الأثاث المستوردة والمحلية التي تناسب ذوقك",
  },
  {
    icon: PaintBucket,
    title: "دهانات وورق جدران",
    desc: "نقدم أحدث تقنيات الدهانات وورق الجدران الفاخر لمسة نهائية مثالية",
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate title
      gsap.fromTo(
        ".services-heading",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Animate each card
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="services-heading font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            خدماتنا <span className="gold-text">المتميزة</span>
          </h2>
          <div className="services-heading h-[2px] w-16 gold-gradient mx-auto mb-4" />
          <p className="services-heading text-muted-foreground max-w-lg mx-auto">
            نقدم مجموعة متكاملة من الخدمات لتحويل مساحتك إلى عمل فني
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="glass-card rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-500 group hover:-translate-y-2 border border-border"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gold-gradient flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
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
