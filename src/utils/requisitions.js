import api from "./../service/instance"
import {getItem} from "./storage";
import {notifyError} from "./notify"
export async function loadClients() {
  try {
    if (getItem("tokem")) {
      const {data} = await api.get("/clients");
      return data;
    }
  } catch (error) {
    notifyError(error);
  }
}
