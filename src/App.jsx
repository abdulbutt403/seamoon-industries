import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./routes";


const App = () => {

  return (
          <Router>
            <Switch>
              {routes.map((route, inx) => {
                return (
                  <Route
                    key={inx}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                  />
                );
              })}
            </Switch>
          </Router>
  );
};

export default App;
