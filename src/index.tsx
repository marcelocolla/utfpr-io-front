import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import GlobalStyles from "./styles/GlobalStyles";

ReactDOM.render(
  <>
    <GlobalStyles />
    <AuthProvider>
      <App />
    </AuthProvider>
  </>,
  document.getElementById("root")
);
