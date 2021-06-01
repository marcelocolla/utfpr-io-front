import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --color-background: rgba(242,242,242, 1);
    
    --color-orange-dark-50: rgba(125, 37, 6, 1);
    --color-orange-dark-40: rgba(150, 44, 7, 1);
    --color-orange-dark-30: rgba(175, 52, 8, 1);
    --color-orange-dark-20: rgba(200, 59, 10, 1);
    --color-orange-dark-10: rgba(225, 67, 11, 1);
    --color-orange-default: rgba(250, 74, 12, 1);
    --color-orange-light-10: rgba(251, 92, 36, 1);
    --color-orange-light-20: rgba(251, 110, 61, 1);
    --color-orange-light-30: rgba(252, 128, 85, 1);
    --color-orange-light-40: rgba(252, 146, 109, 1);
    --color-orange-light-50: rgba(253, 165, 134, 1);

    --color-orange-box-shadow-dark: rgba(225, 67, 11, 0.2);
    --color-orange-box-shadow-dark-hover: rgba(225, 67, 11, 0.4);
    
    --color-label: rgba(0, 0, 0, 0.4);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
  }
  
  html, body, #__next {
    height: 100%;
  }

  html {
    font-size: 62.5%;
    scroll-behavior: smooth;

    @media (min-width: 1024px) {
      font-size: 75%;
    }
  }

  body {
    background-color: var(--color-background);
    text-rendering: optimizelegibility !important;
    -webkit-font-smoothing: antialiased !important;
  }

  a,
  button {
    cursor: pointer;
  }

  form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column; 
  }
`;

export default GlobalStyles;
