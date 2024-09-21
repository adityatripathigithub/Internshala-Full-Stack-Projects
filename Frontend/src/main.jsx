import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Indexxontext from "./Components/context/Indexxontext.jsx";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <Indexxontext>
    <BrowserRouter>
      <ToastContainer />
      <App />
    </BrowserRouter>
  </Indexxontext>
);
