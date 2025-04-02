
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Github } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
      <div className="max-w-3xl mx-auto space-y-8 animate-slide-up">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tighter text-gradient">
          AI-Powered Portfolio Generator
        </h1>
        <p className="text-xl text-muted-foreground">
          Create a stunning portfolio that automatically showcases your projects from GitHub, Behance, and Dribbble with AI-enhanced descriptions and customizable themes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link to="/projects">
              View Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline">
            <Github className="mr-2 h-4 w-4" />
            Connect GitHub
          </Button>
        </div>
      </div>
      
      <div className="mt-16 w-full max-w-4xl bg-gradient-to-b from-muted/50 to-background p-1 rounded-xl shadow-xl overflow-hidden animate-fade-in">
        <div className="w-full h-64 md:h-80 bg-muted/30 rounded-lg relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?q=80&w=3025&auto=format&fit=crop" 
            alt="Portfolio Preview" 
            className="object-cover w-full h-full opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/0"></div>
          <div className="absolute bottom-4 left-4 right-4 text-left">
            <span className="inline-block bg-primary px-2 py-1 rounded text-xs font-medium text-white mb-2">
              AI-POWERED
            </span>
            <h3 className="text-2xl font-bold text-white mb-1">Your Personal Portfolio</h3>
            <p className="text-white/80 text-sm">Automatically updated from your GitHub projects</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
