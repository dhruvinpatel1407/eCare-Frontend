import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showMessage = (type, message, isError = false) => {
  toast(message, {
    type: type === "error" ? "error" : type,
    position: "top-right",
    autoClose: 1000,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
  });
};
