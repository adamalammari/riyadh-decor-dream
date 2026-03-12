import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import logo from "@/assets/logo.png";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "الرئيسية", href: "#hero" },
  { label: "خدماتنا", href: "#services" },
  { label: "أعمالنا", href: "#projects" },
  { label: "من نحن", href: "#about" },
  { label: "مقالات", href: "#articles" },
  { label: "الموقع", href: "#map" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      // Track active section
      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".nav-logo", { x: -40, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2 });
      gsap.from(".nav-link", { y: -20, opacity: 0, stagger: 0.08, duration: 0.6, ease: "power3.out", delay: 0.5 });
      gsap.from(".nav-cta", { scale: 0.8, opacity: 0, duration: 0.6, ease: "back.out(1.7)", delay: 1 });
    }, navRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl shadow-[0_4px_30px_hsl(36_60%_48%/0.08)] py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 lg:px-12">
        {/* Logo */}
        <button onClick={() => scrollTo("#hero")} className="nav-logo flex items-center gap-3 group">
          <div className="relative">
            <img src={logo} alt="أثير ديكور" className="h-11 w-11 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 rounded-full bg-primary/10 scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-heading text-xl font-bold gold-text leading-tight">أثير ديكور</span>
            <span className={`text-[10px] tracking-widest uppercase ${scrolled ? "text-muted-foreground" : "text-primary-foreground/50"}`}>
              Atheer Decor
            </span>
          </div>
        </button>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`nav-link px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSection === link.href
                  ? "gold-gradient text-primary-foreground shadow-md"
                  : scrolled
                  ? "text-foreground/70 hover:text-foreground hover:bg-secondary"
                  : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA button */}
        <button
          onClick={() => scrollTo("#contact")}
          className={`nav-cta hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
            scrolled
              ? "gold-gradient text-primary-foreground shadow-md hover:shadow-lg hover:scale-105"
              : "border-2 border-primary-foreground/30 text-primary-foreground hover:border-primary-foreground/60 hover:bg-primary-foreground/10"
          }`}
        >
          تواصل معنا
          <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
        </button>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden p-2 rounded-xl transition-colors ${
            scrolled ? "text-foreground hover:bg-secondary" : "text-primary-foreground hover:bg-primary-foreground/10"
          }`}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl mt-2 mx-4 rounded-2xl p-6 flex flex-col gap-2 shadow-2xl border border-border">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`text-sm font-medium py-3 px-4 rounded-xl text-right transition-all ${
                activeSection === link.href
                  ? "gold-gradient text-primary-foreground"
                  : "text-foreground/70 hover:bg-secondary"
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="h-px bg-border my-2" />
          <button
            onClick={() => scrollTo("#contact")}
            className="gold-gradient text-primary-foreground py-3 px-4 rounded-xl font-semibold text-sm text-center"
          >
            تواصل معنا
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
