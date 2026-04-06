import { Phone } from "lucide-react";

const FloatingContact = () => {
  return (
    <a
      href="tel:+966554827193"
      className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full gold-gradient flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
      aria-label="اتصل بنا"
    >
      <Phone className="w-6 h-6 text-primary-foreground" />
    </a>
  );
};

export default FloatingContact;
