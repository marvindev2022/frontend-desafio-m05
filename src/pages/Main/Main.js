import Header from "./../../components/Header/Header";
import Table from "./../../components/table/Table";
import Menu from "./../../components/Menu/Menu";
import {ClientsListProvider} from "./../../context/clientsContext";
import {getItem, setItem} from "./../../utils/storage";
import Home from "./../../components/Home/home";
import "./main.tyles.css.css"
import DialgUser from "../../components/DialogUser/DialogUser";
import { useState, useEffect } from "react";
export default function Main() {
  setItem("sectionSelected", (getItem("sectionSelected") ?? "home"));
  const [render, setRender] = useState(false);
useEffect(()=>{
  setRender(false)
},[render])
  return (
    <ClientsListProvider>
      <main style={{margin:"0 auto"}}>
        <Header />
        <Menu setRender={setRender}/>
        <section
          style={{
          paddingLeft:"110px"
          }}
        >
          {getItem("sectionSelected") === "home" ? <Home /> : <></>}
          {getItem("sectionSelected") === "clients" ? <Table /> : <></>}
        </section>
        <DialgUser/>
      </main>

    </ClientsListProvider>
  );
}
