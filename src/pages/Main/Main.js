import Header from "./../../components/Header/Header";
import Table from "./../../components/table/Table";
import Menu from "./../../components/Menu/Menu";
import {ClientsListProvider} from "./../../context/clientsContext";
import {getItem, setItem} from "./../../utils/storage";
import Home from "./../../components/Home/home";
import "./main.tyles.css.css"
export default function Main() {
  setItem("sectionSelected", (getItem("sectionSelected") ?? "home"));
  return (
    <ClientsListProvider>
      <main>
        <Header />
        <Menu />
        <section
          style={{
          paddingLeft:"110px"
          }}
        >
          {getItem("sectionSelected") === "home" ? <Home /> : <></>}
          {getItem("sectionSelected") === "clients" ? <Table /> : <></>}
        </section>
      </main>
    </ClientsListProvider>
  );
}
