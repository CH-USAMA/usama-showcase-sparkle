import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarCheck, FolderKanban, Home, Newspaper } from "lucide-react";
import { blogsData } from "@/data/blogs";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const suggestedPosts = blogsData.slice(0, 3);

  const destinations = [
    { to: "/", icon: Home, title: "Home", desc: "Backend engineering services and case studies." },
    { to: "/projects", icon: FolderKanban, title: "Projects", desc: "Laravel, VoIP, and AI systems shipped to production." },
    { to: "/blog", icon: Newspaper, title: "Blog", desc: "Deep dives on Laravel, automation, and AI engineering." },
    { to: "/book", icon: CalendarCheck, title: "Book a call", desc: "Free 30-minute roadmap consultation." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Page Not Found (404) — Usama Munawar"
        description="The page you were looking for doesn't exist. Explore projects, articles, or book a free backend engineering consultation."
        canonical="https://dev-usama-portfolio.vercel.app/404"
        noindex
      />
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-inter font-medium uppercase tracking-[0.25em]">Error 404</span>
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-inter font-bold text-foreground tracking-tight">
              This page took a wrong turn
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto font-inter leading-relaxed">
              The URL <span className="text-foreground font-medium break-all">{location.pathname}</span> doesn't exist. Here's where most people go next.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {destinations.map((d) => (
              <Link key={d.to} to={d.to}>
                <Card className="p-5 h-full rounded-2xl border-border/30 bg-card/60 hover:shadow-glow hover:border-primary/30 transition-all duration-300 group">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/10">
                      <d.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-inter font-semibold text-foreground group-hover:text-primary transition-colors">{d.title}</h2>
                      <p className="text-sm text-muted-foreground font-inter mt-1 leading-relaxed">{d.desc}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {suggestedPosts.length > 0 && (
            <div className="mt-14">
              <h2 className="text-xl font-inter font-semibold text-foreground mb-5">Recent articles</h2>
              <div className="space-y-3">
                {suggestedPosts.map((post) => (
                  <Link key={post.slug} to={`/blog/${post.slug}`} className="block">
                    <Card className="p-4 rounded-xl border-border/30 bg-card/60 hover:border-primary/30 transition-colors group">
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-inter text-foreground group-hover:text-primary transition-colors">{post.title}</span>
                        <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-14 text-center">
            <Link to="/book">
              <Button size="lg" variant="hero" className="rounded-xl px-8 shadow-glow">
                Book a free 30-min call
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
