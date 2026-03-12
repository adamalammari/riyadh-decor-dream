import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import project1 from "@/assets/project1.jpg";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";
import project4 from "@/assets/project4.jpg";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { img: project1, title: "غرفة نوم فاخرة", category: "سكني" },
  { img: project2, title: "مطبخ عصري", category: "سكني" },
  { img: project3, title: "حمام رخامي", category: "سكني" },
  { img: project4, title: "مكتب تنفيذي", category: "تجاري" },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-title", {
        scrollTrigger: { trigger: ".project-title", start: "top 85%" },
        y: 50,
        opacity: 0,
        duration: 1,
      });

      gsap.from(".project-card", {
        scrollTrigger: { trigger: ".projects-grid", start: "top 80%" },
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section-padding bg-cream">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="project-title font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            أحدث <span className="gold-text">أعمالنا</span>
          </h2>
          <div className="h-[2px] w-16 gold-gradient mx-auto" />
        </div>

        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <div
              key={i}
              className="project-card group relative overflow-hidden rounded-2xl cursor-pointer"
            >
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/60 transition-all duration-500 flex items-end">
                <div className="p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-xs font-medium text-gold-light uppercase tracking-wider">{project.category}</span>
                  <h3 className="font-heading text-2xl font-bold text-primary-foreground mt-1">{project.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
