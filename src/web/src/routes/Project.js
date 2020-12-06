import React from "react";
import { Route, Switch } from "react-router-dom";
import { Home, Create, Modify } from "../components/Project";
import "./Project.css";

const Project = () => {
  return (
    <div className="project">
      <Switch>
        <Route path="/project/create" component={Create} />
        <Route path="/project/modify/:projectId" component={Modify} />
        <Route path="/project/:projectId" component={Home} />
        <Route path="/project/" component={Home} />
      </Switch>
    </div>
  );
};

export default Project;
