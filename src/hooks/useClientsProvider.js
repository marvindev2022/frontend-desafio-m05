import { useEffect, useState } from "react";
import { loadClients } from "../utils/requisitions";

export default function useClientsProvider() {
  const [clientsList, setClientsList] = useState([]);
  const [idClient, setIdClient] = useState(0);
  const [sectionSelect, setSectionSelect] = useState("home");
  const [detalhandoCliente, setDetalhandoCliente] = useState(false);
  const [render, setRender] = useState(false);

  useEffect(() => {
    async function fetchClients() {
      const allClients = await loadClients();
      setClientsList(allClients);
    }

    fetchClients();
  }, [render]);

  return {
    render,
    setRender,
    idClient,
    setIdClient,
    clientsList,
    setClientsList,
    sectionSelect,
    setSectionSelect,
    detalhandoCliente,
    setDetalhandoCliente,
  };
}
