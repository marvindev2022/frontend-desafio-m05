import { viaCep } from "./../service/instance";

export default async function findAddress(cep) {
  try {
    if (cep.length !== 8) return
      const { data } = await viaCep.get(`${cep}/json`);

      return data;
    
  } catch (error) {
    console.error(error);
  }
}
