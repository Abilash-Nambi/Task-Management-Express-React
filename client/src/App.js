import logo from "./logo.svg";
import "./App.css";
import HomePage from "./Pages/HomePage";
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

let theme = createTheme({
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
    body2: {
      fontFamily: "Caveat, cursive, Arial, sans-serif",
    },
    // body2: {
    //   fontFamily: "Poppins, Arial, sans-serif",
    // },
    // You can customize other typography variants as needed
  },
  spacing: 6,
  palette: {
    primary: {
      main: "#0288d1",
    },
    secondary: {
      main: "#ab47bc",
    },
  },
});
theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <HomePage />
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;
