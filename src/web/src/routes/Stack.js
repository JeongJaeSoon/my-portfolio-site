import React from "react";
import { Route, Switch } from "react-router-dom";
import { Home, Modify } from "../components/Stack";
import "./Stack.css";

const Stack = () => {
  return (
    <div className="stack">
      <Switch>
        <Route path="/stack" component={Home} />
        <Route path="/stack/modify/:projectId" component={Modify} />
      </Switch>
    </div>
  );
};

export default Stack;
