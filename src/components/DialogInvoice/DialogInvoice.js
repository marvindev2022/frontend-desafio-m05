import { useState, useEffect } from "react";
import { formatToMoney } from "../../utils/formatters";
import { getItem } from "../../utils/storage";
import api from "./../../service/instance";
import exit from "./../../assets/x.svg";
import "./dialogInvoices.css";
import { notifySuccess } from "../../utils/notify";

export default function DialogInvoice({ selectInvoice }) {
  const [formInvoice, setFormInvoice] = useState([]);
  const {
    id,
    description,
    status,
    invoice_value,
    due_date,
    client_email,
    client_name,
  } = formInvoice;

  function handleChange({ target }) {
    setFormInvoice({ ...formInvoice, [target.name]: target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const { data } = await api.put(
      `/invoice/${id}`,
      {
        description: description,
        status: status,
        invoice_value: invoice_value,
        due_date: due_date,
      },
      {
        headers: {
          authorization: `Bearer ${getItem("token")}`,
        },
      }
    );
    notifySuccess(data);
    document.querySelector(".dialog-invoices").close();
  }
  useEffect(() => {
    setFormInvoice(selectInvoice);
  }, [selectInvoice]);

  return (
    <dialog className="dialog-invoices">
      <div className="container-form">
        <span>
          <img
            className="btn-exit"
            onClick={() => {
              setFormInvoice({
                description: "",
                status: "",
                invoice_value: "",
                due_date: "",
                client_name: "",
                client_email: "",
              });
              document.querySelector(".dialog-invoices").close();
            }}
            src={exit}
            alt=""
          />
        </span>
        <form className="form-dialog-invoices" onSubmit={handleSubmit}>
          <label className="label-form">Nome:</label>
          <input type="name" disabled={true} value={client_name} />
          <label className="label-form">Email:</label>
          <input type="email" disabled={true} value={client_email} />
          <label className="label-form">Descrição:</label>
          <textarea
            name="description"
            type="text"
            value={description}
            onChange={handleChange}
          />
          <label className="label-form">Status:</label>
          <select name="status" value={status} onChange={handleChange}>
            <option value="undefined">Selecione o status </option>
            <option value="pendente">Pendente</option>
            <option value="pago">Pago</option>
          </select>
          <label className="label-form">Valor da fatura:</label>
          <input
            name="invoice_value"
            type="text"
            value={formatToMoney(Number(invoice_value))}
            onChange={handleChange}
          />

          <label className="label-form">Data de vencimento:</label>
          <input
            name="due_date"
            type="date"
            value={due_date?.slice(0, 10)}
            onChange={handleChange}
          />

          <span className="container-btn-send">
            <button className="btn-send" type="submit">
              Enviar
            </button>
          </span>
        </form>
      </div>
    </dialog>
  );
}
