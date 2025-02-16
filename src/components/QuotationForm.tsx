import React, { useState } from 'react';
import {
  FormContainer,
  FormSection,
  FormRow,
  FormGroup,
  ItemsTable,
  Button,
  ButtonGroup,
  SectionButtons,
} from '../styles/quotationForm.styles';
import { QuotationData } from '../types/quotation.types';
import { useNavigate} from 'react-router-dom';

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

  const [formData, setFormData] = useState<QuotationData>(emptyQuotationData);
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
  };

  const handleSaveData = (e: React.FormEvent) => {
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
  // Navigate('/preview'); 
  // Navigate({ to: '/preview', state: formData });
  navigate('/preview', { state: formData });

  };

  return (
    <FormContainer>
      <form>
        <FormSection>
          <h2>Customer Information</h2>
          <FormRow>
            <FormGroup>
              <label>Customer Name</label>
              <input
                type="text"
                name="name"
                value={formData.customer.name}
                onChange={handleCustomerChange}

              />
            </FormGroup>
            <FormGroup>
              <label>Customer Address</label>
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
          <h2>Items</h2>
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
              <ItemsTable>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>HSN/SAC</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {section.items.map((item, itemIndex) => (
                    <tr key={itemIndex}>
                      <td>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) =>
                            handleItemChange(sectionIndex, itemIndex, 'description', e.target.value)
                          }

                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={item.hsn_sac}
                          onChange={(e) =>
                            handleItemChange(sectionIndex, itemIndex, 'hsn_sac', e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={item.qty}
                          onChange={(e) =>
                            handleItemChange(sectionIndex, itemIndex, 'qty', e.target.value)
                          }

                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={item.rate}
                          onChange={(e) =>
                            handleItemChange(sectionIndex, itemIndex, 'rate', e.target.value)
                          }

                        />
                      </td>
                      <td>{item.amount}</td>
                      <td>
                        <Button
                          type="button"
                          className="secondary"
                          onClick={() => removeItem(sectionIndex, itemIndex)}
                          disabled={section.items.length === 1}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </ItemsTable>
              <SectionButtons>
                <Button type="button" onClick={() => addItem(sectionIndex)}>
                  Add Item
                </Button>
                <Button
                  type="button"
                  className="secondary"
                  onClick={() => removeSection(sectionIndex)}
                  disabled={formData.sections.length === 1}
                >
                  Remove Section
                </Button>
              </SectionButtons>
            </div>
          ))}
          <Button type="button" onClick={addSection}>
            Add Section
          </Button>
        </FormSection>

        <Button type="button" className="primary" onClick={calculateTotals}>Calculate Total</Button>
        <FormSection>
          <h2>Amount Details</h2>
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
      </form>
    </FormContainer>
  );
};

export default QuotationForm;
