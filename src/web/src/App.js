import "./App.css";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Navigation, Footer } from "./components";
import { Main, Login, Project, Stack, About } from "./routes";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter className="section">
        <div className="header">
          <Navigation />
        </div>
        <div className="section">
          <Switch>
            <Route path="/" exact={true} component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/project" component={Project} />
            <Route path="/stack" component={Stack} />
            <Route path="/about" component={About} />
            <Redirect path="*" to="/" />
          </Switch>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
