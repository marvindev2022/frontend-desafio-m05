import {useState} from "react";
import {notifySucess, notifyError} from "../../utils/notify";
import {Link, useNavigate} from "react-router-dom";
import {setItem} from "../../utils/storage";
import api from "../../service/instance";
import "./signin.styles.css";

export default function Signin() {
  const [inputState, setInputState] = useState();
  const navigate = useNavigate();
  function handleChange({target}) {
    setInputState({...inputState, [target.name]: target.value});
    return;
  }
  async function handleSubmit(event) {
    event.preventDefault();
    if (!inputState) return notifyError("Preencha todos os campos!");
    const {email, password} = inputState;

    if (!email) return notifyError("Email deve ser informado!");
    if (!password) return notifyError("Senha deve ser informada!");
    try {
      const {data} = await api.post("/login", {
        email,
        password
      });
      const {user, token} = data;
      if (!user) return notifyError("Email/senha invalido");

      notifySucess(`Bem vindo,${user.name}`);
      setItem("token", token);
      setItem("userName", user.name);
      setItem("userId", user.id);
      return navigate("/main");
    } catch (error) {
      notifyError(`${error.response.data.message}`);
    }
  }

  return (
    <main className="container-main-signin">
      <div className="Container-background-signin">
        <h1 className="h1-signin">
          Gerencie todos os pagamentos da sua empresa em um só lugar.
        </h1>
      </div>
      <section className="container-section-form-signin">
        <div className="container-form-signin">
          <h2 className="h2-form-signin">Faça seu login!</h2>
          <form className="form-signin" onSubmit={handleSubmit}>
            <span className="container-span-email-signin">
              <label>E-mail</label>
              <input
                type="email"
                name="email"
                className="input-email"
                placeholder="Email"
                onChange={handleChange}
              />
            </span>
            <span className="container-span-password-signin">
              <label className="recover-password">
                <p>Senha</p>
                {
                  <Link className="link" to="/">
                    Esqueceu a senha?
                  </Link>
                }
              </label>
              <input
                type="password"
                name="password"
                className="input-password"
                placeholder="Senha"
                onChange={handleChange}
              />
            </span>
            <span className="container-span-btn-signin">
              <button type="submit" className="btn-signin">
                Entrar
              </button>

              <span className="container-signup-here">
                Ainda não possui uma conta?{" "}
                {
                  <Link className="link-register" to="/signup">
                    Cadastre-se!
                  </Link>
                }
              </span>
            </span>
          </form>
        </div>
      </section>
    </main>
  );
}
