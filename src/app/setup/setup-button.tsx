"use client";

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function SetupButton({ clientId }: { clientId: string }) {
  const handleAuth = () => {
    const redirect_uri = `${window.location.origin}/api/callback`;
    // Hemos añadido user-read-playback-state para evitar el error 403
    const scope = 'user-read-currently-playing user-read-recently-played user-read-playback-state';
    
    const authUrl = new URL('https://accounts.spotify.com/authorize');
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('client_id', clientId);
    authUrl.searchParams.append('scope', scope);
    authUrl.searchParams.append('redirect_uri', redirect_uri);
    authUrl.searchParams.append('show_dialog', 'true'); // Forzar login para asegurar nuevos scopes
    
    window.location.href = authUrl.toString();
  };

  return (
    <Button 
      onClick={handleAuth}
      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg rounded-none uppercase font-bold tracking-tighter"
    >
      Conectar con Spotify
      <ArrowRight className="w-5 h-5 ml-2" />
    </Button>
  );
}