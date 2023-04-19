import TableListCard from "../tableCard/tableCard";
import paidInvoiceIcon from "./../../assets/ícone- Cobrança Paga-Color.svg";
import overdueInvoiceIcon from "./../../assets/ícone- Corbança Pendente-Color.svg";
import predictedInvoiceIcon from "./../../assets/ícone- Corbança Vencida-Color.svg";
import "./home.styles.css";

const cobranca = [
  {
    name: "Sara Silva",
    id: "315153135131",
    value: "R$1000,00",
  },
  {
    name: "João Santos",
    id: "532135134511",
    value: "R$500,00",
  },
  {
    name: "Maria Oliveira",
    id: "135135135135",
    value: "R$750,00",
  },
  {
    name: "Pedro Souza",
    id: "213515313515",
    value: "R$250,00",
  },
  {
    name: "Ana Pereira",
    id: "351351351351",
    value: "R$1250,00",
  },
  {
    name: "Lucas Vieira",
    id: "531531351351",
    value: "R$300,00",
  },
  {
    name: "Paula Santos",
    id: "351351531351",
    value: "R$900,00",
  },
  {
    name: "Rafaela Rodrigues",
    id: "135135135135",
    value: "R$1500,00",
  },
];
export default function Home() {

  return (
    <main className="home-main">
      <section className="invoice-section paid-invoice">
        <div className="invoice-container paid-invoice-container">
          <img
            className="image-card"
            src={paidInvoiceIcon}
            alt="cobranças pagas"
          />
          <span>
            <h1>Cobranças pagas</h1>
            <strong>R$ 30.000</strong>
          </span>
        </div>
        <div className="billing-container paid-invoice-billing-container">
          <span className="container-card-header">
            <h2>Cobranças pagas</h2>
            <h3 className="predicted-length">{cobranca.slice(0, 8).length}</h3>
          </span>
          <span className="section-table-card">
            <TableListCard invoice={cobranca.slice(0, 8)} />
          </span>
        </div>
      </section>
      <section className="invoice-section overdue-invoice">
        <div className="invoice-container overdue-invoice-container">
          <img
            className="image-card"
            src={overdueInvoiceIcon}
            alt="cobranças vencidas"
          />
          <span>
            <h1>Cobranças vencidas</h1>
            <strong>R$ 7.000</strong>
          </span>
        </div>
        <div className="billing-container overdue-invoice-billing-container">
          <span className="container-card-header">
            <h2>Cobranças vencidas</h2>
            <h3 className="overdue-length">{cobranca.slice(0, 5).length}</h3>
          </span>
          <span className="section-table-card">
            <TableListCard invoice={cobranca.slice(0, 5)} />
          </span>
        </div>
      </section>
      <section className="invoice-section predicted-invoice">
        <div className="invoice-container predicted-invoice-container">
          <img
            className="image-card"
            src={predictedInvoiceIcon}
            alt="cobranças previstas"
          />
          <span>
            <h1>Cobranças previstas</h1>
            <strong>R$ 10.000</strong>
          </span>
        </div>
        <div className="billing-container predicted-invoice-billing-container">
          <span className="container-card-header">
            <h2>Cobranças precista</h2>
            <h3 className="paid-length">{cobranca.slice(0, 4).length}</h3>
          </span>
          <span className="section-table-card">
            <TableListCard invoice={cobranca.slice(0, 4)} />
          </span>
        </div>
      </section>
    </main>
  );
}
