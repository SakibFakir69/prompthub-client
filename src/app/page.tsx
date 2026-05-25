"use client";

import dynamic from "next/dynamic";

import Footer from "../components/landing-page/footer";
import Banner from "../components/landing-page/banner";
import Pricing from "../components/landing-page/pricing";
import Features from "../components/landing-page/features";
import MarketPlace from "../components/landing-page/market-place";
import HowItWorks from "../components/landing-page/how-it-work";

// Dynamic imports (heavy or non-critical sections)
const Navbar = dynamic(
  () => import("../components/landing-page/nav-bar"),
  {
    loading: () => <p>Loading Navbar...</p>,
  }
);

const Hero = dynamic(
  () => import("../components/landing-page/hero"),
  {
    loading: () => <p>Loading Hero...</p>,
  }
);

const Ticker = dynamic(
  () => import("../components/landing-page/Ticker"),
  {
    loading: () => <p>Loading Ticker...</p>,
  }
);

const Testimonials = dynamic(
  () => import("../components/landing-page/testimonails"),
  {
    loading: () => <p>Loading Testimonials...</p>,
  }
);

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

      <Testimonials />

      <Banner />

      <Footer />
    </main>
  );
}