import  { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Plus, Trash2, Download, Hash, ChevronDown, ChevronRight } from "lucide-react";
import { calculateTotal } from "../utils";
import { FormData, Section, Customer, Item } from "../types/quotation.types";
import QuotationPreview from "../QuotationPreview";

const initialFormData: FormData = {
  customer: {
    name: "",
    street: "",
    area: "",
    city: "",
    pincode: "",
    refNo: "",
    date: new Date().toISOString().split("T")[0].split("-").reverse().join("/"),
    partyGSTIN: "",
    state: "",
    stateCode: "",
  },
  sections: [],
  bankDetails: {
    bankName: "",
    accountNo: "",
    branch: "",
    ifscCode: "",
  },
  amounts: {
    total: 0,
    sgst: 0,
    cgst: 0,
    igst: 0,
    grandTotal: 0,
  },
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
};

export default function InvoiceForm() {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(`
          <html>
            <head>
              <title>Print</title>
            </head>
            <body>${printContent}</body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const [activeTab, setActiveTab] = useState<"customer" | "info" | "preview">(
    "customer"
  );
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [isDownloadClicked, setIsDownloadClicked] = useState(false);
  const [openItems, setOpenItems] = useState<{ [key: number]: boolean }>({});
  const updateCustomer = (field: keyof Customer, value: string) => {
    setActiveTab("customer");
    setFormData((prev) => ({
      ...prev,
      customer: {
        ...prev.customer,
        [field]: value,
      },
    }));
  };

  const addSection = () => {
    const newSection: Section = {
      title: "",
      rate: 0,
      qty: 0,
      amount: 0,
      items: [],
    };
    setFormData((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
  };

  const removeSection = (index: number) => {
    setActiveTab("customer");

    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  const updateSection = (
    index: number,
    field: keyof Section,
    value: string | number
  ) => {
    setActiveTab("customer");
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.map((section, i) => {
        if (i === index) {
          const updated = { ...section, [field]: value };
          if (field === "rate" || field === "qty") {
            updated.amount = updated.rate * updated.qty;
          }
          return updated;
        }
        return section;
      }),
    }));
  };

  const addItem = (sectionIndex: number) => {
    setActiveTab("customer");

    const newItem: Item = {
      description: "",
      hsn_sac: "",
      qty: 0,
      rate: 0,
      amount: 0,
    };
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.map((section, i) => {
        if (i === sectionIndex) {
          return {
            ...section,
            items: [...section.items, newItem],
          };
        }
        return section;
      }),
    }));
  };

  const removeItem = (sectionIndex: number, itemIndex: number) => {
    setActiveTab("customer");

    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.map((section, i) => {
        if (i === sectionIndex) {
          return {
            ...section,
            items: section.items.filter((_, j) => j !== itemIndex),
          };
        }
        return section;
      }),
    }));
  };

  const updateItem = (
    sectionIndex: number,
    itemIndex: number,
    field: keyof Item,
    value: string | number
  ) => {
    setActiveTab("customer");

    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.map((section, i) => {
        if (i === sectionIndex) {
          return {
            ...section,
            items: section.items.map((item, j) => {
              if (j === itemIndex) {
                const updated = { ...item, [field]: value };
                if (field === "rate" || field === "qty") {
                  updated.amount = updated.rate * updated.qty;
                }
                return updated;
              }
              return item;
            }),
          };
        }
        return section;
      }),
    }));
  };

  const getTotal = () => {
    setActiveTab("customer");

    const { total, sgst, cgst, grandTotal } = calculateTotal(formData);
    setFormData((prev) => ({
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

  const amountHandler = () => {
    getTotal();
    setActiveTab("info");
  };

  const download = () => {
    setIsDownloadClicked(true);
    handlePrint();
  };

  const toggleItems = (sectionIndex: number) => {
    setOpenItems((prev) => ({ ...prev, [sectionIndex]: !prev[sectionIndex] }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Clean Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <h1 className="text-xl font-medium text-gray-900">
              Invoice Management Platform
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="space-y-6">
          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                className={`border-b-2 pb-2 px-1 text-md font-medium ${"border-primary text-primary"} `}
              >
                Customer Details
              </button>
            </nav>
          </div>

          <form className="space-y-6">
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="customer-name"
                      className="text-sm font-medium text-gray-700"
                    >
                      Customer Name
                    </Label>
                    <Input
                      id="customer-name"
                      value={formData.customer.name}
                      onChange={(e) => updateCustomer("name", e.target.value)}
                      placeholder="M/s. Customer Name"
                      className="mt-1 border-gray-300 focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div className="lg:col-span-2">
                   
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <Label
                          htmlFor="customer-street"
                          className="text-sm font-medium text-gray-700"
                        >
                          Street/Building
                        </Label>
                        <Input
                          id="customer-street"
                          value={formData.customer.street}
                          onChange={(e) => updateCustomer("street", e.target.value)}
                          placeholder="Street/Building"
                          className="mt-1 border-gray-300 focus:border-primary focus:ring-primary"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="customer-area"
                          className="text-sm font-medium text-gray-700"
                        >
                          Locality/Area
                        </Label>
                        <Input
                          id="customer-area"
                          value={formData.customer.area}
                          onChange={(e) => updateCustomer("area", e.target.value)}
                          placeholder="Locality/Area"
                          className="mt-1 border-gray-300 focus:border-primary focus:ring-primary"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="customer-city"
                          className="text-sm font-medium text-gray-700"
                        >
                          City
                        </Label>
                        <Input
                          id="customer-city"
                          value={formData.customer.city}
                          onChange={(e) => updateCustomer("city", e.target.value)}
                          placeholder="City"
                          className="mt-1 border-gray-300 focus:border-primary focus:ring-primary"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="customer-pincode"
                          className="text-sm font-medium text-gray-700"
                        >
                          Pincode
                        </Label>
                        <Input
                          id="customer-pincode"
                          value={formData.customer.pincode}
                          onChange={(e) => updateCustomer("pincode", e.target.value)}
                          placeholder="Pincode"
                          className="mt-1 border-gray-300 focus:border-primary focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div>
                    <Label
                      htmlFor="ref-no"
                      className="text-sm font-medium text-gray-700"
                    >
                      Reference Number
                    </Label>
                    <Input
                      id="ref-no"
                      value={formData.customer.refNo}
                      onChange={(e) => updateCustomer("refNo", e.target.value)}
                      placeholder="Reference number"
                      className="mt-1 border-gray-300 focus:border-primary focus:ring-primary"
                    />
                  </div>

                  <div className="lg:col-span-2">
                    <Label
                      htmlFor="customer-partyGSTIN"
                      className="text-sm font-medium text-gray-700"
                    >
                      Party GSTIN
                    </Label>
                    <Input
                      id="customer-partyGSTIN"
                      value={formData.customer.partyGSTIN}
                      onChange={(e) =>
                        updateCustomer("partyGSTIN", e.target.value)
                      }
                      placeholder="Party GSTIN"
                      className="mt-1 border-gray-300 focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="date"
                      className="text-sm font-medium text-gray-700"
                    >
                      Date
                    </Label>
                    <Input
                      id="date"
                      value={formData.customer.date}
                      onChange={(e) => updateCustomer("date", e.target.value)}
                      placeholder="DD/MM/YYYY"
                      className="mt-1 border-gray-300 focus:border-primary focus:ring-primary"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm">
              <CardHeader
                className="bg-gray-50 border-b border-gray-200"
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: 20,
                  background: "#f9fafb", // match bg-gray-50
                }}
              >
                <div className="flex justify-between gap-4">
                  <CardTitle className="text-lg font-medium text-gray-900">
                    Invoice Sections
                  </CardTitle>
                  <Button
                    type="button"
                    onClick={addSection}
                    size="sm"
                    className="text-white w-8 h-8 p-0 bg-purple-600"
                    aria-label="Add section"
                    title="Add section"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {formData.sections.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p>
                      No sections added yet. Click the "+" button to get
                      started.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {formData.sections.map((section, sectionIndex) => (
                      <div
                        key={sectionIndex}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">
                              Section {sectionIndex + 1}
                            </h4>
                            <Button
                              type="button"
                              onClick={() => removeSection(sectionIndex)}
                              variant="outline"
                              size="sm"
                              className="text-white  w-8 h-8 p-0 bg-purple-600"
                              aria-label="Remove section"
                              title="Remove section"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="p-4 space-y-4">
                          <div>
                            <Label
                              htmlFor={`section-title-${sectionIndex}`}
                              className="text-sm font-medium text-gray-700"
                            >
                              Section Title
                            </Label>
                            <Input
                              id={`section-title-${sectionIndex}`}
                              value={section.title}
                              onChange={(e) =>
                                updateSection(
                                  sectionIndex,
                                  "title",
                                  e.target.value
                                )
                              }
                              placeholder="Section title"
                              className="mt-1 border-gray-300 focus:border-primary focus:ring-primary"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <Label
                                htmlFor={`section-rate-${sectionIndex}`}
                                className="text-sm font-medium text-gray-700"
                              >
                                Rate
                              </Label>
                              <Input
                                id={`section-rate-${sectionIndex}`}
                                type="number"
                                value={section.rate}
                                onChange={(e) =>
                                  updateSection(
                                    sectionIndex,
                                    "rate",
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                                placeholder="0"
                                className="mt-1 border-gray-300 focus:border-primary focus:ring-primary"
                              />
                            </div>
                            <div>
                              <Label
                                htmlFor={`section-qty-${sectionIndex}`}
                                className="text-sm font-medium text-gray-700"
                              >
                                Quantity
                              </Label>
                              <Input
                                id={`section-qty-${sectionIndex}`}
                                type="number"
                                value={section.qty}
                                onChange={(e) =>
                                  updateSection(
                                    sectionIndex,
                                    "qty",
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                                placeholder="0"
                                className="mt-1 border-gray-300 focus:border-primary focus:ring-primary"
                              />
                            </div>
                            <div>
                              <Label
                                htmlFor={`section-amount-${sectionIndex}`}
                                className="text-sm font-medium text-gray-700"
                              >
                                Amount
                              </Label>
                              <Input
                                id={`section-amount-${sectionIndex}`}
                                type="number"
                                value={section.amount}
                                readOnly
                                className="mt-1 bg-gray-50 border-gray-300"
                              />
                            </div>
                          </div>

                          {/* Items within section */}
                          <div className="mt-6">
                            <div
                              className="flex items-center justify-between gap-3 mb-4 cursor-pointer select-none"
                              style={{
                                position: "sticky",
                                top: 56,
                                background: "#fff",
                                zIndex: 15,
                                padding: "0.5rem 0.5rem",
                              }}
                              onClick={() => toggleItems(sectionIndex)}
                            >
                              <div className="flex items-center gap-2">
                                {openItems[sectionIndex] ? (
                                  <ChevronDown className="w-5 h-5 text-gray-700" />
                                ) : (
                                  <ChevronRight className="w-5 h-5 text-gray-700" />
                                )}
                                <Label className="text-lg font-medium text-gray-700">
                                  Items
                                </Label>
                              </div>
                              <Button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addItem(sectionIndex);
                                }}
                                variant="outline"
                                size="sm"
                                className="border-primary text-primary hover:bg-primary/10 w-8 h-8 p-0"
                                aria-label="Add item"
                                title="Add item"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                            {openItems[sectionIndex] && (
                              <div>
                                {section.items.map((item, itemIndex) => (
                                  <div
                                    key={itemIndex}
                                    className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4"
                                  >
                                    <div className="flex items-start justify-between gap-3 mb-4">
                                      <h5 className="text-sm font-medium text-gray-900">
                                        Item {itemIndex + 1}
                                      </h5>
                                      <Button
                                        type="button"
                                        onClick={() =>
                                          removeItem(sectionIndex, itemIndex)
                                        }
                                        variant="outline"
                                        size="sm"
                                        className="text-red-600 border-red-300 hover:bg-red-50 w-8 h-8 p-0"
                                        aria-label="Remove item"
                                        title="Remove item"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                      <div>
                                        <Label
                                          htmlFor={`item-description-${sectionIndex}-${itemIndex}`}
                                          className="text-sm font-medium text-gray-700"
                                        >
                                          Description
                                        </Label>
                                        <Textarea
                                          id={`item-description-${sectionIndex}-${itemIndex}`}
                                          value={item.description}
                                          onChange={(e) =>
                                            updateItem(
                                              sectionIndex,
                                              itemIndex,
                                              "description",
                                              e.target.value
                                            )
                                          }
                                          placeholder="Item description"
                                          rows={2}
                                          className="mt-1 border-gray-300 focus:border-primary focus:ring-primary"
                                        />
                                      </div>
                                      <div>
                                        <Label
                                          htmlFor={`item-hsn-${sectionIndex}-${itemIndex}`}
                                          className="text-sm font-medium text-gray-700"
                                        >
                                          HSN/SAC
                                        </Label>
                                        <Input
                                          id={`item-hsn-${sectionIndex}-${itemIndex}`}
                                          value={item.hsn_sac}
                                          onChange={(e) =>
                                            updateItem(
                                              sectionIndex,
                                              itemIndex,
                                              "hsn_sac",
                                              e.target.value
                                            )
                                          }
                                          placeholder="HSN/SAC code"
                                          className="mt-1 border-gray-300 focus:border-primary focus:ring-primary"
                                        />
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                      <div>
                                        <Label
                                          htmlFor={`item-qty-${sectionIndex}-${itemIndex}`}
                                          className="text-sm font-medium text-gray-700"
                                        >
                                          Quantity
                                        </Label>
                                        <Input
                                          id={`item-qty-${sectionIndex}-${itemIndex}`}
                                          type="number"
                                          value={item.qty}
                                          onChange={(e) =>
                                            updateItem(
                                              sectionIndex,
                                              itemIndex,
                                              "qty",
                                              parseFloat(e.target.value) || 0
                                            )
                                          }
                                          placeholder="0"
                                          className="mt-1 border-gray-300 focus:border-primary focus:ring-primary"
                                        />
                                      </div>
                                      <div>
                                        <Label
                                          htmlFor={`item-rate-${sectionIndex}-${itemIndex}`}
                                          className="text-sm font-medium text-gray-700"
                                        >
                                          Rate
                                        </Label>
                                        <Input
                                          id={`item-rate-${sectionIndex}-${itemIndex}`}
                                          type="number"
                                          value={item.rate}
                                          onChange={(e) =>
                                            updateItem(
                                              sectionIndex,
                                              itemIndex,
                                              "rate",
                                              parseFloat(e.target.value) || 0
                                            )
                                          }
                                          placeholder="0"
                                          className="mt-1 border-gray-300 focus:border-primary focus:ring-primary"
                                        />
                                      </div>
                                      <div>
                                        <Label
                                          htmlFor={`item-amount-${sectionIndex}-${itemIndex}`}
                                          className="text-sm font-medium text-gray-700"
                                        >
                                          Amount
                                        </Label>
                                        <Input
                                          id={`item-amount-${sectionIndex}-${itemIndex}`}
                                          type="number"
                                          value={item.amount}
                                          readOnly
                                          className="mt-1 bg-gray-50 border-gray-300"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {activeTab === "info" && (
            <>
              {/* Line Items */}
              <div className="divide-y divide-gray-200">
                {formData.sections.map((section, sectionIndex) => {
                  const sectionTotal =
                    section.amount +
                    section.items.reduce(
                      (total, item) => total + item.amount,
                      0
                    );

                  return (
                    <div key={sectionIndex} className="p-4 space-y-4">
                      {/* Section Header */}
                      {(section.title || section.amount > 0) && (
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1"></div>
                            <h3 className="font-medium text-gray-900 text-base leading-tight">
                              {section.title || `Section ${sectionIndex + 1}`}
                            </h3>
                            {section.qty > 0 && section.rate > 0 && (
                              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                <span>Qty: {section.qty}</span>
                                <span>Rate: ₹{section.rate.toFixed(2)}</span>
                              </div>
                            )}
                          </div>
                          <div className="text-right ml-4">
                            <div className="font-bold text-lg text-primary">
                              ₹{sectionTotal.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Items */}
                      {section.items.length > 0 && (
                        <div className="space-y-3 ml-8">
                          {section.items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="border-l-2 border-gray-200 pl-4 py-2"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1"></div>
                                  {item.description && (
                                    <p className="font-medium text-gray-900 text-sm leading-tight mb-1">
                                      {item.description}
                                    </p>
                                  )}
                                  <div className="flex flex-wrap gap-3 text-xs text-gray-600">
                                    {item.hsn_sac && (
                                      <span>HSN: {item.hsn_sac}</span>
                                    )}
                                    {item.qty > 0 && (
                                      <span>Qty: {item.qty}</span>
                                    )}
                                    {item.rate > 0 && (
                                      <span>Rate: ₹{item.rate.toFixed(2)}</span>
                                    )}
                                  </div>
                                </div>
                                <div className="text-right ml-3">
                                  <div className="font-medium text-primary">
                                    {item.amount > 0
                                      ? `₹${item.amount.toFixed(2)}`
                                      : "-"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Tax Summary */}
              <div className="bg-gray-50 p-4 border-t-2 border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Tax Calculations
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">SGST @ {9}%</span>
                    <span className="font-medium">
                      ₹{formData.amounts.sgst.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">CGST @ {9}%</span>
                    <span className="font-medium">
                      ₹{formData.amounts.cgst.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">IGST @ {}%</span>
                    <span className="font-medium">
                      ₹{formData.amounts.igst.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="border-t border-gray-300 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">GRAND TOTAL</span>
                    <span className="font-bold text-xl text-primary">
                      ₹
                      {formData.amounts.grandTotal.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

            {/* Total and Actions */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Amount</p>
                  {/* <p className="text-2xl font-bold text-gray-900">₹{calculateTotal().toLocaleString()}</p> */}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => amountHandler()}
                    className="order-2 sm:order-1"
                  >
                    Preview Amount Details
                  </Button>
                  <Button
                    onClick={() => download()}
                    type="button"
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Invoice
                  </Button>
                  {/* <button onClick={(e) => handlePrint(e)}>
                      Print Quotation
                    </button> */}

                  {isDownloadClicked && (
                    <div>
                      {/* Hidden container to render QuotationPreview */}
                      <div ref={printRef} style={{ display: "none" }}>
                        <QuotationPreview data={formData} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>

          
        </div>
      </div>
    </div>
  );
}
