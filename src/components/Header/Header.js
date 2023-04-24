import { getItem } from "../../utils/storage";
import icon from "../../assets/Icon.svg";
import exit from "../../assets/Frame 7921.svg";
import edit from "../../assets/Botão- Editar- Tabela.svg";
import { getInitials } from "../../utils/formatters";
import "./header.styles.css";
import DialogHeader from "../DialogHeader/DialogHeader";

export default function Header() {
  const abrevName = getInitials(getItem("userName"));

  return (
    <header className="header">
      {getItem("sectionSelected") === "home" && (
        <h1 className="header-title">Resumo das cobranças</h1>
      )}
      {getItem("sectionSelected") === "clients" && (
        <h1 className="header-title-clients">Clientes</h1>
      )}
      {getItem("sectionSelected") === "charges" && (
        <h1 className="header-title-clients">Cobranças</h1>
      )}
      <span className="header-user">
        <div className="header-avatar">{abrevName}</div>
        <h2 className="header-username">{getItem("userName")}</h2>
        <img
          src={icon}
          alt="seta abrir dialog"
          className="header-user-options-btn"
          onClick={() => {
            document.querySelector(".dialog-user-options").showModal();
          }}
        />
      </span>

      <DialogHeader edit={edit} exit={exit} />
      <div className="line" />
    </header>
  );
}
