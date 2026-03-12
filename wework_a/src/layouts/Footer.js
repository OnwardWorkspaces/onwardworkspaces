import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="main-footer">
      <span>&copy; 2023. Onward Workspace. All Rights Reserved.</span>
      <span>Design and crafted by: <Link to="https://rajmith.com" target="_blank">Rajmith</Link></span>
    </div>
  )
}