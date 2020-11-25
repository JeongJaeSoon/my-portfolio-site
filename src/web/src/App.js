import "./App.css";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Navigation } from "./components";
import { Main, Login, Project, Stack, About } from "./routes";

const App = () => {
  localStorage.setItem("isLogin", true);
  return (
    <div className="App">
      <Navigation />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={Main} />
          <Route path="/login" component={Login} />
          <Route path="/project" component={Project} />
          <Route path="/stack" component={Stack} />
          <Route path="/about" component={About} />
          <Redirect path="*" to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
