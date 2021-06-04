import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="nav">
      <Link to="/">Home</Link>
      <Link to="/Graph">Graph</Link>
      <Link to="/test_age">test_page</Link>
    </div>
  );
}

export default Navigation;