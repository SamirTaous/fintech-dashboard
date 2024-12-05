import React from "react";
import "../styles/BankingSolutions.css";

const BankingSolutions = () => {
  return (
    <section className="solutions" id="solutions">
      <h2>Discover Our Banking Solutions</h2>
      <div className="solution-cards">
        <div className="card">Everyday Banking</div>
        <div className="card hovered">Get Rewards and Cashback</div>
        <div className="card">Savings and Investments</div>
        <div className="card hovered">Financial Management Services</div>
      </div>
    </section>
  );
};

export default BankingSolutions;
