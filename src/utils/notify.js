import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from 'react-icons/fa';

export const notifyInfo = (message) => {
  toast.info(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    className: "toast-info",
    bodyClassName: "toast-info-body",
    progressClassName: "toast-info-progress",
    icon: <FaCheckCircle />,
    // Customização de estilos
    style: {
      background: "#C3D4FE",
      color: "#000000",
      fontSize: "16px",
      right:"80px",
      bottom:"0px"
    },
    progressStyle: {
      background: "#000000",
    },
  });
};

export const notifySuccess = message => {
  toast.success(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 1000,
    theme: "colored",
    closeOnClick: true,
    pauseOnHover: false
  });
};
// export const notifyInfo = message => {
//   toast.info(message, {
//     position: toast.POSITION.BOTTOM_RIGHT,
//     autoClose: 2000,
//     theme: "colored",
//     closeOnClick: true,
//     pauseOnHover: false
//   });
// };


export const notifyError = (message) => {
  toast.error(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2000,
    theme: "colored",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    closeButton: <FaTimesCircle style={{ color: " #e70000" }} />,
    // Customização de estilos
    style: {
      borderRadius: "10px",
      width: "385px",
      height: "54px",
      right: "80px",
      bottom: "0",
      opacity: 1,
    },
  });
};
