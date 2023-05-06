import ImageAlert from "../../assets/alert.svg";
import Close from "../../assets/x.svg";
import api from "./../../service/instance";
import { notifyError, notifySuccess } from "../../utils/notify";
import { getItem } from "../../utils/storage";
import "./styles.css";

export default function ModalDelete({ id, client_id, setModalDelete ,render,setRender}) {
   async function handleDelete() {
     try {
       const { data } = await api.delete(
         `invoice/${id}?client_id=${client_id}`,
         {
           headers: {
             authorization: `Bearer ${getItem("token")}`,
           },
         }
       );
       setRender(!render);
       notifySuccess(data);
     } catch (error) {
       notifyError(error.response.data);
     }
   }

  return (
    <div className="ModalDeleteInvoice">
      <div className="ModalDelete">
        <img className="img-alert" src={ImageAlert} alt="imagem de alerta" />
        <span>Tem certeza que deseja excluir esta cobrança?</span>
        <div className="yes-or-not">
          <button onClick={() => setModalDelete(false)} className="btn-not">
            Não
          </button>
          <button onClick={handleDelete} className="btn-yes">
            Sim
          </button>
        </div>
        <img
          onClick={() => setModalDelete(false)}
          className="btn-sair"
          src={Close}
          alt="Botão de fechar"
        />
      </div>
    </div>
  );
}
