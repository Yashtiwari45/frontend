// src/components/ExportModal.jsx
import React, { useState } from "react";

const ExportModal = ({ totalPages, onClose, onConfirm, loading }) => {
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(totalPages > 1 ? totalPages : 1);

  const handleExport = () => {
    // Basic validation
    if (startPage < 1 || endPage > totalPages || startPage > endPage) {
      alert("Invalid page range");
      return;
    }
    onConfirm(startPage, endPage);
  };

  if (loading) {
    return (
      <div className="modal-overlay">
        <div className="modal-content" style={{textAlign: 'center'}}>
          <h3>Generating Report...</h3>
          <p>Fetching data from Page {startPage} to {endPage}</p>
          <div className="spinner"></div> {/* You can add a CSS spinner if you like */}
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Export Report</h3>
        <p className="modal-subtitle">Select page range to include in PDF</p>
        
        <div className="range-inputs">
          <div className="input-group">
            <label>Start Page</label>
            <input 
              type="number" 
              min="1" 
              max={totalPages} 
              value={startPage} 
              onChange={(e) => setStartPage(Number(e.target.value))}
            />
          </div>
          <span className="separator">to</span>
          <div className="input-group">
            <label>End Page (Max: {totalPages})</label>
            <input 
              type="number" 
              min={startPage} 
              max={totalPages} 
              value={endPage} 
              onChange={(e) => setEndPage(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-confirm" onClick={handleExport}>Download PDF</button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;