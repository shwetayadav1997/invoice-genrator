import { StrictMode, } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './layout/Home.tsx';
import QuotationForm from './components/QuotationForm.tsx';
import QuotationPreview from './QuotationPreview.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quotation" element={<QuotationForm />} />
        <Route path="/preview" element={<QuotationPreview />} />
      </Routes>
      <App />
    </BrowserRouter>
  </StrictMode>,

)
