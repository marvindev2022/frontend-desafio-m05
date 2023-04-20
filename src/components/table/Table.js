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
      name: "Maria Souza",
      cpf: "123 456 789 00",
      email: "mariaso@gmail.com",
      tell: "11 99999-8888",
      status: "Em dia",
    },
    {
      id: 2,
      name: "José Santos",
      cpf: "987 654 321 00",
      email: "josesantos@gmail.com",
      tell: "21 98888-7777",
      status: "Inadimplente",
    },
    {
      id: 3,
      name: "Ana Silva",
      cpf: "456 789 123 00",
      email: "anasilva@hotmail.com",
      tell: "31 97777-6666",
      status: "Inadimplente",
    },
    {
      id: 4,
      name: "Lucas Oliveira",
      cpf: "654 321 987 00",
      email: "lucasoliveira@gmail.com",
      tell: "41 96666-5555",
      status: "Inadimplente",
    },
    {
      id: 5,
      name: "Fernanda Santos",
      cpf: "789 123 456 00",
      email: "fernandas@gmail.com",
      tell: "51 95555-4444",
      status: "Em dia",
    },
    {
      id: 6,
      name: "Gabriel Lima",
      cpf: "321 987 654 00",
      email: "gabriellima@hotmail.com",
      tell: "61 94444-3333",
      status: "Em dia",
    },
    {
      id: 7,
      name: "Julia Costa",
      cpf: "159 753 852 00",
      email: "juliacosta@gmail.com",
      tell: "71 93333-2222",
      status: "Inadimplente",
    },
    {
      id: 8,
      name: "Ricardo Almeida",
      cpf: "753 159 852 00",
      email: "ricardoalmeida@gmail.com",
      tell: "81 92222-1111",
      status: "Em dia",
    },
    {
      id: 9,
      name: "Camila Santos",
      cpf: "852 753 159 00",
      email: "camilas@hotmail.com",
      tell: "91 91111-0000",
      status: "Inadimplente",
    },
    {
      id: 10,
      name: "Thiago Pereira",
      cpf: "456 852 753 00",
      email: "thiagopereira@gmail.com",
      tell: "31 90000-9999",
      status: "Em dia",
    },
    {
      id: 11,
      name: "Mariana Carvalho",
      cpf: "753 456 852 00",
      email: "marianacarvalho@hotmail.com",
      tell: "81 88888-7777",
      status: "Em dia",
    },
    {
      id: 12,
      name: "Pedro Rodrigues",
      cpf: "258 369 147 00",
      email: "pedrorodrigues@gmail.com",
      tell: "11 87777-6666",
      status: "Inadimplente",
    },
  ];

  return (
    <>
      <div className="header-clients">
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
          {listCharge.slice(0,11).map((charge, index) => (
            <tr key={charge.id} className="charge-specific">
              <td className="client">{charge.name}</td>
              <td className="cpf">{charge.cpf}</td>
              <td className="email">{charge.email}</td>
              <td className="tell">{charge.tell}</td>
              <td className="status">
                <span
                  className={`${
                    charge.status === "Inadimplente" ? "inadimplente" : "em-dia"
                  }`}
                >
                  {charge.status}
                </span>
              </td>
              <td className="create-charge">
                <img src={Charge} alt="" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
