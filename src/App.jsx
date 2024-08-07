import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import RegisterPage from "./components/RegisterPage";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RegisterPage />
    </ThemeProvider>
  );
}

export default App;
