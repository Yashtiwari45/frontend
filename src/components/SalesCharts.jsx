// src/components/SalesCharts.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const SalesCharts = ({ items }) => {
  // 1. Process Data: Group Sales by Category
  const categoryData = items.reduce((acc, curr) => {
    const cat = curr.productCategory || "Unknown";
    const amount = curr.totalAmount || curr.amount || 0;
    const existing = acc.find((i) => i.name === cat);
    if (existing) {
      existing.value += amount;
    } else {
      acc.push({ name: cat, value: amount });
    }
    return acc;
  }, []);

  // 2. Process Data: Group Sales by Region
  const regionData = items.reduce((acc, curr) => {
    const reg = curr.region || "Unknown";
    const amount = curr.totalAmount || curr.amount || 0;
    const existing = acc.find((i) => i.name === reg);
    if (existing) {
      existing.value += amount;
    } else {
      acc.push({ name: reg, value: amount });
    }
    return acc;
  }, []);

  // Professional Colors for Charts (Matches your theme)
  const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#14b8a6", "#f59e0b"];

  if (items.length === 0) {
    return null; // Don't show charts if no data
  }

  return (
    <div className="charts-row" style={{ display: "flex", gap: "20px", marginBottom: "24px", flexWrap: "wrap" }}>
      
      {/* Chart 1: Sales by Category (Pie) */}
      <div className="chart-card" style={{ flex: 1, minWidth: "300px", background: "var(--bg-surface)", padding: "20px", borderRadius: "12px", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)" }}>
        <h3 style={{ margin: "0 0 20px 0", fontSize: "14px", color: "var(--text-secondary)" }}>Sales by Category</h3>
        <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                formatter={(value) => `Rs. ${value.toLocaleString()}`} 
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Sales by Region (Bar) */}
      <div className="chart-card" style={{ flex: 1, minWidth: "300px", background: "var(--bg-surface)", padding: "20px", borderRadius: "12px", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)" }}>
        <h3 style={{ margin: "0 0 20px 0", fontSize: "14px", color: "var(--text-secondary)" }}>Sales by Region</h3>
        <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer>
            <BarChart data={regionData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="name" tick={{ fill: "var(--text-secondary)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--text-secondary)", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
              <Tooltip 
                cursor={{ fill: "var(--accent-hover)" }}
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                formatter={(value) => [`Rs. ${value.toLocaleString()}`, "Amount"]}
              />
              <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default SalesCharts;