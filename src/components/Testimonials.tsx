import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "CEO",
      company: "TechStart Inc.",
      rating: 5,
      content: "Usama delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise are outstanding. The project was completed on time and within budget.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b2e52a34?w=100&h=100&fit=crop&crop=face",
      project: "E-Commerce Platform"
    },
    {
      name: "Michael Chen",
      position: "Product Manager",
      company: "Digital Solutions Ltd.",
      rating: 5,
      content: "Working with Usama was a game-changer for our business. He transformed our outdated system into a modern, scalable solution. His communication throughout the project was excellent.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      project: "Dashboard Redesign"
    },
    {
      name: "Emily Rodriguez",
      position: "Founder",
      company: "HealthTech Innovations",
      rating: 5,
      content: "Usama's expertise in healthcare technology is remarkable. He built a comprehensive patient management system that has improved our workflow significantly. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      project: "Healthcare Management System"
    },
    {
      name: "David Thompson",
      position: "CTO",
      company: "EduLearn Platform",
      rating: 5,
      content: "The learning management system Usama developed has been a huge success. His understanding of educational technology and user experience design is impressive.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      project: "LMS Development"
    },
    {
      name: "Lisa Wang",
      position: "Marketing Director",
      company: "PropertyHub",
      rating: 5,
      content: "Our real estate platform has seen a 60% increase in user engagement since Usama's redesign. His technical skills combined with business understanding make him exceptional.",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
      project: "Real Estate Platform"
    },
    {
      name: "James Miller",
      position: "Restaurant Owner",
      company: "Miller's Kitchen",
      rating: 5,
      content: "The restaurant management system has streamlined our operations completely. Orders are processed faster, inventory is tracked automatically, and our customers love the online ordering feature.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      project: "Restaurant Management"
    }
  ];

  const stats = [
    { label: "Client Satisfaction", value: "100%" },
    { label: "Projects Delivered", value: "180+" },
    { label: "Repeat Clients", value: "85%" },
    { label: "Average Rating", value: "5.0" }
  ];

  return (
    <section className="py-20 bg-muted/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            CLIENT TESTIMONIALS
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take my word for it - here's what my clients say about working with me
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center bg-card-gradient border-border/50 hover:shadow-glow transition-all duration-300">
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 bg-card-gradient border-border/50 hover:shadow-glow transition-all duration-300 hover:-translate-y-2 relative">
              {/* Quote Icon */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Quote className="w-4 h-4 text-white fill-current" />
              </div>

              <div className="space-y-4">
                {/* Rating */}
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Project Badge */}
                <Badge variant="secondary" className="text-xs">
                  {testimonial.project}
                </Badge>

                {/* Client Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.position} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Featured Testimonial */}
        <Card className="mt-16 p-8 bg-card-gradient border-border/50 max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <Quote className="w-12 h-12 text-primary mx-auto" />
            <blockquote className="text-2xl font-medium text-foreground leading-relaxed">
              "Usama consistently delivers high-quality work that exceeds expectations. His technical expertise, combined with excellent communication skills, makes him our go-to developer for complex projects."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face" 
                alt="Alex Rivera"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="text-left">
                <div className="font-semibold text-foreground">Alex Rivera</div>
                <div className="text-muted-foreground">VP of Engineering, InnovateTech</div>
                <div className="flex gap-1 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Testimonials;