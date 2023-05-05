import { format } from "date-fns";

export function formatToDate(date) {
  const inputTimeZone = "America/Sao_Paulo";
  const outputTimeZone = "UTC";
  const inputDate = new Date(date);

  // converte a data para o fuso horário desejadoz
  const outputDate = new Date(
    inputDate.toLocaleString("en-US", { timeZone: inputTimeZone })
  );

  // converte a data para o formato desejadox
  const formattedDate = outputDate.toLocaleDateString("en-US", {
    timeZone: outputTimeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return format(new Date(formattedDate), "dd/MM/yyyy");
}

export function formatToMoney(value) {

    return value?.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
}

export function getInitials(fullName) {
  const nameArray = fullName.split(" ");
  let initials = "";

  if (nameArray.length === 1) {
    initials = nameArray[0].slice(0, 2);
  } else {
    const [firstName, middleName = ""] = nameArray;
    initials = `${firstName.slice(0, 1)}${middleName.slice(0, 1)}`;
  }

  return initials;
}


export function validatePassword(password) {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*[!@#$%^&*()\-+={[}\]|\\:;"'<,>.?/])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
}

export function formatCpf(cpf) {
  cpf = cpf?.replace(/\D/g, ""); // remove tudo que não é dígito
  cpf = cpf?.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf?.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf?.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return cpf;
}

export function formatPhone(phone) {
  phone = phone?.replace(/\D/g, "");
  phone = phone?.replace(/^(\d{2})(\d)/g, "($1) $2");
  phone = phone?.replace(/(\d)(\d{4})$/, "$1-$2");
  return phone;
}

export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function formatCep(cep) {
  const cepRegex = /^(\d{5})(\d{3})$/;
  const match = cepRegex.exec(cep);

  if (!match) {
    return cep;
  }

  return `${match[1]}-${match[2]}`;
}
