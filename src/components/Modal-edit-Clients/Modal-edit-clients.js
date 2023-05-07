import IconeClients from "../../assets/Frame.svg";
import Close from "../../assets/x.svg";
import { useState } from "react";
import api from "../../service/instance";
import "./modal-edit-clients.styles.css";
import { getItem, removeItem } from "../../utils/storage";
import { notifyError, notifySuccess } from "../../utils/notify";
import { formatCpf, formatPhone } from "../../utils/formatters";
import findAddress from "../../utils/findAdress";


export default function DialogEditClient({ client,render,setRender }) {
  const [erroName, setErroName] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroCPF, setErroCPF] = useState("");
  const [erroPhone, setErroPhone] = useState("");
  const [form, setForm] = useState(client);

  async function handleChange({ target }) {
    setForm((prevForm) => ({
      ...prevForm,
      [target.name]: target.value,
    }));
    if (target.name === "cep") {
      let address;
      if (target.value.length === 8) {
        const {
          cep,
          logradouro: street,
          bairro: neighborhood,
          localidade: city,
          uf,
        } = await findAddress(target.value);
        address = {
          cep,
          logradouro: street,
          bairro: neighborhood,
          localidade: city,
          uf,
        };
        if (address) {
          setForm({ ...form, cep, street, neighborhood, city, uf });
        }
      }
    }
  }

  async function handleSubmit() {
    if (!form?.name || !form?.email || !form?.cpf || !form?.phone) {
      if (!form?.name) {
        setErroName("Este campo deve ser preenchido");
      } else {
        setErroName("");
      }
      if (!form?.email) {
        setErroEmail("Este campo deve ser preenchido");
      } else {
        setErroEmail("");
      }
      if (!form?.cpf) {
        setErroCPF("Este campo deve ser preenchido");
      } else {
        setErroCPF("");
      }
      if (!form?.phone) {
        setErroPhone("Este campo deve ser preenchido");
      } else {
        setErroPhone("");
      }
      return;
    }
    setErroName("");
    setErroEmail("");
    setErroCPF("");
    setErroPhone("");

    try {
      const {
        id,
        name,
        email,
        cpf,
        phone,
        street,
        complement,
        cep,
        neighborhood,
        city,
        uf,
      } = form;

      const { data } = await api.put(
        `/client`,
        {
          id,
          name,
          email,
          cpf: cpf?.replace(/\D/g, ""),
          phone: phone?.replace(/\D/g, ""),
          street,
          complement,
          cep,
          neighborhood,
          city,
          uf,
        },
        {
          headers: {
            authorization: `Bearer ${getItem("token")}`,
          },
        }
      );
      if (data === "Cliente atualizado com sucesso!") {
         setRender(!render)
        document.querySelector(".dialog-edit-client")?.close();
        console.log(data)
        return notifySuccess(data);
      }
    } catch (error) {
      notifyError(error.response.data);
    }
  }

  return (
    <dialog className="dialog-edit-client">
      <div className="Modal-add-clients">
        <div className="form-add-client">
          <h1>
            <img src={IconeClients} alt="" />
            Editar clientes
          </h1>
          <label htmlFor="name">Nome*</label>
          <input
            onChange={handleChange}
            name="name"
            value={form?.name}
            type="text"
            placeholder="Digite o nome"
          />
          <span>{erroName}</span>
          <label htmlFor="email">E-mail*</label>
          <input
            onChange={handleChange}
            name="email"
            value={form?.email}
            type="text"
            placeholder="Digite o e-mail"
          />
          <span>{erroEmail}</span>
          <div className="divider-form">
            <div className="column">
              <label htmlFor="cpf">CPF*</label>
              <input
                onChange={handleChange}
                name="cpf"
                value={formatCpf(form?.cpf)}
                type="text"
                minLength={14}
                maxLength={14}
                placeholder="Digite o CPF"
              />
              <span>{erroCPF}</span>
            </div>
            <div className="column">
              <label htmlFor="phone">Telefone*</label>
              <input
                onChange={handleChange}
                name="phone"
                value={formatPhone(form?.phone)}
                type="text"
                minLength={15}
                maxLength={15}
                placeholder="Digite o telefone"
              />
              <span>{erroPhone}</span>
            </div>
          </div>
          <label htmlFor="street">Endereço</label>
          <input
            name="street"
            value={form?.street}
            disabled
            type="text"
            placeholder="Digite o endereço"
          />
          <label htmlFor="complement">Complemento</label>
          <input
            onChange={handleChange}
            name="complement"
            value={form?.complement}
            type="text"
            placeholder="Digite o complemento"
          />
          <div className="divider-form">
            <div className="column">
              <label htmlFor="cep">CEP</label>
              <input
                onChange={handleChange}
                name="cep"
                value={form?.cep}
                minLength={8}
                maxLength={8}
                type="text"
                placeholder="Digite o CEP"
              />
            </div>
            <div className="column">
              <label htmlFor="neighborhood">Bairro</label>
              <input
                name="neighborhood"
                value={form?.neighborhood}
                disabled
                type="text"
                placeholder="Digite o bairro"
              />
            </div>
          </div>
          <div className="divider-form">
            <div className="column">
              <label htmlFor="city">Cidade</label>
              <input
                name="city"
                value={form?.city}
                disabled
                type="text"
                placeholder="Digite o cidade"
              />
            </div>
            <div className="column">
              <label htmlFor="uf">UF</label>
              <input
                name="uf"
                value={form?.uf}
                disabled
                type="text"
                placeholder="Digite o UF"
              />
            </div>
          </div>
          <div className="divider-form">
            <button
              onClick={() => {
                document.querySelector(".dialog-edit-client").close();
                removeItem("clientSelect");
              }}
              className="grey"
            >
              Cancelar
            </button>
            <button onClick={handleSubmit} className="pink">
              Aplicar
            </button>
          </div>
          <img
            onClick={() => {
              document.querySelector(".dialog-edit-client").close();
              removeItem("clientSelect");
            }}
            className="btn-sair"
            src={Close}
            alt="Botão sair"
          />
        </div>
      </div>
    </dialog>
  );
}
