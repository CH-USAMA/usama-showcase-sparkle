import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Code, BrainCircuit, Rocket, BriefcaseBusiness, Megaphone } from "lucide-react"; 

const About = () => {

  const skills = {
    "Web Development": [
      "React.js",
      "Next.js",
      "Laravel",
      "Tailwind CSS",
      "TypeScript",
      "Node.js",
    ],
    "AI & Automation": [
      "OpenAI API",
      "Chatbot Integration",
      "Machine Learning Basics",
      "Real-time Apps",
    ],
    "Marketing & Strategy": [
      "SEO Optimization",
      "Digital Marketing",
      "Brand Communication",
      "Conversion Strategy",
    ],
  };
  
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 text-foreground">
            ABOUT THE BEST WEB DEVELOPER
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
  {/* Web Development Expertise */}
  <div className="flex items-start gap-4">
    <div className="p-2 bg-primary/10 rounded-full">
      <Code className="w-6 h-6 text-primary" />
    </div>
    <p className="text-lg text-muted-foreground leading-relaxed">
      I’m a passionate <span className="text-foreground font-semibold">web developer</span> and 
      <span className="text-foreground font-semibold"> tech problem-solver</span> with 
      <strong> 5+ years of experience</strong> helping brands and businesses transform their ideas 
      into <strong>high-performing digital solutions</strong>.
    </p>
  </div>

  {/* One-Stop Solution */}
  <div className="flex items-start gap-4">
    <div className="p-2 bg-primary/10 rounded-full">
      <BrainCircuit className="w-6 h-6 text-primary" />
    </div>
    <p className="text-lg text-muted-foreground leading-relaxed">
      Whether you need a <strong>custom website</strong>, a 
      <strong> scalable web application</strong>, or want to enhance your existing 
      system with <strong>AI and automation</strong>, I provide a 
      <span className="text-foreground font-semibold"> one-stop solution</span> — from strategy 
      and design to full-stack development and ongoing system management.
    </p>
  </div>

  {/* Innovation & High-Tech */}
  <div className="flex items-start gap-4">
    <div className="p-2 bg-primary/10 rounded-full">
      <Rocket className="w-6 h-6 text-primary" />
    </div>
    <p className="text-lg text-muted-foreground leading-relaxed">
      With a passion for innovation and ongoing learning, I integrate 
      <strong> real-time features</strong>, build <strong>complex custom systems</strong>, 
      and deliver <strong>high-tech solutions</strong> tailored to evolving industry insights 
      and project needs.
    </p>
  </div>
</div>

<div className="space-y-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
  {Object.entries(skills).map(([category, skillList]) => {
    // Assign relevant icons dynamically
    const iconMap: Record<string, JSX.Element> = {
      "Web Development": <Code className="w-5 h-5 text-primary" />,
      "AI & Automation": <BrainCircuit className="w-5 h-5 text-primary" />,
      "Project Management": <BriefcaseBusiness className="w-5 h-5 text-primary" />,
      "Marketing & Strategy": <Megaphone className="w-5 h-5 text-primary" />,
    };

    return (
      <Card
        key={category}
        className="p-6 hover:shadow-xl transition-all duration-300 rounded-xl border border-border/50"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">{iconMap[category]}</div>
          <h3 className="text-xl font-semibold text-foreground">{category}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {skillList.map((skill, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-sm px-3 py-1 hover:bg-primary hover:text-white transition-colors duration-200"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </Card>
    );
  })}
</div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;