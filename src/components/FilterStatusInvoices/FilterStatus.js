

export default function filterStatus(filter,setInvoicesList,newInvoicesList){
      if (!filter || filter === "all") {
        setInvoicesList(newInvoicesList);
      } else if (filter === "paid") {
        const paid =
          Array.isArray(newInvoicesList.all) &&
          newInvoicesList.all.filter((invoice) => invoice.status === "pago");
        setInvoicesList({ all: paid });
      } else if (filter === "pendent") {
        const overdue =
          Array.isArray(newInvoicesList.all) &&
          newInvoicesList.all.filter(
            (invoice) =>
              invoice.status === "pendente" &&
              new Date(invoice.due_date) > new Date()
          );
        setInvoicesList({ all: overdue });
      } else if (filter === "due") {
        const pendent =
          Array.isArray(newInvoicesList.all) &&
          newInvoicesList.all.filter(
            (invoice) =>
              invoice.status === "pendente" &&
              new Date(invoice.due_date) < new Date()
          );
        setInvoicesList({ all: pendent });
      }
}