import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, ArrowLeft } from "lucide-react";
import project1 from "@/assets/project1.jpg";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    img: project1,
    title: "٥ نصائح ذهبية لاختيار ألوان غرفة النوم المثالية",
    excerpt: "اكتشف كيف تختار الألوان التي تساعدك على الاسترخاء وتحسين جودة نومك مع لمسة من الأناقة.",
    date: "١٥ مارس ٢٠٢٦",
    category: "نصائح التصميم",
  },
  {
    img: project2,
    title: "أحدث اتجاهات تصميم المطابخ العصرية لعام ٢٠٢٦",
    excerpt: "تعرف على أبرز صيحات المطابخ الحديثة من الرخام الطبيعي إلى الأجهزة الذكية المدمجة.",
    date: "١٠ مارس ٢٠٢٦",
    category: "اتجاهات",
  },
  {
    img: project3,
    title: "كيف تحوّل حمامك إلى منتجع صحي في منزلك",
    excerpt: "خطوات بسيطة لتحويل الحمام العادي إلى مساحة استجمام فاخرة بأقل التكاليف.",
    date: "٥ مارس ٢٠٢٦",
    category: "أفكار ملهمة",
  },
];

const ArticlesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".articles-heading",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, rotateY: 15 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.7,
            delay: i * 0.15,
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="articles" ref={sectionRef} className="section-padding bg-cream">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="articles-heading font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            مقالات <span className="gold-text">ملهمة</span>
          </h2>
          <div className="articles-heading h-[2px] w-16 gold-gradient mx-auto mb-4" />
          <p className="articles-heading text-muted-foreground max-w-lg mx-auto">
            اطلع على أحدث النصائح والاتجاهات في عالم التصميم الداخلي
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <div
              key={i}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="bg-background rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group cursor-pointer border border-border hover:-translate-y-2"
              style={{ perspective: "1000px" }}
            >
              <div className="relative overflow-hidden h-52">
                <img
                  src={article.img}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                  {article.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.date}
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2 leading-relaxed group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{article.excerpt}</p>
                <div className="flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                  <span>اقرأ المزيد</span>
                  <ArrowLeft className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
