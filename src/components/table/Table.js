import IconeClients from "../../assets/Frame.svg";
import Magnifier from "../../assets/magnifier.svg";
import Filter from "../../assets/filter.svg";
import Group from "../../assets/group.svg";
import Charge from "../../assets/charge.svg";
import "./table.styles.css";
import { useEffect, useState } from "react";
import ModalAddClients from "../Modal-add-Cliens/Modal-add-clients";
import useClientsProvider from "../../hooks/useClientsProvider";
import { formatCpf, formatPhone } from "../../utils/formatters";
import ModalAddCharge from "../Modal-add-Charge/Modal-add-Charge";
import ClientDetail from "./../../components/ClientDetail/ClientDetail";
import { removeItem, setItem } from "../../utils/storage";
export default function Table({ setRender }) {
  const { clientsList, detalhandoCliente, setDetalhandoCliente } =
    useClientsProvider();

  const [idClient, setIdClient] = useState(0);
  const [modalCharge, setModalCharge] = useState(false);
  const [modal, setModal] = useState(false);
  const listCharge = clientsList.sort((a, b) => b.id - a.id);

  useEffect(() => {
    setRender((prevRender) => !prevRender);
    removeItem("detailClient");
  }, [setRender]);
  return (
    <>
      {detalhandoCliente ? (
        <ClientDetail setRender={setRender} idClient={idClient} />
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
              {listCharge.slice(0, 11).map((charge, index) => (
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
                        (charge.status ?? "Em dia") === "Inadimplente"
                          ? "pendent-state"
                          : "paid-state"
                      }`}
                    >
                      {charge.status ?? "Em Dia"}
                    </span>
                  </td>
                  <td className="create-charge">
                    <img
                      onClick={() => {
                        setModalCharge(!modalCharge);
                        setIdClient(charge.id);
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
      {modal && <ModalAddClients setModal={setModal} modal={modal} />}
      {modalCharge && (
        <ModalAddCharge
          idClient={idClient}
          setIdClient={setIdClient}
          setModalCharge={setModalCharge}
        />
      )}
    </>
  );
}
