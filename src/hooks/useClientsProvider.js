import {useEffect, useState} from "react";
import {loadClients} from "../utils/requisitions";

export default function useClientsProvider() {
  const [clientsList, setClientsList] = useState([]);

  const [sectionSelect, setSectionSelect] = useState("home");
  const [render, setRender] = useState(false);

  useEffect(() => {
    async function fetchClients() {
      const allClients = await loadClients();
      setClientsList(allClients);
    }
    fetchClients();
    setRender(false);
  }, [render]);

  return {
    render,
    setRender,
    clientsList,
    setClientsList,
    sectionSelect,
    setSectionSelect
  };
}
