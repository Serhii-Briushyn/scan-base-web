import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@shared/styles/fonts.css";
import "@shared/styles/globals.css";
import "@shared/styles/vars.css";

import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
