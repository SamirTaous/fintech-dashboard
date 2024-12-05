import React from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import BankingSolutions from "./components/BankingSolutions";
import LoanOptions from "./components/LoanOptions";
import CreditCards from "./components/CreditCards";
import CTA from "./components/CTA";

function App() {
  return (
    <div>
      <Header />
      <HeroSection />
      <BankingSolutions />
      <LoanOptions />
      <CreditCards />
      <CTA />
    </div>
  );
}

export default App;
