import React, { useState , useEffect } from 'react';
import Quotation from './QuotationPreview';
import QuotationForm from './components/QuotationForm';
import { QuotationData } from './types/quotation.types';
import styled from 'styled-components';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './layout/Home';
import { gapi } from 'gapi-script';
// import { appendSpreadsheet } from "./services/googleSheetsApi";
import {appendSpreadsheet} from "./services/googleSheetsApi";



const AppContainer = styled.div`
  padding: 20px; 
`;

const App: React.FC = () => {
  appendSpreadsheet()
  // useEffect(() => {
  //   const start = () => {
  //     gapi.load('client:auth2', initClient);
  //   };
  //   gapi.load('client:auth2', start);
  // }, []);

  const handleSaveData = () => {
    const data = ['Sample Data 1', 'Sample Data 2'];
    // saveDataToSheet(data);
  };
  const [quotationData, setQuotationData] = useState<QuotationData | null>(null);

  const handleQuotationSubmit = (data: QuotationData) => {
    console.log(data);  
    setQuotationData(data);
  };

  return (
    <AppContainer>
      {/* {!quotationData ? (
        <QuotationForm onSubmit={handleQuotationSubmit} />
      ) : (
        <Quotation data={quotationData} />
      )} */}

      {/* <PrintComponent/> */}

      {/* <button onClick={handleSaveData}>Save Data to Google Sheets</button> */}
    </AppContainer>
  );
};

export default App
