import { useContext } from "react";
import { InvoicedContext } from "../context/invoicedContext";

export function useInvoicedList() {
  return useContext(InvoicedContext);
}
