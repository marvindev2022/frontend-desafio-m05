import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export function capitalizeWord(word) {
  return word[0].toUpperCase() + word.slice(1, word.length);
}

export function formatToDate(date) {
  const generatedDate = new Date(date);

  return format(generatedDate, "dd/MM/yyyy");
}

export function formatToWeekDay(date) {
  const generatedDate = new Date(date);

  const weekDay = format(generatedDate, "eee", {
    locale: ptBR,
  });

  return capitalizeWord(weekDay);
}

export function formatToMoney(value) {
  return value.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}

export function getInitials(fullName) {
  const nameArray = fullName.split(" ");
  let initials = "";

  if (nameArray.length === 1) {
    initials = nameArray[0].slice(0, 2);
  } else {
    const firstName = nameArray[0];
    const middleName = nameArray.length > 2 ? nameArray[1] : "";
    const lastName = nameArray[nameArray.length - 1];

    initials = `${firstName.slice(0, 1)}${middleName.slice(
      0,
      1
    )}${lastName.slice(0, 1)}`;
  }

  return initials.toLowerCase();
}
