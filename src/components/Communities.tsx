import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Trophy, Target } from "lucide-react";

const Communities = () => {
  const communities = [
    {
      name: "EXP Gaming",
      game: "DayZ",
      role: "Community Manager",
      description: "Led community growth and engagement for a premier DayZ gaming community, fostering an active player base and organizing regular events.",
      achievements: [
        "Grew community to 50,000+ active players",
        "Organized regular PvP events and competitions",
        "Successfully managed and coordinated a staff team of 20+ members",
        "Maintained 85% member retention rate"
      ],
      color: "bg-red-500/10 text-red-400 border-red-500/20"
    },
    {
      name: "Rusty Haven",
      game: "Rust",
      role: "Community Manager",
      description: "Developed and managed the complete server infrastructure and Discord community for a thriving Rust server, creating custom gameplay experiences.",
      achievements: [
        "Developed entire server from ground up",
        "Created custom plugins for enhanced gameplay",
        "Built and configured complete Discord ecosystem",
        "Maintained 100+ concurrent players daily"
      ],
      color: "bg-orange-500/10 text-orange-400 border-orange-500/20"
    },
    {
      name: "Moody Krows",
      game: "NFT Collection",
      role: "Community Manager",
      description: "Built and managed the community around an innovative NFT collection, driving engagement and fostering collector relationships.",
      achievements: [
        "Launched community from 0 to 2,000+ members",
        "Coordinated marketing campaigns",
        "Managed social media presence",
        "Facilitated holder events and rewards"
      ],
      color: "bg-purple-500/10 text-purple-400 border-purple-500/20"
    }
  ];

  return (
    <section id="communities" className="py-20 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Community Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Building thriving communities across gaming and digital spaces
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {communities.map((community, index) => (
            <Card 
              key={index}
              className="bg-gradient-card border-border hover:shadow-card transition-all duration-300 hover:scale-105 group"
            >
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold">{community.name}</h3>
                  <Badge className={community.color}>
                    {community.game}
                  </Badge>
                </div>
                
                <div className="flex items-center mb-4 text-primary">
                  <Users className="w-5 h-5 mr-2" />
                  <span className="font-medium">{community.role}</span>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {community.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-accent mb-2">
                    <Trophy className="w-4 h-4 mr-2" />
                    <span className="font-medium">Key Achievements</span>
                  </div>
                  {community.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start">
                      <Target className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{achievement}</span>
                    </div>
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

export default Communities;