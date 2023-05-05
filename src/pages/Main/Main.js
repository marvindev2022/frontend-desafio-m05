import { useEffect } from "react";
import { getItem, setItem } from "./../../utils/storage";
import { ClientsListProvider } from "./../../context/clientsContext";
import { InvoicesListProvider } from "./../../context/invoices/invoicesContext";
import Header from "./../../components/Header/Header";
import Table from "./../../components/tableClients/Table";
import TableInvoices from "../../components/TableInvoices/TableInvoices";
import Menu from "./../../components/Menu/Menu";
import Home from "./../../components/Home/home";
import DialogEditUser from "../../components/DialogEditUser/DialogEditUser";
import "./main.styles.css";
import useClientsProvider from "../../hooks/useClientsProvider";
import useInvoicesProvider from "../../hooks/Invoices/useInvoicesProvider";

export default function Main() {
  setItem("sectionSelected", getItem("sectionSelected") ?? "home");
  const { renderInvoices, setRenderInvoices } = useInvoicesProvider();
  const { render, setRender } = useClientsProvider();

  useEffect(() => {
    setRender(true);
    setRenderInvoices(true);
  }, [render, renderInvoices, setRender, setRenderInvoices]);

  return (
    <ClientsListProvider>
      <InvoicesListProvider>
        <main>
          <Header render={render} setRender={setRender} />
          <Menu render={render} setRender={setRender} />
          <section className="section-main">
            {getItem("sectionSelected") === "home" ? <Home render={render} setRender={setRender} /> : <></>}
            {getItem("sectionSelected") === "clients" ? (
              <Table render={render} setRender={setRender} />
            ) : (
              <></>
            )}
            {getItem("sectionSelected") === "charges" ? (
              <TableInvoices />
            ) : (
              <></>
            )}
          </section>
          <DialogEditUser />
        </main>
      </InvoicesListProvider>
    </ClientsListProvider>
  );
}
