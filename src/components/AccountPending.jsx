
import React from "react";
import { Link } from "react-router-dom";
import { Clock, ShieldCheck, Bell } from "lucide-react";
import "./style.css";

export default function AccountPending() {
  return (
    <div className="auth-container">
      <div className="auth-card pending-card">

        <div className="pending-icon">
          <Clock size={45} />
        </div>

        <h1>Account Pending Activation</h1>

        <p>
          Your registration was successful!
          However, your account is currently
          awaiting administrator approval.
        </p>

        <div className="pending-info">

          <div>
            <ShieldCheck size={22} />
            <span>
              Your account has been registered.
            </span>
          </div>

          <div>
            <Clock size={22} />
            <span>
              An administrator will review
              and activate your account.
            </span>
          </div>

          <div>
            <Bell size={22} />
            <span>
              You will be notified when your
              account becomes active.
            </span>
          </div>

        </div>

        <div className="pending-notice">
          You cannot access the inventory
          management system until your
          account is activated.
        </div>

        <Link to="/account-pending" className="auth-submit">
          Back to Login
        </Link>

      </div>
    </div>
  );
}
