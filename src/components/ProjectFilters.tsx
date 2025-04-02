
import React, { useMemo } from 'react';
import { useProjects } from '@/contexts/ProjectContext';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';

const ProjectFilters: React.FC = () => {
  const { 
    projects, 
    setFilterTechnology, 
    setSortOption, 
    filterTechnology,
    sortOption 
  } = useProjects();

  // Extract all unique technologies from projects
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach(project => {
      project.technologies.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [projects]);

  const handleTechFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterTechnology(e.target.value || null);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value as any);
  };

  const clearFilter = () => {
    setFilterTechnology(null);
  };

  return (
    <div className="w-full mb-6 space-y-4">
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Filter by technology..."
            className="pl-9 w-full"
            value={filterTechnology || ''}
            onChange={handleTechFilterChange}
          />
          {filterTechnology && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1.5 h-7 w-7"
              onClick={clearFilter}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="flex gap-2 items-center">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select value={sortOption} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="az">A-Z</SelectItem>
              <SelectItem value="za">Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Technology chips for quick selection */}
      <div className="flex flex-wrap gap-2">
        {allTechnologies.slice(0, 8).map(tech => (
          <Badge 
            key={tech}
            variant={filterTechnology === tech ? "default" : "outline"}
            className="cursor-pointer hover:opacity-80"
            onClick={() => setFilterTechnology(filterTechnology === tech ? null : tech)}
          >
            {tech}
            {filterTechnology === tech && (
              <X className="ml-1 h-3 w-3" onClick={(e) => {
                e.stopPropagation();
                clearFilter();
              }} />
            )}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ProjectFilters;
