import "./DialogAdd.styles.css";
import Check from "../../assets/check.svg";
import File from "../../assets/file.svg";
import Close from "../../assets/x.svg";
import { useState } from "react";
import InputMask from "react-input-mask";
import api from "./../../service/instance";
import { formatToDate, formatToMoney } from "../../utils/formatters";
import { getItem } from "../../utils/storage";
import { notifyError, notifySuccess } from "../../utils/notify";
export default function ModalAddCharge({
  idClient,
  setIdClient,
  setModalCharge,
}) {
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
    setIdClient({ id: 0, name: "" });

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
       return notifyError("Descrição deve ser preenchido");
      } else {
        setErroDescription("");
      }
      if (!form.date) {
      return  notifyError("Data deve ser preenchido");
      } else {
        setErroDate("");
      }
      if (!form.value) {
       return notifyError("Valor deve ser preenchido");
      } else {
        setErroValue("");
      }
    }
      let status = pay === true ? "pago" : "pendente";

      try {
        const {data} = await api.post(
          "/invoice",
          {
            description: form.description,
            status,
            invoice_value: form.value,
            due_date: form.date,
            client_id: idClient.id,
          },
          {
            headers: {
              authorization: `Bearer ${getItem("token")}`,
            },
          }
        );
        if(data){
         setForm({
           description: "",
           date: "",
           value: "",
         });
         setIdClient({ id: 0, name: "" });

         setModalCharge(false);
         notifySuccess(data)
      }
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
        <span className="name">{idClient.name}</span>
        <label htmlFor="description">Descrição*</label>
        <textarea
          name="description"
          value={form.description}
          className="descricao"
          onChange={handleChange}
          type="text"
          placeholder="Digite a descrição"
        />
        <span>{erroDescription}</span>
        <div className="divider-form">
          <div className="column">
            <label htmlFor="date">Vencimento:*</label>
            <input
              onChange={handleChange}
              name="date"
              value={form.date?.slice(0, 10)}
              type="date"
              placeholder="Data de Vencimento"
            />
            <span>{erroDate}</span>
          </div>
          <div className="column">
            <label htmlFor="value">Valor:*</label>
            <input
              onChange={handleChange}
              name="value"
              value={formatToMoney(form.value)}
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
