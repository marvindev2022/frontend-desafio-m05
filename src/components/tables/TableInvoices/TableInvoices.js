import IconeClients from "./../../../assets/Frame.svg";
import Magnifier from "./../../../assets/magnifier.svg";
import Filter from "./../../../assets/filter.svg";
import Group from "./../../../assets/group.svg";
import btnEdit from "./../../../assets/Botão- Editar- Tabela.svg";
import btnDelete from "./../../../assets/Botão- Excluir- Tabela.svg";
import { useEffect, useState } from "react";
import useInvoicesProvider from "./../../../hooks/Invoices/useInvoicesProvider";
import { formatToDate, formatToMoney } from "./../../../utils/formatters";
import DialogInvoice from "./../../DialogInvoice/DialogInvoice";
import { verifyDue } from "./../../../utils/verifyDue";
import { getItem } from "./../../../utils/storage";
import { loadInvoices } from "./../../../utils/requisitions";
import DialogStatus from "./../../FilterStatusInvoices/DialogStatus";
import { filterStatusInvoices } from "./../../FilterStatusInvoices/FilterStatus";
import orderList from "./../../../utils/orderList";
import ModalInvoiceDetail from "./../../ModalInvoiceDetail/ModalInvoicedetail";
import ModalDeleteInvoice from "./../../DialogDelete/DialogDelete";
import { notifyError } from "./../../../utils/notify";
import "./tableInvoiced.styles.css";

export default function TableInvoices() {
  const { invoicesList, setInvoicesList, formInvoice, setFormInvoice } =
    useInvoicesProvider();
  const [render, setRender] = useState(false);
  const [order, setOrder] = useState(getItem("orderBy") ?? false);
  const [filter, setFilter] = useState(getItem("filterBy "));
  const [searchText, setSearchText] = useState("");
  const [invoiceDetail, setInvoiveDetail] = useState(false);
  const [idInvoice, setIdInvoice] = useState(0);
  const [clientId, setClientId] = useState(0);
  const listCharge = orderList(invoicesList, order);
  const [modalDelete, setModalDelete] = useState(false);
  function handleChange({ target }) {
    setSearchText(target.value.toLowerCase());
    const searchTerm = target.value.toLowerCase();
    if (!searchTerm) return;

    const filteredInvoicesList = listCharge?.filter(
      (invoice) =>
        invoice.client_name.toLowerCase().includes(searchTerm) ||
        invoice.id.toString().toLowerCase().includes(searchTerm) ||
        formatToMoney(Number(invoice.invoice_value))
          .toLowerCase()
          .includes(searchTerm) ||
        invoice.due_date?.slice(0, 10).toLowerCase().includes(searchTerm)
    );
    setInvoicesList({ all: filteredInvoicesList });
  }

  const filteredInvoices = listCharge?.filter(
    (invoice) =>
      invoice.client_name.toLowerCase().includes(searchText.toLowerCase()) ||
      invoice.id.toString().toLowerCase().includes(searchText) ||
      formatToMoney(Number(invoice.invoice_value))
        .toLowerCase()
        .includes(searchText) ||
      invoice.due_date?.slice(0, 10).toLowerCase().includes(searchText)
  );

  useEffect(() => {
    async function fecthClientList() {
      const newInvoicesList = await loadInvoices();
      setInvoicesList(newInvoicesList);
      filterStatusInvoices(filter, setInvoicesList, newInvoicesList);
    }
    fecthClientList();
  }, [order, render, setInvoicesList, filter, searchText, setFilter]);

  return (
    <>
      {modalDelete && (
        <ModalDeleteInvoice
          client_id={clientId}
          id={idInvoice}
          setModalDelete={setModalDelete}
        />
      )}
      {invoiceDetail && (
        <ModalInvoiceDetail
          id={idInvoice}
          setInvoiveDetail={setInvoiveDetail}
        />
      )}
      <DialogStatus setFilter={setFilter} filter={filter} />
      <DialogInvoice
        render={render}
        setRender={setRender}
        selectInvoice={formInvoice}
      />
      <div className="header-clients">
        <div className="client-header">
          <img src={IconeClients} alt="Icone Clientes" />
          <h1>Cobranças</h1>
        </div>

        <div className="nav-header-table">
          <img
            onClick={() => document.querySelector(".dialog-status").showModal()}
            className="filtro-img"
            src={Filter}
            alt="Icone Filtro"
          />
          <div className="input-div">
            <input
              className="input-search"
              type="search"
              placeholder="Pesquisa"
              onChange={handleChange}
            />
            <img src={Magnifier} alt="icone lupa" />
          </div>
        </div>
      </div>

      <table className="table-invoices">
        <thead>
          <tr className="header-charge-invoices">
            <th
              onClick={() => {
                if (order !== "nome crescente") {
                  setOrder("nome crescente");
                } else {
                  setOrder("nome decrescente");
                }
              }}
              className="client-th-invoices"
            >
              <img src={Group} alt="" />
              <span>Cliente</span>
            </th>
            <th
              onClick={() => {
                if (order !== "id crescente") {
                  setOrder("id crescente");
                } else {
                  setOrder("id decrescente");
                }
              }}
              className="id-th-invoices"
            >
              <img src={Group} alt="" />
              <span>ID da Cob.</span>
            </th>
            <th className="value-th-invoices">Valor</th>
            <th className="date-th-invoices">Data de Venc.</th>
            <th className="state-th-invoices">Status</th>
            <th className="description-th-invoices">Descrição</th>
            <th className="edit-charge-th-invoices"></th>
          </tr>
        </thead>
        <tbody className="tbody-invoices">
          {(filteredInvoices ?? listCharge)?.map((charge, index) => (
            <tr key={index + 1} className="charge-specific-invoices">
              <td
                onClick={() => {
                  setIdInvoice(charge.id);
                  setInvoiveDetail(true);
                }}
                className="invoices-client"
              >
                {charge.client_name}
              </td>
              <td className="invoices-id">{charge.id}</td>
              <td className="invoices-value">
                {formatToMoney(Number(charge.invoice_value))}
              </td>
              <td className="invoices-date">
                {formatToDate(charge.due_date?.slice(0, 10))}
              </td>
              <td className="invoices-state">
                <span
                  className={
                    charge.status === "pago"
                      ? "paid"
                      : verifyDue(charge.due_date)
                  }
                >
                  {charge.status === "pago"
                    ? "Pago"
                    : verifyDue(charge.due_date) === "due"
                    ? "Vencido"
                    : "Pendente"}
                </span>
              </td>
              <td className="invoices-description">{charge.description}</td>
              <td className="edit-charge-invoices">
                <span className="container-alter-icons">
                  <img
                    className="btn-edit"
                    onClick={() => {
                      setFormInvoice(charge);
                      document.querySelector(".dialog-invoices")?.showModal();
                    }}
                    src={btnEdit}
                    alt=""
                  />
                  <img
                    className="btn-delete"
                    onClick={() => {
                      setClientId(charge.client_id);
                      setIdInvoice(charge.id);
                      if (verifyDue(charge.due_date) === "pendent") {
                        return setModalDelete(true);
                      } else {
                        return notifyError("Essa conta não pode ser deletada!");
                      }
                    }}
                    src={btnDelete}
                    alt=""
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
