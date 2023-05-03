import api from "../service/instance";
import { getItem } from "./storage";
import { notifyError } from "./notify";
import { verifyDue } from "./verifyDue";

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

export async function loadDetailClient(clientId) {
  try {
    if (clientId > 0) {
      const { data } = await api.get(`/client/${clientId}`, {
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

    const paidInvoices = data.filter((invoice) => {
      let array;
      if (invoice.status === "pago") {
        array = invoice;
      }
      return array;
    });
    const unpaidInvoices = data.filter(
      (invoice) =>
        invoice.status === "pendente" && verifyDue(invoice.due_date) === "due"
    );

    return {
      all: data,
      predicted: data.filter((invoice) => invoice.status === "pendente"),
      paid: paidInvoices,
      unpaid: unpaidInvoices,
    };
  } catch (error) {
    notifyError(error.response.data);
  }
}
