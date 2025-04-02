
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Edit, Trash2, RefreshCw } from 'lucide-react';
import { Project, useProjects } from '@/contexts/ProjectContext';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { editProject, deleteProject, regenerateDescription } = useProjects();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState<Partial<Project>>({
    title: project.title,
    description: project.description,
    technologies: project.technologies,
    githubUrl: project.githubUrl,
    demoUrl: project.demoUrl,
  });

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProject(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTechnologiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const techArray = e.target.value.split(',').map(tech => tech.trim());
    setEditedProject(prev => ({
      ...prev,
      technologies: techArray,
    }));
  };

  const handleSave = () => {
    editProject(project.id, editedProject);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(project.id);
    }
  };

  const handleRegenerateDescription = async () => {
    await regenerateDescription(project.id);
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-md dark:hover:shadow-slate-800 hover:translate-y-[-2px] glass-card animate-fade-in">
      <div className="aspect-video relative overflow-hidden bg-muted">
        <img 
          src={project.imageUrl}
          alt={project.title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          <Badge variant="secondary" className="bg-background/80 text-xs backdrop-blur-sm">
            {project.source}
          </Badge>
          {project.isEdited && (
            <Badge variant="outline" className="bg-amber-500/20 text-amber-500 border-amber-500/30 text-xs">
              edited
            </Badge>
          )}
        </div>
      </div>
      
      <CardHeader>
        <CardTitle className="text-xl line-clamp-1">{project.title}</CardTitle>
        <CardDescription className="flex gap-1 flex-wrap">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{project.technologies.length - 3}
            </Badge>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t p-3">
        <div className="flex gap-2">
          <Button size="sm" variant="outline" asChild>
            <a href={project.githubUrl} target="_blank" rel="noreferrer">
              <Github className="h-4 w-4 mr-1" />
              Code
            </a>
          </Button>
          {project.demoUrl && (
            <Button size="sm" variant="outline" asChild>
              <a href={project.demoUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" />
                Demo
              </a>
            </Button>
          )}
        </div>
        
        <div className="flex gap-1">
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button size="icon" variant="ghost" className="h-8 w-8">
                <Edit className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Edit project</DialogTitle>
                <DialogDescription>
                  Make changes to your project here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={editedProject.title}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">
                    Description
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="ml-2"
                      onClick={handleRegenerateDescription}
                    >
                      <RefreshCw className="h-3 w-3 mr-1" />
                      AI Generate
                    </Button>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={editedProject.description}
                    onChange={handleEditChange}
                    rows={5}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="technologies">Technologies (comma separated)</Label>
                  <Input
                    id="technologies"
                    name="technologies"
                    value={editedProject.technologies?.join(', ')}
                    onChange={handleTechnologiesChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input
                    id="githubUrl"
                    name="githubUrl"
                    value={editedProject.githubUrl}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="demoUrl">Demo URL (optional)</Label>
                  <Input
                    id="demoUrl"
                    name="demoUrl"
                    value={editedProject.demoUrl || ''}
                    onChange={handleEditChange}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleSave}>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
