import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight font-headline">
          Sav Oficial
        </h1>
        <p className="mt-4 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
          Domina el Campo de Batalla. Únete al mejor clan competitivo de BloodStrike.
        </p>
        <div className="mt-8">
          <Button asChild size="lg" className="font-bold">
            <Link href="#register">
              Aplicar para Pruebas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
