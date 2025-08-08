import HeroSection from "@/components/sections/HeroSection";
import MarqueeSection from "@/components/sections/MarqueeSection";
import Section2 from "@/components/sections/Section2";
import Section3 from "@/components/sections/Section3";
import Section4 from "@/components/sections/Section4";
import Section5 from "@/components/sections/Section5";
import Section6 from "@/components/sections/Section6";
import Section7 from "@/components/sections/Section7";
import Section8 from "@/components/sections/Section8";
// import Section9 from "@/components/sections/Section9";
import Section10 from "@/components/sections/Section10";
import Section11 from "@/components/sections/Section11";
import Section12 from "@/components/sections/Section12";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Marquee Section */}
      <MarqueeSection />

      {/* Section 2 */}
      <Section2 />

      {/* Section 3 */}
      <Section3 />

      {/* Section 4 */}
      <Section4 />

      {/* Section 5 */}
      <Section5 />

      {/* Section 6 */}
      <Section6 />

      {/* Section 7 */}
      <Section7 />

      {/* Section 8 */}
      <Section8 />

      {/* Section 9 */}
      {/*<Section9 />*/}

      {/* Section 10 */}
      <Section10 />

      {/* Section 11 */}
      <Section11 />

      {/* Section 12 */}
      <Section12 />

      {/* Footer */}
      <Footer />

      {/* Future sections will be added here */}
      <div id="sections-container">
        {/* Additional sections will be added as we build them */}
      </div>
    </main>
  );
}
