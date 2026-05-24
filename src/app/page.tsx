"use client"

import { useEffect, useRef, useState } from "react";
import Footer from "../components/landing-page/footer";
import Banner from "../components/landing-page/banner";
import Testionails from "../components/landing-page/testimonails";
import Pricing from "../components/landing-page/pricing";
import Features from "../components/landing-page/features";
import MarketPlace from "../components/landing-page/market-place";
import HowItWorks from "../components/landing-page/how-it-work";
import Hero from "../components/landing-page/hero";
import Ticker from "../components/landing-page/Ticker";
import Navbar from "../components/landing-page/nav-bar";
import { useScrollReveal } from "../hooks/landing-page/page";







// ─── Main Page ────────────────────────────────────────────────────────────────
export default function LandingPage() {
  // useScrollReveal();
  // const [activeCategory, setActiveCategory] = useState("All");
  // const [scrolled, setScrolled] = useState(false);
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // useEffect(() => {
  //   const onScroll = () => setScrolled(window.scrollY > 20);
  //   window.addEventListener("scroll", onScroll);
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);

  // const filteredPrompts = PROMPTS.filter(
  //   (p) => activeCategory === "All" || p.category === activeCategory
  // );

  return (
    <>


      <Navbar />

      <Ticker />

      <Hero />


      <HowItWorks />


      <MarketPlace />


      <Features />


      <Pricing />

      <Testionails />


      <Banner />


      <Footer />

    </>
  );
}