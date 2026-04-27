
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, ArrowRight, ShieldCheck, Key, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { SetupButton } from './setup-button';

export default function SetupPage() {
  const clientId = process.env.SPOTIFY_CLIENT_ID || '86c6ca9576174804b34f6a0a3d53e92b';
  const hasSecret = !!process.env.SPOTIFY_CLIENT_SECRET;
  const currentRefreshToken = process.env.SPOTIFY_REFRESH_TOKEN || '';

  return (
    <div className="min-h-screen bg-[#0C0F0B] flex flex-col items-center justify-center p-4 space-y-8">
      <Card className="w-full max-w-md bg-black/40 border-primary/20 backdrop-blur-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(70,242,13,0.3)]">
            <Key className="text-primary w-6 h-6" />
          </div>
          <CardTitle className="text-primary text-2xl font-headline italic">Spotify Auth Helper</CardTitle>
          <CardDescription className="text-muted-foreground">
            Genera tu Refresh Token de larga duración para el widget.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-3 items-start bg-primary/5 p-3 border border-primary/10 rounded">
              <div className="bg-primary/10 p-2 rounded text-primary shrink-0"><ShieldCheck className="w-4 h-4" /></div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Asegúrate de tener <code className="text-primary bg-primary/20 px-1 rounded">/api/callback</code> configurado en el Dashboard de Spotify.
              </p>
            </div>
            
            <SetupButton clientId={clientId} />
          </div>
          
          <div className="pt-4 border-t border-primary/10 text-center">
            <Link href="/" className="text-primary/60 hover:text-primary text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors">
              <Music className="w-3 h-3" /> Volver al Inicio
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Debug Section */}
      <Card className="w-full max-w-md bg-black/60 border-accent/20 border-dashed">
        <CardHeader className="py-4">
          <CardTitle className="text-accent text-sm flex items-center gap-2 uppercase tracking-tighter">
            <AlertTriangle className="w-4 h-4" /> Debug Environment
          </CardTitle>
        </CardHeader>
        <CardContent className="text-[10px] font-code space-y-2">
          <div className="flex justify-between items-center border-b border-white/5 pb-1">
            <span className="text-muted-foreground">CLIENT_ID:</span>
            <span className={clientId ? "text-primary" : "text-destructive"}>{clientId ? 'OK' : 'MISSING'}</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/5 pb-1">
            <span className="text-muted-foreground">CLIENT_SECRET:</span>
            <span className={hasSecret ? "text-primary" : "text-destructive"}>{hasSecret ? 'OK' : 'MISSING'}</span>
          </div>
          <div className="pt-2">
            <p className="text-muted-foreground mb-1">CURRENT REFRESH TOKEN:</p>
            <div className="bg-black p-2 border border-accent/30 rounded break-all text-accent select-all">
              {currentRefreshToken || 'NOT CONFIGURED YET'}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
