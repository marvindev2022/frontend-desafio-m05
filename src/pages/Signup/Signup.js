import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import In from "../../assets/In.svg";
import Next from "../../assets/next.svg";
import Check from "../../assets/check.svg";
import Eye from "../../assets/eye.svg";
import EyeOff from "../../assets/eye-off.svg";
import Success from "../../assets/Success.svg";
import "./signup.styles.css";
import { notifyError, notifySuccess } from "../../utils/notify";
import api from "../../service/instance";
import { clear, getItem, setItem } from "../../utils/storage";
import { validatePassword, isValidEmail } from "../../utils/formatters";

const phaseStorage = "data";

export default function SignUp() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [visibleConf, setVisibleConf] = useState(false);
  const [phase, setPhase] = useState(phaseStorage);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confpassword: "",
  });

  const handleChange = ({ target }) => {
    setForm((prevForm) => ({
      ...prevForm,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password || !form.confpassword) {
      return notifyError("Preencha todos os campos!");
    }

    const { name, email, password } = form;

    try {
      const { data } = await api.post("/user", { name, email, password });

      if (data) {
        setItem("Success", true);
        notifySuccess("Cadastro realizado");
        setItem("phase", "final");
        setPhase("final");
      }
    } catch (error) {
      notifyError(`${error.response.data}`);
      setPhase("data");
      clear();
    }
  };
  return (
    <div className="sign-up">
      <div className="sidebar">
        <div className="icon-check">
          <img src={phase === "data" ? In : Check} alt="" />
          <div className="divider"></div>
          <img
            src={phase === "data" ? Next : phase === "password" ? In : Check}
            alt=""
          />
          <div className="divider"></div>
          <img src={phase !== "final" ? Next : Check} alt="" />
        </div>
        <div className="check">
          <div className="check-txt">
            <b>Cadastre-se</b>
            <span>Por favor, escreva seu nome e e-mail</span>
          </div>
          <div className="check-txt">
            <b>Escolha uma senha</b>
            <span>Escolha uma senha segura</span>
          </div>
          <div className="check-txt">
            <b>Cadastro realizado com sucesso</b>
            <span>E-mail e senha cadastrados com sucesso</span>
          </div>
        </div>
      </div>
      <div className="container">
        {phase === "data" && <h1>Adicione seus dados</h1>}
        {phase === "password" && <h1>Escolha uma senha</h1>}
        <div
          style={phase === "final" ? { display: "none" } : {}}
          className="form"
        >
          {phase === "data" && <label htmlFor="name">Nome*</label>}
          {phase === "password" && <label htmlFor="password">Senha*</label>}
          {phase === "data" && (
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="Digite seu nome"
            />
          )}
          {phase === "password" && (
            <div className="password">
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type={visible === false ? "password" : "text"}
                placeholder="Digite sua senha"
              />
              <img
                onClick={() => setVisible(!visible)}
                src={visible === false ? EyeOff : Eye}
                alt="Senha visivel ou não visivel"
              />
            </div>
          )}
          {phase === "data" && <label htmlFor="email">Email*</label>}
          {phase === "password" && (
            <label htmlFor="email">Repita a senha*</label>
          )}
          {phase === "data" && (
            <input
              name="email"
              value={form.email.trim()}
              onChange={handleChange}
              type="text"
              placeholder="Digite seu e-mail"
            />
          )}
          {phase === "password" && (
            <div className="password">
              {phase === "password" && (
                <input
                  name="confpassword"
                  value={form.confpassword}
                  onChange={handleChange}
                  type={visible === false ? "password" : "text"}
                  placeholder="Confirme sua senha"
                />
              )}
              <img
                onClick={() => setVisibleConf(!visibleConf)}
                src={visibleConf === false ? EyeOff : Eye}
                alt="Senha visivel ou não visivel"
              />
            </div>
          )}
        </div>
        {phase === "final" && (
          <div className="success">
            <img src={Success} alt="" />
            <h1>Cadastro realizado com sucesso!</h1>
          </div>
        )}
        {phase !== "final" && (
          <button
            onClick={async () => {
              const isValidPassword = validatePassword(form.password);
              if (phase === "data") {
                if (form.email === "" && form.name === "") {
                  return notifyError("Preencha todos os campos!");
                } else if (form.email === "") {
                  return notifyError("Email deve ser preenchido!");
                } else if (!isValidEmail(form.email)) {
                  return notifyError("Email no formato invalido!");
                } else if (form.name === "") {
                  return notifyError("Nome deve ser preenchido!");
                } else {
                  setItem("phase", "password");
                  setPhase("password");
                }
              } else if (phase === "password") {
                if (form.password === "" && form.confpassword === "") {
                  return notifyError("Preencha todos os campos!");
                } else if (form.password !== form.confpassword) {
                  return notifyError("Senhas não coincidem");
                }
                if (!isValidPassword) {
                  return notifyError(` A senha deve ter pelo menos 8 caracteres, incluindo pelo menos
                  um número, um caractere especial (!@#$%&* etc.), uma letra
                  maiúscula e uma letra minúscula.`);
                }
                handleSubmit();
                if (getItem("Success")) return setPhase("final");
              }
            }}
          >
            {phase === "data" ? "Continuar" : "Finalizar cadastro"}
          </button>
        )}
        {phase === "final" && (
          <button
            onClick={() => {
              clear();
              navigate("/signin");
            }}
          >
            Ir para login
          </button>
        )}
        {phase !== "final" && (
          <div className="register">
            Já possui uma conta? Faça seu
            <Link className="link" to={"/signin"}>
              Login
            </Link>
          </div>
        )}
        <div className="baseboard">
          <div className={`phase ${phase === "data" && "green"}`}></div>
          <div className={`phase ${phase === "password" && "green"}`}></div>
          <div className={`phase ${phase === "final" && "green"}`}></div>
        </div>
      </div>
    </div>
  );
}
