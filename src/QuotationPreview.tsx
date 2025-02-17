import React from 'react';
import {
    QuotationContainer,
    Header,
    Table
} from './styles/quotation.styles';
import logo from './assets/logo_2.png';
import { useLocation } from 'react-router-dom';

interface ItemDetail {
    description: string;
    hsn_sac?: string;
    qty: number;
    rate: number;
    amount: number;
}

interface Section {
    title: string;
    items: ItemDetail[];
    hsn_sac?: string;
    qty: number;
    rate: number;
    amount: number;

}

interface CompanyInfo {
    name: string;
    tagline: string;
    office: string;
    factory: string;
    email: string;
    mobile: string;
    gstin: string;
}

interface CustomerInfo {
    name: string;
    location: string;
    refNo: string;
    date: string;
    partyGSTIN?: string;
    state?: string;
    stateCode?: string;
}

interface BankDetail {
    bankName: string;
    accountNo: string;
    branch: string;
    ifscCode: string;
}

interface QuotationData {
    company: CompanyInfo;
    customer: CustomerInfo;
    sections: Section[];
    bankDetails: BankDetail;
    amounts: {
        total: number;
        sgst: number;
        cgst: number;
        igst: number;
        grandTotal: number;
    };
}

const quotationData: QuotationData = {
    company: {
        name: "R.G. ENGINEERING WORKS",
        tagline: "ALL KINDS OF MACHINING & ENGINEERING WORKS",
        office: "Room No. 11, Chawl No. 2, Ramdas Chawl, Makwana Road, Marol Takpada, Near Sadguru Hotel, Andheri East, Mumbai Suburban, Maharashtra, 400059",
        factory: "Gala No.2, Adarsh Nagar, Opp. Borosil Glass, Military Road, Marol, Andheri East, Mumbai -400059",
        email: "r.g.enggwork@gmail.com",
        mobile: "9821808167 / 9702843446",
        gstin: "27AFAPY8249L1ZN"
    },
    customer: {
        name: "SAI SHRADDHA PACKAGING",
        location: "Palghar",
        refNo: "",
        date: "26/10/2024"
    },
    sections: [
        {
            title: "ROTO 4 Color (2+2)",
            items: [
                {
                    description: "Rubber Roll Block Repairing with Shaft Collar",
                    qty: 4,
                    rate: 975,
                    amount: 3900
                },
                {
                    description: "Registration Screw Repairing with Square Bolt & Thrust Bearing",
                    qty: 3,
                    rate: 1400,
                    amount: 4200
                },
                {
                    description: "Z Bracket with Bearing Holder and Screw Knob",
                    qty: 4,
                    rate: 3100,
                    amount: 12400
                },
                {
                    description: "Weight Roll Collar",
                    qty: 4,
                    rate: 150,
                    amount: 600
                }
            ],
            hsn_sac: '',
            qty: 0,
            rate: 0,
            amount: 0

        },

    ],
    bankDetails: {
        bankName: "City Union Bank",
        accountNo: "269109000178777",
        branch: "Andheri East",
        ifscCode: "CIUB0000269"
    },
    amounts: {
        total: 50375,
        sgst: 4533.75,
        cgst: 4533.75,
        igst: 0,
        grandTotal: 59442.50
    }
};

