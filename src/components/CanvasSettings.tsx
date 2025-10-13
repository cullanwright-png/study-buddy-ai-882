import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RefreshCw, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCanvasSettings, useSaveCanvasSettings, useSyncCanvas } from '@/hooks/useCanvasData';
import { format } from 'date-fns';

const CanvasSettings: React.FC = () => {
  const { data: settings, isLoading } = useCanvasSettings();
  const saveSettings = useSaveCanvasSettings();
  const syncCanvas = useSyncCanvas();
  const [canvasUrl, setCanvasUrl] = useState(settings?.canvas_url || '');

  React.useEffect(() => {
    if (settings?.canvas_url) {
      setCanvasUrl(settings.canvas_url);
    }
  }, [settings]);

  const handleSaveSettings = () => {
    if (!canvasUrl) return;
    saveSettings.mutate(canvasUrl);
  };

  const handleSync = () => {
    syncCanvas.mutate();
  };

  const isConfigured = !!settings?.canvas_url;
  const lastSynced = settings?.last_synced_at
    ? format(new Date(settings.last_synced_at), 'PPpp')
    : 'Never';

  return (
    <div className="space-y-6">
      <Card className="shadow-medium">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                Canvas LMS Integration
                {isConfigured && (
                  <Badge variant="outline" className="border-success text-success">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Connected
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                Connect your Canvas account to automatically sync courses and assignments
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="canvas-url">Canvas URL</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="canvas-url"
                placeholder="https://canvas.instructure.com"
                value={canvasUrl}
                onChange={(e) => setCanvasUrl(e.target.value)}
                disabled={saveSettings.isPending}
              />
              <Button
                onClick={handleSaveSettings}
                disabled={!canvasUrl || saveSettings.isPending}
              >
                Save
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Enter your Canvas instance URL (e.g., https://yourschool.instructure.com)
            </p>
          </div>

          {isConfigured && (
            <>
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold mb-1">Sync Canvas Data</h4>
                    <p className="text-sm text-muted-foreground">
                      Last synced: {lastSynced}
                    </p>
                  </div>
                  <Button
                    onClick={handleSync}
                    disabled={syncCanvas.isPending}
                    className="bg-gradient-primary"
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${syncCanvas.isPending ? 'animate-spin' : ''}`} />
                    {syncCanvas.isPending ? 'Syncing...' : 'Sync Now'}
                  </Button>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                  <h5 className="font-medium text-sm">How syncing works:</h5>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Fetches all your active courses from Canvas</li>
                    <li>Imports assignments with due dates and details</li>
                    <li>Updates submission status and grades</li>
                    <li>Syncs automatically when you click the button</li>
                  </ul>
                </div>
              </div>
            </>
          )}

          {!isConfigured && (
            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-medium text-sm mb-1">Setup Required</h5>
                <p className="text-sm text-muted-foreground">
                  Please configure your Canvas URL above to enable automatic syncing of your courses and assignments.
                </p>
              </div>
            </div>
          )}

          <Separator />

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Need help?</span>
            <Button variant="link" className="p-0 h-auto" asChild>
              <a
                href="https://community.canvaslms.com/t5/Student-Guide/How-do-I-generate-a-paired-access-token-for-an-app-as-a-student/ta-p/523"
                target="_blank"
                rel="noopener noreferrer"
              >
                Canvas API Documentation
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CanvasSettings;
