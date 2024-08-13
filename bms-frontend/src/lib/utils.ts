import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitalsFromName = (firstName?: string, lastName?: string) => {
  if (!firstName || !lastName) return "";
  return `${firstName.charAt(0)}${lastName.charAt(0)}`;
};

export const getBalancePercentageFromExpense = (
  amount: number,
  expenses: number,
) => {
  // Calculate the percentage of the balance rounded to whole number
  return Number((((amount - expenses) / amount) * 100).toFixed(2));
};

export const getBalancePercentageFromBalance = (
  amount: number,
  balance: number,
) => {
  // Calculate the percentage of the balance rounded to whole number
  return Number(((balance / amount) * 100).toFixed(2));
};

export const toMoney = (
  amount: number | undefined,
  decimals: number = 2,
): string => {
  // If the amount is undefined, return an empty string
  if (typeof amount !== undefined) {
    // Convert the number to a string with 2 decimal places
    const formatted = amount?.toFixed(decimals);

    // Split the string into whole and decimal parts
    const [whole, decimal] = (formatted ?? "").split(".");

    // Add commas to the whole part
    const wholeWithCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine the whole part with commas and the decimal part
    return `${wholeWithCommas}${decimal ? "." : ""}${decimal ?? ""}`;
  }
  return "";
};
