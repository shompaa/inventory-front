import { AppRouter } from "./router";
import { Modal } from "./components/ui/shared";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  return (
    <>
      <AppRouter />
      <Modal />
      <ToastContainer />
    </>
  );
};
