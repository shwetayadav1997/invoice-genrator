import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./layout/Home.tsx";
import InvoiceForm from "./components/InvoiceForm.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quotation" element={<InvoiceForm />} />
      </Routes>
      <App />
    </BrowserRouter>
  </StrictMode>
);
