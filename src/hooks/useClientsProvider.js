import { useEffect, useState } from "react";
import { loadClients } from "../utils/requisitions";

export default function useClientsProvider() {
  const [clientsList, setClientsList] = useState([]);

  const [sectionSelect, setSectionSelect] = useState("home");

  useEffect(() => {
    async function fetchClients() {
      const allClients = await loadClients();
      setClientsList(allClients);
    }
    fetchClients();
  }, []);

  return {
    clientsList,
    setClientsList,
    sectionSelect,
    setSectionSelect,
  };
}
