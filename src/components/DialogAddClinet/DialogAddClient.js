import { useRef, useState } from "react";
import { notifyError, notifySucess } from "../../utils/notify";
import InputMask from "react-input-mask";
import "./dialogUser.css";
import api from "./../../service/instance";
import { getItem, setItem } from "../../utils/storage";
import exit from "./../../assets/x.svg";

const defaultForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  cpf: "",
  phone: "",
};

const alert = "Este campo deve ser preenchido!";

export default function DialogAddUser() {
  const dialogRef = useRef();
  const [form, setForm] = useState(defaultForm);
  const { name, email, password, confirmPassword, cpf, phone } = form;
  async function handleSubmit(event) {
    event.preventDefault();
    if (!name) showErrorMessage("name");
    if (!email) showErrorMessage("email");
    if (!password) showErrorMessage("password");
    if (!confirmPassword) return showErrorMessage("confirmPassword");
    if (password !== confirmPassword)
      return notifyError("Senhas devem ser iguais");
    try {
      const { data: user } = await api.put(
        "user",
        {
          name,
          email,
          password,
          cpf: cpf.replace(/\D/g, ""),
          phone: phone.replace(/\D/g, ""),
        },
        {
          headers: {
            authorization: `Bearer ${getItem("token")}`,
          },
        }
      );
      if (user.id) {
        setItem("userName", user.name);
        setItem("userId", user.id);
        setForm(defaultForm);
        dialogRef.current.close();
        return notifySucess("Cadastro alterado com sucesso!");
      }
      return notifyError(user);
    } catch (error) {
      notifyError(error.response.data);
    }
  }

  function handleChange({ target }) {
    setForm({ ...form, [target.name]: target.value });
    const alertElement = document.querySelector(`.alert-${target.name}`);
    if (target.value !== "") {
      alertElement.classList.add("hidden");
    }
  }
  function showErrorMessage(fieldName) {
    const alertElement = document.querySelector(`.alert-${fieldName}`);
    alertElement.classList.remove("hidden");
  }

  return (
    <dialog ref={dialogRef} className="dialog-user">
      <section className="container-dialog">
        <span className="header-dialog">
          <h1>Edite seu cadastro</h1>
          <img
            src={exit}
            className="exit-dialog"
            onClick={() => dialogRef.current.close()}
            alt="exit"
          />
        </span>
        <form className="form-dialog-user" onSubmit={handleSubmit}>
          <span>
            <label className="label-form" htmlFor="name">
              Nome *
            </label>
            <input
              name="name"
              id="name"
              placeholder="Digite seu nome"
              onChange={handleChange}
              value={name}
              type="text"
            />
            <p className="alert-name alerts hidden">{alert}</p>
          </span>
          <span>
            {" "}
            <label className="label-form" htmlFor="email">
              E-mail *
            </label>
            <input
              name="email"
              id="email"
              placeholder="Digite seu e-mail"
              onChange={handleChange}
              value={email}
              type="email"
            />
            <p className="alert-email alerts hidden">{alert}</p>
          </span>
          <span className="optional-user-data-container">
            <section>
              {" "}
              <label className="label-form" htmlFor="cpf">
                CPF
              </label>
              <InputMask
                name="cpf"
                id="cpf"
                className="input-cpf"
                mask="999.999.999-99"
                placeholder="Digite seu CPF"
                onChange={handleChange}
                value={cpf}
                type="text"
              />
              <p className="alert-cpf alerts hidden">
                {"Informe um numero valido!"}
              </p>
            </section>
            <section>
              <label className="label-form" htmlFor="phone">
                Telefone
              </label>
              <InputMask
                name="phone"
                id="phone"
                className="input-phone"
                mask="(99) 9 9999-9999"
                placeholder="Digite seu Telefone"
                onChange={handleChange}
                value={phone}
                type="text"
              />
              <p className="alert-phone alerts hidden">
                {"Informe um numero valido!"}
              </p>
            </section>
          </span>
          <span>
            <label className="label-form" htmlFor="password">
              Nova Senha *
            </label>
            <input
              name="password"
              id="password"
              placeholder="●●●●●●●●"
              onChange={handleChange}
              value={password}
              type="password"
            />
            <p className="alert-password alerts hidden">{alert}</p>
          </span>
          <span>
            <label className="label-form" htmlFor="confirmPassword">
              Confirmar Senha*
            </label>
            <input
              name="confirmPassword"
              id="confirmPassword"
              placeholder="●●●●●●●●"
              onChange={handleChange}
              value={confirmPassword}
              type="password"
            />
            <p className="alert-confirmPassword alerts hidden">{alert}</p>
          </span>
          <button type="submit">Submit</button>
        </form>
      </section>
    </dialog>
  );
}
