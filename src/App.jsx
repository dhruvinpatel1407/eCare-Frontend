import { Provider } from "react-redux";
import store from "./setup/store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoutesManager from "../src/setup/router-manager/index";
import ErrorBoundary from "./setup/error-boundary";

function App() {
  return (
    <>
      <Provider store={store}>
        <ErrorBoundary>
          <ToastContainer />
          <RoutesManager />
        </ErrorBoundary>
      </Provider>
    </>
  );
}

export default App;
