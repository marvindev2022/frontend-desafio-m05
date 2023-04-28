import { useEffect, useState } from "react";
import { loadInvoices } from "../../utils/requisitions";
const defaultForm = {
  description: "",
  status: "",
  invoice_value: "",
  due_date: "",
  client_name: "",
  client_email: "",
};
export default function useInvoicesProvider() {
  const [formInvoice, setFormInvoice] = useState(defaultForm);
  const [sectionSelect, setSectionSelect] = useState("home");
  const [invoicesList, setInvoicesList] = useState([]);
  const [renderInvoices, setRenderInvoices] = useState(false);

  useEffect(() => {
    async function fetchInvoices() {
      const allInvoice = await loadInvoices();
      setInvoicesList(allInvoice);
    }
    fetchInvoices();
  }, [formInvoice, renderInvoices]);

  return {
    renderInvoices,
    setRenderInvoices,
    formInvoice,
    setFormInvoice,
    invoicesList,
    setInvoicesList,
    sectionSelect,
    setSectionSelect,
  };
}
