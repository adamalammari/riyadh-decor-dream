import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MapSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".map-content",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="map" ref={sectionRef} className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="map-content font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            <span className="gold-text">موقعنا</span> على الخريطة
          </h2>
          <div className="map-content h-[2px] w-16 gold-gradient mx-auto mb-4" />
          <div className="map-content flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="w-5 h-5 text-primary" />
            <span>الرياض، المملكة العربية السعودية</span>
          </div>
        </div>

        <div className="map-content relative rounded-2xl overflow-hidden shadow-2xl border border-border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d463878.0254471858!2d46.54271379781693!3d24.725195894498673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sar!2s!4v1710000000000!5m2!1sar!2s"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="موقع أثير ديكور - الرياض"
            className="w-full"
          />
          {/* Overlay card */}
          <div className="absolute top-6 right-6 glass-card rounded-xl p-5 max-w-xs shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground">أثير ديكور</h3>
                <p className="text-xs text-muted-foreground">مفتوح الآن</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">الرياض، حي العليا، شارع الأمير محمد بن عبدالعزيز</p>
            <a
              href="https://maps.google.com/?q=24.7136,46.6753"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block text-center gold-gradient text-primary-foreground py-2 rounded-lg text-sm font-semibold hover:scale-[1.02] transition-transform"
            >
              احصل على الاتجاهات
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
