import React from "react";

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const SalesTable = ({ items, loading }) => {
  if (loading) return <div style={{padding: 24, textAlign:'center', color: '#6b7280'}}>Loading...</div>;
  if (!loading && items.length === 0) return <div style={{padding: 24, textAlign:'center', color: '#6b7280'}}>No results found.</div>;

  return (
    <div className="table-wrapper">
      <table className="sales-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Customer ID</th>
            <th>Customer name</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Product Category</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row, idx) => (
            <tr key={row._id || idx}>
              <td style={{color: '#6b7280'}}>{row.productId || "1234567"}</td>
              <td style={{color: '#6b7280'}}>{row.date ? new Date(row.date).toISOString().slice(0, 10) : "2023-09-26"}</td>
              <td>{row.customerId || "CUST12016"}</td>
              <td style={{fontWeight: 500}}>{row.customerName}</td>
              <td>
                <div className="copy-wrapper">
                  {row.phoneNumber || "+91 9123456789"}
                  <button className="btn-copy" title="Copy Number">
                    <CopyIcon />
                  </button>
                </div>
              </td>
              <td>{row.gender}</td>
              <td>{row.age}</td>
              <td style={{fontWeight: 500}}>{row.productCategory}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;