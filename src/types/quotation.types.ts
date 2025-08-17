export interface Item {
  description: string;
  hsn_sac: string;
  qty: number;
  rate: number;
  amount: number;
}

export interface Section {
  title: string;
  rate: number;
  qty: number;
  amount: number;
  items: Item[];
  hsn_sac?: string; // Optional field for HSN/SAC code
}

export interface Customer {
  name: string;
  street: string;
  area: string;
  city: string;
  pincode: string;
  refNo: string;
  date: string;
  partyGSTIN?: string;
  state?: string;
  stateCode?: string;
}

export interface BankDetails {
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

export interface Company {
  name: string;
  tagline: string;
  office: string;
  factory: string;
  email: string;
  mobile: string;
  gstin: string;
}

export interface FormData {
  company: Company;
  customer: Customer;
  sections: Section[];
  bankDetails: BankDetails;
  amounts: Amounts;
  hsn_sac?: string; // Optional field for HSN/SAC code
}
