import { useState, useEffect } from "react";
import { getItem, setItem } from "./../../utils/storage";
import { ClientsListProvider } from "./../../context/clientsContext";
import { InvoicesListProvider } from "./../../context/invoices/invoicesContext";
import Header from "./../../components/Header/Header";
import Table from "./../../components/table/Table";
import TableInvoices from "../../components/TableInvoices/TableInvoices";
import Menu from "./../../components/Menu/Menu";
import Home from "./../../components/Home/home";
import DialgUser from "../../components/DialogUser/DialogUser";
import "./main.tyles.css.css";

export default function Main() {
  setItem("sectionSelected", getItem("sectionSelected") ?? "home");
  const [render, setRender] = useState(false);
  useEffect(() => {
    setRender(true);
  }, [render]);
  return (
    <ClientsListProvider>
      <InvoicesListProvider>
        <main>
          <Header render={render} setRender={setRender} />
          <Menu setRender={setRender} />
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
