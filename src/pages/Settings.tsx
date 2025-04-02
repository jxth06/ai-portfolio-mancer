
import React from 'react';
import Navbar from '@/components/Navbar';
import { ThemeCustomizer } from '@/components/ThemeCustomizer';
import { Button } from '@/components/ui/button';
import { Github, Dribbble, Figma, Save, Globe, Check, RotateCcw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  const handleSave = () => {
    // Implementation would save settings
  };

  const handleReset = () => {
    // Implementation would reset settings
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Customize your portfolio and manage connections</p>
        </div>
        
        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="grid grid-cols-4 max-w-xl mb-8">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="connections">Connections</TabsTrigger>
            <TabsTrigger value="deployment">Deployment</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme Customization</CardTitle>
                <CardDescription>
                  Customize how your portfolio looks with different themes, colors, and fonts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ThemeCustomizer />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Layout Settings</CardTitle>
                <CardDescription>
                  Adjust the layout and display options for your portfolio.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show project counts</p>
                    <p className="text-sm text-muted-foreground">Display the number of projects for each technology.</p>
                  </div>
                  <Switch id="show-counts" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Animated transitions</p>
                    <p className="text-sm text-muted-foreground">Enable smooth animations between pages and elements.</p>
                  </div>
                  <Switch id="animations" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show project dates</p>
                    <p className="text-sm text-muted-foreground">Display the creation date for each project.</p>
                  </div>
                  <Switch id="show-dates" defaultChecked />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleReset}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset to Defaults
                </Button>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="connections" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Connections</CardTitle>
                <CardDescription>
                  Connect to your accounts to import and display your projects.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center p-4 rounded-lg border">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Github className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">GitHub</h3>
                    <p className="text-sm text-muted-foreground">Connect to import your repositories</p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                
                <div className="flex items-center p-4 rounded-lg border">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Dribbble className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Dribbble</h3>
                    <p className="text-sm text-muted-foreground">Connect to import your design shots</p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                
                <div className="flex items-center p-4 rounded-lg border">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Figma className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Behance</h3>
                    <p className="text-sm text-muted-foreground">Connect to import your design projects</p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="deployment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Deploy Your Portfolio</CardTitle>
                <CardDescription>
                  Configure how and where you want to deploy your portfolio.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="domain">Custom Domain (optional)</Label>
                  <Input id="domain" placeholder="yourdomain.com" />
                  <p className="text-sm text-muted-foreground">
                    Enter your domain name if you want to use a custom domain.
                  </p>
                </div>
                
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center p-4 rounded-lg border relative">
                    <div className="absolute -top-2 -right-2">
                      <Badge bgColor="green">
                        <span className="flex items-center">
                          <Check className="h-3 w-3 mr-1" />
                          Recommended
                        </span>
                      </Badge>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <svg viewBox="0 0 76 65" fill="none" className="h-6 w-6">
                        <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="#000000" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Deploy to Vercel</h3>
                      <p className="text-sm text-muted-foreground">Fast and reliable deployment with free SSL</p>
                    </div>
                    <Button>Deploy</Button>
                  </div>
                  
                  <div className="flex items-center p-4 rounded-lg border">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <Github className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">GitHub Pages</h3>
                      <p className="text-sm text-muted-foreground">Simple hosting directly from your repository</p>
                    </div>
                    <Button variant="outline">Deploy</Button>
                  </div>
                  
                  <div className="flex items-center p-4 rounded-lg border">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Custom Hosting</h3>
                      <p className="text-sm text-muted-foreground">Download files to deploy to your own hosting</p>
                    </div>
                    <Button variant="outline">Download</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Manage your personal information and account settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" placeholder="Tell us about yourself" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="San Francisco, CA" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

// Badge component for recommended label
const Badge = ({ children, bgColor = 'blue' }: { children: React.ReactNode; bgColor?: string }) => {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
  };
  
  return (
    <span className={`${colorMap[bgColor]} text-white text-xs px-2 py-1 rounded-full font-medium`}>
      {children}
    </span>
  );
};

export default Settings;
