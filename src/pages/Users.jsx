
import React from "react";
import { useLocation } from "react-router-dom";
import { Plus } from "lucide-react";

function Users() {
  const location = useLocation();
  const currentTab = location.pathname.split("/").pop();

  const titles = {
    all: "All Users",
    active: "Active Users",
    add: "Add New User"
  };

  return (
    <div className="panel page-panel">
      <div className="page-heading">
        <div>
          <h2>{titles[currentTab]}</h2>
          <p>Manage your application users.</p>
        </div>

        {currentTab !== "add" && (
          <button className="primary-btn">
            <Plus size={17} /> Add User
          </button>
        )}
      </div>

      {currentTab === "add" ? (
        <p>User registration form goes here.</p>
      ) : (
        <p>Your users table goes here.</p>
      )}
    </div>
  );
}

export default Users;
