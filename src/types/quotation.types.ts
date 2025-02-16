export interface CompanyInfo {
  name: string;
  tagline: string;
  office: string;
  factory: string;
  email: string;
  mobile: string;
  gstin: string;
}

export interface CustomerInfo {
  name: string;
  location: string;
  refNo: string;
  date: string;
  partyGSTIN: string;
  state: string;
  stateCode: string;
}

export interface ItemDetail {
  description: string;
  hsn_sac: string;
  qty: number;
  rate: number;
  amount: number;
}

export interface Section {
  title: string;
  items: ItemDetail[];
}

export interface BankDetail {
  bankName: string;
  accountNo: string;
  branch: string;
  ifscCode: string;
}

export interface Amounts {
  total: number;
  sgst: number;
  cgst: number;
  igst: number;
  grandTotal: number;
}

export interface QuotationData {
  customer: CustomerInfo;
  sections: Section[];
  amounts: Amounts;
}
