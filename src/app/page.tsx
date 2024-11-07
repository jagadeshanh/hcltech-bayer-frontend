"use client";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedTopics from "@/components/FeaturedTopics";
import useHealthCheck from "@/hooks/useHealthCheck";

export default function Home() {
  const { isHealthy, error } = useHealthCheck();

  if (isHealthy === null) {
    return <div>Loading...</div>;
  }

  if (!isHealthy) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Error: System not operational</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturedTopics />
    </main>
  );
}
