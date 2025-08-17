import React from "react";
// import { table } from "./styles/quotation.styles";
import logo from "./assets/logo_2.png";
import {
  Section,
  Customer,
  Company,
  BankDetails,
  Amounts,
} from "./types/quotation.types";

// interface ItemDetail {
//   description: string;
//   hsn_sac?: string;
//   qty: number;
//   rate: number;
//   amount: number;
// }

// interface Section {
//   title: string;
//   items: ItemDetail[];
//   hsn_sac?: string;
//   qty: number;
//   rate: number;
//   amount: number;
// }

// interface CompanyInfo {
//   name: string;
//   tagline: string;
//   office: string;
//   factory: string;
//   email: string;
//   mobile: string;
//   gstin: string;
// }

// interface CustomerInfo {
//   name: string;
//   street: string;
//   area: string;
//   city: string;
//   pincode: string;
//   refNo: string;
//   date: string;
//   partyGSTIN?: string;
//   state?: string;
//   stateCode?: string;
// }

// interface BankDetail {
//   bankName: string;
//   accountNo: string;
//   branch: string;
//   ifscCode: string;
// }

interface QuotationData {
  company: Company;
  customer: Customer;
  sections: Section[];
  bankDetails: BankDetails;
  amounts: Amounts;
  hsn_sac?: string; // Optional field for HSN/SAC code
}

const quotationData: QuotationData = {
  company: {
    name: "R.G. ENGINEERING WORKS",
    tagline: "ALL KINDS OF MACHINING & ENGINEERING WORKS",
    office:
      "Room No. 11, Chawl No. 2, Ramdas Chawl, Makwana Road, Marol Takpada, Near Sadguru Hotel, Andheri East, Mumbai Suburban, Maharashtra, 400059",
    factory:
      "Gala No.2, Adarsh Nagar, Opp. Borosil Glass, Military Road, Marol, Andheri East, Mumbai -400059",
    email: "r.g.enggwork@gmail.com",
    mobile: "9821808167 / 9702843446",
    gstin: "27AFAPY8249L1ZN",
  },
  customer: {
    name: "",
    street: "",
    area: "",
    city: "",
    pincode: "",
    refNo: "",
    date: "",
  },
  sections: [],
  bankDetails: {
    bankName: "City Union Bank",
    accountNo: "269109000178777",
    branch: "Andheri East",
    ifscCode: "CIUB0000269",
  },
  amounts: {
    total: 0,
    sgst: 0,
    cgst: 0,
    igst: 0,
    grandTotal: 0,
  },
};

interface QuotationPreviewProps {
  data: QuotationData;
}

