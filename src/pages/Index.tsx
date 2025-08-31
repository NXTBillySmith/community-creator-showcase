import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Communities from "@/components/Communities";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div id="hero">
        <Hero />
      </div>
      <Skills />
      <Communities />
    </div>
  );
};

export default Index;
