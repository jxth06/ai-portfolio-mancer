
import React from 'react';
import Navbar from '@/components/Navbar';
import { useProjects } from '@/contexts/ProjectContext';
import ProjectCard from '@/components/ProjectCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';
import ProjectFilters from '@/components/ProjectFilters';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

const Projects = () => {
  const { filteredProjects, isLoading, fetchProjects, addProject } = useProjects();
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',
    demoUrl: '',
    imageUrl: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=2940',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProject = () => {
    if (!newProject.title || !newProject.description || !newProject.technologies || !newProject.githubUrl) {
      return;
    }

    addProject({
      title: newProject.title,
      description: newProject.description,
      technologies: newProject.technologies.split(',').map(tech => tech.trim()),
      githubUrl: newProject.githubUrl,
      demoUrl: newProject.demoUrl || undefined,
      imageUrl: newProject.imageUrl,
      createdAt: new Date().toISOString(),
      source: 'manual',
    });

    setNewProject({
      title: '',
      description: '',
      technologies: '',
      githubUrl: '',
      demoUrl: '',
      imageUrl: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=2940',
    });
    setIsAddingProject(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Projects</h1>
            <p className="text-muted-foreground">Showcase of your work and projects</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" onClick={fetchProjects} disabled={isLoading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            
            <Dialog open={isAddingProject} onOpenChange={setIsAddingProject}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Project
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add new project</DialogTitle>
                  <DialogDescription>
                    Enter the details of your new project.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={newProject.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={newProject.description}
                      onChange={handleInputChange}
                      rows={5}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="technologies">Technologies * (comma separated)</Label>
                    <Input
                      id="technologies"
                      name="technologies"
                      value={newProject.technologies}
                      onChange={handleInputChange}
                      required
                      placeholder="React, TypeScript, Tailwind CSS"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="githubUrl">GitHub URL *</Label>
                    <Input
                      id="githubUrl"
                      name="githubUrl"
                      value={newProject.githubUrl}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="demoUrl">Demo URL (optional)</Label>
                    <Input
                      id="demoUrl"
                      name="demoUrl"
                      value={newProject.demoUrl}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="imageUrl">Image URL (optional)</Label>
                    <Input
                      id="imageUrl"
                      name="imageUrl"
                      value={newProject.imageUrl}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddProject}>Add Project</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <ProjectFilters />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-20 w-full mb-2" />
                  <div className="flex justify-between mt-4">
                    <Skeleton className="h-9 w-20" />
                    <Skeleton className="h-9 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Plus className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold">No projects found</h2>
            <p className="text-muted-foreground mb-6">
              {filteredProjects.length === 0
                ? "There are no projects matching your filters. Try changing your filter criteria or add a new project."
                : "Start by adding your first project or connecting your GitHub account."}
            </p>
            <Dialog open={isAddingProject} onOpenChange={setIsAddingProject}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Project
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        )}
      </main>
    </div>
  );
};

export default Projects;
