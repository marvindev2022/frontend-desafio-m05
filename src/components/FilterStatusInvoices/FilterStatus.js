import { getItem } from "../../utils/storage";

export function filterStatusInvoices(filter, setInvoicesList, newInvoicesList) {
  if (!filter || filter === "all") {
    setInvoicesList(newInvoicesList);
  } else if (filter === "paid" || getItem("filterBy")=== "paid") {
    const paid =
      Array.isArray(newInvoicesList.all) &&
      newInvoicesList.all.filter((invoice) => invoice.status === "pago");
    setInvoicesList({ all: paid });
  } else if (filter === "pendent" || getItem("filterBy") === "predicted") {
    const overdue =
      Array.isArray(newInvoicesList.all) &&
      newInvoicesList.all.filter(
        (invoice) =>
          invoice.status === "pendente" &&
          new Date(invoice.due_date) > new Date()
      );
    setInvoicesList({ all: overdue });
  } else if (filter === "due" || getItem("filterBy") === "due") {
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

export function filterStatusClients(
  filter,
  setClientsList,
  newClientsList,
  invoicesList
) {
  if (!filter) {
    setClientsList(newClientsList);
  } else if (filter === "em dia") {
    const emDia = newClientsList.filter((client) =>
      invoicesList?.all
        ?.filter((invoice) => invoice.client_email === client.email)
        .every(
          (invoice) =>
            invoice.status === "pago" ||
            (invoice.status === "pendente" &&
              new Date(invoice.due_date) >= new Date())
        )
    );
    setClientsList(emDia);
  } else if (filter === "inadimplente") {
    const inadimplente = newClientsList.filter((client) =>
      invoicesList?.all
        ?.filter((invoice) => invoice.client_email === client.email)
        .some(
          (invoice) =>
            invoice.status === "pendente" &&
            new Date(invoice.due_date) < new Date()
        )
    );
    setClientsList(inadimplente);
  }
}
