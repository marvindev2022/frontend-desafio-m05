import { useState } from "react";
import "./dialogStatus.css";

export default function DialogStatus({ setFilter }) {
  const [status, setStatus] = useState("");

  const handleCheckboxChange = (event) => {
    setStatus(event.target.value);
    setFilter(event.target.value);

    document.querySelectorAll("input[name='status']").forEach((checkbox) => {
      if (checkbox !== event.target) {
        checkbox.checked = false;
      }
    });
  };

  const handleClearSelections = () => {
    setStatus("");
    setFilter("");
    document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
      checkbox.checked = false;
    });
    document.querySelector(".dialog-status").close();
  };
  return (
    <dialog
      onClick={({ target }) =>
        target.className === "dialog-status" &&
        document.querySelector(".dialog-status").close()
      }
      className="dialog-status"
    >
      <div className="container-dialog-status">
        <span className="span-status">Status</span>
        <label>
          <input
            name="status"
            type="checkbox"
            value="paid"
            checked={status === "paid"}
            onChange={handleCheckboxChange}
          />
          <p> Pago</p>{" "}
        </label>
        <label>
          <input
            name="status"
            type="checkbox"
            value="pendent"
            checked={status === "pendent"}
            onChange={handleCheckboxChange}
          />
          <p> Pendente</p>{" "}
        </label>
        <label>
          <input
            name="status"
            type="checkbox"
            value="due"
            checked={status === "due"}
            onChange={handleCheckboxChange}
          />
          <p> Vencido</p>{" "}
        </label>
        <button onClick={handleClearSelections}>Limpar</button>
      </div>
    </dialog>
  );
}
