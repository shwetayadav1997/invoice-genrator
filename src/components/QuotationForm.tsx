import React, { useState } from 'react';
import {
  FormContainer,
  FormSection,
  FormRow,
  FormGroup,
  Button,
  ButtonGroup,
  SectionButtons,
  Card,
  Spinner,
  SpinnerContainer
} from '../styles/quotationForm.styles';
import { QuotationData } from '../types/quotation.types';
import { useNavigate } from 'react-router-dom';
import { addRow } from '../services/googleSheet.service';
const defaultItem = {
  description: '',
  hsn_sac: '',
  qty: 0,
  rate: 0,
  amount: 0,
};

const defaultSection = {
  title: '',
  items: [{ ...defaultItem }],
};

const emptyQuotationData: QuotationData = {
  customer: {
    name: '',
    location: '',
    refNo: '',
    date: new Date().toISOString().split('T')[0],
    partyGSTIN: '',
    state: '',
    stateCode: '',
  },
  sections: [{ ...defaultSection }],
  amounts: {
    total: 0,
    sgst: 0,
    cgst: 0,
    igst: 0,
    grandTotal: 0,
  },
};

const QuotationForm: React.FC = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [calculationStatus, setCalculationStatus] = useState(false);

  const [formData, setFormData] = useState<QuotationData>(emptyQuotationData);
  const [loader, setLoading] = useState(false);
  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      customer: {
        ...prev.customer,
        [name]: value,
      },
    }));
  };

  const handleSectionChange = (sectionIndex: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, index) =>
        index === sectionIndex ? { ...section, [field]: value } : section
      ),
    }));
  };

  const handleItemChange = (sectionIndex: number, itemIndex: number, field: string, value: string) => {
    setCalculationStatus(false);
    if (field === 'qty' || field === 'rate') {
      if (isNaN(Number(value))) {
        return
      }
    }

    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, secIdx) =>
        secIdx === sectionIndex
          ? {
            ...section,
            items: section.items.map((item, itemIdx) =>
              itemIdx === itemIndex
                ? {
                  ...item,
                  [field]: field === 'description' ? value : Number(value),
                  amount:
                    field === 'qty'
                      ? Number(value) * item.rate
                      : field === 'rate'
                        ? Number(value) * item.qty
                        : item.amount,
                }
                : item
            ),
          }
          : section
      ),
    }));
    // calculateTotals();
  };

  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, { ...defaultSection }],
    }));
  };



  const removeSection = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
    // calculateTotals();
  };

  const addItem = (sectionIndex: number) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, index) =>
        index === sectionIndex
          ? { ...section, items: [...section.items, { ...defaultItem }] }
          : section
      ),
    }));
  };

  const removeItem = (sectionIndex: number, itemIndex: number) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, index) =>
        index === sectionIndex
          ? { ...section, items: section.items.filter((_, i) => i !== itemIndex) }
          : section
      ),
    }));
    // calculateTotals();
  };

  const calculateTotals = () => {
    // let data = {
    //   "customer": {
    //       "name": "",
    //       "location": "",
    //       "refNo": "",
    //       "date": "2025-02-12",
    //       "partyGSTIN": "",
    //       "state": "",
    //       "stateCode": ""
    //   },
    //   "sections": [
    //       {
    //           "title": "",
    //           "items": [
    //               {
    //                   "description": "",
    //                   "hsn_sac": "",
    //                   "qty": 4,
    //                   "rate": 2750,
    //                   "amount": 11000
    //               },
    //               {
    //                   "description": "",
    //                   "hsn_sac": "",
    //                   "qty": 8,
    //                   "rate": 350,
    //                   "amount": 2800
    //               },
    //               // {
    //               //     "description": "",
    //               //     "hsn_sac": "",
    //               //     "qty": 4,
    //               //     "rate": 3100,
    //               //     "amount": 12400
    //               // },
    //               // {
    //               //     "description": "",
    //               //     "hsn_sac": "",
    //               //     "qty": 4,
    //               //     "rate": 150,
    //               //     "amount": 600
    //               // },
    //               // {
    //               //     "description": "",
    //               //     "hsn_sac": "",
    //               //     "qty": 8,
    //               //     "rate": 2350,
    //               //     "amount": 18800
    //               // },
    //               // {
    //               //     "description": "",
    //               //     "hsn_sac": "",
    //               //     "qty": 5,
    //               //     "rate": 175,
    //               //     "amount": 875
    //               // },
    //               // {
    //               //     "description": "",
    //               //     "hsn_sac": "",
    //               //     "qty": 12,
    //               //     "rate": 800,
    //               //     "amount": 9600
    //               // }
    //           ]
    //       }
    //   ],
    //   "amounts": {
    //       "total": 0,
    //       "sgst": 0,
    //       "cgst": 0,
    //       "igst": 0,
    //       "grandTotal": 0
    //   }
    // }
    const total = formData.sections.reduce(
      (sectionTotal, section) =>
        sectionTotal +
        section.items.reduce((itemTotal, item) => itemTotal + item.amount, 0),
      0
    );

    const sgst = total * 0.09;
    const cgst = total * 0.09;
    const grandTotal = total + sgst + cgst;

    setFormData(prev => ({
      ...prev,
      amounts: {
        ...prev.amounts,
        total,
        sgst,
        cgst,
        grandTotal,
      },
    }));
    setCalculationStatus(true);

  };

  const handleSaveData = async (e: React.FormEvent) => {
    calculateTotals();
    let newSections: any = []
    formData.sections.forEach((section) => {

      if (section.title.length === 0 && section.items.length > 0) {
        section.items.forEach((item) => {
          newSections.push({
            title: item.description,
            items: [],
            hsn_sac: item.hsn_sac,
            amount: item.amount,
            qty: item.qty,
            rate: item.rate
          })
        })
      } else {
        newSections.push(section)
      }
    })

    formData.sections = newSections // update the sections array with the modified item

    e.preventDefault();
    setLoading(true);
    await addRow(formData);
    setLoading(false);
    navigate('/preview', { state: formData });

  };

  return (
    <>
      {loader && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
      <FormContainer>
        <form>
          <FormSection>
            <h2 style={{
              color: '#711DB0',
              fontWeight: 600
            }}>Customer Information</h2>
            <FormRow>
              <FormGroup>
                <label> Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.customer.name}
                  onChange={handleCustomerChange}

                />
              </FormGroup>
              <FormGroup>
                <label> Address</label>
                <input
                  type="text"
                  name="location"
                  value={formData.customer.location}
                  onChange={handleCustomerChange}

                />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <label>Reference No.</label>
                <input
                  type="text"
                  name="refNo"
                  value={formData.customer.refNo}
                  onChange={handleCustomerChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.customer.date}
                  onChange={handleCustomerChange}

                />
              </FormGroup>

              <FormGroup>
                <label>Party GSTIN</label>
                <input
                  type="text"
                  name="partyGSTIN"
                  value={formData.customer.partyGSTIN}
                  onChange={handleCustomerChange}

                />
              </FormGroup>
            </FormRow>
          </FormSection>

          <FormSection>
            <h2 style={{
              color: '#711DB0',
              fontWeight: 600
            }}>Particulars</h2>
            {formData.sections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <FormGroup>
                  <label>Section Title</label>
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => handleSectionChange(sectionIndex, 'title', e.target.value)}

                  />
                </FormGroup>

                <FormSection style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                  {section.items.map((item, itemIndex) => (
                    <>
                      <Card key={itemIndex} style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>

                        <FormGroup style={{ width: '100%' }}>
                          <label>Description</label>
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) =>
                              handleItemChange(sectionIndex, itemIndex, 'description', e.target.value)
                            }
                          />
                        </FormGroup>

                        <FormGroup>
                          <label>HSN/SAC</label>
                          <input
                            type="text"
                            value={item.hsn_sac}
                            onChange={(e) =>
                              handleItemChange(sectionIndex, itemIndex, 'hsn_sac', e.target.value)
                            }
                          />
                        </FormGroup>

                        <FormGroup>
                          <label>Rate</label>
                          <input
                            type="text"
                            value={item.rate === 0 ? '' : item.rate}
                            onChange={(e) =>
                              handleItemChange(sectionIndex, itemIndex, 'rate', e.target.value)
                            }
                          />
                        </FormGroup>

                        <FormGroup>
                          <label>Quantity</label>
                          <input
                            type="text"
                            value={item.qty === 0 ? '' : item.qty}
                            onChange={(e) =>
                              handleItemChange(sectionIndex, itemIndex, 'qty', e.target.value)
                            }
                          />
                        </FormGroup>

                        <FormGroup>
                          <label>Amount</label>
                          <input
                            type="text"
                            disabled
                            value={item.amount === 0 ? '' : item.amount}
                            onChange={(e) =>
                              handleItemChange(sectionIndex, 0, 'amount', e.target.value)
                            }
                          />
                        </FormGroup>
                      </Card>

                      {/* <div style={{ width: "20px", height: "20px", gap: 0, justifyContent: "flex-end" }} onClick={() => removeItem(sectionIndex, itemIndex)}>
                      <img src={deleteIcon} alt="Delete" />
                    </div> */}

                      <Button type="button" onClick={() => addItem(sectionIndex)} style={{ marginLeft: 'auto' }}>
                        Add Item
                      </Button>


                      {section.items.length > 1 && <Button type="button" onClick={() => removeItem(sectionIndex, itemIndex)}>
                        Delete Item
                      </Button>}
                    </>
                  ))}

                </FormSection>

                {/* <Button
                type="button"
                className="secondary"
                // onClick={() => removeItem(sectionIndex, itemIndex)}
                disabled={section.items.length === 1}
              >
                <img src="" alt="delete" />
              </Button> */}


                <SectionButtons style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {/* <Button type="button" onClick={() => addItem(sectionIndex)}>
                  Add Item
                </Button> */}
                  {formData.sections.length > 1 && <Button
                    type="button"
                    className="secondary"
                    onClick={() => removeSection(sectionIndex)}
                    disabled={formData.sections.length === 1}
                  >
                    Remove Section
                  </Button>}

                  <Button type="button" onClick={addSection}>
                    Add Section
                  </Button>

                </SectionButtons>
              </div>
            ))}

          </FormSection>

          <Button style={{ width: "100%" }} type="button" className="primary" onClick={calculateTotals}>Calculate Total</Button>


          {calculationStatus && <>
            <FormSection>
              <h2 style={{
                color: '#711DB0',
                fontWeight: 600
              }}>Amount Details</h2>
              <FormRow>
                <FormGroup>
                  <label>Total</label>
                  <input type="text" value={formData.amounts.total.toFixed(2)} disabled />
                </FormGroup>
                <FormGroup>
                  <label>SGST (9%)</label>
                  <input type="text" value={formData.amounts.sgst.toFixed(2)} disabled />
                </FormGroup>
                <FormGroup>
                  <label>CGST (9%)</label>
                  <input type="text" value={formData.amounts.cgst.toFixed(2)} disabled />
                </FormGroup>
              </FormRow>
              <FormGroup>
                <label>Grand Total</label>
                <input type="text" value={formData.amounts.grandTotal.toFixed(2)} disabled />
              </FormGroup>
            </FormSection>

            <ButtonGroup>
              <Button type="button" onClick={handleSaveData}>Generate Quotation</Button>
            </ButtonGroup>
          </>
          }
        </form>
      </FormContainer >
    </>
  );
};

export default QuotationForm;
