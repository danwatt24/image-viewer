// import img1 from "./imgs/10_11_13.jpg";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Manager from "./pages/Manager";
import Viewer from "./pages/Viewer";

// import "./App.css";
const darkTheme = createTheme({
  palette: { mode: "dark" },
});

export default function App() {
  const route = window.location.pathname.substring(1);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {route === "manager" ? <Manager /> : <Viewer />}
    </ThemeProvider>
  );
}
