import "./dialogStatus.css";

export default function DialogStatus({ setFilter}) {
  return (
    <dialog className="dialog-status">
      <div className="container-dialog-status">
        <span
          onClick={() => {
            setFilter("all");
            document.querySelector(".dialog-status").close();
          }}
          className="all-invoices-dialog-status"
        >
          Todos
        </span>
        <span
          onClick={() => {
            setFilter("paid");
            document.querySelector(".dialog-status").close();
          }}
          className="paid-dialog-status"
        >
          Pago
        </span>
        <span
          onClick={() => {
            setFilter("pendent");
            document.querySelector(".dialog-status").close();
          }}
          className="pendent-dialog-status"
        >
          Pendente
        </span>
        <span
          onClick={() => {
            setFilter("due");
            document.querySelector(".dialog-status").close();
          }}
          className="due-dialog-status"
        >
          Vencido
        </span>
      </div>
    </dialog>
  );
}
