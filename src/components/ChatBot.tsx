import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import gsap from "gsap";

interface Message {
  text: string;
  isBot: boolean;
}

const botResponses: Record<string, string> = {
  default: "مرحباً بك في أثير ديكور! كيف يمكنني مساعدتك؟ 🌟",
  سعر: "أسعارنا تبدأ من ١٥,٠٠٠ ريال للتصميم الداخلي. للحصول على عرض سعر مخصص، يرجى التواصل معنا على الرقم سعر: "أسعارنا تبدأ من ١٥,٠٠٠ ريال للتصميم الداخلي. للحصول على عرض سعر مخصص، يرجى التواصل معنا على الرقم +966 55 482 7193 📞",",
  خدم: "نقدم خدمات التصميم الداخلي، اختيار الألوان والمواد، تصميم الإضاءة، والتنفيذ الكامل. أي خدمة تهمك؟ ✨",
  موقع: "نحن في الرياض، المملكة العربية السعودية. يسعدنا استقبالكم! 📍",
  وقت: "عادةً يستغرق المشروع من ٤ إلى ١٢ أسبوعاً حسب حجم العمل. نحرص على الجودة والالتزام بالمواعيد ⏰",
  تصميم: "فريقنا المتخصص يقدم تصاميم عصرية تجمع بين الفخامة والراحة. نبدأ بفهم رؤيتك ثم نحولها إلى تصميم مبهر 🎨",
};

const getResponse = (input: string): string => {
  const lower = input.toLowerCase();
  for (const [key, value] of Object.entries(botResponses)) {
    if (key !== "default" && lower.includes(key)) return value;
  }
  return "شكراً لتواصلك! سيقوم فريقنا بالرد عليك قريباً. يمكنك أيضاً الاتصال بنا مباشرة على return "شكراً لتواصلك! سيقوم فريقنا بالرد عليك قريباً. يمكنك أيضاً الاتصال بنا مباشرة على +966 55 482 7193 📱";";
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: botResponses.default, isBot: true },
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && chatRef.current) {
      gsap.fromTo(
        chatRef.current,
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
      );
    }
  }, [isOpen]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { text: userMsg, isBot: false }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [...prev, { text: getResponse(userMsg), isBot: true }]);
    }, 800);
  };

  return (
    <>
      {/* Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full gold-gradient flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label="المحادثة"
      >
        {isOpen ? <X className="w-6 h-6 text-primary-foreground" /> : <MessageCircle className="w-6 h-6 text-primary-foreground" />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div
          ref={chatRef}
          className="fixed bottom-24 right-6 z-40 w-80 sm:w-96 rounded-2xl overflow-hidden shadow-2xl border border-border"
        >
          {/* Header */}
          <div className="gold-gradient px-5 py-4">
            <h3 className="font-heading text-lg font-bold text-primary-foreground">أثير ديكور</h3>
            <p className="text-primary-foreground/70 text-xs">نحن هنا لمساعدتك</p>
          </div>

          {/* Messages */}
          <div className="bg-background h-72 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.isBot
                      ? "bg-secondary text-secondary-foreground rounded-tr-sm"
                      : "gold-gradient text-primary-foreground rounded-tl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="bg-background border-t border-border p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="اكتب رسالتك..."
              className="flex-1 px-4 py-2 rounded-xl bg-secondary text-foreground text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              onClick={sendMessage}
              className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center hover:scale-105 transition-transform"
            >
              <Send className="w-4 h-4 text-primary-foreground" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
