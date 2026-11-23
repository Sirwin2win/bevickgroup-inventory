
import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  Bell,
  Menu,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const pageTitles = {
  dashboard: "Dashboard",
  users: "Users",
  orders: "Orders",
  settings: "Settings"
};

function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();

  const currentPage = location.pathname.split("/")[1] || "dashboard";

  const pageTitle = pageTitles[currentPage] || "Dashboard";

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className={`dashboard ${collapsed ? "sidebar-is-collapsed" : ""}`}>

      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
      />

      <main className="main">

        <header className="topbar">

          <button
            className="mobile-menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Open sidebar"
          >
            <Menu size={21} />
          </button>

          <button
            className="desktop-collapse"
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Toggle sidebar"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>

          <h3>{pageTitle}</h3>

          <div className="profile">
            <button className="notification-btn">
              <Bell size={20} />
            </button>
            <span>Admin</span>
          </div>

        </header>

        <Navbar />

        <section className="content">
          <Outlet />
        </section>

      </main>

      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

    </div>
  );
}

export default DashboardLayout;