const QuotationPreview: React.FC<QuotationPreviewProps> = ({ data }) => {
  quotationData.customer = data?.customer;
  quotationData.sections = data?.sections;
  quotationData.amounts = data?.amounts;
  const formatCurrency = (amount: number) => {
    if (isNaN(amount)) {
      return "";
    }
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    })
      .format(amount)
      .replace("₹", "₹ ");
  };

  const numberToWords = (num: number) => {
    const units = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    const convertLessThanThousand = (n: number): string => {
      if (n === 0) return "";
      if (n < 10) return units[n];
      if (n < 20) return teens[n - 10];
      if (n < 100)
        return tens[Math.floor(n / 10)] + (n % 10 ? " " + units[n % 10] : "");
      return (
        units[Math.floor(n / 100)] +
        " Hundred" +
        (n % 100 ? " and " + convertLessThanThousand(n % 100) : "")
      );
    };

    if (num === 0) return "Zero";

    const crore = Math.floor(num / 10000000);
    const lakh = Math.floor((num % 10000000) / 100000);
    const thousand = Math.floor((num % 100000) / 1000);
    const hundred = Math.floor((num % 1000) / 100);
    const remainder = num % 100;
    const paisa = Math.round((num % 1) * 100);

    let words = "";
    if (crore) words += convertLessThanThousand(crore) + " Crore ";
    if (lakh) words += convertLessThanThousand(lakh) + " Lakh ";
    if (thousand) words += convertLessThanThousand(thousand) + " Thousand ";
    if (hundred) words += units[hundred] + " Hundred ";
    if (remainder) {
      if (words !== "") words += "and ";
      if (remainder < 10) words += units[remainder];
      else if (remainder < 20) words += teens[remainder - 10];
      else
        words +=
          tens[Math.floor(remainder / 10)] +
          (remainder % 10 ? " " + units[remainder % 10] : "");
    }
    words = words.trim();
    if (paisa) {
      words += " and " + convertLessThanThousand(paisa) + " Paisa";
    }
    return words + " Only";
  };

  return (
    <>
      <div className="">
        <div
          style={{
            width: "100%",
            maxWidth: "185mm",
            margin: "10px auto",
            padding: ".25rem",
            border: "2px solid #000",
            fontFamily: "Arial, sans-serif",
            fontSize: "14px",
            background: "white",
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            QUOTATION
          </div>

          <div
            style={{
              fontFamily: "Times New Roman, Times, serif",
              fontSize: "14px",
              lineHeight: "1.4",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "82%",
                margin: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "16px",
                  width: "100%",
                  margin: "auto",
                  justifyContent: "center",
                }}
              >
                <img
                  src={logo}
                  alt="Company Logo"
                  style={{ height: "80px", marginRight: "10px", width: "82px" }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#C62300",
                      flexGrow: 1,
                    }}
                  >
                    R.G. ENGINEERING WORKS
                  </div>
                  <div style={{ fontWeight: "bold", fontSize: "12px" }}>
                    ALL KINDS OF MACHINING & ENGINEERING WORKS
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                paddingBottom: "1rem",
                width: "95%",
                margin: "auto",
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: "14px" }}>
                <span style={{ fontWeight: "bold" }}>Office: </span>Room No. 11,
                Chawl No. 2, Ramdas Chawl, Makwana Road, Marol Takpada, Near
                Sadguru Hotel
              </span>
              <span style={{}}>
                {" "}
                Andheri East, Mumbai Suburban, Maharashtra, 400059.
              </span>
              <br></br>
              <span style={{ fontSize: "14px" }}>
                <span style={{ fontWeight: "bold" }}>Factory: </span>
                Gala No.2, Adarsh Nagar, Opp. Borosil Glass, Military Road,
                Marol, Andheri East, Mumbai -400059.
              </span>
              <br></br>
              <span style={{ fontSize: "14px" }}>
                <span style={{ fontWeight: "bold" }}>E-mail: </span>
                r.g.enggwork@gmail.com{" "}
                <span style={{ fontWeight: "bold", paddingLeft: "20px" }}>
                  Mobile:{" "}
                </span>
                9821808167 / 9702843446
              </span>
            </div>
          </div>

          <table
            style={{
              borderBottom: "none",
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "13px",
              tableLayout: "fixed",
            }}
          >
            <tbody>
              <tr style={{ margin: 0, padding: 0 }}>
                <td
                  colSpan={2}
                  style={{
                    border: "1px solid #000",
                    textAlign: "left",
                    margin: 0,
                    lineHeight: 1.4,
                    borderRight: "1px solid #000",
                    padding: "10px",
                    width: "50%",
                    verticalAlign: "top",
                  }}
                >
                  <div>
                    To,
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {" M/s. "}
                      {quotationData.customer.name}
                    </span>
                  </div>
                  <div
                    style={{
                      overflowWrap: "break-word",
                      wordBreak: "break-all",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {quotationData.customer.street},
                    {quotationData.customer.area},
                    <br />
                    {quotationData.customer.city} -{" "}
                    {quotationData.customer.pincode}
                  </div>
                </td>
                <td
                  colSpan={4}
                  style={{
                    border: "1px solid #000",
                    textAlign: "left",
                    margin: 0,
                    lineHeight: 1.4,
                    borderLeft: "none",
                    padding: "10px",
                    width: "46%",
                    verticalAlign: "top",
                  }}
                >
                  <div style={{ marginBottom: "8px" }}>
                    Ref No. {quotationData.customer.refNo || ".........."}
                  </div>
                  <div>{quotationData.customer.date}</div>
                </td>
              </tr>
              <tr style={{ margin: 0, padding: 0 }}>
                <td
                  colSpan={2}
                  style={{
                    border: "1px solid #000",
                    textAlign: "left",
                    margin: 0,
                    lineHeight: 1.4,
                    padding: "10px",
                    borderBottom: "none",
                    verticalAlign: "top",
                  }}
                >
                  <div>Party GSTIN: {quotationData.customer.partyGSTIN}</div>
                </td>
                <td
                  colSpan={2}
                  style={{
                    border: "1px solid #000",
                    textAlign: "left",
                    margin: 0,
                    lineHeight: 1.4,
                    padding: "10px",
                    borderRight: "none",
                    borderBottom: "none",
                    verticalAlign: "top",
                  }}
                >
                  <div>State: {quotationData.customer.state}</div>
                </td>
                <td
                  colSpan={2}
                  style={{
                    border: "1px solid #000",
                    textAlign: "left",
                    margin: 0,
                    lineHeight: 1.4,
                    padding: "10px",
                    borderLeft: "none",
                    borderBottom: "none",
                    verticalAlign: "top",
                  }}
                >
                  <div>State Code: {quotationData.customer.stateCode}</div>
                </td>
              </tr>
            </tbody>
          </table>

          <table
            style={{
              borderTop: "none",
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "13px",
              tableLayout: "fixed",
            }}
          >
            <tbody>
              <tr style={{ margin: 0, padding: 0 }}>
                <td
                  style={{
                    backgroundColor: "#f8f8f8",
                    fontWeight: "bold",
                    border: "1px solid #000",
                    padding: "6px",
                    textAlign: "left",
                    margin: 0,
                    lineHeight: 1.4,
                    width: "7%",
                  }}
                  colSpan={1}
                >
                  Sr.No.
                </td>
                <td
                  style={{
                    backgroundColor: "#f8f8f8",
                    fontWeight: "bold",
                    border: "1px solid #000",
                    padding: "6px",
                    textAlign: "left",
                    margin: 0,
                    lineHeight: 1.4,
                    width: "47%",
                  }}
                  colSpan={1}
                >
                  PARTICULARS
                </td>
                <td
                  style={{
                    backgroundColor: "#f8f8f8",
                    fontWeight: "bold",
                    border: "1px solid #000",
                    padding: "6px",
                    textAlign: "left",
                    margin: 0,
                    lineHeight: 1.4,
                    width: "11%",
                  }}
                  colSpan={1}
                >
                  HSN SAC
                </td>
                <td
                  style={{
                    backgroundColor: "#f8f8f8",
                    fontWeight: "bold",
                    border: "1px solid #000",
                    padding: "6px",
                    textAlign: "left",
                    margin: 0,
                    lineHeight: 1.4,
                    width: "7%",
                  }}
                  colSpan={1}
                >
                  QTY.
                </td>
                <td
                  style={{
                    backgroundColor: "#f8f8f8",
                    fontWeight: "bold",
                    border: "1px solid #000",
                    padding: "6px",
                    textAlign: "left",
                    margin: 0,
                    lineHeight: 1.4,
                    width: "13%",
                  }}
                  colSpan={1}
                >
                  RATE
                </td>
                <td
                  colSpan={1}
                  style={{
                    backgroundColor: "#f8f8f8",
                    fontWeight: "bold",
                    border: "1px solid #000",
                    padding: "6px",
                    textAlign: "left",
                    margin: 0,
                    lineHeight: 1.4,
                    width: "15%",
                  }}
                >
                  AMOUNT RS.
                </td>
              </tr>
              {quotationData.sections.map((section, sectionIndex) => (
                <React.Fragment key={sectionIndex}>
                  {section.title.length > 0 && (
                    <tr
                      className="section-title"
                      style={{
                        backgroundColor: "#f8f8f8",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      <td
                        style={{
                          width: "40px",
                          border: "1px solid #000",
                          padding: "6px",
                          textAlign: "left",
                          margin: 0,
                          lineHeight: 1.4,
                        }}
                      >
                        {sectionIndex + 1}.
                      </td>
                      <td
                        style={{
                          wordWrap: "break-word",
                          fontWeight: "bold",
                          border: "1px solid #000",
                          padding: "6px",
                          textAlign: "left",
                          margin: 0,
                          lineHeight: 1.4,
                        }}
                      >
                        {section.title}
                      </td>
                      <td
                        style={{
                          border: "1px solid #000",
                          padding: "6px",
                          textAlign: "left",
                          margin: 0,
                          lineHeight: 1.4,
                        }}
                      >
                        {section.hsn_sac || ""}
                      </td>
                      <td
                        style={{
                          border: "1px solid #000",
                          padding: "6px",
                          textAlign: "left",
                          margin: 0,
                          lineHeight: 1.4,
                        }}
                      >
                        {section.qty === 0 ? "" : section.qty}
                      </td>
                      <td
                        style={{
                          border: "1px solid #000",
                          padding: "6px",
                          textAlign: "left",
                          margin: 0,
                          lineHeight: 1.4,
                        }}
                      >
                        {section.rate === 0 ? "" : formatCurrency(section.rate)}
                      </td>
                      <td
                        style={{
                          border: "1px solid #000",
                          padding: "6px",
                          textAlign: "left",
                          margin: 0,
                          lineHeight: 1.4,
                        }}
                      >
                        {section.amount === 0
                          ? ""
                          : formatCurrency(section.amount)}
                      </td>
                    </tr>
                  )}
                  {(() => {
                    const allItemsZero = section.items.every(
                      (i) => i.qty === 0 && i.rate === 0
                    );
                    return section.items.map(
                      (item, itemIndex) =>
                        item.description.length > 0 && (
                          <tr
                            key={`${sectionIndex}-${itemIndex}`}
                            style={{ margin: 0, padding: 0 }}
                          >
                            <td
                              style={{
                                borderLeft: "1px solid #000",
                                borderRight: "1px solid #000",
                                borderTop: allItemsZero
                                  ? "none"
                                  : "1px solid #000",
                                borderBottom: allItemsZero
                                  ? "none"
                                  : "1px solid #000",
                                padding: "6px",
                                textAlign: "left",
                                margin: 0,
                                lineHeight: 1.4,
                              }}
                            ></td>
                            <td
                              style={{
                                wordWrap: "break-word",
                                borderLeft: "1px solid #000",
                                borderRight: "1px solid #000",
                                borderTop: allItemsZero
                                  ? "none"
                                  : "1px solid #000",
                                borderBottom: allItemsZero
                                  ? "none"
                                  : "1px solid #000",
                                padding: "6px",
                                textAlign: "left",
                                margin: 0,
                                lineHeight: 1.4,
                              }}
                            >
                              {String.fromCharCode(65 + itemIndex)}){" "}
                              {item.description}
                            </td>
                            <td
                              style={{
                                borderLeft: "1px solid #000",
                                borderRight: "1px solid #000",
                                borderTop: allItemsZero
                                  ? "none"
                                  : "1px solid #000",
                                borderBottom: allItemsZero
                                  ? "none"
                                  : "1px solid #000",
                                padding: "6px",
                                textAlign: "left",
                                margin: 0,
                                lineHeight: 1.4,
                              }}
                            >
                              {item.hsn_sac || ""}
                            </td>
                            <td
                              style={{
                                borderLeft: "1px solid #000",
                                borderRight: "1px solid #000",
                                borderTop: allItemsZero
                                  ? "none"
                                  : "1px solid #000",
                                borderBottom: allItemsZero
                                  ? "none"
                                  : "1px solid #000",
                                padding: "6px",
                                textAlign: "left",
                                margin: 0,
                                lineHeight: 1.4,
                              }}
                            >
                              {item.qty === 0 ? "" : item.qty}
                            </td>
                            <td
                              style={{
                                borderLeft: "1px solid #000",
                                borderRight: "1px solid #000",
                                borderTop: allItemsZero
                                  ? "none"
                                  : "1px solid #000",
                                borderBottom: allItemsZero
                                  ? "none"
                                  : "1px solid #000",
                                padding: "6px",
                                textAlign: "left",
                                margin: 0,
                                lineHeight: 1.4,
                              }}
                            >
                              {item.rate === 0 ? "" : formatCurrency(item.rate)}
                            </td>
                            <td
                              style={{
                                borderLeft: "1px solid #000",
                                borderRight: "1px solid #000",
                                borderTop: allItemsZero
                                  ? "none"
                                  : "1px solid #000",
                                borderBottom: allItemsZero
                                  ? "none"
                                  : "1px solid #000",
                                padding: "6px",
                                textAlign: "left",
                                margin: 0,
                                lineHeight: 1.4,
                              }}
                            >
                              {item.amount === 0
                                ? ""
                                : formatCurrency(item.amount)}
                            </td>
                          </tr>
                        )
                    );
                  })()}
                </React.Fragment>
              ))}
              <tr style={{ borderBottom: "1px solid #000" }}>
                <td
                  colSpan={2}
                  style={{
                    fontWeight: "bold",
                    border: "1px solid #000",
                    padding: "6px",
                    textAlign: "left",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  GSTIN: {quotationData.company.gstin}
                </td>
                <td
                  colSpan={3}
                  style={{
                    border: "1px solid #000",
                    padding: "6px",
                    textAlign: "left",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  TOTAL
                </td>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "6px",
                    textAlign: "left",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  {quotationData.amounts.total === 0
                    ? ""
                    : formatCurrency(quotationData.amounts.total)}
                </td>
              </tr>
              <tr style={{ margin: 0, padding: 0 }}>
                <td
                  colSpan={2}
                  rowSpan={3}
                  style={{
                    verticalAlign: "top",
                    padding: "6px",
                    border: "1px solid #000",
                    textAlign: "left",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                    Bank Details:
                  </div>
                  <div style={{ lineHeight: "1.4" }}>
                    <div>Bank Name: {quotationData.bankDetails.bankName}</div>
                    <div>A/c No.: {quotationData.bankDetails.accountNo}</div>
                    <div>Branch: {quotationData.bankDetails.branch}</div>
                    <div>IFSC Code: {quotationData.bankDetails.ifscCode}</div>
                  </div>
                </td>
                <td
                  colSpan={3}
                  style={{
                    verticalAlign: "top",
                    padding: "6px",
                    border: "1px solid #000",
                    textAlign: "left",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  SGST @ 9 %
                </td>
                <td
                  style={{
                    border: "1px solid #000",

                    margin: 0,
                    lineHeight: 1.4,
                    textAlign: "left",
                    padding: "6px",
                  }}
                >
                  {formatCurrency(quotationData.amounts.sgst)}
                </td>
              </tr>
              <tr style={{ margin: 0, padding: 0 }}>
                <td
                  colSpan={3}
                  style={{
                    padding: "6px",
                    border: "1px solid #000",
                    textAlign: "left",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  CGST @ 9 %
                </td>
                <td
                  style={{
                    textAlign: "left",
                    padding: "6px",
                    border: "1px solid #000",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  {formatCurrency(quotationData.amounts.cgst)}
                </td>
              </tr>
              <tr style={{ margin: 0, padding: 0 }}>
                <td
                  colSpan={3}
                  style={{
                    verticalAlign: "top",
                    padding: "6px",
                    border: "1px solid #000",
                    textAlign: "left",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  IGST @ %
                </td>
                <td
                  style={{
                    border: "1px solid #000",

                    margin: 0,
                    lineHeight: 1.4,
                    textAlign: "left",
                  }}
                >
                  {quotationData.amounts.igst
                    ? formatCurrency(quotationData.amounts.igst)
                    : ""}
                </td>
              </tr>
              <tr className="total-row" style={{ margin: 0, padding: 0 }}>
                <td
                  colSpan={2}
                  style={{
                    fontSize: "11px",
                    lineHeight: "1.3",
                    textAlign: "left",
                    borderTop: "1px solid #000",
                    verticalAlign: "middle",
                    fontWeight: "bold",
                    padding: "6px",
                    border: "1px solid #000",
                    margin: 0,
                  }}
                >
                  {numberToWords(quotationData.amounts.grandTotal)}
                </td>
                <td
                  colSpan={3}
                  style={{
                    color: "#C62300",
                    fontWeight: "bold",
                    borderTop: "1px solid #000",
                    verticalAlign: "middle",
                    padding: "6px",
                    border: "1px solid #000",
                    margin: 0,
                  }}
                >
                  GRAND TOTAL
                </td>
                <td
                  style={{
                    textAlign: "left",
                    color: "#C62300",
                    fontWeight: "bold",
                    border: "1px solid #000",
                    padding: "6px",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  {formatCurrency(quotationData.amounts.grandTotal)}
                </td>
              </tr>

              <tr style={{ margin: 0, padding: 0 }}>
                <td
                  colSpan={2}
                  style={{
                    border: "1px solid #000",
                    textAlign: "center",
                    borderRight: "none",
                    padding: "6px",
                    margin: 0,
                    lineHeight: 1.4,
                    borderBottom: "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>
                      Subject to Mumbai Jurisdiction.
                    </div>
                    <div>E. & O.E.</div>
                  </div>
                </td>
                <td
                  colSpan={5}
                  style={{
                    border: "1px solid #000",
                    padding: "6px",
                    margin: 0,
                    lineHeight: 1.4,
                    textAlign: "right",
                    borderBottom: "none",
                    borderLeft: "none",
                    color: "#C62300",
                  }}
                >
                  <div className="signature">
                    For {quotationData.company.name}
                  </div>
                </td>
              </tr>
              <tr style={{ margin: 0, padding: 0 }}>
                <td
                  colSpan={2}
                  style={{
                    border: "1px solid #000",
                    padding: "6px",
                    margin: 0,
                    lineHeight: 1.4,
                    textAlign: "left",
                    borderTop: "none",
                    borderRight: "none",
                  }}
                >
                  <div style={{ width: "75%" }}>
                    We declare that this invoice shows the actual Price of the
                    goods described and that all Particulars are true and
                    correct.
                  </div>
                </td>
                <td
                  colSpan={5}
                  style={{
                    border: "1px solid #000",
                    padding: "6px",
                    margin: 0,
                    lineHeight: 1.4,
                    textAlign: "right",
                    borderTop: "none",
                    borderLeft: "none",
                  }}
                >
                  <div style={{ height: "40px" }}></div>
                  <div className="signature">Proprietor</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default QuotationPreview;
