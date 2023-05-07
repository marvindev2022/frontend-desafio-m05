import { viaCep } from "./../service/instance";
import { notifyError } from "./notify";

export default async function findAddress(cep) {
  try {
    if (cep?.replace(/\D/g, "").length !== 8) return;
      const { data } = await viaCep.get(`${cep}/json`);

      return data;
    
  } catch (error) {
    notifyError("Cep invalido");
  }
}
