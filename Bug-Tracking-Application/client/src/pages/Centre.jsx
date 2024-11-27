import React from "react";
import { useOutletContext } from "react-router-dom";

const Centre = () => {
  const { data } = useOutletContext();

  return (
    <div className="container">
      <header className="title">
        <h1>Dashboard</h1>
        <div className="title-underline"></div>
      </header>

      <section className="dashboard-content">
        <div className="content-box">
          <h2>Welcome!{data.user.name}</h2>
          <p>
            Explore the dashboard to view reports, manage users, and check your
            profile.
          </p>
        </div>

        <div className="content-box">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/dashboard/profile" className="btn">
                Profile
              </a>
            </li>
            <li>
              <a href="/dashboard/users" className="btn">
                Users
              </a>
            </li>
            <li>
              <a href="/dashboard/reports" className="btn">
                Reports
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Centre;
