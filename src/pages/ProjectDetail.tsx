import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Award, Home } from "lucide-react";
import { projectsData } from "@/data/projects";
import SEOHead from "@/components/SEOHead";
import CTA from "@/components/system/CTA";
import { trackEvent } from "@/lib/analytics";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const projectId = parseInt(id || "1");
  const project = projectsData[projectId as keyof typeof projectsData];

  // projects.ts uses "#" as a placeholder for links that do not exist yet.
  const isReal = (url?: string) => Boolean(url) && url !== "#";
  const hasLive = isReal(project?.liveUrl);
  const hasCode = isReal(project?.githubUrl);

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
      <SEOHead
        title={`${project.title} — Case Study | Usama Munawar`}
        description={project.description.slice(0, 155)}
        canonical={`https://dev-usama-portfolio.vercel.app/project/${project.id}`}
        ogImage={project.image}
        ogType="article"
      />
      {/* Header */}
      <section className="bg-hero-gradient py-12">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-start mb-6">
            <Button 
              variant="outline-white" 
              onClick={() => navigate(-1)}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Button>
            <Link to="/">
              <Button variant="outline-white" className="gap-2">
                <Home className="w-4 h-4" />
                Home
              </Button>
            </Link>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge className="bg-accent-gradient border-0">
                  {project.category}
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
                  {project.title}
                </h1>
                <p className="text-xl text-foreground/80">
                  {project.description}
                </p>
              </div>

              {/* Only render a link that actually goes somewhere. Every project
                  in projects.ts carries githubUrl: "#", and three carry
                  liveUrl: "#", so these buttons used to promise a demo and a
                  repository and deliver a page jump. A dead button on a case
                  study costs more trust than a missing one. */}
              {(hasLive || hasCode) && (
                <div className="flex gap-4">
                  {hasLive && (
                    <Button size="lg" variant="outline-white" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {hasCode && (
                    <Button size="lg" variant="outline-white" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </div>

            <div className="relative">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full rounded-2xl shadow-elegant"
                loading="lazy"
                decoding="async"
                width={1200}
                height={675}
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
                      loading="lazy"
                      decoding="async"
                      width={800}
                      height={450}
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
                          loading="lazy"
                          decoding="async"
                          width={64}
                          height={64}
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

      {/* Close. This used to read "Interested in Similar Work? … bring your
          project ideas to life" over three equal buttons and a "Hire Me" dialog
          that POSTed straight to Formspree and navigated the reader off-site —
          generic voice, no hierarchy, and a fourth competing conversion path at
          the end of a case study. One action now, matching every other page. */}
      <section className="border-t border-hairline/[0.08] py-20 lg:py-24">
        <div className="container mx-auto">
          <div className="max-w-xl">
            <h2 className="type-h3 text-foreground">Building something like this?</h2>
            <p className="type-lead mt-5 text-muted-foreground">
              Bring the architecture problem to a call and we will work out the shortest
              path to a fix.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <CTA
                to="/book"
                size="lg"
                arrow
                onClick={() => trackEvent("book_call_click", { location: "project_detail" })}
              >
                Book an Architecture Call
              </CTA>
              <CTA to="/projects" tone="ghost" size="lg" arrow>
                Explore Case Studies
              </CTA>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;