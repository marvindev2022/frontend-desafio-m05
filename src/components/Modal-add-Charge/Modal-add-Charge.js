import "./DialogAdd.styles.css";
import Check from "../../assets/check.svg";
import File from "../../assets/file.svg";
import Close from "../../assets/x.svg";
import { useState } from "react";
import InputMask from "react-input-mask";
import api from "./../../service/instance"
export default function ModalAddCharge({
  setIdClient,
  setModalCharge,
}) {
  const [clientName, setClientName] = useState("");
  const [erroDate, setErroDate] = useState("");
  const [erroValue, setErroValue] = useState("");
  const [erroDescription, setErroDescription] = useState("");
  const [pay, setPay] = useState(true);
  const [form, setForm] = useState({
    description: "",
    date: "",
    value: "",
  });

  function fecharModal() {
    setForm({
      description: "",
      date: "",
      value: "",
    });
    setClientName("");
    setIdClient(0);

    setModalCharge(false);
  }

  function handleChange({ target }) {
    setForm((prevForm) => ({
      ...prevForm,
      [target.name]: target.value,
    }));
  }

 async function handleSubmit() {
    if (!form.description || !form.date || !form.value) {
      if (!form.description) {
        setErroDescription("Este campo deve ser preenchido");
        
      } else {
        setErroDescription("");
      }
      if (!form.date) {
        setErroDate("Este campo deve ser preenchido");
        
      } else {
        setErroDate("");
      }
      if (!form.value) {
        setErroValue("Este campo deve ser preenchido");
        
      } else {
        setErroValue("");
      }
      
     await api.post("/",{},{
    headers:{
      authorization:`bearer token`
    }
  })
    }

    // let status = pay === true ? "pago" : "pendente";

    try {
    } catch (error) {}
  }

  return (
    <div className="ModalAddCharge">
      <div className="form-add-charge">
        <h1>
          <img src={File} alt="icone de uma pagina" />
          Cadastro de cobranças
        </h1>
        <label>Nome*</label>
        <span className="name">{clientName}</span>
        <label htmlFor="description">Descrição*</label>
        <input
          name="description"
          value={form.description}
          className="descricao"
          type="text"
          placeholder="Digite a descrição"
        />
        <span>{erroDescription}</span>
        <div className="divider-form">
          <div className="column">
            <label htmlFor="date">Vencimento:*</label>
            <InputMask
              mask={"99/99/9999"}
              onChange={handleChange}
              name="date"
              value={form.date}
              type="text"
              placeholder="Data de Vencimento"
            ></InputMask>
            <span>{erroDate}</span>
          </div>
          <div className="column">
            <label htmlFor="value">Valor:*</label>
            <input
              onChange={handleChange}
              name="phone"
              value={form.value}
              type="text"
              placeholder="Digite o valor"
            />
            <span>{erroValue}</span>
          </div>
        </div>
        <div onClick={() => setPay(true)} className="set-pay">
          {pay === true ? (
            <img className="size" src={Check} alt="Icone selecionado" />
          ) : (
            <div className="circulo"></div>
          )}
          Cobrança Paga
        </div>
        <div onClick={() => setPay(false)} className="set-pay">
          {pay === false ? (
            <img className="size" src={Check} alt="Icone selecionado" />
          ) : (
            <div className="circulo"></div>
          )}
          Cobrança Pendente
        </div>
        <div className="buttons">
          <button onClick={fecharModal} className="grey">
            Cancelar
          </button>
          <button onClick={handleSubmit} className="pink">
            Aplicar
          </button>
        </div>
        <img
          onClick={fecharModal}
          className="btn-sair"
          src={Close}
          alt="Botão sair"
        />
      </div>
    </div>
  );
}
