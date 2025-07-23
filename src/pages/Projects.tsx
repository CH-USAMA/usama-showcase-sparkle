import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ExternalLink, Github, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "Web Development",
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 2,
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media management with real-time data visualization",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      technologies: ["Vue.js", "Express", "PostgreSQL", "Chart.js"],
      category: "Dashboard",
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 3,
      title: "Healthcare Management System",
      description: "Complete healthcare solution with patient records, appointment scheduling, and telemedicine features",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
      technologies: ["Angular", "Firebase", "TypeScript", "WebRTC"],
      category: "Healthcare",
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 4,
      title: "Learning Management System",
      description: "Educational platform with course management, video streaming, and progress tracking",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
      technologies: ["React", "Node.js", "MySQL", "Socket.io"],
      category: "Education",
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 5,
      title: "Real Estate Platform",
      description: "Property listing and management platform with advanced search and virtual tours",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
      technologies: ["Next.js", "Prisma", "PostgreSQL", "Mapbox"],
      category: "Real Estate",
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 6,
      title: "Restaurant Management",
      description: "Complete restaurant solution with POS system, inventory, and online ordering",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
      technologies: ["React", "Django", "Redis", "Stripe"],
      category: "Food & Beverage",
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    }
  ];

  const categories = ["All", "Web Development", "Dashboard", "Healthcare", "Education", "Real Estate", "Food & Beverage"];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-hero-gradient py-20">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-white">
              MY PROJECTS
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Explore my portfolio of web applications, mobile apps, and digital solutions
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="transition-all duration-300"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="group overflow-hidden hover:shadow-glow transition-all duration-500 hover:-translate-y-2 bg-card-gradient border-border/50">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {project.featured && (
                    <Badge className="absolute top-4 left-4 bg-accent-gradient border-0">
                      Featured
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                      <Button size="sm" variant="outline-white" className="flex-1" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                      <Button size="sm" variant="outline-white" className="flex-1" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Link 
                      to={`/project/${project.id}`}
                      className="block"
                    >
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors cursor-pointer">
                        {project.title}
                      </h3>
                    </Link>
                    <Badge variant="secondary" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex}
                        variant="tech"
                        className="text-xs bg-primary/10 text-primary border border-primary/20"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <Link to={`/project/${project.id}`}>
                    <Button variant="ghost" className="w-full mt-4 group-hover:bg-primary/10">
                      View Details →
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto space-y-4">
                <Filter className="w-16 h-16 text-muted-foreground mx-auto" />
                <h3 className="text-xl font-semibold text-foreground">No projects found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or category filter
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card-gradient border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Ready to Start Your Project?
            </h2>
            <p className="text-muted-foreground text-lg">
              Let's discuss how we can bring your ideas to life with cutting-edge technology and innovative solutions.
            </p>
            <Link to="/#contact">
              <Button size="lg" variant="hero" className="shadow-glow">
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;