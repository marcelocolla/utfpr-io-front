import ReactDOM from "react-dom";

import App from "./App";

import { AuthProvider } from "./contexts/AuthContext";
import { SnackbarProvider } from "notistack";

import GlobalStyles from "./styles/GlobalStyles";

ReactDOM.render(
  <>
    <GlobalStyles />
    <AuthProvider>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <App />
      </SnackbarProvider>
    </AuthProvider>
  </>,
  document.getElementById("root")
);
