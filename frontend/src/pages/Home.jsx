import React from "react";
import "./Home.css";
import HeroSection from "../components/homePageComponents/HeroSection";
import { Link } from "react-router-dom";
import Features from "../components/homePageComponents/Features";
import HowItWorks from "../components/homePageComponents/HowItWorks";
import Pricing from "../components/homePageComponents/Pricing";
import CallToAction from "../components/homePageComponents/CallToAction";

export default function Home() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <HeroSection />
      <Features />
      <HowItWorks />
      <Pricing />
      <CallToAction />
    </div>
  );
}
