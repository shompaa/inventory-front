import { AppRouter } from "./router";
import { Modal } from "./components/ui/shared";

export const App = () => {
  return (
    <>
      <AppRouter />
      <Modal />
    </>
  );
};
