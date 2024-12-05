import React from "react";
import "../styles/HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Innovate your banking experience</h1>
        <div className="hero-buttons">
          <button className="btn primary">Get Started</button>
          <button className="btn secondary">Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
