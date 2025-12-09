import React from "react";

const FiltersBar = ({ 
  state, 
  onChange, 
  onReset, 
  onExport, 
  showCharts, 
  onToggleCharts 
}) => {
  
  const handleChange = (key) => (e) => {
    // Update the specific filter and reset to Page 1
    onChange({ ...state, [key]: e.target.value, page: 1 });
  };

  return (
    <div className="filters-container">
      {/* Reset / Refresh Button */}
      <button className="refresh-btn" onClick={onReset} title="Reset Filters">
        ⟳
      </button>

      {/* --- Filter Dropdowns --- */}
      
      <select className="filter-select" value={state.region} onChange={handleChange("region")}>
        <option value="">Customer Region</option>
        <option value="North">Region: North</option>
        <option value="South">Region: South</option>
        <option value="East">Region: East</option>
        <option value="West">Region: West</option>
      </select>

      <select className="filter-select" value={state.gender} onChange={handleChange("gender")}>
        <option value="">Gender</option>
        <option value="Male">Gender: Male</option>
        <option value="Female">Gender: Female</option>
      </select>

      <select className="filter-select" value={state.ageRange} onChange={handleChange("ageRange")}>
        <option value="">Age Range</option>
        <option value="18-25">Age: 18–25</option>
        <option value="26-35">Age: 26–35</option>
        <option value="36-50">Age: 36–50</option>
        <option value="50+">Age: 50+</option>
      </select>

      <select className="filter-select" value={state.productCategory} onChange={handleChange("productCategory")}>
        <option value="">Product Category</option>
        <option value="Clothing">Category: Clothing</option>
        <option value="Electronics">Category: Electronics</option>
        <option value="Home">Category: Home & Garden</option>
        <option value="Beauty">Category: Beauty</option>
      </select>

      <select className="filter-select" value={state.tags} onChange={handleChange("tags")}>
        <option value="">Tags</option>
        <option value="New Arrival">Tag: New Arrival</option>
        <option value="Bestseller">Tag: Bestseller</option>
        <option value="Discount">Tag: Discount</option>
        <option value="Limited">Tag: Limited Edition</option>
      </select>

      <select className="filter-select" value={state.paymentMethod} onChange={handleChange("paymentMethod")}>
        <option value="">Payment Method</option>
        <option value="UPI">Payment: UPI</option>
        <option value="Card">Payment: Card</option>
        <option value="Cash">Payment: Cash</option>
      </select>

      <select className="filter-select" value={state.dateRange} onChange={handleChange("dateRange")}>
        <option value="">Date Range</option>
        <option value="today">Date: Today</option>
        <option value="last_7_days">Date: Last 7 Days</option>
        <option value="last_30_days">Date: Last 30 Days</option>
        <option value="this_month">Date: This Month</option>
        <option value="last_month">Date: Last Month</option>
      </select>

      {/* --- Action Buttons --- */}

      {/* 1. Report (PDF) Button */}
      <button 
        className="filter-select" 
        onClick={onExport}
        title="Download PDF Report"
        style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}
      >
        <span>⇩</span> Report
      </button>

      {/* 2. Visualize (Charts) Toggle Button */}
      <button 
        className={`filter-select ${showCharts ? 'active-chart-btn' : ''}`}
        onClick={onToggleCharts}
        title="Toggle Charts"
        style={{ 
          fontWeight: 600, 
          display: 'flex', 
          alignItems: 'center', 
          gap: '6px',
          // Inline style for active state highlighting
          background: showCharts ? 'var(--text-main)' : 'var(--input-bg)',
          color: showCharts ? 'var(--bg-surface)' : 'var(--text-main)',
          borderColor: showCharts ? 'var(--text-main)' : 'var(--border)'
        }}
      >
        <span>📊</span> Visualize
      </button>

      {/* --- Sort By Dropdown (Pushed to the right) --- */}
      <select
        className="filter-select sort-dropdown"
        value={state.sortField}
        onChange={handleChange("sortField")}
      >
        <option value="customerName">Sort by: Customer Name</option>
        <option value="date">Sort by: Date (Newest)</option>
        <option value="quantity">Sort by: Quantity</option>
        <option value="amount">Sort by: Total Amount</option>
      </select>
    </div>
  );
};

export default FiltersBar;