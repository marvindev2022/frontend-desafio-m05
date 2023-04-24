import { createContext } from "react";
import InvoicesProvider from "./../../hooks/Invoices/useInvoicesProvider";

export const InvoicesContext = createContext({});

export function InvoicesListProvider({ children }) {
  const valuesProvider = InvoicesProvider();
  return (
    <InvoicesContext.Provider value={valuesProvider}>
      {children}
    </InvoicesContext.Provider>
  );
}
