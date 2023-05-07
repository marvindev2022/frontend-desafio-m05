import { useState } from "react";
import { notifyError, notifyInfo } from "../../utils/notify";
import "./dialogUser.css";
import api from "../../service/instance";
import { getItem, setItem } from "../../utils/storage";
import exit from "./../../assets/x.svg";
import Eye from "../../assets/eye.svg";
import EyeOff from "../../assets/eye-off.svg";
import { formatCpf, formatPhone } from "../../utils/formatters";

const defaultForm = {
  name: getItem("userName") ?? "",
  email: getItem("email") ?? "",
  password: "",
  confirmPassword: "",
  cpf: "",
  phone: "",
};

const alert = "Este campo deve ser preenchido!";

export default function DialgoUser({ render, setRender }) {
  const [form, setForm] = useState(defaultForm);
  const { name, email, password, confirmPassword, cpf, phone } = form;
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    let error = false;
    if (!name) {
      showErrorMessage("name");
      error = true;
    }
    if (!email) {
      showErrorMessage("email");
      error = true;
    }
    if (!password) {
      showErrorMessage("password");
      error = true;
    }
    if (!confirmPassword) {
      showErrorMessage("confirmPassword");
      error = true;
    }
    if (password !== confirmPassword) {
      notifyError("Senhas devem ser iguais");
      error = true;
    }
    if (error) {
      return;
    }
    try {
      const { data: user } = await api.put(
        "user",
        {
          name,
          email,
          password,
          cpf: cpf?.replace(/\D/g, ""),
          phone: phone?.replace(/\D/g, ""),
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
        setItem("email", user.email);
        document.querySelector(".dialog-user").close();
        setRender(!render);
        return notifyInfo("Cadastro alterado com sucesso!");
      }
      setForm({});
      return notifyError(user);
    } catch (error) {
      console.log(error)
      notifyError(error.response);
    }
  }

  function handleChange({ target }) {
    if (target.name === "cpf" || target.name === "phone") {
      setForm({ ...form, [target.name]: target.value });
    } else {
      setForm({ ...form, [target.name]: target.value });
    }
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
    <dialog className="dialog-user">
      <section className="container-dialog">
        <span className="header-dialog">
          <h1>Edite seu cadastro</h1>
          <img
            src={exit}
            className="exit-dialog"
            onClick={() => document.querySelector(".dialog-user").close()}
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
              <input
                name="cpf"
                id="cpf"
                className="input-cpf"
                placeholder="Digite seu CPF"
                value={formatCpf(cpf)}
                onChange={handleChange}
                minLength={14}
                maxLength={14}
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
              <input
                name="phone"
                id="phone"
                className="input-phone"
                placeholder="Digite seu Telefone"
                onChange={handleChange}
                value={formatPhone(phone)}
                minLength={15}
                maxLength={15}
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
            </label>{" "}
            <span
              style={{ display: "flex", position: "relative", width: "100%" }}
            >
              <input
                type={viewPassword ? "text" : "password"}
                style={{ width: "100%" }}
                className="input-password"
                name="password"
                id="password"
                value={form.password}
                placeholder="●●●●●●●●"
                onChange={handleChange}
              />
              <img
                onClick={() => setViewPassword(!viewPassword)}
                style={{ position: "absolute", top: "5px", right: "15px" }}
                src={viewPassword ? Eye : EyeOff}
                alt="Ver senha"
              />
            </span>
            <p className="alert-password alerts hidden">{alert}</p>
          </span>
          <span>
            <label className="label-form" htmlFor="confirmPassword">
              Confirmar Senha*
            </label>
            <span
              style={{ display: "flex", position: "relative", width: "100%" }}
            >
              <input
                type={viewConfirmPassword ? "text" : "password"}
                style={{ width: "100%" }}
                className="input-password"
                name="confirmPassword"
                id="confirmPassword"
                value={form.confirmPassword}
                placeholder="●●●●●●●●"
                onChange={handleChange}
              />
              <img
                onClick={() => setViewConfirmPassword(!viewConfirmPassword)}
                style={{ position: "absolute", top: "5px", right: "15px" }}
                src={viewConfirmPassword ? Eye : EyeOff}
                alt="Ver senha"
              />
            </span>

            <p className="alert-confirmPassword alerts hidden">{alert}</p>
          </span>
          <button type="submit">Submit</button>
        </form>
      </section>
    </dialog>
  );
}
