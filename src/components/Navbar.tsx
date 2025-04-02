
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Settings, User, Briefcase, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <span className="text-xl font-heading font-bold text-gradient">AI Portfolio</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : 'text-foreground/60'}`}>
            <div className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </div>
          </Link>
          <Link to="/projects" className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/projects') ? 'text-primary' : 'text-foreground/60'}`}>
            <div className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              <span>Projects</span>
            </div>
          </Link>
          <Link to="/resume" className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/resume') ? 'text-primary' : 'text-foreground/60'}`}>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>Resume</span>
            </div>
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
          <Button size="sm" className="hidden md:flex">
            <Github className="mr-2 h-4 w-4" />
            Connect GitHub
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
