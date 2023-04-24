import TableListCard from "../tableCard/tableCard";
import TableListClients from "../TableListClients/TableListClients";
import paidInvoiceIcon from "./../../assets/ícone- Cobrança Paga-Color.svg";
import predictedInvoiceIcon from "./../../assets/ícone- Corbança Pendente-Color.svg";
import unpaidInvoiceIcon from "./../../assets/ícone- Corbança Vencida-Color.svg";
import iconUnpaid from "./../../assets/ícone- Cliente Inadimplente-Color.svg";
import iconPaid from "./../../assets/Frame (1).svg";
import "./home.styles.css";
import useInvoicesProvider from "../../hooks/Invoices/useInvoicesProvider";
const cobranca = [
  {
    client_name: "Sara Silva",
    id: "315153135131",
    invoice_value: "R$1000,00",
  },
  {
    client_name: "João Santos",
    id: "532135134511",
    invoice_value: "R$500,00",
  },
  {
    client_name: "Maria Oliveira",
    id: "135135135135",
    invoice_value: "R$750,00",
  },
  {
    client_name: "Pedro Souza",
    id: "213515313515",
    invoice_value: "R$250,00",
  },
  {
    client_name: "Ana Pereira",
    id: "351351351351",
    invoice_value: "R$1250,00",
  },
  {
    client_name: "Lucas Vieira",
    id: "531531351351",
    invoice_value: "R$300,00",
  },
  {
    client_name: "Paula Santos",
    id: "351351531351",
    invoice_value: "R$900,00",
  },
  {
    client_name: "Rafaela Rodrigues",
    id: "135135135135",
    invoice_value: "R$1500,00",
  },
];
const transactions = [
  {
    client_name: "Sara Silva",
    due_date: "12/05/1990",
    invoice_value: "R$1000,00",
  },
  {
    client_name: "João Santos",
    due_date: "12/05/1990",
    invoice_value: "R$500,00",
  },
  {
    client_name: "Maria Oliveira",
    due_date: "12/05/1990",
    invoice_value: "R$750,00",
  },
  {
    client_name: "Pedro Souza",
    due_date: "12/05/1990",
    invoice_value: "R$250,00",
  },
  {
    client_name: "Ana Pereira",
    due_date: "12/05/1990",
    invoice_value: "R$1250,00",
  },
  {
    client_name: "Lucas Vieira",
    due_date: "12/05/1990",
    invoice_value: "R$300,00",
  },
  {
    client_name: "Paula Santos",
    due_date: "12/05/1990",
    invoice_value: "R$900,00",
  },
  {
    client_name: "Rafaela Rodrigues",
    due_date: "12/05/1990",
    invoice_value: "R$1500,00",
  },
];
export default function Home() {
  const { invoicesList } = useInvoicesProvider();
  const { all, paid, unpaid } = invoicesList;
  function handleClick(referencelist) {
    if (referencelist === "paid") return;
    if (referencelist === "unpaid") return;
    if (referencelist === "predicted") return;
  }
  return (
    <main className="home-main">
      <section className="section-details-home">
        <div className="invoice-section paid-invoice">
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
              <h2>Cobranças vencidas</h2>
              <h3 className="unpaid-length">{unpaid?.length}</h3>
            </span>
            <span className="section-table-card">
              <TableListCard invoice={unpaid} />
            </span>
            <span onClick={handleClick("unPaid")} className="container-link">
              Ver Tudo
            </span>
          </div>
        </div>
        <div className="invoice-section predicted-invoice">
          <div className="invoice-container predicted-invoice-container">
            <img
              className="image-card"
              src={predictedInvoiceIcon}
              alt="cobranças vencidas"
            />
            <span>
              <h1>Cobranças vencidas</h1>
              <strong>R$ 7.000</strong>
            </span>
          </div>
          <div className="billing-container predicted-invoice-billing-container">
            <span className="container-card-header">
              <h2>Cobranças previstas</h2>
              <h3 className="predicted-length">{all?.length}</h3>
            </span>
            <span className="section-table-card">
              <TableListCard invoice={all} />
            </span>
            <span onClick={handleClick("predicted")} className="container-link">
              Ver Tudo
            </span>
          </div>
        </div>
        <div className="invoice-section unpaid-invoice">
          <div className="invoice-container unpaid-invoice-container">
            <img
              className="image-card"
              src={unpaidInvoiceIcon}
              alt="cobranças previstas"
            />
            <span>
              <h1>Cobranças previstas</h1>
              <strong>R$ 10.000</strong>
            </span>
          </div>
          <div className="billing-container unpaid-invoice-billing-container">
            <span className="container-card-header">
              <h2>Cobranças pagas</h2>
              <h3 className="paid-length">{unpaid?.length}</h3>
            </span>
            <span className="section-table-card">
              <TableListCard invoice={unpaid} />
            </span>
            <span onClick={handleClick("paid")} className="container-link">
              Ver Tudo
            </span>
          </div>
        </div>
      </section>

      <section>
        <div>
          <div className="container-clients-list-transactions">
            <span className="container-details">
              <img src={iconUnpaid} alt="Clientes inadimplente" />
              <p> Clientes inadimplente</p>
            </span>
            <h3 className="unpaid-length">{unpaid?.length}</h3>
          </div>
          <div>
            <TableListClients transactions={transactions} />
          </div>
          <div onClick={handleClick("paid")} className="container-viewall">
            Ver Tudo
          </div>
        </div>

        <div>
          <div className="container-clients-list-transactions">
            <span className="container-details">
              <img src={iconPaid} alt="Clientes em dia" />
              <p> Clientes em dia</p>{" "}
            </span>
            <h3 className="paid-length">{paid?.length}</h3>
          </div>
          <div>
            <TableListClients transactions={transactions} />
          </div>
          <div onClick={handleClick("paid")} className="container-viewall">
            Ver Tudo
          </div>
        </div>
      </section>
    </main>
  );
}
