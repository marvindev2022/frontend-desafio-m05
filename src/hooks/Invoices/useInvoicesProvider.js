import { useEffect, useState } from "react";
import { loadInvoices } from "../../utils/requisitions";

export default function useInvoicesProvider() {
  const [invoicesList, setInvoicesList] = useState([]);
  const [render, setRender] = useState(false);

  const [formInvoice, setFormInvoice] = useState({
    description: "",
    status: "",
    invoice_value: "",
    due_date: "",
    client_name: "",
    client_email: "",
  });

  const [sectionSelect, setSectionSelect] = useState("home");
  useEffect(() => {
    async function fetchInvoices() {
      const allInvoice = await loadInvoices();
      setInvoicesList(allInvoice);
    }
    fetchInvoices();
  }, [formInvoice,render]);

  return {
    render,
    setRender,
    formInvoice,
    setFormInvoice,
    invoicesList,
    setInvoicesList,
    sectionSelect,
    setSectionSelect,
  };
}
