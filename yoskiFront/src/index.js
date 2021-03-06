import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// estilos toastify
import "react-toastify/dist/ReactToastify.css";
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// sass
import "./index.scss";
// estilos datepicker
import "react-datepicker/dist/react-datepicker.css";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
