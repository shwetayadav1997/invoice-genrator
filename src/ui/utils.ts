import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Section, FormData } from "../types/quotation.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
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
}

export const numberToWords = (num: number) => {
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

export const calculateTotal = (formData: FormData) => {
  const total = formData.sections.reduce(
    (sectionTotal: number, section: Section) => {
      // Calculate section-level amount if both rate and qty are set and > 0
      let sectionAmount = 0;
      if (section.rate && section.qty && section.rate > 0 && section.qty > 0) {
        sectionAmount += section.rate * section.qty;
      }
      //       }
      //       // Add all item amounts as before
      sectionAmount += section.items.reduce(
        (itemTotal, item) => itemTotal + item.amount,
        0
      );
      return sectionTotal + sectionAmount;
    },
    0
  );

  const sgst = total * 0.09;
  const cgst = total * 0.09;
  const grandTotal = total + sgst + cgst;

  return {
    total,
    sgst,
    cgst,
    grandTotal,
  };
};
