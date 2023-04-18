import {useContext} from "react";
import {ClientsContext} from "../context/clientsContext";

export function useClientsList() {
  return useContext(ClientsContext);
}
