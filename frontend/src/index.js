import React from "react";
import ReactDOM from "react-dom/client";
import "./output.css"; // Ensure this is present for Tailwind
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