const QuotationPreview: React.FC = () => {

    const location = useLocation();
    const data = location.state || {}; // Extract the state


    quotationData.customer = data?.customer;
    quotationData.sections = data?.sections;
    quotationData.amounts = data?.amounts;
    const formatCurrency = (amount: number) => {
        if (isNaN(amount)) {
            return '';
        }
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
        }).format(amount).replace('₹', '₹ ');
    };

    const numberToWords = (num: number) => {
        const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
        const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

        const convertLessThanThousand = (n: number): string => {
            if (n === 0) return '';

            if (n < 10) return units[n];
            if (n < 20) return teens[n - 10];
            if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + units[n % 10] : '');
            return units[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' and ' + convertLessThanThousand(n % 100) : '');
        };

        if (num === 0) return 'Zero';

        const billions = Math.floor(num / 1000000000);
        const millions = Math.floor((num % 1000000000) / 1000000);
        const thousands = Math.floor((num % 1000000) / 1000);
        const remainder = num % 1000;
        const paisa = Math.round(((num % 1) * 100));

        let words = '';

        if (billions) words += convertLessThanThousand(billions) + ' Billion ';
        if (millions) words += convertLessThanThousand(millions) + ' Million ';
        if (thousands) words += convertLessThanThousand(thousands) + ' Thousand ';
        if (remainder) words += convertLessThanThousand(remainder);

        words = words.trim();

        if (paisa) {
            words += ' and ' + convertLessThanThousand(paisa) + ' Paisa';
        }

        return words + ' Only';
    };

    const handleDownload = () => {

        window.print();
    };


    return (
        <>
            <button onClick={handleDownload} style={{ margin: '10px', background: '#0066cc', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>Download</button>
            <div className="printable-area">
                <QuotationContainer>
                    <div style={{
                        textAlign: 'center',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#333',
                    }}>
                        QUOTATION
                    </div>

                    <Header>
                        <div style={{
                            display: 'flex', alignItems: 'center', width: '82%', margin: 'auto',
                        }}>

                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', width: '100%', margin: 'auto', justifyContent: 'center' }}>
                                <img src={logo} alt="Company Logo" style={{ height: '80px', marginRight: '10px', width: '82px' }} />
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#C62300', flexGrow: 1, }}>R.G. ENGINEERING WORKS</div>
                                    <div style={{ fontWeight: 'bold', fontSize: '12px' }}>ALL KINDS OF MACHINING & ENGINEERING WORKS</div>
                                </div>
                            </div>
                        </div >
                        <div style={{ paddingBottom: '1rem', width: '95%', margin: 'auto', textAlign: 'center' }}>
                            <span style={{ fontSize: '14px' }}><span style={{ fontWeight: 'bold' }}>Office: </span>Room No. 11, Chawl No. 2, Ramdas Chawl, Makwana Road, Marol Takpada, Near Sadguru Hotel</span>
                            <span style={{}}> Andheri East, Mumbai Suburban, Maharashtra, 400059.</span><br></br>
                            <span style={{ fontSize: '14px' }}><span style={{ fontWeight: 'bold' }}>Factory: </span>
                                Gala No.2, Adarsh Nagar, Opp. Borosil Glass, Military Road, Marol, Andheri East, Mumbai -400059.
                            </span><br></br>
                            <span style={{ fontSize: '14px' }}><span style={{ fontWeight: 'bold' }}>E-mail: </span>r.g.enggwork@gmail.com <span style={{ fontWeight: 'bold', paddingLeft: '20px' }}>Mobile: </span>9821808167 / 9702843446</span>
                        </div>
                    </Header>


                    <Table style={{ borderBottom: 'none' }}>
                        <tbody>
                            <tr>
                                <td colSpan={2} style={{ borderRight: '1px solid #000', padding: '10px', width: '54%' }}>
                                    <div>To,<span style={{ fontWeight: 'bold', fontSize: '14px' }}> M/s. {quotationData.customer.name},</span></div>
                                    <div style={{ overflowWrap: 'break-word', wordBreak: 'break-all', maxWidth: '100%', whiteSpace: 'normal' }}>
                                        {quotationData.customer.location}
                                    </div>
                                </td>
                                <td colSpan={4} style={{ borderLeft: 'none', padding: '10px', width: '46%' }}>
                                    <div style={{ marginBottom: '8px' }}>Ref No. {quotationData.customer.refNo || ".........."}</div>
                                    <div>Date: {quotationData.customer.date}</div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} style={{ padding: '10px', width: '100%', borderBottom: 'none' }}>
                                    <div>
                                        Party GSTIN: {quotationData.customer.partyGSTIN}
                                    </div>
                                </td>
                                <td colSpan={2} style={{ padding: '10px', borderRight: 'none', borderBottom: 'none' }}>
                                    <div>State: {quotationData.customer.state}</div>
                                </td>
                                <td colSpan={2} style={{ padding: '10px', borderLeft: 'none', borderBottom: 'none' }}>
                                    <div>State Code: {quotationData.customer.stateCode}</div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table style={{ borderTop: 'none' }}>
                        <tbody>

                            <tr>
                                <td colSpan={1} style={{ width: '7%' }}>Sr.No.</td>
                                <td colSpan={1} style={{ width: '47%' }}>PARTICULARS</td>
                                <td colSpan={1} style={{ width: '11%' }}>HSN SAC</td>
                                <td colSpan={1} style={{ width: '7%' }}>QTY.</td>
                                <td colSpan={1} style={{ width: '13%' }}>RATE</td>
                                <td colSpan={1} style={{ width: '15%' }}>AMOUNT RS.</td>

                            </tr>
                            {quotationData.sections.map((section, sectionIndex) => (
                                <React.Fragment key={sectionIndex}>
                                    {section.title.length > 0 && <tr className="section-title">
                                        <td style={{ width: '40px' }}>{sectionIndex + 1}.</td>
                                        <td style={{ wordWrap: 'break-word' }}>{section.title}</td>
                                        <td>{section.hsn_sac || ""}</td>
                                        <td>{section.qty || ""}</td>
                                        <td>{formatCurrency(section.rate) || ""}</td>
                                        <td>{formatCurrency(section.amount) || ""}</td>
                                    </tr>}
                                    {section.items.map((item, itemIndex) => (
                                        // { 
                                        item.description.length > 0 && <tr key={`${sectionIndex}-${itemIndex}`} className="{section.title.length === 0 ? 'section-title':  }">
                                            <td ></td>
                                            <td style={{ wordWrap: 'break-word' }}>{String.fromCharCode(65 + itemIndex)}) {item.description}</td>
                                            <td>{item.hsn_sac || ""}</td>
                                            <td>{item.qty}</td>
                                            <td>{formatCurrency(item.rate)}</td>
                                            <td>{formatCurrency(item.amount)}</td>
                                        </tr>
                                        // }
                                    ))}

                                </React.Fragment>
                            ))}
                            <tr className="gstin">
                                <td colSpan={2}>GSTIN: {quotationData.company.gstin}</td>
                                <td colSpan={3}>TOTAL</td>
                                <td>{formatCurrency(quotationData.amounts.total)}</td>
                            </tr>
                            <tr>
                                <td colSpan={2} rowSpan={3} style={{
                                    verticalAlign: 'top',
                                    padding: '6px',
                                }}>
                                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Bank Details:</div>
                                    <div style={{ lineHeight: '1.4' }}>
                                        <div>Bank Name: {quotationData.bankDetails.bankName}</div>
                                        <div>A/c No.: {quotationData.bankDetails.accountNo}</div>
                                        <div>Branch: {quotationData.bankDetails.branch}</div>
                                        <div>IFSC Code: {quotationData.bankDetails.ifscCode}</div>
                                    </div>
                                </td>
                                <td colSpan={3}>SGST @ 9 %</td>
                                <td style={{ textAlign: 'left' }}>{formatCurrency(quotationData.amounts.sgst)}</td>
                            </tr>
                            <tr>
                                <td colSpan={3}>CGST @ 9 %</td>
                                <td style={{ textAlign: 'left' }}>{formatCurrency(quotationData.amounts.cgst)}</td>
                            </tr>
                            <tr>
                                <td colSpan={3}>IGST @ %</td>
                                <td style={{ textAlign: 'left' }}>{quotationData.amounts.igst ? formatCurrency(quotationData.amounts.igst) : ""}</td>
                            </tr>
                            <tr className="total-row">
                                <td colSpan={2} style={{
                                    fontSize: '11px',
                                    lineHeight: '1.3',
                                    textAlign: 'left',
                                    borderTop: '1px solid #000',
                                    verticalAlign: 'middle'
                                }}>
                                    {numberToWords(quotationData.amounts.grandTotal)}
                                </td>
                                <td colSpan={3} style={{ color: '#C62300' }}>GRAND TOTAL</td>
                                <td style={{ textAlign: 'left', color: '#C62300' }}>{formatCurrency(quotationData.amounts.grandTotal)}</td>
                            </tr>

                            <tr>
                                <td colSpan={2} style={{ textAlign: 'center', borderBottom: 'none', borderRight: 'none' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                        <div style={{ fontWeight: 'bold' }}>Subject to Mumbai Jurisdiction.</div>
                                        <div>E. & O.E.</div>
                                    </div>
                                </td>
                                <td colSpan={5} style={{ textAlign: 'right', borderBottom: 'none', borderLeft: 'none', color: '#C62300' }}>
                                    <div className="signature">
                                        For {quotationData.company.name}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} style={{ textAlign: 'left', borderTop: 'none', borderRight: 'none' }}>
                                    <div style={{ width: '75%' }}>We declare that this invoice shows the actual Price of the goods described and that all Particulars are true and correct.</div>
                                </td>
                                <td colSpan={5} style={{ textAlign: 'right', borderTop: 'none', borderLeft: 'none' }}>
                                    <div style={{ height: '40px' }}></div>
                                    <div className="signature">
                                        Proprietor
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>


                </QuotationContainer>
            </div>
        </>

    );
};

export default QuotationPreview;