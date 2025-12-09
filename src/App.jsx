import React, { useEffect, useState } from "react";

// Components
import Layout from "./components/Layout";
import FiltersBar from "./components/FiltersBar";
import StatsCards from "./components/StatsCards";
import SalesTable from "./components/SalesTable";
import Pagination from "./components/Pagination";
import SalesCharts from "./components/SalesCharts";
import ExportModal from "./components/ExportModal";

// Services
import { fetchSales } from "./services/api";
import { generatePDF } from "./services/reportGenerator";

// Styles
import "./styles/styles.css";

const App = () => {
  // --- UI State ---
  const [activePage, setActivePage] = useState("Pre-active");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showCharts, setShowCharts] = useState(false);
  
  // --- Export Modal State ---
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  // --- Filter & Data State ---
  const [query, setQuery] = useState({
    region: "",
    gender: "",
    ageRange: "",
    productCategory: "",
    tags: "",
    dateRange: "",
    paymentMethod: "",
    sortField: "customerName",
    search: "",
    page: 1,
  });

  const [data, setData] = useState({
    items: [],
    stats: {},
    total: 0,
    totalPages: 1,
    page: 1,
  });

  const [loading, setLoading] = useState(false);

  // --- Effect: Handle Dark Mode Body Class ---
  useEffect(() => {
    if (isDarkMode) {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.removeAttribute("data-theme");
    }
  }, [isDarkMode]);

  // --- Helper: Build API Params from State ---
  const buildParams = (pageNumber, limitSize) => {
    const params = {
      page: pageNumber,
      limit: limitSize,
      sortField: query.sortField,
      sortOrder: query.sortField === "customerName" ? "asc" : "desc",
    };

    if (query.search) params.search = query.search;
    if (query.region) params.region = query.region;
    if (query.gender) params.gender = query.gender;
    if (query.productCategory) params.category = query.productCategory;
    if (query.paymentMethod) params.paymentMethod = query.paymentMethod;
    if (query.tags) params.tags = query.tags;

    // Handle Age Range (e.g., "18-25" or "50+")
    if (query.ageRange) {
      const parts = query.ageRange.split("-");
      if (parts.length === 2) {
        params.minAge = parts[0];
        params.maxAge = parts[1];
      } else if (query.ageRange === "50+") {
        params.minAge = "50";
      }
    }

    // Handle Date Range (Convert text to ISO strings)
    if (query.dateRange) {
      const now = new Date();
      let startDate = new Date();

      if (query.dateRange === 'today') {
         startDate = now;
      } else if (query.dateRange === 'last_7_days') {
         startDate.setDate(now.getDate() - 7);
      } else if (query.dateRange === 'last_30_days') {
         startDate.setDate(now.getDate() - 30);
      } else if (query.dateRange === 'this_month') {
         startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      } else if (query.dateRange === 'last_month') {
         startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
         const endDate = new Date(now.getFullYear(), now.getMonth(), 0);
         params.endDate = endDate.toISOString();
      }
      
      params.startDate = startDate.toISOString();
      if (!params.endDate) params.endDate = now.toISOString();
    }

    return params;
  };

  // --- Main Data Loader ---
  const load = async () => {
    if (activePage !== "Pre-active") return;

    setLoading(true);
    const params = buildParams(query.page, 10); // Standard view is 10 items per page

    try {
      const res = await fetchSales(params);
      setData(res || { items: [], stats: {}, total: 0, totalPages: 1 });
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Trigger load on filter change or page switch
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, activePage]);

  // --- Handlers ---
  const handleNavigate = (page) => setActivePage(page);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleResetFilters = () => {
    setQuery({
      region: "",
      gender: "",
      ageRange: "",
      productCategory: "",
      tags: "",
      dateRange: "",
      paymentMethod: "",
      sortField: "customerName",
      search: "",
      page: 1,
    });
  };

  // --- Export Logic ---
  const handleOpenExport = () => setShowExportModal(true);

  const handleConfirmExport = async (startPage, endPage) => {
    setExportLoading(true);
    try {
      // Loop through the requested pages to gather all data
      let allItems = [];
      for (let p = startPage; p <= endPage; p++) {
          const params = buildParams(p, 10);
          const res = await fetchSales(params);
          if (res && res.items) {
              allItems = [...allItems, ...res.items];
          }
      }
      // Generate PDF
      generatePDF(allItems, data.stats, query);
      setShowExportModal(false);
    } catch (err) {
      console.error("Export Error:", err);
      alert("Failed to export. Please try again.");
    } finally {
      setExportLoading(false);
    }
  };

  // --- Render Content ---
  const renderContent = () => {
    // 1. Main Dashboard View
    if (activePage === "Pre-active") {
      return (
        <>
          <FiltersBar
            state={query}
            onChange={setQuery}
            onReset={handleResetFilters}
            onExport={handleOpenExport}
            showCharts={showCharts}
            onToggleCharts={() => setShowCharts(!showCharts)}
          />

          <StatsCards stats={data.stats || {}} total={data.total || 0} />

          {/* Conditional Charts Section */}
          {showCharts && (
            <div style={{ animation: "fadeIn 0.5s ease" }}>
               <SalesCharts items={data.items || []} />
            </div>
          )}

          <SalesTable items={data.items || []} loading={loading} />

          <Pagination
            page={data.page || query.page}
            totalPages={data.totalPages || 1}
            onChange={(p) => setQuery({ ...query, page: p })}
          />
        </>
      );
    }

    // 2. Placeholder View for other sidebar items
    return (
      <div className="placeholder-content">
        <h2>{activePage}</h2>
        <p>This module is currently under development.</p>
        <p style={{fontSize: '12px', marginTop: '8px'}}>Please navigate to <b>Services &gt; Pre-active</b> for the Sales Dashboard.</p>
      </div>
    );
  };

  return (
    <Layout
      search={query.search}
      onSearchChange={(val) => setQuery({ ...query, search: val, page: 1 })}
      activePage={activePage}
      onNavigate={handleNavigate}
      isDarkMode={isDarkMode}
      toggleTheme={toggleTheme}
    >
      {renderContent()}

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal 
            totalPages={data.totalPages || 1} 
            onClose={() => setShowExportModal(false)}
            onConfirm={handleConfirmExport}
            loading={exportLoading}
        />
      )}
    </Layout>
  );
};

export default App;