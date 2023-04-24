import api from "./../service/instance";
import { getItem } from "./storage";
import { notifyError } from "./notify";

export async function loadClients() {
  try {
    if (getItem("token")) {
      const { data } = await api.get("/clients", {
        headers: {
          authorization: `Bearer ${getItem("token")}`,
        },
      });
      return data;
    }
  } catch (error) {
    notifyError(error.response.data);
  }
}

export async function loadInvoices() {
  try {
    const { data } = await api.get("/invoices", {
      headers: {
        authorization: `Bearer ${getItem("token")}`,
      },
    });

    const paidInvoices = data.filter((invoice) => invoice.status === "pago");
    const unpaidInvoices = data.filter(
      (invoice) => invoice.status === "pendente"
    );

    return {
      all: data,
      paid: paidInvoices,
      unpaid: unpaidInvoices,
    };
  } catch (error) {
    notifyError(error.response.data);
  }
}
