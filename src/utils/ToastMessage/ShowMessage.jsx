import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showMessage = (type, message) => {
  const baseStyle = {
    borderRadius: "12px",
    borderLeft: "4px solid #2D336B",
    padding: "12px 16px",
    color: "#2D336B",
    backgroundColor: "#FFF2F2", // default for error/info
    fontSize: "0.875rem",
    fontWeight: "500",
  };

  if (type === "success") {
    baseStyle.backgroundColor = "#F0FFF0"; // soft greenish
    baseStyle.borderLeft = "4px solid #2D336B";
  } else if (type === "info") {
    baseStyle.backgroundColor = "#A9B5DF";
    baseStyle.color = "#2D336B";
  }

  toast(message, {
    type,
    position: "top-right",
    autoClose: 1000,
    closeOnClick: true,
    draggable: true,
    style: baseStyle,
    progress: undefined,
  });
};
