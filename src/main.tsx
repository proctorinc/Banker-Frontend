import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GraphQLProvider } from "./graphql/provider.tsx";

createRoot(document.getElementById("root")!).render(
  <GraphQLProvider>
    <App />
  </GraphQLProvider>,
);
