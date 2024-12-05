import React from "react";
import "../styles/CreditCards.css";

const CreditCards = () => {
  return (
    <section className="cards" id="cards">
      <h2>Explore Our Credit Card Options</h2>
      <div className="card-options">
        <div className="card classic hovered">Classic Plan</div>
        <div className="card premium">Premium Plan</div>
        <div className="card titanium">Titanium Plan</div>
      </div>
    </section>
  );
};

export default CreditCards;
