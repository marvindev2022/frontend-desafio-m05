import {createContext} from "react";
import ClientsProvider from "../hooks/useClientsProvider";

export const ClientsContext = createContext({});

export function ClientsListProvider({children}) {
  const valuesProvider = ClientsProvider();
  return (
    <ClientsContext.Provider value={valuesProvider}>
      {children}
    </ClientsContext.Provider>
  );
}
