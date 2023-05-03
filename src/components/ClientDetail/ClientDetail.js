import BtnExcluir from "../../assets/Botão- Excluir- Tabela.svg";
import BtnEditar from "../../assets/Botão- Editar- Tabela.svg";
import EditeGreen from "../../assets/edit_green.svg";
import Group from "../../assets/group.svg";
import Frame from "../../assets/Frame.svg";
import DialogInvoice from "../DialogInvoice/DialogInvoice";
import useInvoicesProvider from "./../../hooks/Invoices/useInvoicesProvider";
import { useEffect, useState } from "react";
import { formatToMoney } from "../../utils/formatters";
import { loadDetailClient } from "../../utils/requisitions";
import "./styles.css";
import { verifyDue } from "../../utils/verifyDue";
import ModalAddCharge from "../Modal-add-Charge/Modal-add-Charge";
import DialogEditClients from "../Modal-edit-Clients/Modal-edit-clients";
import { getItem, setItem } from "../../utils/storage";

export default function ClientDetail({
  idClient,
  closeClientDetail,
  setCloseClientDetail,
}) {
  const [getDetailClient, setGetDetailClient] = useState();
  const { formInvoice, setFormInvoice } = useInvoicesProvider();
  const [modalCharge, setModalCharge] = useState(false);
  const [id, setIdClient] = useState(0);
  const [render, setRender] = useState(0);

  function handleClick() {
    document.querySelector(".dialog-invoices")?.showModal();
  }

  useEffect(() => {
    async function fetchDetailClient() {
      if (idClient) {
        const extractDetail = await loadDetailClient(idClient);
        setGetDetailClient(extractDetail);
        setItem(
          "clientSelect",
          JSON.stringify({ user: extractDetail, id: idClient })
        );
      }
    }

    fetchDetailClient();
  }, [id, idClient, render, setRender]);

  return (
    <>
      {JSON.parse(getItem("clientSelect")) && (
        <DialogEditClients
          client={{
            id: JSON.parse(getItem("clientSelect"))?.id,
            name: JSON.parse(getItem("clientSelect"))?.user?.name,
            email: JSON.parse(getItem("clientSelect"))?.user?.email,
            cpf: JSON.parse(getItem("clientSelect"))?.user?.cpf,
            phone: JSON.parse(getItem("clientSelect"))?.user?.phone,
            street: JSON.parse(getItem("clientSelect"))?.user?.street,
            complement: JSON.parse(getItem("clientSelect"))?.user?.complement,
            cep: JSON.parse(getItem("clientSelect"))?.user?.cep,
            neighborhood: JSON.parse(getItem("clientSelect"))?.user
              ?.neighborhood,
            city: JSON.parse(getItem("clientSelect"))?.user?.city,
            uf: JSON.parse(getItem("clientSelect"))?.user?.uf,
          }}
          render={render}
          setRender={setRender}
        />
      )}
      <DialogInvoice selectInvoice={formInvoice} />
      {
        <>
          <h1
            onClick={() => {
              setCloseClientDetail(!closeClientDetail);
              setRender(!render);
            }}
            className="header-title-clients-h1"
          >
            Clientes
          </h1>
          <p className="header-title-clients-p">{">"}</p>
          <h2 className="header-title-clients-detail">Detalhes do cliente</h2>
        </>
      }
      {
        <div className="ClientDetail">
          <span
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <img src={Frame} alt="" />
            <h1>{getDetailClient?.name}</h1>
          </span>
          <div className="info">
            <div className="justify">
              <h2>Dados do Client</h2>
              <button
                onClick={() => {
                  document.querySelector(".dialog-edit-client")?.showModal();
                }}
              >
                <img src={EditeGreen} alt="" />
                Editar Cliente
              </button>
            </div>
            <div className="bottom info-row">
              <div className="gap">
                <b>E-mail</b>
                <p>{getDetailClient?.email}</p>
              </div>
              <div className="gap">
                <b>Telefone</b>
                <p>{getDetailClient?.phone}</p>
              </div>
              <div className="gap">
                <b>CPF</b>
                <p>{getDetailClient?.cpf}</p>
              </div>
            </div>
            <div className="info-row">
              <div className="gap">
                <b>Endereço</b>
                <p>{getDetailClient?.street}</p>
              </div>
              <div className="gap">
                <b>Bairro</b>
                <p>{getDetailClient?.neighborhood}</p>
              </div>
              <div className="gap">
                <b>Complemento</b>
                <p>
                  {getDetailClient?.complement?.length > 0
                    ? getDetailClient?.complement
                    : "N/A"}
                </p>
              </div>
              <div className="gap">
                <b>CEP</b>
                <p>{getDetailClient?.cep}</p>
              </div>
              <div className="gap">
                <b>Cidade</b>
                <p>{getDetailClient?.city}</p>
              </div>
              <div className="gap">
                <b>UF</b>
                <p>{getDetailClient?.uf}</p>
              </div>
            </div>
          </div>

          <div className="info-charge">
            <div className="justify">
              <h2>Cobraças do Cliente</h2>;
              <button
                onClick={() => setModalCharge(!modalCharge)}
                className="pink"
              >
                + Nova Cobrança
              </button>
            </div>
            <table>
              <thead>
                <tr className="header-charge-invoices">
                  <th className="id-th-invoices">
                    {" "}
                    <img src={Group} alt="" />
                    ID Cob.
                  </th>
                  <th className="date-th-invoices">
                    <img src={Group} alt="" />
                    Data de venc.
                  </th>
                  <th className="value-th-invoices">Valor</th>
                  <th className="state-th-invoices">Status</th>
                  <th
                    style={{ minWidth: "300px", marginRight: "20px" }}
                    className="description-th-invoices"
                  >
                    Descrição
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="tbody-container">
                {getDetailClient?.extract.map((charge, index) => {
                  if (charge.id === null) return null;
                  return (
                    <tr className="charge-specific-invoices" key={index}>
                      <td className="invoices-id">{charge.id * 10005 ** 2}</td>
                      <td className="invoices-date">
                        {charge.due_date?.slice(0, 10)}
                      </td>
                      <td className="invoices-value">
                        {formatToMoney(Number(charge.invoice_value))}
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
                      <td
                        style={{ minWidth: "300px", marginRight: "20px" }}
                        className="td-description"
                      >
                        {charge.description}
                      </td>
                      <td>
                        <img
                          className="btn-edit"
                          onClick={() => {
                            const client = {
                              client_name: getDetailClient?.name,
                              client_email: getDetailClient?.email,
                              id: charge.id,
                              description: charge.description,
                              due_date: charge.due_date,
                              invoice_value: charge.invoice_value,
                              status: charge.status,
                            };
                            setFormInvoice(client);
                            handleClick();
                          }}
                          src={BtnEditar}
                          alt="Editar"
                        />
                        <img
                          className="btn-delete"
                          onClick={() => {
                            document
                              .getElementById(`${charge.id}`)
                              .classList.remove("hidden");
                          }}
                          src={BtnExcluir}
                          alt="Excluir"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      }
      {modalCharge && (
        <ModalAddCharge
          idClient={{ id: idClient, name: getDetailClient?.name }}
          setIdClient={setIdClient}
          setModalCharge={setModalCharge}
        />
      )}
    </>
  );
}
