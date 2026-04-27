
import { ThemeCustomizer } from '@/components/ThemeCustomizer';
import { Button } from '@/components/ui/button';
import { Music, Github, Settings, Zap, Terminal, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0C0F0B] text-[#46F20D] selection:bg-[#46F20D] selection:text-[#0C0F0B]">
      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-16 pb-8 text-center">
        <div className="inline-block p-2 mb-6 border-2 border-primary rounded-full animate-pulse shadow-[0_0_15px_rgba(70,242,13,0.3)]">
          <Music className="w-8 h-8" />
        </div>
        <h1 className="text-5xl md:text-7xl font-headline font-black mb-4 tracking-tighter uppercase italic">
          PixelTune <span className="text-accent">Widget</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 font-body">
          Level up your GitHub profile with a real-time, retro pixel-art Spotify status. 
          Animated, customizable, and purely nostalgic.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Link href="/api/now-playing" target="_blank">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-8 py-6 text-lg">
              <Zap className="w-5 h-5 mr-2" />
              Test API
            </Button>
          </Link>
          <Link href="https://github.com" target="_blank">
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 rounded-none px-8 py-6 text-lg">
              <Github className="w-5 h-5 mr-2" />
              Source Code
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Grid */}
      <main className="container mx-auto px-4 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Instructions */}
        <section className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-headline font-bold flex items-center gap-3">
              <Settings className="w-6 h-6" /> Setup Guide
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4 group">
                <div className="font-code text-primary/40 text-2xl pt-1 font-black group-hover:text-primary transition-colors">01.</div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold mb-1 tracking-tight flex items-center justify-between">
                    Iniciar Autorización
                    <Link href="/setup">
                      <Button size="sm" variant="ghost" className="h-7 text-xs text-primary bg-primary/10 hover:bg-primary/20">
                        <ExternalLink className="w-3 h-3 mr-1" /> Ir a Auth
                      </Button>
                    </Link>
                  </h4>
                  <p className="text-muted-foreground text-sm font-body">
                    Usa nuestra herramienta de autorización para conectar tu cuenta y generar el token necesario.
                  </p>
                </div>
              </div>
              <Step 
                num="02" 
                title="Configurar Redirect URI" 
                desc="En tu panel de Spotify, añade: {TU_URL}/api/callback como Redirect URI permitida."
              />
              <Step 
                num="03" 
                title="Actualizar .env" 
                desc="Copia el Refresh Token generado y añádelo a tus variables de entorno."
              />
              <Step 
                num="04" 
                title="Embed in README" 
                desc="Customize your theme below and paste the generated Markdown into your GitHub profile."
              />
            </div>
          </div>

          <div className="bg-primary/5 p-6 border-l-4 border-primary rounded-r">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
              <Terminal className="w-4 h-4" /> Usage Tips
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The widget caches data for 30 seconds to respect Spotify rate limits while keeping your README fresh. 
              Use query parameters to tweak colors if you prefer manual configuration over AI generation.
            </p>
          </div>
        </section>

        {/* Right Column: Theme Generator */}
        <section className="sticky top-8">
          <ThemeCustomizer />
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-primary/10 py-12 bg-black/50">
        <div className="container mx-auto px-4 text-center space-y-4">
          <div className="flex justify-center gap-4 text-muted-foreground">
             <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary" /> System Online</span>
             <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-accent" /> 2.5.0-v</span>
          </div>
          <p className="text-xs opacity-50 font-code uppercase tracking-tighter">
            Powered by Next.js & Genkit • Inspired by the CRT era
          </p>
        </div>
      </footer>
    </div>
  );
}

function Step({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="flex gap-4 group">
      <div className="font-code text-primary/40 text-2xl pt-1 font-black group-hover:text-primary transition-colors">
        {num}.
      </div>
      <div>
        <h4 className="text-xl font-bold mb-1 tracking-tight">{title}</h4>
        <p className="text-muted-foreground text-sm font-body">{desc}</p>
      </div>
    </div>
  );
}
