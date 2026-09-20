import { useEffect } from "react";
import { BrowserRouter as Router, Redirect, Switch, Route, useLocation } from "react-router-dom";
import routes from "./routes";
import WhatsAppButton from "./components/WhatsAppButton";
import SiteLayout from "./components/SiteLayout";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const AppContent = () => (
  <>
    <SiteLayout>
      <Switch>
        <Redirect exact from="/dental-catalogue" to="/dental-instruments" />
        <Redirect exact from="/surgical-catalogue" to="/surgical-instruments" />
        {routes.map((route, index) => (
          <Route
            key={route.path || "not-found"}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
      </Switch>
    </SiteLayout>
    <WhatsAppButton />
  </>
);

const App = () => (
  <Router>
    <ScrollToTop />
    <AppContent />
  </Router>
);

export default App;
