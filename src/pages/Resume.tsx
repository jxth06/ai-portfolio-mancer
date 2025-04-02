
import React from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useProjects } from '@/contexts/ProjectContext';
import { Download, RefreshCw, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const Resume = () => {
  const { projects } = useProjects();
  
  // Extract technologies from all projects
  const allTechnologies = React.useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach(project => {
      project.technologies.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [projects]);

  const handleGenerateResume = () => {
    toast.success('Resume generated successfully');
  };
  
  const handleDownloadResume = () => {
    toast.success('Resume downloaded');
  };
  
  const handleShareResume = () => {
    toast.success('Resume link copied to clipboard');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Resume</h1>
            <p className="text-muted-foreground">Auto-generated from your projects and skills</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" onClick={handleShareResume}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" onClick={handleDownloadResume}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button onClick={handleGenerateResume}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerate
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8 glass-card">
              <CardContent className="p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold">John Doe</h2>
                  <p className="text-muted-foreground">Senior Software Developer</p>
                </div>
                
                <p className="mb-6">
                  Experienced software developer with a passion for creating elegant, efficient, and user-friendly applications. Specializing in front-end development with React, TypeScript, and modern CSS frameworks.
                </p>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Experience</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between">
                        <h4 className="font-medium">Senior Frontend Developer</h4>
                        <span className="text-sm text-muted-foreground">2021 - Present</span>
                      </div>
                      <p className="text-muted-foreground">Tech Company Inc.</p>
                      <ul className="list-disc list-inside text-sm mt-2 text-muted-foreground">
                        <li>Led the development of the company's design system</li>
                        <li>Improved application performance by 30%</li>
                        <li>Mentored junior developers and conducted code reviews</li>
                      </ul>
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <h4 className="font-medium">Frontend Developer</h4>
                        <span className="text-sm text-muted-foreground">2018 - 2021</span>
                      </div>
                      <p className="text-muted-foreground">Digital Agency</p>
                      <ul className="list-disc list-inside text-sm mt-2 text-muted-foreground">
                        <li>Developed responsive web applications for various clients</li>
                        <li>Implemented micro-frontend architecture</li>
                        <li>Contributed to open-source projects</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Key Projects</h3>
                  <div className="space-y-4">
                    {projects.slice(0, 3).map((project, index) => (
                      <div key={index}>
                        <div className="flex justify-between">
                          <h4 className="font-medium">{project.title}</h4>
                          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">
                            View Project
                          </a>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="glass-card mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="space-y-2">
                  <p><span className="text-muted-foreground">Email: </span>john.doe@example.com</p>
                  <p><span className="text-muted-foreground">Phone: </span>+1 (555) 123-4567</p>
                  <p><span className="text-muted-foreground">Location: </span>San Francisco, CA</p>
                  <p><span className="text-muted-foreground">Website: </span>johndoe.dev</p>
                  <p><span className="text-muted-foreground">LinkedIn: </span>linkedin.com/in/johndoe</p>
                  <p><span className="text-muted-foreground">GitHub: </span>github.com/johndoe</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {allTechnologies.map((tech, index) => (
                    <Badge key={index} className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <h4 className="font-medium mb-2">Skill Assessment</h4>
                <div className="space-y-2">
                  <SkillBar skill="React" level={90} />
                  <SkillBar skill="JavaScript" level={85} />
                  <SkillBar skill="TypeScript" level={80} />
                  <SkillBar skill="CSS/Tailwind" level={85} />
                  <SkillBar skill="Node.js" level={70} />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Education</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between">
                      <h4 className="font-medium">BSc Computer Science</h4>
                      <span className="text-sm text-muted-foreground">2014 - 2018</span>
                    </div>
                    <p className="text-muted-foreground">University of Technology</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-2">Certifications</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>AWS Certified Developer</li>
                      <li>Google Cloud Professional Developer</li>
                      <li>React Advanced Patterns</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

const SkillBar: React.FC<{ skill: string; level: number }> = ({ skill, level }) => {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{skill}</span>
        <span>{level}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full" 
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
};

export default Resume;
