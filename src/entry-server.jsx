import React from "react";
import { renderToString } from "react-dom/server";
import Home from "./Home";
import WhatsAppButton from "./components/WhatsAppButton";

export const render = () =>
  renderToString(
    <React.StrictMode>
      <Home />
      <WhatsAppButton />
    </React.StrictMode>
  );
