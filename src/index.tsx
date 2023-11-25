import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { loginHelper } from "./helpers/auth.helper";

const dataUser = {
  username: "ARTEM_1",
  password: "ARTEM_1",
};
loginHelper(dataUser);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
