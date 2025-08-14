// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import "@fortawesome/fontawesome-free/css/all.min.css";


createRoot(document.getElementById("root")).render(<App />);

