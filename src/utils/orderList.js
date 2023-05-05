export default function orderList(invoicesList, order) {
  let list = invoicesList?.all;
  if (order === "nome crescente") {
    list = list?.sort((a, b) => a.client_name.localeCompare(b.client_name));
  } else if (order === "nome decrescente") {
    list = list?.sort((a, b) => b.client_name.localeCompare(a.client_name));
  } else if (order === "id crescente") {
    list = list?.sort((a, b) => b.id - a.id);
  } else {
    list = list?.sort((a, b) => a.id - b.id);
  }
  return list?.map((invoice) => invoice);
}