import React from "react";
import { useLocation } from "react-router-dom";
import { Plus } from "lucide-react";
import UserRoleForm from "../forms/UserRoleForm";

function Users() {
  const location = useLocation();
  const currentTab = location.pathname.split("/").pop();

  const titles = {
    all: "All Users",
    active: "Update User Roles",
    add: "Assign Permissions to Roles"
  };

  return (
    <div className="panel page-panel">
      <div className="page-heading">
        <div>
          <h2>{titles[currentTab]}</h2>
          {/* <p>Manage your application users.</p> */}
        </div>

        {currentTab !== "add" && (
          <button className="primary-btn">
            <Plus size={17} /> Add User
          </button>
        )}
      </div>

      {currentTab === "add" &&
      <div>
        <p className="font-bold">Select roles and the tick the desired permissions</p>

      </div>
      }

      {currentTab === "active" &&
      <div>
        <p className="font-bold text-center">Select the user and the appropriate Role and submit</p>
        <UserRoleForm />
      </div>
      }
    </div>
  );
}

export default Users;
