import { useNavigate } from "react-router-dom";
import { clear } from "../../utils/storage";
import "./dialogHeader.styles.css";

export default function DialogHeader({ edit, exit }) {
  const navigate = useNavigate();

  function HandleEdit() {
    document.querySelector(".dialog-user-options").close();
    document.querySelector(".dialog-user").showModal();
  }
  function HandleExit() {
    clear();
    navigate("/signin");
  }

  return (
    <dialog
      onClick={() => document.querySelector(".dialog-user-options").close()}
      className="dialog-user-options"
    >
      <section>
        <img
          onClick={HandleEdit}
          src={edit}
          alt=""
          className="btn-dialog-header dialog-user-options-edit-btn"
        />
        <img
          onClick={HandleExit}
          src={exit}
          alt=""
          className="btn-dialog-header dialog-user-options-exit-btn"
        />
      </section>
    </dialog>
  );
}
