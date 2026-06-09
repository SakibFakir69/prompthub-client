import Footer from "../components/landing-page/footer";
import Banner from "../components/landing-page/banner";
import Pricing from "../components/landing-page/pricing";
import Features from "../components/landing-page/features";
import MarketPlace from "../components/landing-page/market-place";
import HowItWorks from "../components/landing-page/how-it-work";
import Navbar from "../components/landing-page/nav-bar";
import Hero from "../components/landing-page/hero";
import Ticker from "../components/landing-page/Ticker";
import Testionails from "../components/landing-page/testimonails";




export default function LandingPage() {
 
  return (
    <main className="overflow-x-hidden">
      <Navbar />

      <Ticker />

      <Hero />

      <HowItWorks />

      <MarketPlace />

      <Features />

      <Pricing />

      <Testionails/>

      <Banner />

      <Footer />
    </main>
  );
}