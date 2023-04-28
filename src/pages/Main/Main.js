import { useEffect } from "react";
import { getItem, setItem } from "./../../utils/storage";
import { ClientsListProvider } from "./../../context/clientsContext";
import { InvoicesListProvider } from "./../../context/invoices/invoicesContext";
import Header from "./../../components/Header/Header";
import Table from "./../../components/table/Table";
import TableInvoices from "../../components/TableInvoices/TableInvoices";
import Menu from "./../../components/Menu/Menu";
import Home from "./../../components/Home/home";
import DialgUser from "../../components/DialogUser/DialogUser";
import "./main.styles.css";
import useClientsProvider from "../../hooks/useClientsProvider";
import useInvoicesProvider from "../../hooks/Invoices/useInvoicesProvider";

export default function Main() {
  setItem("sectionSelected", getItem("sectionSelected") ?? "home");
  const { render, setRender } = useClientsProvider();
  const { renderInvoices, setRenderInvoices } = useInvoicesProvider();
  useEffect(() => {
    setRender(true);
    setRenderInvoices(true)
  }, [render, renderInvoices]);
  return (
    <ClientsListProvider>
      <InvoicesListProvider>
        <main>
          <Header render={render} setRender={setRender} />
          <Menu render={render} setRender={setRender} />
          <section className="section-main">
            {getItem("sectionSelected") === "home" ? <Home /> : <></>}
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
          <DialgUser />
        </main>
      </InvoicesListProvider>
    </ClientsListProvider>
  );
}
