import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom"; 
import "./styles.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
