// src/components/Layout.jsx
import React from "react";

const Layout = ({
  children,
  search,
  onSearchChange,
  activePage,
  onNavigate,
  isDarkMode,
  toggleTheme,
}) => {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-box">V</div>
          <div className="user-info">
            <div className="name">Vault</div>
            <div className="role">Yogeshwar Tiwari</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activePage === "Dashboard" ? "active" : ""}`}
            onClick={() => onNavigate("Dashboard")}
          >
            <span>⊞</span> Dashboard
          </button>
          <button
            className={`nav-item ${activePage === "Nexus" ? "active" : ""}`}
            onClick={() => onNavigate("Nexus")}
          >
            <span>⌘</span> Nexus
          </button>
          <button
            className={`nav-item ${activePage === "Intake" ? "active" : ""}`}
            onClick={() => onNavigate("Intake")}
          >
            <span>▸</span> Intake
          </button>

          <div className="nav-group">
            <div className="nav-group-title">
              <span>Services</span>
              <span>^</span>
            </div>
            <div style={{ paddingLeft: "8px" }}>
              {/* This is the MAIN ASSIGNMENT TAB */}
              <button
                className={`nav-item ${activePage === "Pre-active" ? "active" : ""}`}
                onClick={() => onNavigate("Pre-active")}
              >
                <span>○</span> Pre-active
              </button>
              
              <button
                className={`nav-item ${activePage === "Active" ? "active" : ""}`}
                onClick={() => onNavigate("Active")}
              >
                <span>○</span> Active
              </button>
              <button
                className={`nav-item ${activePage === "Blocked" ? "active" : ""}`}
                onClick={() => onNavigate("Blocked")}
              >
                <span>○</span> Blocked
              </button>
              <button
                className={`nav-item ${activePage === "Closed" ? "active" : ""}`}
                onClick={() => onNavigate("Closed")}
              >
                <span>○</span> Closed
              </button>
            </div>
          </div>

          <div className="nav-group">
            <div className="nav-group-title">
              <span>Invoices</span>
              <span>v</span>
            </div>
          </div>
        </nav>

        <button className="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? "☀ Light Mode" : "☾ Dark Mode"}
        </button>
      </aside>

      <main className="main">
        <header className="topbar">
          <h1>
            {activePage === "Pre-active" ? "Sales Management System" : activePage}
          </h1>
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              placeholder="Name, Phone no."
              value={search}
              onChange={(e) =>
                onSearchChange && onSearchChange(e.target.value)
              }
              // Disable search on placeholder pages to avoid confusion
              disabled={activePage !== "Pre-active"}
            />
          </div>
        </header>
        <div className="content">{children}</div>
      </main>
    </div>
  );
};

export default Layout;