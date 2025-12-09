// src/services/reportGenerator.js
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Use named import

export const generatePDF = (items, stats, filters) => {
  console.log("Generating PDF...", { items, stats }); // Debug log

  // Initialize PDF
  const doc = new jsPDF();

  // --- 1. Header Section ---
  doc.setFontSize(18);
  doc.text("Sales Management Report", 14, 20);

  doc.setFontSize(10);
  doc.setTextColor(100);
  const dateStr = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
  doc.text(`Generated on: ${dateStr}`, 14, 28);

  // --- 2. Filter Summary ---
  doc.setFontSize(11);
  doc.setTextColor(0);
  doc.text("Applied Filters:", 14, 38);
  
  let filterText = [];
  if (filters.region) filterText.push(`Region: ${filters.region}`);
  if (filters.productCategory) filterText.push(`Category: ${filters.productCategory}`);
  if (filters.paymentMethod) filterText.push(`Payment: ${filters.paymentMethod}`);
  if (filters.dateRange) filterText.push(`Date: ${filters.dateRange}`);
  
  doc.setFontSize(10);
  doc.setTextColor(80);
  doc.text(filterText.length > 0 ? filterText.join(", ") : "None (All Records)", 14, 44);

  // --- 3. Stats Summary ---
  doc.setDrawColor(200);
  doc.line(14, 50, 196, 50); // Horizontal line

  const startY = 60;
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text(`Total Units: ${stats.totalUnits || 0}`, 14, startY);
  // Handle cases where stats might be undefined
  const totalAmount = stats.totalAmount || 0;
  const totalDiscount = stats.totalDiscount || 0;
  
  doc.text(`Total Amount: Rs. ${totalAmount.toLocaleString()}`, 80, startY);
  doc.text(`Total Discount: Rs. ${totalDiscount.toLocaleString()}`, 150, startY);

  // --- 4. The Table ---
  // Guard clause: ensure items is an array
  const safeItems = Array.isArray(items) ? items : [];

  const tableColumn = ["Date", "Customer", "Region", "Category", "Payment", "Qty", "Amount"];
  const tableRows = safeItems.map(row => [
    row.date ? new Date(row.date).toISOString().slice(0, 10) : "N/A",
    row.customerName || "N/A",
    row.region || "N/A", 
    row.productCategory || "N/A",
    row.paymentMethod || "N/A",
    row.quantity || 0,
    `Rs. ${(row.totalAmount || row.amount || 0).toLocaleString()}`
  ]);

  // USE THE IMPORTED FUNCTION DIRECTLY
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 70,
    theme: 'grid',
    headStyles: { fillColor: [17, 24, 39] },
    styles: { fontSize: 9 },
  });

  // --- 5. Save ---
  console.log("Saving PDF...");
  doc.save("Sales_Report.pdf");
};