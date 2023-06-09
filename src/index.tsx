import ReactDOM from "react-dom/client";
import "./index.scss";
import { App } from "./components/app/App";
import { setupStore } from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const store = setupStore();
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
