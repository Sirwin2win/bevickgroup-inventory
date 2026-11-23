
import React from "react";
import {
  Wallet,
  Users,
  ShoppingBag,
  TrendingUp
} from "lucide-react";

const stats = [
  { title: "Revenue", value: "$12,450", change: "+12.5%", icon: Wallet },
  { title: "Users", value: "2,450", change: "+8.2%", icon: Users },
  { title: "Orders", value: "845", change: "+15.3%", icon: ShoppingBag },
  { title: "Growth", value: "24.5%", change: "+4.5%", icon: TrendingUp },
];

function Dashboard() {
  return (
    <>
      <div className="welcome">
        <h1>Welcome back!</h1>
        <p>Here's what's happening with your business today.</p>
      </div>

      <div className="stats">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div className="card" key={index}>
              <div className="card-top">
                <span>{item.title}</span>
                <Icon size={22} />
              </div>

              <h2>{item.value}</h2>
              <small>{item.change} from last month</small>
            </div>
          );
        })}
      </div>

      <div className="bottom-grid">
        <div className="panel">
          <h3>Recent Activity</h3>

          <div className="activity">
            <p>New user registered</p>
            <small>5 minutes ago</small>
          </div>

          <div className="activity">
            <p>New order received</p>
            <small>30 minutes ago</small>
          </div>

          <div className="activity">
            <p>Payment completed</p>
            <small>1 hour ago</small>
          </div>
        </div>

        <div className="panel">
          <h3>Quick Summary</h3>
          <h2>84%</h2>
          <p>Monthly target completed</p>

          <div className="progress">
            <div />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
