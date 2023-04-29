import IconeClients from "../../assets/Frame.svg";
import Magnifier from "../../assets/magnifier.svg";
import yes from "../../assets/Icon.svg";
import no from "../../assets/x.svg";
import Filter from "../../assets/filter.svg";
import Group from "../../assets/group.svg";
import btnEdit from "../../assets/Botão- Editar- Tabela.svg";
import btnDelete from "../../assets/Botão- Excluir- Tabela.svg";
import "./tableInvoiced.styles.css";
import { useEffect, useState } from "react";
import useInvoicesProvider from "../../hooks/Invoices/useInvoicesProvider";
import { formatToMoney } from "../../utils/formatters";
import DialogInvoice from "../DialogInvoice/DialogInvoice";
import { verifyDue } from "../../utils/verifyDue";
import api from "./../../service/instance";
import { notifyError, notifySuccess } from "../../utils/notify";
import { getItem } from "../../utils/storage";
import { loadInvoices } from "../../utils/requisitions";

export default function TableInvoiced() {
  const { invoicesList, setInvoicesList, formInvoice, setFormInvoice } =
    useInvoicesProvider();
  const [render, setRender] = useState(false);

  function handleClick() {
    document.querySelector(".dialog-invoices")?.showModal();
  }

  async function handleDelete(id, client_id) {
    try {
      const { data } = await api.delete(
        `invoice/${id}?client_id=${client_id}`,
        {
          headers: {
            authorization: `Bearer ${getItem("token")}`,
          },
        }
      );
      setRender(!render);
      document.getElementById(`${id}`).classList.add("hidden");
      notifySuccess(data);
    } catch (error) {
      notifyError(error.response.data);
    }
  }

  useEffect(() => {
    async function fecthClientList() {
      const newInvoicesList = await loadInvoices();
      setInvoicesList(newInvoicesList);
    }
    fecthClientList();
  }, [render,setInvoicesList]);

  return (
    <>
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
          <img className="filtro-img" src={Filter} alt="Icone Filtro" />
          <div className="input-div">
            <input type="text" placeholder="Pesquisa" />
            <img src={Magnifier} alt="icone lupa" />
          </div>
        </div>
      </div>

      <table className="table-invoices">
        <thead>
          <tr className="header-charge-invoices">
            <th className="client-th-invoices">
              <img src={Group} alt="" />
              <span>Cliente</span>
            </th>
            <th className="id-th-invoices">
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
          {invoicesList?.all
            ?.sort((a, b) => b.id - a.id)
            .map((charge, index) => (
              <tr key={index + 1} className="charge-specific-invoices">
                <td className="invoices-client">{charge.client_name}</td>
                <td className="invoices-id">{charge.id * 10005 ** 2}</td>
                <td className="invoices-value">
                  {formatToMoney(Number(charge.invoice_value))}
                </td>
                <td className="invoices-date">
                  {charge.due_date?.slice(0, 10)}
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
                        handleClick();
                      }}
                      src={btnEdit}
                      alt=""
                    />
                    <img
                      className="btn-delete"
                      onClick={() => {
                        document
                          .getElementById(`${charge.id}`)
                          .classList.remove("hidden");
                      }}
                      src={btnDelete}
                      alt=""
                    />
                    <span
                      id={charge.id}
                      className="hidden modal-delete-invoice"
                    >
                      <img
                        src={yes}
                        alt="yes"
                        className="yes-option"
                        onClick={() =>
                          handleDelete(charge.id, charge.client_id)
                        }
                      />
                      <img
                        src={no}
                        alt="no"
                        className="no-option"
                        onClick={() =>
                          document
                            .getElementById(`${charge.id}`)
                            .classList.add("hidden")
                        }
                      />
                    </span>
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
