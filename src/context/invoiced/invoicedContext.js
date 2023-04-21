import { createContext } from "react";
import InvoicedProvider from "./../../hooks/Invoiced/useInvoicedProvidier";

export const InvoicedContext = createContext({});

export function InvoicedListProvider({ children }) {
  const valuesProvider = InvoicedProvider();
  return (
    <InvoicedContext.Provider value={valuesProvider}>
      {children}
    </InvoicedContext.Provider>
  );
}
