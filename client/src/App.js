import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./Routes/Routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes />
      <ToastContainer position="top-center" hideProgressBar={true} />
    </>
  );
}

export default App;
