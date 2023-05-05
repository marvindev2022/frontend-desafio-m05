import Close from "./../../assets/x.svg";
import File from "./../../assets/file.svg";
import { useEffect, useState } from "react";
import api from "./../../service/instance";
import { getItem } from "./../../utils/storage";
import { notifyError } from "./../../utils/notify";
import "./styles.css";

export default function ModalInvoiceDetail({ id, setInvoiveDetail }) {
  const [detailInvoice, setDetailInvoice] = useState({});

  useEffect(() => {
    async function invoiceDetail() {
      try {
        const { data } = await api.get(`/invoice/${id}`, {
          headers: {
            authorization: `Bearer ${getItem("token")}`,
          },
        });
        setDetailInvoice({ ...data });
      } catch (error) {
        notifyError(error);
      }
    }
    invoiceDetail();
  }, [id]);

  return (
    <div className="ModalInvoiceDetail">
      <div className="form-invoice-detail">
        <img
          onClick={() => setInvoiveDetail(false)}
          className="btn-sair"
          src={Close}
          alt="Botão sair"
        />
        <h1>
          <img src={File} alt="icone file" />
          Detalhe da cobrança
        </h1>
        <div className="gap">
          <h3>Nome</h3>
          <span>{detailInvoice.client_name}</span>
        </div>
        <div className="gap">
          <h3>Descrição</h3>
          <span className="description-invoice">
            {detailInvoice.description}
          </span>
        </div>
        <div className="row">
          <div className="gap width">
            <h3>Vencimento</h3>
            <span>
              {detailInvoice?.due_date
                ?.slice(0, 10)
                ?.replace(/^(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1")}
            </span>
          </div>
          <div className="gap width">
            <h3>Valor</h3>
            <span>R$ {detailInvoice.invoice_value}</span>
          </div>
        </div>
        <div className="row">
          <div className="gap width">
            <h3>ID cobrança</h3>
            <span>{detailInvoice.id}</span>
          </div>
          <div className="gap width">
            <h3>Status</h3>
            <span className={`${detailInvoice.status}`}>
              {detailInvoice.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
