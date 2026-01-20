"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Tiktok } from '@/components/icons/tiktok';
import { Youtube } from 'lucide-react';

export function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <Link href="https://www.tiktok.com/@sav_oficial?_r=1&_t=ZS-93EATEZLLVg" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <Tiktok className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="https://youtube.com/@mrlsbrandonma?si=YnZc0l7l-GioISlD" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <Youtube className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            &copy; {year} Sav Oficial. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
