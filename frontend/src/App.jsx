import { createRoot } from "react-dom/client";
import Home from "./pages/home/Home";

const App = () => {
  return <Home />;
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
