import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"; // Assuming you have some basic styles

const Navbar = ({ darkMode, setDarkMode }) => {
  const navStyle = {
    backgroundColor: darkMode ? "#1a1a1a" : "#f5f5f5",
    color: darkMode ? "#eee" : "#333",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };
  const activeStyle = {
    backgroundColor: darkMode ? "#222" : "#cc6a00",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
  };
  const navbarStyle = {
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: darkMode ? "#1e1e1e" : "#ffe9cc",
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '10px',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  };
  const linkStyle = {
    margin: "0 1rem",
    textDecoration: "none",
    color: darkMode ? "#fff" : "#000",
    fontWeight: "bold",
  };

  return (
    <nav style={navStyle}>
      
      <div style={navStyle} >
      <NavLink to="/" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
        📊 Dashboard
      </NavLink>
      <NavLink to="/heatmap" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
        🗺️ Heatmap
      </NavLink>
      <NavLink to="/linechart" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
        📈 Line Chart
      </NavLink>
      <NavLink to="/rankings" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
        🥇 Rankings
      </NavLink>
      <NavLink to="/insights" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
        🧠 Insights
      </NavLink>
      </div>
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        style={{
          background: "none",
          border: "1px solid",
          borderColor: darkMode ? "#eee" : "#333",
          color: darkMode ? "#eee" : "#333",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      
    </nav>
  );
};

export default Navbar;


