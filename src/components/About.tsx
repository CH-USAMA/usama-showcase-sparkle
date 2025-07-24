import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const About = () => {
  const skills = {
    Strategy: ["SEO", "Marketing", "Communications"],
    "My Skills": ["Angular", "Java Script", "Vue", "Svelte"],
    Advice: ["Project Management", "Organizational Development"]
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 text-foreground">
            ABOUT ME
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div className="space-y-6 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a passionate web developer with 5+ years of experience in creating custom websites and web applications. My mission is to turn your design concepts into fully functional, responsive, and user-friendly digital solutions.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                As a dedicated web developer, I specialize in planning and developing web-based applications that the clients need and through my industry expertise, I work to deliver the best possible user experience.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                With a passion for innovation and ongoing learning, I always adapt my plans according to industry insights and project specifications, whether integrating real-time features or building complex, custom websites that evolve every time.
              </p>
            </div>

            {/* Right Content - Skills Grid */}
            <div className="space-y-6 animate-slide-up" style={{animationDelay: '0.4s'}}>
              {Object.entries(skills).map(([category, skillList]) => (
                <Card key={category} className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-semibold mb-4 text-foreground">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;