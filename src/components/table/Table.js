import IconeClients from "../../assets/Frame.svg";
import Magnifier from "../../assets/magnifier.svg";
import Filter from "../../assets/filter.svg";
import Group from "../../assets/group.svg";
import Charge from "../../assets/charge.svg";
import "./table.styles.css";

export default function Table() {
  const listCharge = [
    {
      id: 1,
      name: "nome nome",
      cpf: "258 159 753 99",
      email: "email@email",
      tell: "71 9 9999 9999",
      status: "Em dia"
    },
    {
      id: 2,
      name: "nome nome",
      cpf: "258 159 753 99",
      email: "email@email",
      tell: "71 9 9999 9999",
      status: "Inadimplente"
    },
    {
      id: 3,
      name: "nome nome",
      cpf: "258 159 753 99",
      email: "email@email",
      tell: "71 9 9999 9999",
      status: "Inadimplente"
    },
    {
      id: 4,
      name: "nome nome",
      cpf: "258 159 753 99",
      email: "email@email",
      tell: "71 9 9999 9999",
      status: "Inadimplente"
    }
  ];

  return (
    <div className="Table">
      <div className="header-table">
        <div className="client-header">
          <img src={IconeClients} alt="Icone Clientes" />
          <h1>Clientes</h1>
        </div>
        <div className="nav-header-table">
          <button>+ Adicionar cliente</button>
          <img className="filtro-img" src={Filter} alt="Icone Filtro" />
          <div className="input-div">
            <input type="text" placeholder="Pesquisa" />
            <img src={Magnifier} alt="icone lupa" />
          </div>
        </div>
      </div>
      <div className="table-charge">
        <div className="header-charge">
          <div className="client">
            <img src={Group} alt="" />
            <b>Cliente</b>
          </div>
          <b className="cpf">CPF</b>
          <b className="email">E-mail</b>
          <b className="tell">Telefone</b>
          <b className="status">Status</b>
          <b className="criate-charge">Criar Cobrança</b>
        </div>
        <div className="charge-list">
          {listCharge.map((charge, index) => (
            <div key={charge.id} className="charge-specific">
              <span className="client">{charge.name}</span>
              <span className="cpf">{charge.cpf}</span>
              <span className="email">{charge.email}</span>
              <span className="tell">{charge.tell}</span>
              <div className="status">
                <span
                  className={`${
                    charge.status === "Inadimplente" ? "inadimplente" : "em-dia"
                  }`}
                >
                  {charge.status}
                </span>
              </div>
              <div className="criate-charge">
                <img src={Charge} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
