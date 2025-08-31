import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import portfolioGrid from "@/assets/portfolio-grid.jpg";

const Portfolio = () => {
  const projects = [
    {
      title: "EXP Gaming Dashboard",
      category: "Web Development",
      description: "Custom admin dashboard for community management with real-time analytics, player statistics, and server monitoring.",
      technologies: ["React", "TypeScript", "Node.js", "MongoDB"],
      image: portfolioGrid,
      links: {
        live: "#",
        github: "#"
      }
    },
    {
      title: "Survival Battle Royale",
      category: "Game Development",
      description: "Multiplayer survival game with custom mechanics, dynamic weather system, and cross-platform compatibility.",
      technologies: ["Unity", "C#", "Photon", "Firebase"],
      image: portfolioGrid,
      links: {
        live: "#",
        github: "#"
      }
    },
    {
      title: "Moody Krows Brand Identity",
      category: "Graphics Design",
      description: "Complete brand identity package for NFT collection including logo design, marketing materials, and social media assets.",
      technologies: ["Photoshop", "Illustrator", "After Effects", "Figma"],
      image: portfolioGrid,
      links: {
        live: "#",
        github: "#"
      }
    },
    {
      title: "Discord Community Bot",
      category: "Web Development",
      description: "Advanced Discord bot for community management with custom commands, moderation tools, and member engagement features.",
      technologies: ["Node.js", "Discord.js", "PostgreSQL", "Redis"],
      image: portfolioGrid,
      links: {
        live: "#",
        github: "#"
      }
    }
  ];

  return (
    <section id="portfolio" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Featured Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of projects spanning web development, game creation, and community building
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="bg-gradient-card border-border hover:shadow-card transition-all duration-300 hover:scale-[1.02] group overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground">
                  {project.category}
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    variant="default" 
                    size="sm"
                    className="bg-primary text-primary-foreground hover:shadow-glow transition-all duration-300"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;