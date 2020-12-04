import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LogoutRequest, AuthRequest } from "../axios";
import "./Navigation.css";

const Navigation = () => {
  const pathname = useLocation().pathname.split("/")[1];
  const isLogin = AuthRequest();

  const name = pathname === "" ? "main" : pathname;
  const selectedClassName = " selected";
  const selectedMenu = {
    main: false,
    project: false,
    stack: false,
    about: false,
  };
  selectedMenu[name] = true;
  const { main, project, stack, about } = selectedMenu;

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
            <button className="btn" onClick={LogoutRequest}>
              LOGOUT
            </button>
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
