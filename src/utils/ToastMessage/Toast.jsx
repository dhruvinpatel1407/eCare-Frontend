import { useToasts } from "react-toastify";
import { useState } from "react";

const Toast = ({ type, message, isError }) => {
  const { toast } = useToasts();
  const [mounted, setMounted] = useState(false);

  const getSeverity = () => {
    switch (type) {
      case "success":
        return "success";
      case "error":
        return "error";
      case "warning":
        return "warning";
      case "info":
        return "info";
      default:
        return "info";
    }
  };

  if (mounted) {
    toast(message, {
      type: getSeverity(),
      position: "top-right",
      autoClose: 3000,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });
  }

  return null;
};

export default Toast;
