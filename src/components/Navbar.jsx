
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const navigation = {
  dashboard: [
    { title: "Overview", path: "/dashboard/overview" },
    { title: "Analytics", path: "/dashboard/analytics" },
    { title: "Reports", path: "/dashboard/reports" }
  ],

  users: [
    { title: "All Users", path: "/users/all" },
    { title: "User Roles", path: "/users/active" },
    { title: "Assign Permissions", path: "/users/add" }
  ],

  orders: [
    { title: "All Orders", path: "/orders/all" },
    { title: "Pending", path: "/orders/pending" },
    { title: "Completed", path: "/orders/completed" }
  ],

  settings: [
    { title: "General", path: "/settings/general" },
    { title: "Security", path: "/settings/security" },
    { title: "Notifications", path: "/settings/notifications" }
  ]
};

function Navbar() {
  const location = useLocation();

  const currentPage = location.pathname.split("/")[1] || "dashboard";

  const tabs = navigation[currentPage] || navigation.dashboard;

  const currentTab = tabs.find(
    tab => tab.path === location.pathname
  );

  return (
    <div className="page-navbar">

      <div className="page-tabs">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              isActive ? "tab active-tab" : "tab"
            }
          >
            {tab.title}
          </NavLink>
        ))}
      </div>

      <span className="breadcrumb">
        {currentPage} / {currentTab?.title}
      </span>

    </div>
  );
}

export default Navbar;
