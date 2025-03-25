import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider, createTheme } from "@mantine/core";
import "./index.css";
import "@mantine/core/styles.css";
import App from "./App.jsx";
import { inject } from "@vercel/analytics";

inject();

const theme = createTheme({
   fontFamily: "Dosis, sans-serif",
});

createRoot(document.getElementById("root")).render(
   <StrictMode>
      <MantineProvider theme={theme}>
         <App />
      </MantineProvider>
   </StrictMode>
);
