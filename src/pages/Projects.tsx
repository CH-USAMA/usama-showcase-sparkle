import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ExternalLink, Github, Search, Filter, Home } from "lucide-react";
import { Link } from "react-router-dom";
import HireMe from "@/components/HireMe";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const projects = [
    {
      id: 1,
      title: "Focus Interiors",
      description: "Luxury Interior Design Studio website with premium aesthetics, fast-loading pages, and SEO optimization to attract elite clientele",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
      technologies: ["WordPress", "Elementor", "Custom CSS", "SEO"],
      category: "Interior Design",
      liveUrl: "https://focusinteriors.com.pk",
      githubUrl: "#",
      featured: true
    },
    {
      id: 2,
      title: "Five Stars Galway Taxis",
      description: "Responsive taxi booking website enabling online booking, fare inquiries, and contactless service requests with local SEO optimization",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
      technologies: ["WordPress", "Elementor", "Booking Plugin", "Google Maps"],
      category: "Transportation",
      liveUrl: "https://www.fivestarsgalwaytaxis.ie",
      githubUrl: "#",
      featured: true
    },
    {
      id: 3,
      title: "Solutions Zilla Call Portal",
      description: "Functional web portal for managing call center leads, client interactions, and service details with CRM-like workflows",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      technologies: ["Laravel", "Bootstrap", "MySQL"],
      category: "BPO Services",
      liveUrl: "https://call.solutionszilla.com",
      githubUrl: "#",
      featured: false
    },
    {
      id: 4,
      title: "Munawar & Co",
      description: "Professional corporate website for chartered accountancy firm showcasing tax consultation, audit, and corporate advisory services",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
      technologies: ["WordPress", "Custom Theme", "SEO"],
      category: "Finance",
      liveUrl: "https://munawarandco.com",
      githubUrl: "#",
      featured: false
    },
    {
      id: 5,
      title: "Marian Holy Art",
      description: "Custom e-commerce platform for religious art and sculptures with clean design, product filtering, and secure checkout",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      technologies: ["WooCommerce", "WordPress", "Payment Gateway"],
      category: "E-commerce",
      liveUrl: "https://marianholyart.com",
      githubUrl: "#",
      featured: true
    },
    {
      id: 6,
      title: "VoxBucket",
      description: "Digital marketing agency portfolio website highlighting services, case studies, and lead generation with sleek UI/UX design",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      technologies: ["WordPress", "Elementor", "SEO"],
      category: "Marketing",
      liveUrl: "https://voxbucket.com",
      githubUrl: "#",
      featured: false
    },
    {
      id: 7,
      title: "Solutions Zilla Digital",
      description: "Corporate website showcasing digital outsourcing services including software development, IT support, and call center operations",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
      technologies: ["WordPress", "Elementor", "Custom CSS"],
      category: "IT Services",
      liveUrl: "https://digital.solutionszilla.com",
      githubUrl: "#",
      featured: false
    },
    {
      id: 8,
      title: "iSmart Clinic — Healthcare SaaS",
      description: "Enterprise-grade multi-tenant healthcare platform featuring AI-powered patient engagement, automated WhatsApp appointment booking & reminders, real-time billing, and comprehensive audit trails — built to scale modern clinics",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
      technologies: ["Next.js", "AI Agents", "WhatsApp API", "Multi-Tenant", "Supabase"],
      category: "Healthcare",
      liveUrl: "https://solutionzilla.ismart.link",
      githubUrl: "#",
      featured: true
    },
    {
      id: 9,
      title: "Jabulani Hardware Store",
      description: "Full-featured South African hardware e-commerce platform with Stripe payment integration, Google login authentication, lightning-fast product search, and a streamlined checkout experience",
      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop",
      technologies: ["E-Commerce", "Stripe", "Google Auth", "Fast Search", "Responsive"],
      category: "E-commerce",
      liveUrl: "https://store.jabulanigroupofcompanies.co.za",
      githubUrl: "#",
      featured: true
    },
    {
      id: 10,
      title: "Solutions Zilla Software",
      description: "Professional software house website showcasing custom software development services, team expertise, technology stack, and client success stories with modern design",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop",
      technologies: ["Web Development", "UI/UX Design", "SEO", "Branding"],
      category: "IT Services",
      liveUrl: "https://software.solutionszilla.com",
      githubUrl: "#",
      featured: false
    }
  ];

  const categories = ["All", "Healthcare", "Interior Design", "Transportation", "BPO Services", "Finance", "E-commerce", "Marketing", "IT Services"];

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
          <div className="flex justify-between items-start mb-6">
            <Link to="/">
              <Button variant="outline-white" className="gap-2">
                <Home className="w-4 h-4" />
                Home
              </Button>
            </Link>
          </div>
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
              <Link key={project.id} to={`/project/${project.id}`}>
                <Card className="group overflow-hidden hover:shadow-glow transition-all duration-500 hover:-translate-y-2 bg-card-gradient border-border/50 cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    {project.featured && (
                      <Badge className="absolute top-4 left-4 bg-accent-gradient border-0">
                        Featured
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
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
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
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

                    <Button variant="ghost" className="w-full mt-4 group-hover:bg-primary/10">
                      View Details →
                    </Button>
                  </div>
                </Card>
              </Link>
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
            <div className="flex gap-4 justify-center">
              <Link to="/">
                <Button variant="outline" size="lg">
                  Back to Home
                </Button>
              </Link>
              <HireMe />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;