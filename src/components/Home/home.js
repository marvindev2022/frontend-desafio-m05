import paidInvoiceIcon from "./../../assets/ícone- Cobrança Paga-Color.svg";
import overdueInvoiceIcon from "./../../assets/ícone- Corbança Pendente-Color.svg";
import predictedInvoiceIcon from "./../../assets/ícone- Corbança Vencida-Color.svg";
import "./home.styles.css";

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
            <strong>R$ 25.000,00</strong>
          </span>
        </div>
        <div className="billing-container paid-invoice-billing-container">
          <span className="container-card-header">
            <h2>Cobranças</h2>
            <h3 className="predicted-length">08</h3>
          </span>
          <span className="section-table-card">
            <table></table>
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
            <strong>R$ 2.500,00</strong>
          </span>
        </div>
        <div className="billing-container overdue-invoice-billing-container">
          <span className="container-card-header">
            <h2>Cobranças</h2>
            <h3 className="overdue-length">05</h3>
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
            <strong>R$ 10.000,00</strong>
          </span>
        </div>
        <div className="billing-container predicted-invoice-billing-container">
          <span className="container-card-header">
            <h2>Cobranças</h2>
            <h3 className="paid-length">04</h3>
          </span>
        </div>
      </section>
    </main>
  );
}
