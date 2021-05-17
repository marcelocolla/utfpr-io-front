import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --color-primaryBlue: #004FEF;
    --color-secondaryBlue: #00297B;

    --color-black: #23272A;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    font-family: 'Robot', sans-serif;
  }

  html {
    font-size: 62.5%;
    scroll-behavior: smooth;

    @media (min-width: 1024px) {
      font-size: 12px; 
    }
  }

  html, body, #__next {
    height: 100%;
  }

  body {
    text-rendering: optimizelegibility !important;
    -webkit-font-smoothing: antialiased !important;
  }

  a,
  button {
    cursor: pointer;
  }
`;

export default GlobalStyles;
