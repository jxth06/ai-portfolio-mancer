
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  demoUrl?: string;
  technologies: string[];
  createdAt: string;
  source: 'github' | 'behance' | 'dribbble' | 'manual';
  isEdited?: boolean;
}

interface ProjectContextType {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  editProject: (id: string, updatedProject: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  regenerateDescription: (id: string) => Promise<void>;
  filteredProjects: Project[];
  setFilterTechnology: (tech: string | null) => void;
  setSortOption: (option: SortOption) => void;
  filterTechnology: string | null;
  sortOption: SortOption;
}

type SortOption = 'newest' | 'oldest' | 'az' | 'za';

// Sample projects data for initial load
const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'AI Portfolio Generator',
    description: 'A portfolio site that uses AI to generate project descriptions and styling based on GitHub repositories.',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    githubUrl: 'https://github.com/username/ai-portfolio',
    demoUrl: 'https://ai-portfolio-demo.vercel.app',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'OpenAI API'],
    createdAt: '2023-09-15',
    source: 'github',
  },
  {
    id: '2',
    title: 'E-commerce Dashboard',
    description: 'A comprehensive dashboard for e-commerce businesses with real-time analytics and inventory management.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    githubUrl: 'https://github.com/username/ecommerce-dashboard',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    createdAt: '2023-06-20',
    source: 'github',
  },
  {
    id: '3',
    title: 'Weather App Redesign',
    description: 'A modern weather application with beautiful UI and accurate forecasts.',
    imageUrl: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b',
    githubUrl: 'https://github.com/username/weather-app',
    demoUrl: 'https://weather-app-demo.vercel.app',
    technologies: ['JavaScript', 'CSS', 'OpenWeather API'],
    createdAt: '2023-03-10',
    source: 'manual',
  },
];

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterTechnology, setFilterTechnology] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('newest');

  // Calculate filtered and sorted projects
  const filteredProjects = React.useMemo(() => {
    let result = [...projects];
    
    // Apply technology filter
    if (filterTechnology) {
      result = result.filter(project => 
        project.technologies.some(tech => 
          tech.toLowerCase().includes(filterTechnology.toLowerCase())
        )
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'newest':
        return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'oldest':
        return result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case 'az':
        return result.sort((a, b) => a.title.localeCompare(b.title));
      case 'za':
        return result.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return result;
    }
  }, [projects, filterTechnology, sortOption]);

  // Fetch projects from GitHub API
  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would call the GitHub API
      // For demo purposes, we'll use a timeout to simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Use our sample projects for now
      // In a real app, we would transform the GitHub API response to our Project format
      toast.success('Projects loaded successfully');
    } catch (err) {
      setError('Failed to fetch projects. Please try again later.');
      toast.error('Failed to fetch projects');
      console.error('Error fetching projects:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Edit a project
  const editProject = (id: string, updatedProject: Partial<Project>) => {
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === id 
          ? { ...project, ...updatedProject, isEdited: true }
          : project
      )
    );
    toast.success('Project updated successfully');
  };

  // Delete a project
  const deleteProject = (id: string) => {
    setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
    toast.success('Project deleted successfully');
  };

  // Add a new project
  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
    };
    
    setProjects(prevProjects => [newProject, ...prevProjects]);
    toast.success('Project added successfully');
  };

  // Regenerate description with AI
  const regenerateDescription = async (id: string) => {
    setIsLoading(true);
    
    try {
      const project = projects.find(p => p.id === id);
      if (!project) throw new Error('Project not found');
      
      // In a real app, this would call an OpenAI or similar API
      // For demo purposes, we'll just update with a placeholder
      const aiDescription = `This is an AI-generated description for "${project.title}". It's a ${project.technologies.join(', ')} project that demonstrates advanced skills in software development and showcases clean, maintainable code.`;
      
      editProject(id, { description: aiDescription });
      toast.success('Description regenerated with AI');
    } catch (err) {
      toast.error('Failed to regenerate description');
      console.error('Error regenerating description:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize by fetching projects
  useEffect(() => {
    fetchProjects();
  }, []);

  const value = {
    projects,
    isLoading,
    error,
    fetchProjects,
    editProject,
    deleteProject,
    addProject,
    regenerateDescription,
    filteredProjects,
    setFilterTechnology,
    setSortOption,
    filterTechnology,
    sortOption,
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProjects = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
