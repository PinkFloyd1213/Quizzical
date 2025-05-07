
import React from "react";
import HeroSection from "../components/landing/HeroSection";
import LocalStorageFeatures from "../components/landing/LocalStorageFeatures";
import HowItWorks from "../components/landing/HowItWorks";
import QuestionTypes from "../components/landing/QuestionTypes";
import CallToAction from "../components/landing/CallToAction";
import Footer from "../components/landing/Footer";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <HeroSection />

        {/* Main Content */}
        <div className="mb-16 space-y-20">
          {/* Local Storage Features */}
          <LocalStorageFeatures />
          
          <HowItWorks />
          
          <QuestionTypes />

          <CallToAction />
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
