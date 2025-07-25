import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Award } from "lucide-react";
import { projectsData } from "@/data/projects";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const projectId = parseInt(id || "1");
  const project = projectsData[projectId as keyof typeof projectsData];

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Project Not Found</h1>
          <Link to="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProjects = Object.values(projectsData)
    .filter(p => p.id !== project.id)
    .slice(0, 2)
    .map(p => ({
      id: p.id,
      title: p.title,
      image: p.image,
      category: p.category
    }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-hero-gradient py-12">
        <div className="container mx-auto px-6">
          <Button 
            variant="outline-white" 
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge className="bg-accent-gradient border-0">
                  {project.category}
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-white">
                  {project.title}
                </h1>
                <p className="text-xl text-white/80">
                  {project.description}
                </p>
              </div>

              <div className="flex gap-4">
                <Button size="lg" variant="outline-white" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
                <Button size="lg" variant="outline-white" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full rounded-2xl shadow-elegant"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Info */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="p-6 text-center bg-card-gradient border-border/50">
              <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-sm text-muted-foreground">Duration</div>
              <div className="font-semibold text-foreground">{project.duration}</div>
            </Card>
            <Card className="p-6 text-center bg-card-gradient border-border/50">
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-sm text-muted-foreground">Team Size</div>
              <div className="font-semibold text-foreground">{project.teamSize}</div>
            </Card>
            <Card className="p-6 text-center bg-card-gradient border-border/50">
              <Award className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-sm text-muted-foreground">Client</div>
              <div className="font-semibold text-foreground">{project.client}</div>
            </Card>
            <Card className="p-6 text-center bg-card-gradient border-border/50">
              <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-sm text-muted-foreground">Completed</div>
              <div className="font-semibold text-foreground">{project.completionDate}</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Project Overview</h2>
                <div className="prose prose-invert max-w-none">
                  {project.fullDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Project Gallery</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.gallery.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="w-full rounded-xl hover:shadow-elegant transition-shadow duration-300"
                    />
                  ))}
                </div>
              </div>

              {/* Challenges & Solutions */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Challenges & Solutions</h2>
                <div className="space-y-6">
                  {project.challenges.map((challenge, index) => (
                    <Card key={index} className="p-6 bg-card-gradient border-border/50">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {challenge.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {challenge.description}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Key Results</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.results.map((result, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <Award className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground font-medium">{result}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Technologies */}
              <Card className="p-6 bg-card-gradient border-border/50">
                <h3 className="text-lg font-semibold text-foreground mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge 
                      key={index}
                      variant="tech"
                      className="bg-primary/10 text-primary border border-primary/20"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* Features */}
              <Card className="p-6 bg-card-gradient border-border/50">
                <h3 className="text-lg font-semibold text-foreground mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Related Projects */}
              <Card className="p-6 bg-card-gradient border-border/50">
                <h3 className="text-lg font-semibold text-foreground mb-4">Related Projects</h3>
                <div className="space-y-4">
                  {relatedProjects.map((relatedProject) => (
                    <Link 
                      key={relatedProject.id}
                      to={`/project/${relatedProject.id}`}
                      className="block group"
                    >
                      <div className="flex gap-3 items-center">
                        <img 
                          src={relatedProject.image} 
                          alt={relatedProject.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {relatedProject.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {relatedProject.category}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-card-gradient border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Interested in Similar Work?
            </h2>
            <p className="text-muted-foreground text-lg">
              Let's discuss how I can help bring your project ideas to life with the same level of quality and attention to detail.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/projects">
                <Button variant="outline" size="lg">
                  View All Projects
                </Button>
              </Link>
              <Link to="/#contact">
                <Button size="lg" variant="hero" className="shadow-glow">
                  Start Your Project
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;