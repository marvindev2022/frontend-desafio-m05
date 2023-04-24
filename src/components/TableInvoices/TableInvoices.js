import IconeClients from "../../assets/Frame.svg";
import Magnifier from "../../assets/magnifier.svg";
import yes from "../../assets/Icon.svg";
import no from "../../assets/x.svg";
import Filter from "../../assets/filter.svg";
import Group from "../../assets/group.svg";
import btnEdit from "../../assets/Botão- Editar- Tabela.svg";
import btnDelete from "../../assets/Botão- Excluir- Tabela.svg";
import "./tableInvoiced.styles.css";
import { useState } from "react";
import ModalAddClients from "../Modal-add-Cliens/Modal-add-clients";
import useInvoicesProvider from "../../hooks/Invoices/useInvoicesProvider";
import { formatToDate, formatToMoney } from "../../utils/formatters";
import DialogInvoice from "../DialogInvoice/DialogInvoice";
import { verifyDue } from "../../utils/verifyDue";

export default function TableInvoiced() {
  const { invoicesList, formInvoice, setFormInvoice } = useInvoicesProvider();
  const [modal, setModal] = useState(false);

  function handleClick() {
    document.querySelector(".dialog-invoices")?.showModal();
  }

  function handleDelete() {}

  return (
    <>
      <DialogInvoice selectInvoice={formInvoice} />
      {modal && <ModalAddClients setModal={setModal} modal={modal} />}
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
        <tbody>
          {invoicesList.all
            ?.sort((a, b) => b.id - a.id)
            .slice(0, 10)
            .map((charge, index) => (
              <tr key={index + 1} className="charge-specific-invoices">
                <td className="invoices-client">{charge.client_name}</td>
                <td className="invoices-id">{charge.id * 10005 ** 2}</td>
                <td className="invoices-value">
                  {formatToMoney(Number(charge.invoice_value))}
                </td>
                <td className="invoices-date">
                  {formatToDate(charge.due_date)}
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
                      ? "pago"
                      : verifyDue(charge.due_date) === "due"
                      ? "Vencido"
                      : "Pendente"}
                  </span>
                </td>
                <td className="invoices-description">{charge.description}</td>
                <td className="edit-charge-invoices">
                  <span className="container-alter-icons">
                    <img
                      onClick={() => {
                        setFormInvoice(charge);
                        handleClick();
                      }}
                      src={btnEdit}
                      alt=""
                    />
                    <img
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
                      <p className="alert">Deseja deletar?</p>

                      <img
                        src={yes}
                        alt="yes"
                        className="yes-option"
                        onClick={handleDelete}
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
