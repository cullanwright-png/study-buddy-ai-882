import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Palette, 
  Layout, 
  RotateCcw, 
  Check,
  Grid3X3,
  Sidebar,
  Minimize2,
  Square
} from 'lucide-react';
import { useTheme, colorThemes, layoutOptions } from '@/contexts/ThemeContext';

const Settings: React.FC = () => {
  const { colorTheme, layout, setColorTheme, setLayout, resetToDefaults } = useTheme();

  const getLayoutIcon = (layoutId: string) => {
    switch (layoutId) {
      case 'sidebar': return <Sidebar className="w-4 h-4" />;
      case 'compact': return <Grid3X3 className="w-4 h-4" />;
      case 'minimal': return <Minimize2 className="w-4 h-4" />;
      default: return <Square className="w-4 h-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Customize Your Experience
        </h1>
        <p className="text-muted-foreground">
          Personalize StudyBuddy to match your style and workflow preferences
        </p>
      </div>

      <div className="space-y-8">
        {/* Color Themes */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" />
              Color Themes
            </CardTitle>
            <CardDescription>
              Choose a color scheme that inspires and energizes your study sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {colorThemes.map((theme) => (
                <div
                  key={theme.id}
                  className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-medium ${
                    colorTheme.id === theme.id 
                      ? 'border-primary bg-primary/5 shadow-soft' 
                      : 'border-border hover:border-primary/30'
                  }`}
                  onClick={() => setColorTheme(theme)}
                >
                  {colorTheme.id === theme.id && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                  
                  <div className="mb-3">
                    <h3 className="font-semibold mb-1">{theme.name}</h3>
                    <div className="flex space-x-1">
                      {Object.values(theme.colors).slice(0, 4).map((color, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: `hsl(${color})` }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div 
                      className="h-3 rounded-full"
                      style={{ background: `linear-gradient(135deg, hsl(${theme.colors.primary}), hsl(${theme.colors.primaryLight}))` }}
                    />
                    <div 
                      className="h-2 rounded-full opacity-60"
                      style={{ background: `linear-gradient(135deg, hsl(${theme.colors.accent}), hsl(${theme.colors.accentLight}))` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Layout Options */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layout className="w-5 h-5 text-primary" />
              Layout & Structure
            </CardTitle>
            <CardDescription>
              Adjust the interface layout to match your study style and screen preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {layoutOptions.map((layoutOption) => (
                <div
                  key={layoutOption.id}
                  className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-medium ${
                    layout.id === layoutOption.id
                      ? 'border-primary bg-primary/5 shadow-soft'
                      : 'border-border hover:border-primary/30'
                  }`}
                  onClick={() => setLayout(layoutOption)}
                >
                  {layout.id === layoutOption.id && (
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground rounded-full p-1">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-3 bg-muted rounded-lg">
                      {getLayoutIcon(layoutOption.id)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-2 text-lg">{layoutOption.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {layoutOption.description}
                      </p>
                      {layout.id === layoutOption.id && (
                        <Badge variant="secondary" className="mt-2 bg-primary/10 text-primary border-primary/20">
                          Currently Active
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card className="shadow-medium bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">Live Preview</CardTitle>
            <CardDescription>
              See how your customizations look with this sample content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-card rounded-lg border shadow-soft">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-primary">Sample Study Session</h4>
                <Badge className="bg-primary text-primary-foreground">25:00</Badge>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-primary rounded-full w-3/4 transition-all duration-300"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Mathematics • Chapter 5: Calculus Fundamentals
              </p>
            </div>
            
            <div className="flex space-x-2">
              <Button size="sm" className="bg-gradient-primary">
                Primary Action
              </Button>
              <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent/5">
                Secondary
              </Button>
              <Button variant="secondary" size="sm">
                Tertiary
              </Button>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Reset Section */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <RotateCcw className="w-5 h-5" />
              Reset Customizations
            </CardTitle>
            <CardDescription>
              Restore all settings to their original defaults
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-warning/5 border border-warning/20 rounded-lg">
              <div>
                <p className="font-medium mb-1">Reset to Defaults</p>
                <p className="text-sm text-muted-foreground">
                  This will reset both color theme and layout to StudyBuddy's default settings
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={resetToDefaults}
                className="border-warning/30 text-warning hover:bg-warning/5"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset All
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;