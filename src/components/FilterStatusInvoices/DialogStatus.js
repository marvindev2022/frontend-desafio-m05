import { useEffect, useState } from "react";
import { getItem } from "../../utils/storage";
import "./dialogStatus.css";

export default function DialogStatus({ setFilter, reference }) {
  const [status, setStatus] = useState(getItem("filterBy")?? "");


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
  const referenceContent = (
    <div className="container-dialog-status">
      <span className="span-status">Status</span>

      <label>
        <input
          name="status"
          type="checkbox"
          value="em dia"
          checked={status === "em dia"}
          onChange={handleCheckboxChange}
        />
        <p> Em Dia</p>
      </label>
      <label>
        <input
          name="status"
          type="checkbox"
          value="inadimplente"
          checked={status === "inadimplente"}
          onChange={handleCheckboxChange}
        />
        <p> Inadimplente</p>{" "}
      </label>
      <button onClick={handleClearSelections}>Limpar</button>
    </div>
  );
  const nonReferenceContent = (
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
          checked={status === "pendent" || status === "predicted"}
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
  );

  useEffect(()=>{
  const handleCheckboxChange = () => {
    setStatus(status);
    setFilter(status);

    document.querySelectorAll("input[name='status']").forEach((checkbox) => {
      if (checkbox !== status) {
        checkbox.checked = false;
      }
    });
  };
  handleCheckboxChange()
  },[status,setFilter])
  return (
    <dialog
      onClick={({ target }) =>
        target.className === "dialog-status" &&
        document.querySelector(".dialog-status").close()
      }
      className="dialog-status"
    >
      {reference ? referenceContent : nonReferenceContent}
    </dialog>
  );
}
