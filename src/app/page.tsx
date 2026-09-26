import { About } from "@/components/About";
import { AppTabBar } from "@/components/AppTabBar";
import { Contact } from "@/components/Contact";
import { DesignPicker } from "@/components/DesignPicker";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { HoursMap } from "@/components/HoursMap";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";
import { SiteNav } from "@/components/SiteNav";
import { StickyCallBar } from "@/components/StickyCallBar";

/**
 * Markup order is reading order. The page formats re-arrange this with CSS
 * only — โชว์ผลงาน moves the gallery up with `order`, สองฝั่ง turns the shell
 * into a grid — so anything that ignores the stylesheet still gets the sections
 * in a sensible sequence.
 */
export default function Home() {
  return (
    <>
      <SiteNav />

      {/* Bottom padding clears the sticky call bar on phones. */}
      <div className="site-shell pb-20 sm:pb-0">
        <Hero />
        <main className="site-main">
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
      <AppTabBar />
      <DesignPicker />
    </>
  );
}
