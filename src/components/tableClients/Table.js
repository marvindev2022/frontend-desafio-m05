import useInvoicesProvider from "../../hooks/Invoices/useInvoicesProvider";
import IconeClients from "../../assets/Frame.svg";
import Magnifier from "../../assets/magnifier.svg";
import Filter from "../../assets/filter.svg";
import Group from "../../assets/group.svg";
import Charge from "../../assets/charge.svg";
import { useEffect, useState } from "react";
import ModalAddClients from "../Modal-add-Cliens/Modal-add-clients";
import useClientsProvider from "../../hooks/useClientsProvider";
import ModalAddCharge from "../Modal-add-Charge/Modal-add-Charge";
import ClientDetail from "../ClientDetail/ClientDetail";
import { formatCpf, formatPhone } from "../../utils/formatters";
import { setItem } from "../../utils/storage";
import { verifyDue } from "../../utils/verifyDue";
import { loadClients } from "../../utils/requisitions";
import "./table.styles.css";

export default function Table() {
  const {
    clientsList,
    setClientsList,
    detalhandoCliente,
    setDetalhandoCliente,
  } = useClientsProvider();

  const { invoicesList } = useInvoicesProvider();
  const [idClient, setIdClient] = useState(0);
  const [modalCharge, setModalCharge] = useState(false);
  const [modal, setModal] = useState(false);
  const [render, setRender] = useState(false);
  const [closeClientDetail,setCloseClientDetail] = useState(false)
  const listCharge = clientsList.sort((a, b) => b.id - a.id);

  useEffect(() => {
    async function fecthClientList() {
      const newClientsList = await loadClients();
      setClientsList(newClientsList);
    }
    setDetalhandoCliente(false)
    fecthClientList();
  }, [render, setClientsList,closeClientDetail,setDetalhandoCliente]);

  return (
    <>
      {modal && (
        <ModalAddClients
          render={render}
          setRender={setRender}
          setModal={setModal}
          modal={modal}
        />
      )}
      {modalCharge && (
        <ModalAddCharge
          idClient={idClient}
          setIdClient={setIdClient}
          setModalCharge={setModalCharge}
        />
      )}
      {detalhandoCliente ? (
        <ClientDetail
          closeClientDetail={closeClientDetail}
          setCloseClientDetail={setCloseClientDetail}
          render={render}
          setRender={setRender}
          idClient={idClient}
        />
      ) : (
        <>
          <div className="header-clients">
            <div className="client-header">
              <img src={IconeClients} alt="Icone Clientes" />
              <h1>Clientes</h1>
            </div>
            <div className="nav-header-table">
              <button onClick={() => setModal(!modal)}>
                + Adicionar cliente
              </button>
              <img className="filtro-img" src={Filter} alt="Icone Filtro" />
              <div className="input-div">
                <input type="text" placeholder="Pesquisa" />
                <img src={Magnifier} alt="icone lupa" />
              </div>
            </div>
          </div>
          <table className="Table">
            <thead>
              <tr className="header-charge">
                <th className="client">
                  <img src={Group} alt="" />
                  <span>Cliente</span>
                </th>
                <th className="cpf">CPF</th>
                <th className="email">E-mail</th>
                <th className="tell">Telefone</th>
                <th className="status">Status</th>
                <th className="create-charge">Criar Cobrança</th>
              </tr>
            </thead>
            <tbody>
              {listCharge.map((charge, index) => (
                <tr key={charge.id} className="charge-specific">
                  <td
                    onClick={() => {
                      setIdClient(charge.id);

                      setDetalhandoCliente(!detalhandoCliente);
                      setItem("detailClient", true);
                    }}
                    className="client"
                  >
                    {charge.name}
                  </td>
                  <td className="cpf">{formatCpf(charge.cpf)}</td>
                  <td className="email">{charge.email}</td>
                  <td className="tell">{formatPhone(charge.phone)}</td>
                  <td className="status">
                    <span
                      className={`${
                        invoicesList?.all
                          ?.filter(
                            (invoice) => invoice.client_email === charge.email
                          )
                          .some(
                            (invoice) =>
                              invoice.status === "pendente" &&
                              verifyDue(invoice.due_date) === "due"
                          )
                          ? "pendent-state"
                          : "paid-state"
                      }`}
                    >
                      {invoicesList?.all
                        ?.filter(
                          (invoice) => invoice.client_email === charge.email
                        )
                        .some(
                          (invoice) =>
                            invoice.status === "pendente" &&
                             verifyDue(invoice.due_date) === "due"
                        )
                        ? "Inadimplente"
                        : "Em dia "}
                    </span>
                  </td>
                  <td className="create-charge">
                    <img
                      onClick={() => {
                        setModalCharge(!modalCharge);
                        setIdClient({ name: charge.name, id: charge.id });
                      }}
                      src={Charge}
                      alt=""
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
