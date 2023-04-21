import { useEffect, useState } from "react";
import { loadInvoiced } from "./../../utils/requisitions";

export default function useInvoicdProvider() {
  const [invoicedList, setInvoicedList] = useState([]);

  const [sectionSelect, setSectionSelect] = useState("home");

  useEffect(() => {
    async function fetchInvoicd() {
      const allInvoicd = await loadInvoiced();
      setInvoicedList(allInvoicd);
    }
    fetchInvoicd();
  }, []);

  return {
    invoicedList,
    setInvoicedList,
    sectionSelect,
    setSectionSelect,
  };
}
