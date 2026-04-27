
"use client";

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function SetupButton({ clientId }: { clientId: string }) {
  const handleAuth = () => {
    const redirect_uri = `${window.location.origin}/api/callback`;
    const scope = 'user-read-currently-playing user-read-recently-played';
    
    const authUrl = new URL('https://accounts.spotify.com/authorize');
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('client_id', clientId);
    authUrl.searchParams.append('scope', scope);
    authUrl.searchParams.append('redirect_uri', redirect_uri);
    
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
