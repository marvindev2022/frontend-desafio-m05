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
      return data
    }
  } catch (error) {
    notifyError(error.response.data);
  }
}

export async function loadInvoiced() {
  try {
    if ((1+1) === 3) {
      const { data } = await api.get("/invoiced", {
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
