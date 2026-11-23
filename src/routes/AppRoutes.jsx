
import React from "react";
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import DashboardLayout from "../layout/DashboardLayout";

import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Orders from "../pages/Orders";
import Settings from "../pages/Settings";
import Inventory from "../pages/Inventory";

function AppRoutes() {
  return (
    <Routes>

      <Route element={<DashboardLayout />}>

        {/* Dashboard */}
        <Route
          path="/dashboard/overview"
          element={<Dashboard />}
        />

        <Route
          path="/dashboard/analytics"
          element={<Dashboard />}
        />

        <Route 
        path="/dashboard/inventory" 
        element={<Inventory />} 
        />

        <Route
          path="/dashboard/reports"
          element={<Dashboard />}
        />

        {/* Users */}
        <Route path="/users/all" element={<Users />} />
        <Route path="/users/active" element={<Users />} />
        <Route path="/users/add" element={<Users />} />

        {/* Orders */}
        <Route path="/orders/all" element={<Orders />} />
        <Route path="/orders/pending" element={<Orders />} />
        <Route path="/orders/completed" element={<Orders />} />

        {/* Inventory */}
        <Route path="/inventory/all" element={<Inventory />} />
        <Route path="/inventory/pending" element={<Inventory />} />
        <Route path="/inventory/completed" element={<Inventory />} />

        {/* Settings */}
        <Route path="/settings/general" element={<Settings />} />
        <Route path="/settings/security" element={<Settings />} />
        <Route path="/settings/notifications" element={<Settings />} />

      </Route>

      <Route
        path="/"
        element={<Navigate to="/dashboard/overview" replace />}
      />

      <Route
        path="*"
        element={<Navigate to="/dashboard/overview" replace />}
      />

    </Routes>
  );
}

export default AppRoutes;
