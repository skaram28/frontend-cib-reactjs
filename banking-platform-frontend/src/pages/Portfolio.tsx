import React from "react";
const Portfolio = () => {
  // ✅ Dummy portfolio data
  const portfolioSummary = {
    totalInvestment: 150000,
    totalReturns: 25000,
    activeFunds: 5,
    riskProfile: "Medium",
  };

  return (
    <div>
      <h2>Portfolio Overview</h2>
      <p>Total Investment: ${portfolioSummary.totalInvestment}</p>
      <p>Total Returns: ${portfolioSummary.totalReturns}</p>
      <p>Active Funds: {portfolioSummary.activeFunds}</p>
      <p>Risk Profile: {portfolioSummary.riskProfile}</p>

      <h3>Transactions (Coming Soon)</h3>
      <p>
        Your transaction history will be displayed here after backend
        integration.
      </p>

      <button onClick={() => alert("Mock payment processed successfully!")}>
        Simulate Payment
      </button>
    </div>
  );
};

export default Portfolio;
