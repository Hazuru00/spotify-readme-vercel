"use client";

import { useState } from 'react';
import { generateRetroPixelTheme } from '@/ai/flows/retro-pixel-theme-generator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Sparkles, Copy, Check, Terminal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ThemeCustomizer() {
  const [description, setDescription] = useState('1980s neon arcade purple and cyan');
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateRetroPixelTheme({ aestheticDescription: description });
      setTheme(result);
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Could not generate theme. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getUrl = () => {
    if (!theme) return '';
    const baseUrl = typeof window !== 'undefined' ? `${window.location.origin}/api/now-playing` : '/api/now-playing';
    const params = new URLSearchParams({
      primary: theme.primaryColor.replace('#', ''),
      bg: theme.backgroundColor.replace('#', ''),
      accent: theme.accentColor.replace('#', ''),
      scanlines: theme.scanlinePattern,
      glitch: theme.glitchEffect,
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const copyToClipboard = () => {
    const markdown = `[![Spotify Now Playing](${getUrl()})](https://open.spotify.com)`;
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="bg-black/40 border-primary/20 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary font-headline">
          <Sparkles className="w-5 h-5" />
          Theme AI Generator
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Describe your vibe and our AI will craft the perfect retro palette.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input 
            placeholder="e.g., Cyberpunk red and black with dense scanlines"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-black/50 border-primary/30 focus-visible:ring-primary text-primary"
          />
          <Button 
            onClick={handleGenerate} 
            disabled={loading}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {loading ? '...' : 'Generate'}
          </Button>
        </div>

        {theme && (
          <div className="mt-6 p-4 rounded bg-black/60 border border-primary/20 font-code text-xs space-y-3">
             <div className="flex justify-between items-center mb-2">
                <span className="text-accent flex items-center gap-1"><Terminal className="w-3 h-3" /> Result:</span>
                <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-7 text-primary hover:text-primary hover:bg-primary/10">
                  {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                  {copied ? 'Copied' : 'Copy Markdown'}
                </Button>
             </div>
             <div className="grid grid-cols-2 gap-2">
                <div>Primary: <span style={{color: theme.primaryColor}}>{theme.primaryColor}</span></div>
                <div>Background: <span style={{color: theme.backgroundColor}}>{theme.backgroundColor}</span></div>
                <div>Accent: <span style={{color: theme.accentColor}}>{theme.accentColor}</span></div>
                <div>Scanlines: {theme.scanlinePattern}</div>
                <div>Glitch: {theme.glitchEffect}</div>
             </div>
             <div className="pt-2">
                <p className="text-muted-foreground mb-1">Preview Image URL:</p>
                <div className="truncate text-[10px] text-primary underline">{getUrl()}</div>
             </div>
          </div>
        )}
      </CardContent>
      {theme && (
        <CardFooter className="flex flex-col items-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">Live Preview</p>
            <div className="relative group">
               <img 
                 src={getUrl()} 
                 alt="Generated Theme Preview" 
                 className="pixel-border max-w-full transition-transform hover:scale-[1.02]" 
               />
               <div className="absolute inset-0 crt-scanlines rounded-md opacity-20"></div>
            </div>
        </CardFooter>
      )}
    </Card>
  );
}
