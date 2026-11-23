
import React from "react";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Settings,
  LogOut,
  Warehouse 
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", path: "/dashboard/overview", icon: LayoutDashboard },
  { title: "Users", path: "/users/all", icon: Users },
  { title: "Inventory", path: "/inventory/all", icon: Warehouse },
  { title: "Orders", path: "/orders/all", icon: ShoppingBag },
  { title: "Settings", path: "/settings/general", icon: Settings }
];

function Sidebar({ collapsed, mobileOpen }) {
  return (
    <aside className={`sidebar
      ${collapsed ? "collapsed" : ""}
      ${mobileOpen ? "mobile-open" : ""}
    `}>

      <div className="sidebar-header">
        <h2>MyDashboard</h2>
      </div>

      <nav>
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              title={collapsed ? item.title : ""}
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      <button className="logout">
        <LogOut size={20} />
        <span>Logout</span>
      </button>

    </aside>
  );
}

export default Sidebar;
