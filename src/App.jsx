import { Provider } from "react-redux";
import store from "./setup/store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoutesManager from "../src/setup/router-manager/index"

function App() {

  return (
    <>
     <Provider store={store}>
        <ToastContainer />
        <RoutesManager />
      </Provider>
    </>
  )
}

export default App
