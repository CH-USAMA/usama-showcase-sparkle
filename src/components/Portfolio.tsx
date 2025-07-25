import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: "Focus Interiors",
      description: "Luxury Interior Design Studio website with premium aesthetics and SEO optimization",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      technologies: ["Shopify", "APIs", "React", "SEO","E Commerce"],
      liveUrl: "https://focusinteriors.com.pk",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "Five Stars Galway Taxis",
      description: "Taxi booking service with online booking and Google Maps integration",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      technologies: ["WordPress", "Wow Commerce", "Booking Plugin", "Google Maps"],
      liveUrl: "https://www.fivestarsgalwaytaxis.ie",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "Solutions Zilla Call Portal",
      description: "Call center management portal with CRM workflows and analytics.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      technologies: ["Laravel", "Bootstrap", "MySQL","NEXT JS", "TailwindCSS"],
      liveUrl: "https://call.solutionszilla.com",
      githubUrl: "#"
    }
  ];

  return (
    <section className="py-20 bg-muted/20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute bottom-20 left-10 w-28 h-28 bg-primary/5 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            MY WORK
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <Link key={project.id} to={`/project/${project.id}`}>
              <Card className="group overflow-hidden hover:shadow-elegant transition-all duration-500 hover:-translate-y-3 animate-scale-in hover:scale-105 cursor-pointer" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                      <Button size="sm" variant="outline-white" className="flex-1" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                      <Button size="sm" variant="outline-white" className="flex-1" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/projects">
            <Button
              size="lg"
              variant="hero"
              className="shadow-glow text-white" // ✅ force white text
            >
              View All Projects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;