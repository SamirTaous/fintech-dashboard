import React from "react";
import "../styles/LoanOptions.css";

const LoanOptions = () => {
  return (
    <section className="loans" id="loans">
      <h2>Find the Perfect Loan for You</h2>
      <div className="loan-cards">
        <div className="card">Car Loan</div>
        <div className="card hovered">Home Loan</div>
        <div className="card">Cash Loan</div>
      </div>
    </section>
  );
};

export default LoanOptions;
