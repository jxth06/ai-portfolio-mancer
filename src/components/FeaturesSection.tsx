
import React from 'react';
import { Github, Palette, FilterX, FileText, Upload, Cpu } from 'lucide-react';

const features = [
  {
    icon: <Github className="h-10 w-10 text-primary" />,
    title: 'Auto-fetch Projects',
    description: 'Connect your GitHub, Behance, and Dribbble accounts to automatically import your projects with details and images.'
  },
  {
    icon: <Cpu className="h-10 w-10 text-primary" />,
    title: 'AI-generated Descriptions',
    description: 'Missing project descriptions? Let AI analyze your code and create professional descriptions automatically.'
  },
  {
    icon: <Palette className="h-10 w-10 text-primary" />,
    title: 'Live Customization',
    description: 'Customize your portfolio theme, fonts, colors, and layout in real-time without any coding required.'
  },
  {
    icon: <FilterX className="h-10 w-10 text-primary" />,
    title: 'Project Filtering & Sorting',
    description: 'Filter projects by technology stack or keywords and sort them by date or relevance for better organization.'
  },
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: 'Resume Integration',
    description: 'Auto-generate a professional resume based on your projects, skills, and experience with customizable templates.'
  },
  {
    icon: <Upload className="h-10 w-10 text-primary" />,
    title: 'One-click Deployment',
    description: 'Deploy your portfolio instantly to GitHub Pages or Vercel with just a single click, no configuration needed.'
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
        <p className="text-muted-foreground text-lg">
          Everything you need to create an impressive developer portfolio with minimal effort.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="p-6 rounded-xl glass-card flex flex-col items-start hover:shadow-md transition-all duration-200 animate-fade-in"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
