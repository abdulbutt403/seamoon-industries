import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppContent } from "./App";
import { getSeoForPath, prerenderPaths } from "./seo";

export const render = (path) =>
  renderToString(
    <React.StrictMode>
      <StaticRouter location={path} context={{}}>
        <AppContent />
      </StaticRouter>
    </React.StrictMode>
  );

export const getPageSeo = (path) => getSeoForPath(path);
export { prerenderPaths };
