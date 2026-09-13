import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./routes";
import WhatsAppButton from "./components/WhatsAppButton";


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
            <WhatsAppButton />
          </Router>
  );
};

export default App;
