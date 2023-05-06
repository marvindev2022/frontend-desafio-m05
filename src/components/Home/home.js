import TableListCard from "../tableCard/tableCard";
import TableListClients from "../TableCardListClientsState/TableListClients";
import paidInvoiceIcon from "./../../assets/ícone- Cobrança Paga-Color.svg";
import predictedInvoiceIcon from "./../../assets/ícone- Corbança Pendente-Color.svg";
import unpaidInvoiceIcon from "./../../assets/ícone- Corbança Vencida-Color.svg";
import iconUnpaid from "./../../assets/ícone- Cliente Inadimplente-Color.svg";
import iconPaid from "./../../assets/Frame (1).svg";
import "./home.styles.css";
import useInvoicesProvider from "../../hooks/Invoices/useInvoicesProvider";
import { formatToMoney } from "../../utils/formatters";
import useClientsProvider from "../../hooks/useClientsProvider";
import {  removeItem,setItem } from "../../utils/storage";

function findClientsWithPendingInvoices(clients, invoices) {
  const currentDate = new Date();
  const result = [];

  removeItem("filterBy")
  
  clients?.forEach((client) => {
    const hasPendingInvoice = invoices?.some((invoice) => {
      return (
        invoice.client_email === client.email &&
        invoice.status === "pendente" &&
        new Date(invoice.due_date) < currentDate
      );
    });
    if (hasPendingInvoice) {
      result.push(client);
    }
  });

  return result;
}
export default function Home({ render, setRender }) {
  const { invoicesList } = useInvoicesProvider();
  const { clientsList } = useClientsProvider();
  const { paid, predicted, unpaid } = invoicesList;

  const overDueClients = findClientsWithPendingInvoices(
    clientsList,
    invoicesList?.all
  );

  const predictdedValue = predicted?.reduce((total, transaction) => {
    return total + Number(transaction.invoice_value);
  }, 0);
  const paidValue = paid?.reduce((total, transaction) => {
    return total + Number(transaction.invoice_value);
  }, 0);
  const unpaidValue = unpaid?.reduce((total, transaction) => {
    return total + Number(transaction.invoice_value);
  }, 0);

  function handleClick(event, referencelist) {
    if (referencelist === "paid") {
      setItem("filterBy", "paid");
      setItem("sectionSelected", "charges");
      setRender(!render);
    }
    if (referencelist === "unpaid") {
      setItem("filterBy", "due");
      setItem("sectionSelected", "charges");
      setRender(!render);
    }
    if (referencelist === "predicted") {
      setItem("filterBy", "predicted");
      setItem("sectionSelected", "charges");
      setRender(!render);
    }
    if (referencelist === "em dia") {
      setItem("filterBy", "em dia");
      setItem("sectionSelected", "clients");
      setRender(!render);
    }
    if (referencelist === "inadimplente") {
      setItem("filterBy", "inadimplente");
      setItem("sectionSelected", "clients");
      setRender(!render);
    }
    
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
              <strong style={{ marginLeft: "-20px" }}>
                {formatToMoney(Number(paidValue))}
              </strong>
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
            <span
              onClick={(event) => handleClick(event, "unpaid")}
              className="container-link"
            >
              Ver Tudo
            </span>
          </div>
        </div>
        <div className="invoice-section predicted-invoice">
          <div className="invoice-container predicted-invoice-container">
            <img
              className="image-card"
              src={unpaidInvoiceIcon}
              alt="cobranças vencidas"
            />
            <span>
              <h1>Cobranças vencidas</h1>
              <strong style={{ marginLeft: "-20px" }}>
                {formatToMoney(Number(unpaidValue))}
              </strong>
            </span>
          </div>
          <div className="billing-container predicted-invoice-billing-container">
            <span className="container-card-header">
              <h2>Cobranças previstas</h2>
              <h3 className="predicted-length">{predicted?.length}</h3>
            </span>
            <span className="section-table-card">
              <TableListCard invoice={predicted} />
            </span>
            <span
              onClick={(event) => handleClick(event, "predicted")}
              className="container-link"
            >
              Ver Tudo
            </span>
          </div>
        </div>
        <div className="invoice-section unpaid-invoice">
          <div className="invoice-container unpaid-invoice-container">
            <img
              className="image-card"
              src={predictedInvoiceIcon}
              alt="cobranças previstas"
            />
            <span>
              <h1>Cobranças previstas</h1>
              <strong style={{ marginLeft: "-20px" }}>
                {formatToMoney(Number(predictdedValue))}
              </strong>
            </span>
          </div>
          <div className="billing-container unpaid-invoice-billing-container">
            <span className="container-card-header">
              <h2>Cobranças pagas</h2>
              <h3 className="paid-length">{paid?.length}</h3>
            </span>
            <span className="section-table-card">
              <TableListCard invoice={paid} />
            </span>
            <span
              onClick={(event) => handleClick(event, "paid")}
              className="container-link"
            >
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
            <h3 className="unpaid-length">{overDueClients?.length}</h3>
          </div>
          <div>
            <TableListClients clients={overDueClients} />
          </div>
          <div
            onClick={(event) => handleClick(event, "inadimplente")}
            className="container-viewall"
          >
            Ver Tudo
          </div>
        </div>

        <div>
          <div className="container-clients-list-transactions">
            <span className="container-details">
              <img src={iconPaid} alt="Clientes em dia" />
              <p> Clientes em dia</p>{" "}
            </span>
            <h3 className="paid-length">
              {
                clientsList.filter(
                  (client) =>
                    !overDueClients.some(
                      (overDueClient) => overDueClient.email === client.email
                    )
                )?.length
              }
            </h3>
          </div>
          <div>
            <TableListClients
              clients={clientsList.filter(
                (client) =>
                  !overDueClients.some(
                    (overDueClient) => overDueClient.email === client.email
                  )
              )}
            />
          </div>
          <div
            onClick={(event) => handleClick(event, "em dia")}
            className="container-viewall"
          >
            Ver Tudo
          </div>
        </div>
      </section>
    </main>
  );
}
