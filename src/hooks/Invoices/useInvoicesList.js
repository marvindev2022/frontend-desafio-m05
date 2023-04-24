import { useContext } from "react";
import { InvoicesContext } from "../context/invoicesContext";

export function useInvoicedList() {
  return useContext(InvoicesContext);
}
