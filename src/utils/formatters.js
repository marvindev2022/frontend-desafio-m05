import { format } from "date-fns";

export function formatToDate(date) {
  const generatedDate = new Date(date);

  return format(generatedDate, "dd/MM/yyyy");
}

export function formatToMoney(value) {
  return value?.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}

export function getInitials(fullName) {
  const nameArray = fullName.split(" ");
  let initials = "";

  if (nameArray.length === 1) {
    initials = nameArray[0].slice(0, 2);
  } else {
    const firstName = nameArray[0];
    const middleName = nameArray.length > 2 ? nameArray[1] : "";

    initials = `${firstName.slice(0, 1)}${middleName[0]}`;
  }

  return initials;
}

export function validatePassword(password) {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*[!@#$%^&*()\-+={[}\]|\\:;"'<,>.?/])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
}

export function formatToValue(valueParams) {
  const value = valueParams.replace(/[\D]+/g, "");
  const reais = value
    .substr(0, value.length - 2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const centavos = value.substr(value.length - 2);
  const formatedValue = `${reais},${centavos}`;
  return formatedValue;
}
export function formatCpf(cpf) {
  cpf = cpf.replace(/\D/g, ""); // remove tudo que não é dígito
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return cpf;
}

export function formatPhone(phone) {
  phone = phone.replace(/\D/g, "");
  phone = phone.replace(/^(\d{2})(\d)/g, "($1) $2");
  phone = phone.replace(/(\d)(\d{4})$/, "$1-$2");
  return phone;
}
