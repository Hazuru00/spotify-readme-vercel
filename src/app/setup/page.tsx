
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, ArrowRight, ShieldCheck, Key } from 'lucide-react';
import Link from 'next/link';

export default function SetupPage() {
  const handleAuth = () => {
    const client_id = '86c6ca9576174804b34f6a0a3d53e92b';
    const redirect_uri = `${window.location.origin}/api/callback`;
    const scope = 'user-read-currently-playing user-read-recently-played';
    
    const authUrl = new URL('https://accounts.spotify.com/authorize');
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('client_id', client_id);
    authUrl.searchParams.append('scope', scope);
    authUrl.searchParams.append('redirect_uri', redirect_uri);
    
    window.location.href = authUrl.toString();
  };

  return (
    <div className="min-h-screen bg-[#0C0F0B] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black/40 border-primary/20 backdrop-blur-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(70,242,13,0.3)]">
            <Key className="text-primary w-6 h-6" />
          </div>
          <CardTitle className="text-primary text-2xl font-headline italic">Spotify Auth Helper</CardTitle>
          <CardDescription className="text-muted-foreground">
            Generate your long-lived Refresh Token for the widget.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <div className="bg-primary/10 p-2 rounded text-primary shrink-0"><ShieldCheck className="w-4 h-4" /></div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Asegúrate de haber añadido <code className="bg-primary/20 text-primary px-1 rounded">/api/callback</code> como Redirect URI en tu panel de Spotify.
              </p>
            </div>
            
            <Button 
              onClick={handleAuth}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg rounded-none uppercase font-bold tracking-tighter"
            >
              Conectar con Spotify
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          
          <div className="pt-4 border-t border-primary/10 text-center">
            <Link href="/" className="text-primary/60 hover:text-primary text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors">
              <Music className="w-3 h-3" /> Volver al Inicio
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
