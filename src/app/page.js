import HeroSection from "@/components/common/HeroSection";

import Image from "next/image";

export default function Home() {
  
  const text = "Your solution to everything";
  return (
    <main className="flex justify-center items-center min-h-screen w-full overflow-x-hidden">
      <div className="container mx-auto">
        <HeroSection heading={text} />
      </div>
    </main>
  );
}
