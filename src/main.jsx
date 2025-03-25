import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider, createTheme } from "@mantine/core";
import "./index.css";
import App from "./App.jsx";
import "@mantine/core/styles.css";

const theme = createTheme({
   // fontFamily: "Inter, sans-serif",
   // defaultRadius: "md",
});

createRoot(document.getElementById("root")).render(
   <StrictMode>
      <MantineProvider theme={theme}>
         <App />
      </MantineProvider>
   </StrictMode>
);
