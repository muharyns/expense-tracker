import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const changeToDate = (date) => {
  const dateString = date;
  const dateObject = new Date(dateString);
  const day = String(dateObject.getUTCDate()).padStart(2, "0");
  const month = String(dateObject.getUTCMonth() + 1).padStart(2, "0");
  const year = dateObject.getUTCFullYear();

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const capitalizeFirstLetter = (text) => {
  if (text.length === 0) {
    return text;
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
};
