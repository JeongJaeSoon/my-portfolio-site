import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="nav">
      <ul>
        <li>Main</li>
        <li>My Project</li>
        <li>Tech Stack</li>
        <li>About Me</li>
      </ul>
      <button>LOGIN</button>
    </div>
  );
};

export default Navigation;
