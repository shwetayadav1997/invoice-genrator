import styled from 'styled-components';

export const QuotationContainer = styled.div`
  width: 100%;
  max-width: 210mm;
  margin: 20px auto;
  padding: .25rem;
  border: 2px solid #000;
  font-family: Arial, sans-serif;
  font-size: 14px;
  background: white;
`;

export const Header = styled.div`
  font-family: "Times New Roman", Times, serif;
  font-size: 14px;
  
  line-height: 1.4;
  .header-right {
    text-align: right;
    
    .quotation-title {
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 5px;
    }
    
    .contact {
      font-size: 14px;
    }
  }
`;

export const Logo = styled.div`
  width: 50px;
  height: 50px;
  border: 2px solid #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
`;

export const CompanyTitle = styled.h1`
  color: #C62300;
  font-size: 24px;
  text-align: left;
  margin: 5px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const SubTitle = styled.div`
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 15px;
`;

export const CompanyDetails = styled.div`
  text-align: left;
  font-size: 12px;
  margin-bottom: 15px;
  line-height: 1.4;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;

  .detail-line {
    margin-bottom: 3px;
  }
`;

export const CustomerSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
  
  .customer-details {
    font-weight: bold;
    
    .title {
      margin-bottom: 5px;
    }
  }
  
  .reference {
    text-align: right;
    
    .title {
      margin-bottom: 5px;
    }
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  table-layout: fixed;
  
  th, td {
    border: 1px solid #000;
    padding: 6px;
    text-align: left;
    margin: 0;
    line-height: 1.4;
  }

  tr {
    margin: 0;
    padding: 0;
  }

  th {
    background-color: #f8f8f8;
    font-weight: bold;
  }

  td:first-child {
    width: 40px;
  }

  tr.total-row td {
    font-weight: bold;
  }

  tr.gstin td {
    
    font-weight: bold;
  }

  tr.tax-row td:last-child {
    width: 120px;
  }

  .section-title {
    font-weight: bold;
    background-color: #f8f8f8;
  }

  tbody tr:last-child td {
    border-bottom: 1px solid #000;
  }

  tbody {
    tr:first-child, tr:nth-child(2) {
      td {
        vertical-align: top;
      }
    }
  }
`;

export const TableContainer = styled.div`
  height: 842px; /* Approx. height for A2 paper in pixels */
  overflow-y: auto; /* Allows scrolling if content exceeds height */
  overflow-x: hidden; /* Prevents horizontal scrolling */
  
  .table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    
    th, td {
      border: 1px solid #000;
      padding: 6px;
      text-align: left;
      margin: 0;
      line-height: 1.4;
    }

    tr {
      margin: 0;
      padding: 0;
    }

    th {
      background-color: #f8f8f8;
      font-weight: bold;
    }

    td:first-child {
      width: 40px;
    }

    tr.total-row td {
      font-weight: bold;
    }

    tr.gstin td {
      color: #C62300;
      font-weight: bold;
    }

    tr.tax-row td:last-child {
      width: 120px;
    }

    .section-title {
      font-weight: bold;
      background-color: #f8f8f8;
    }

    tbody tr:last-child td {
      border-bottom: 1px solid #000;
    }

    tbody {
      tr:first-child, tr:nth-child(2) {
        td {
          vertical-align: top;
        }
      }
    }
  }
`;

export const BankDetailsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 12px;
  border: 1px solid #000;
  margin-top: 15px;

  .bank-info {
    padding: 8px;
    border-right: 1px solid #000;

    .title {
      font-weight: bold;
      margin-bottom: 8px;
      text-align: left;
      margin: 0;
    }

    .details-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .detail-row {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 5px;
      font-size: 11px;
    }
  }

  .amount-words {
    padding: 8px;
    display: flex;
    align-items: center;
  }
`;

export const Footer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid #000;
  border-top: none;
  font-size: 12px;
  
  .terms {
    padding: 5px;
    border-right: 1px solid #000;
  }
  
  .signature {
    padding: 5px;
    text-align: center;
    
    .company {
      color: #C62300;
      font-weight: bold;
      margin-bottom: 20px;
    }
    
    .title {
      font-weight: bold;
    }
  }
`;
