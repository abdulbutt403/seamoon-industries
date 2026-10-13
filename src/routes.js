import Page404 from "./components/404";
import Home from "./Home";
import DentalInstruments from "./pages/DentalInstruments";
import SurgicalInstruments from "./pages/SurgicalInstruments";
import OEMPrivateLabel from "./pages/OEMPrivateLabel";
import CertificationsPage from "./pages/CertificationsPage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";
import GuidesPage from "./pages/GuidesPage";
import GuidePage from "./pages/GuidePage";

let routes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/dental-instruments",
    component: DentalInstruments,
    exact: true,
  },
  {
    path: "/dental-instruments/:categorySlug",
    component: DentalInstruments,
    exact: true,
  },
  {
    path: "/surgical-instruments",
    component: SurgicalInstruments,
    exact: true,
  },
  {
    path: "/oem-private-label",
    component: OEMPrivateLabel,
    exact: true,
  },
  {
    path: "/certifications",
    component: CertificationsPage,
    exact: true,
  },
  {
    path: "/contact",
    component: ContactPage,
    exact: true,
  },
  {
    path: "/cart",
    component: CartPage,
    exact: true,
  },
  {
    path: "/guides",
    component: GuidesPage,
    exact: true,
  },
  {
    path: "/guides/:slug",
    component: GuidePage,
    exact: true,
  },
  {
    component: Page404,
    exact: true,
  },
];

export default routes;
