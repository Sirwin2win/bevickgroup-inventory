
import React from "react";
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import DashboardLayout from "../layout/DashboardLayout";

// Authentication pages
import Login from "../forms/Login";
import Register from "../forms/Register";

// Dashboard pages
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Orders from "../pages/Orders";
import Settings from "../pages/Settings";
import Inventory from "../pages/Inventory";
import AccountPending from "../components/AccountPending";

function AppRoutes() {
  return (
    <Routes>

      {/* Authentication Routes - No Dashboard Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard Routes */}
      <Route element={<DashboardLayout />}>

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
 {/* Default Entrance Page */}
  <Route
    path="/"
    element={<Navigate to="/login" replace />}
  />

  {/* Authentication */}
  <Route path="/login" element={<Login />} />

  <Route path="/register" element={<Register />} />

  {/* Account Pending */}
  <Route
    path="/account-pending"
    element={<AccountPending />}
  />

  {/* Unknown Routes */}
  <Route
    path="*"
    element={<Navigate to="/login" replace />}
  />

    </Routes>
  );
}

export default AppRoutes;
