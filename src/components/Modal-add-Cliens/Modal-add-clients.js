import IconeClients from "../../assets/Frame.svg";
import Close from "../../assets/x.svg";
import { useState } from "react";
import api from "../../service/instance";
import "./modal-add-clients.styles.css";
import { getItem } from "../../utils/storage";
import { notifyError, notifySuccess } from "../../utils/notify";
const defaultForm = {
  name: "",
  email: "",
  cpf: "",
  phone: "",
  street: "",
  complement: "",
  cep: "",
  neighborhood: "",
  city: "",
  uf: "",
};
export default function ModalAddClients({ modal, setModal }) {
  const [erroName, setErroName] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroCPF, setErroCPF] = useState("");
  const [erroPhone, setErroPhone] = useState("");
  const [form, setForm] = useState(defaultForm);

  function handleChange({ target }) {
    setForm((prevForm) => ({
      ...prevForm,
      [target.name]: target.value,
    }));
  }

  async function handleSubmit() {
    if (!form.name || !form.email || !form.cpf || !form.phone) {
      if (!form.name) {
        setErroName("Este campo deve ser preenchido");
      } else {
        setErroName("");
      }
      if (!form.email) {
        setErroEmail("Este campo deve ser preenchido");
      } else {
        setErroEmail("");
      }
      if (!form.cpf) {
        setErroCPF("Este campo deve ser preenchido");
      } else {
        setErroCPF("");
      }
      if (!form.phone) {
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
      let {
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

      const { data } = await api.post(
        "client",
        {
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
        },
        {
          headers: {
            authorization: `Bearer ${getItem("token")}`,
          },
        }
      );
      if (data === "Cadastro realizado com sucesso!") {
        setForm(defaultForm);
        return notifySuccess(data);
      }
      return notifyError(data);
    } catch (error) {
      notifyError(error.response.data);
    }
  }

  function fecharModal() {
    setForm({
      name: "",
      email: "",
      cpf: "",
      phone: "",
      street: "",
      complement: "",
      cep: "",
      neighborhood: "",
      city: "",
      uf: "",
    });

    setModal(!modal);
  }

  return (
    <div className="Modal-add-clients">
      <div className="form-add-client">
        <h1>
          <img src={IconeClients} alt="" />
          Cadastro de clientes
        </h1>
        <label htmlFor="name">Nome*</label>
        <input
          onChange={handleChange}
          name="name"
          value={form.name}
          type="text"
          placeholder="Digite o nome"
        />
        <span>{erroName}</span>
        <label htmlFor="email">E-mail*</label>
        <input
          onChange={handleChange}
          name="email"
          value={form.email}
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
              value={form.cpf}
              type="text"
              placeholder="Digite o CPF"
            />
            <span>{erroCPF}</span>
          </div>
          <div className="column">
            <label htmlFor="phone">Telefone*</label>
            <input
              onChange={handleChange}
              name="phone"
              value={form.phone}
              type="text"
              placeholder="Digite o telefone"
            />
            <span>{erroPhone}</span>
          </div>
        </div>
        <label htmlFor="street">Endereço</label>
        <input
          onChange={handleChange}
          name="street"
          value={form.street}
          type="text"
          placeholder="Digite o endereço"
        />
        <label htmlFor="complement">Complemento</label>
        <input
          onChange={handleChange}
          name="complement"
          value={form.complement}
          type="text"
          placeholder="Digite o complemento"
        />
        <div className="divider-form">
          <div className="column">
            <label htmlFor="cep">CEP</label>
            <input
              onChange={handleChange}
              name="cep"
              value={form.cep}
              type="text"
              placeholder="Digite o CEP"
            />
          </div>
          <div className="column">
            <label htmlFor="neighborhood">Bairro</label>
            <input
              onChange={handleChange}
              name="neighborhood"
              value={form.neighborhood}
              type="text"
              placeholder="Digite o bairro"
            />
          </div>
        </div>
        <div className="divider-form">
          <div className="column">
            <label htmlFor="city">Cidade</label>
            <input
              onChange={handleChange}
              name="city"
              value={form.city}
              type="text"
              placeholder="Digite o cidade"
            />
          </div>
          <div className="column">
            <label htmlFor="uf">UF</label>
            <input
              onChange={handleChange}
              name="uf"
              value={form.uf}
              type="text"
              placeholder="Digite o UF"
            />
          </div>
        </div>
        <div className="divider-form">
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
