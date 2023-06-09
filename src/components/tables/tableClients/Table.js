import useInvoicesProvider from "./../../../hooks/Invoices/useInvoicesProvider";
import IconeClients from "./../../../assets/Frame.svg";
import Magnifier from "./../../../assets/magnifier.svg";
import Filter from "./../../../assets/filter.svg";
import Group from "./../../../assets/group.svg";
import Charge from "./../../../assets/charge.svg";
import { useEffect, useState } from "react";
import ModalAddClients from "./../../Modal-add-Cliens/Modal-add-clients";
import useClientsProvider from "./../../../hooks/useClientsProvider";
import ModalAddCharge from "./../../Modal-add-Charge/Modal-add-Charge";
import ClientDetail from "./../../ClientDetail/ClientDetail";
import { formatCpf, formatPhone } from "./../../../utils/formatters";
import { getItem, setItem } from "./../../../utils/storage";
import { verifyDue } from "./../../../utils/verifyDue";
import { loadClients } from "./../../../utils/requisitions";
import DialogStatus from "./../../FilterStatusInvoices/DialogStatus";
import "./table.styles.css";
import { filterStatusClients } from "./../../FilterStatusInvoices/FilterStatus";

export default function Table() {
  const {
    clientsList,
    setClientsList,
    detalhandoCliente,
    setDetalhandoCliente,
  } = useClientsProvider();

  const { invoicesList } = useInvoicesProvider();
  const [modal, setModal] = useState(false);
  const [render, setRender] = useState(false);
  const [order, setOrder] = useState(false);
  const [client, setClient] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState(getItem("filterBy ") ?? false);
  const [modalCharge, setModalCharge] = useState(false);
  const [closeClientDetail, setCloseClientDetail] = useState(false);
  const listCharge = !order
    ? clientsList?.sort((a, b) => a.name.localeCompare(b.name))
    : clientsList?.sort((a, b) => b.name.localeCompare(a.name));

  function handleChange({ target }) {
    setSearchText(target.value.toLowerCase());
    const searchTerm = target.value.toLowerCase();
    if (!searchTerm) return;
    const filteredClientsList = clientsList?.filter(
      (client) =>
        client.name.toLowerCase().includes(searchText.toLowerCase()) ||
        client.cpf.toString().includes(searchText) ||
        client.email.toLowerCase().includes(searchText)
    );
    setClientsList(filteredClientsList);
  }

  useEffect(() => {
    async function fecthClientList() {
      const newClientsList = await loadClients();
      setClientsList(newClientsList);
      filterStatusClients(filter, setClientsList, newClientsList, invoicesList);
    }

    setDetalhandoCliente(false);
    fecthClientList();
  }, [
    invoicesList,
    filter,
    render,
    setClientsList,
    closeClientDetail,
    setDetalhandoCliente,
    searchText,
  ]);

  const filteredClients = clientsList?.filter(
    (client) =>
      client.name.toLowerCase().includes(searchText.toLowerCase()) ||
      client.cpf.toString().includes(searchText) ||
      client.email.toLowerCase().includes(searchText)
  );

  return (
    <>
      <DialogStatus setFilter={setFilter} reference={"clients"} />
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
          client={client}
          setClient={setClient}
          setModalCharge={setModalCharge}
        />
      )}
      {detalhandoCliente ? (
        <ClientDetail
          closeClientDetail={closeClientDetail}
          setCloseClientDetail={setCloseClientDetail}
          render={render}
          setRender={setRender}
          client={client}
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
              <img
                onClick={() =>
                  document.querySelector(".dialog-status").showModal()
                }
                className="filtro-img"
                src={Filter}
                alt="Icone Filtro"
              />
              <div className="input-div">
                <input
                  onChange={handleChange}
                  className="input-search"
                  placeholder="Pesquisa"
                  type="search"
                />
                <img src={Magnifier} alt="icone lupa" />
              </div>
            </div>
          </div>
          <table className="Table">
            <thead>
              <tr className="header-charge">
                <th
                  onClick={() => {
                    setOrder(!order);
                  }}
                  className="client"
                >
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
            <tbody className="tbody-clients">
              {(filteredClients ?? listCharge)?.map((charge) => (
                <tr key={charge.id} className="charge-specific">
                  <td
                    onClick={() => {
                      setClient(charge);

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
                        setClient({ name: charge.name, id: charge.id });
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
