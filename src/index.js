import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from "notistack";


const snackbarConfig = {
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
  maxSnack: 1, 
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider {...snackbarConfig} >
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
