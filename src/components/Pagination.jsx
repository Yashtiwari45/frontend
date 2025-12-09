import React from "react";

const Pagination = ({ page, totalPages, onChange }) => {
  // Even if totalPages is 0, we render the structure to match the layout image visually 
  // or return null. The image shows "1 / 2", so we'll default to that style.
  const displayTotal = totalPages > 0 ? totalPages : 1;
  const displayPage = page > 0 ? page : 1;

  return (
    <div className="footer-bar">
      <div className="pagination-pill">
        <button 
          className="pg-btn" 
          disabled={displayPage <= 1} 
          onClick={() => onChange(displayPage - 1)}
        >
          ❮
        </button>
        <span>{displayPage} / {displayTotal}</span>
        <button 
          className="pg-btn" 
          disabled={displayPage >= displayTotal} 
          onClick={() => onChange(displayPage + 1)}
        >
          ❯
        </button>
      </div>
      
      <button className="btn-restart" onClick={() => window.location.reload()}>
         <span>↻</span> Restart R
      </button>
    </div>
  );
};

export default Pagination;