import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-charcoal py-12 px-6">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <img src={logo} alt="أثير ديكور" className="h-8 w-8" />
          <span className="font-heading text-xl font-bold gold-text">أثير ديكور</span>
        </div>
        <p className="text-primary-foreground/50 text-sm mb-4">
          الرياض، المملكة العربية السعودية
        </p>
        <div className="h-[1px] w-24 gold-gradient mx-auto mb-4 opacity-50" />
        <p className="text-primary-foreground/40 text-xs">
          © {new Date().getFullYear()} أثير ديكور. جميع الحقوق محفوظة
        </p>
      </div>
    </footer>
  );
};

export default Footer;
