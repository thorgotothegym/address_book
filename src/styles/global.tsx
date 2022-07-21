import { createGlobalStyle } from "styled-components";

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "GothamSSm",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {font-family: "GothamSSm" !important;
    }
      `,
    },
  },
});

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  font-family: "GothamSSm" !important;
  font-size: 16px;
  font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: rgb(52, 58, 64);
    font-size: 22px;
    line-height: 150%;
    font-weight: 400;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  #root {
    width: 100vw;
    height: 100vh;
  }
  
`;

export default GlobalStyle;
