import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <section className="page-hero" aria-labelledby="not-found-title">
      <h1 id="not-found-title">Page not found</h1>
      <p>The page you requested could not be found.</p>
      <Link to="/">Return to Seamoon Industries home</Link>
    </section>
  );
}
