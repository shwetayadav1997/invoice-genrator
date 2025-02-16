import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo_2.png'; // Adjust the path to your logo
import invoiceIcon from '../assets/invoice.svg'; // Adjust the path to your invoice icon
import folderIcon from '../assets/folder.svg'; // Adjust the path to your folder icon
import { ButtonWithIcon, Overlay } from '../styles/quotationForm.styles';
import { QuotationData } from '../types/quotation.types';
import QuotationForm from '../components/QuotationForm';
import img1 from '../assets/img1.jpg';
import Quotation from '../QuotationPreview';
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  background-color: #d8b4fe;
  padding: 10px;
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 10px;
`;
const Home: React.FC = () => {
    const navigate = useNavigate();
    const [quotationData, setQuotationData] = useState<QuotationData | null>(null);
    const [formType, setFormType] = useState('');

    const handleQuotationSubmit = (data: QuotationData) => {
        console.log(data);
        setQuotationData(data);
        setFormType('');
    };
    return (
       <>
       <div style={{ backgroundImage: `url(${img1})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', padding: '20px', width: '100%', height: '100vh' }}>
            <HeaderContainer >
                <Logo src={logo} alt="Logo" />
                <span style={{ fontSize: '24px', fontWeight: 'bold' }}>R.G. Engineering</span>
            </HeaderContainer>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
                <ButtonWithIcon onClick={() => navigate('/quotation')}>
                    <img src={invoiceIcon} alt="Create Quotation" />
                    <span>Create Quotation</span>
                </ButtonWithIcon>
                <ButtonWithIcon onClick={() => navigate('/quotation')}>
                    <img src={folderIcon} alt="Create Invoice" />
                    <span>Create Invoice</span>
                </ButtonWithIcon>
            </div>


            {/* { 
                quotationData && (
                        <Quotation data={quotationData} />
                )
            } */}

        </div>
</>
        
    );
};

export default Home;