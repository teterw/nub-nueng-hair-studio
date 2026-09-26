import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { HoursMap } from "@/components/HoursMap";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";
import { StickyCallBar } from "@/components/StickyCallBar";
import { StyleSwitcher } from "@/components/StyleSwitcher";

export default function Home() {
  return (
    <>
      {/* Bottom padding clears the sticky call bar on phones. */}
      <div className="pb-20 sm:pb-0">
        <Hero />
        <main>
          <Services />
          <Gallery />
          <About />
          <Reviews />
          <HoursMap />
          <Contact />
        </main>
        <Footer />
      </div>
      <StickyCallBar />
      <StyleSwitcher />
    </>
  );
}
