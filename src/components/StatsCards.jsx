import React from "react";

const InfoIcon = () => (
  <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

const StatsCards = ({ stats }) => {
  return (
    <div className="stats-row">
      <div className="stat-card">
        <div className="stat-header">
          Total units sold <InfoIcon />
        </div>
        <div className="stat-value">{stats.totalUnits || 10}</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-header">
          Total Amount <InfoIcon />
        </div>
        <div className="stat-value">
          ₹{(stats.totalAmount || 89000).toLocaleString()} <span className="stat-sub">(19 SRs)</span>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-header">
          Total Discount <InfoIcon />
        </div>
        <div className="stat-value">
          ₹{(stats.totalDiscount || 15000).toLocaleString()} <span className="stat-sub">(45 SRs)</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;