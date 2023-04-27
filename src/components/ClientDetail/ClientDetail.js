import BtnExcluir from "../../assets/Botão- Excluir- Tabela.svg";
import BtnEditar from "../../assets/Botão- Editar- Tabela.svg";
import EditeGreen from "../../assets/edit_green.svg";
import Group from "../../assets/group.svg";
import Frame from "../../assets/Frame.svg";
import DialogInvoice from "../DialogInvoice/DialogInvoice";
import useInvoicesProvider from "./../../hooks/Invoices/useInvoicesProvider";
import useClientsProvider from "./../../hooks/useClientsProvider";
import { useEffect, useState } from "react";
import { formatToMoney } from "../../utils/formatters";
import { loadDetailClient } from "../../utils/requisitions";
import "./styles.css";
import { getItem } from "../../utils/storage";

export default function ClientDetail({ idClient, render, setRender }) {
  const [getDetailClient, setGetDetailClient] = useState();
  const { detalhandoCliente, setDetalhandoCliente } = useClientsProvider();

  const { formInvoice, setFormInvoice } = useInvoicesProvider();
  function handleClick() {
    document.querySelector(".dialog-invoices")?.showModal();
  }

  useEffect(() => {
    async function fetchDetailClient() {
      if (idClient) {
        const extractDetail = await loadDetailClient(idClient);
        setGetDetailClient(extractDetail);
      }
    }
    setRender((prevRender) => !prevRender);
    fetchDetailClient();
  }, [idClient, render, setRender, detalhandoCliente]);
  return (
    <>
      <DialogInvoice selectInvoice={formInvoice} />
      {getItem("detailClient") === "true" && (
        <>
          <h1
            onClick={() => {
              console.log(detalhandoCliente);
              setDetalhandoCliente((prevState) => !prevState);
            }}
            className="header-title-clients"
          >
            Clientes
          </h1>
          <p className="header-title-clients-p">{">"}</p>
          <h2 className="header-title-clients-detail">Detalhes do cliente</h2>
        </>
      )}
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
              <button>
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
              <h2>Cobraças do Cliente</h2>
              <button className="pink">+ Nova Cobrança</button>
            </div>
            <div className="info-charge-header">
              <b className="ht id">
                <img src={Group} alt="" />
                ID Cob.
              </b>
              <b className="dv ht">
                <img src={Group} alt="" />
                Data de venc.
              </b>
              <b className="ht v">Valor</b>
              <b className="ht stt">Status</b>
              <b className="dcp ht">Descrição</b>
            </div>
            {getDetailClient?.extract.map((charge, index) => {
              if (charge.id === null) return null;

              return (
                <div className="info-charge-list" key={index}>
                  <span className="ht id">{charge.id}</span>
                  <span className="dv ht">{charge.due_date?.slice(0, 10)}</span>
                  <span className="ht v">
                    {" "}
                    {formatToMoney(Number(charge.invoice_value))}
                  </span>
                  <div className="ht stt">
                    <span
                      className={`${
                        charge.status === "Vencida"
                          ? "vencido"
                          : charge.status === "Pendente"
                          ? "pendente"
                          : "pago"
                      }`}
                    >
                      {charge.status}
                    </span>
                  </div>
                  <div className="dcp gap-list ht">
                    <span>{charge.description} </span>
                    <img
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
                      alt=""
                    />
                    <img
                      onClick={() => {
                        document
                          .getElementById(`${charge.id}`)
                          .classList.remove("hidden");
                      }}
                      src={BtnExcluir}
                      alt=""
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      }
    </>
  );
}
