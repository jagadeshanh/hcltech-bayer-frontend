import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedTopics from "@/components/FeaturedTopics";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturedTopics />
    </main>
  );
}
