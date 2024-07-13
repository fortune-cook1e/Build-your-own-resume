'use client';

import Hero from '@/components/Home/Hero';
import HeaderToolsBar from '@/components/HeaderToolsBar';

export default function Home() {
  return (
    <main className="relative">
      <HeaderToolsBar />
      <Hero />
    </main>
  );
}
