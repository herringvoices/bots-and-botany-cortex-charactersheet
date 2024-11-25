import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx"; // Main application component
import "./index.scss"; // Your global styles
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./views/UserContext"; // Import the UserProvider for authentication state

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
);
