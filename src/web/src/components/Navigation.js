import React from "react";
import Auth from "./Auth";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  const pathname = useLocation().pathname.split("/")[1];
  const name = pathname === "" ? "main" : pathname;
  const selectedMenu = {
    main: false,
    project: false,
    stack: false,
    about: false,
  };
  const selectedClassName = " selected";

  selectedMenu[name] = true;
  const { main, project, stack, about } = selectedMenu;
  const isLogin = Auth();

  return (
    <div className="nav">
      <div className="wrapper">
        <ul className="nav-menus">
          <li className={"nav-menu" + (main ? selectedClassName : "")}>
            <Link to="/">Main</Link>
          </li>
          <li className={"nav-menu" + (project ? selectedClassName : "")}>
            <Link to="/project">My Project</Link>
          </li>
          <li className={"nav-menu" + (stack ? selectedClassName : "")}>
            <Link to="/stack">Tech Stack</Link>
          </li>
          <li className={"nav-menu" + (about ? selectedClassName : "")}>
            <Link to="/about">About Me</Link>
          </li>

          {/* TODO 로그인 여부에 따라서 로그아웃, 로그인 */}
          {isLogin ? (
            <Link to="/logout" className="btn">
              LOGOUT
            </Link>
          ) : (
            <Link to="/login" className="btn">
              LOGIN
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
