import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "محمد العتيبي",
    role: "صاحب فيلا بالرياض",
    text: "فريق أثير ديكور حوّل فيلتنا إلى تحفة فنية. الاهتمام بالتفاصيل والذوق الرفيع فاق توقعاتنا تماماً.",
    rating: 5,
  },
  {
    name: "نورة الشمري",
    role: "مديرة شركة",
    text: "تصميم مكتبنا الجديد أثار إعجاب جميع الزوار والعملاء. شكراً لفريق أثير على الإبداع والالتزام.",
    rating: 5,
  },
  {
    name: "خالد الدوسري",
    role: "رجل أعمال",
    text: "تعاملت مع عدة شركات ديكور لكن أثير ديكور الوحيدة التي فهمت رؤيتي وحققتها بأفضل صورة.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-heading",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
      );

      gsap.fromTo(
        ".testimonial-card",
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 0.7,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-background overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="testimonial-heading font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            ماذا يقول <span className="gold-text">عملاؤنا</span>
          </h2>
          <div className="testimonial-heading h-[2px] w-16 gold-gradient mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card glass-card rounded-2xl p-8 relative border border-border hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              <Quote className="w-10 h-10 text-primary/20 absolute top-6 left-6" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-primary fill-primary" />
                ))}
              </div>
              <p className="text-foreground/80 leading-relaxed mb-6 text-sm">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">{t.name}</div>
                  <div className="text-muted-foreground text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
