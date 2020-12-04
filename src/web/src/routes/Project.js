import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Home, Store, Modify } from "../components/Project";
import "./Project.css";

const Project = () => {
  return (
    <div className="project">
      <Switch>
        <Route path="/project/:projectId" component={Home} />
        <Route path="/project/" component={Home} />
        <Route path="/project/create" component={Store} />
        <Route path="/project/modify/:projectId" component={Modify} />
        <Redirect path="/project/*" to="/project" />
      </Switch>
    </div>
  );
};

export default Project;
