import Page404 from "./components/404";
import Home from "./Home";
import Mpd from "./components/Mpd";
import Surgical from "./components/Surgical";

let routes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/dental-catalogue",
    component: Mpd,
    exact: false,
  },
  {
    path: "/surgical-catalogue",
    component: Surgical,
    exact: false,
  },
  {
    component: Page404,
    exact: true,
  },
];

export default routes;
