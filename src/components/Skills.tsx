import { Card, CardContent } from "@/components/ui/card";
import { Users, Code, Gamepad2, Palette } from "lucide-react";

const Skills = () => {
  const skills = [
    {
      icon: Users,
      title: "Community Management",
      description: "Building and nurturing engaged gaming communities with strategic growth and member retention.",
      highlights: ["Discord Management", "Community Events", "Member Engagement", "Brand Building"]
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Creating modern, responsive web applications with cutting-edge technologies and clean code.",
      highlights: ["React/TypeScript", "Full-Stack Development", "UI/UX Design", "Performance Optimization"]
    },
    {
      icon: Gamepad2,
      title: "Game Development",
      description: "Developing immersive gaming experiences from concept to deployment across multiple platforms.",
      highlights: ["Game Design", "Unity/Unreal", "Multiplayer Systems", "Player Experience"]
    },
    {
      icon: Palette,
      title: "Graphics Design",
      description: "Crafting stunning visual identities and digital assets that capture brand essence and engage audiences.",
      highlights: ["Brand Identity", "Digital Art", "UI/UX Design", "Marketing Materials"]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            My Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Combining technical skills with creative vision to deliver exceptional digital experiences
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <Card 
              key={index}
              className="bg-gradient-card border-border hover:shadow-card transition-all duration-300 hover:scale-105 group"
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <skill.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold ml-4">{skill.title}</h3>
                </div>
                
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                  {skill.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {skill.highlights.map((highlight, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;