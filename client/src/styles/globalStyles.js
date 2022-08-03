import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
*{
  box-sizing: border-box;
}

body {
  margin: 0;
  padding:0;
  // font-family: "Syncopate", sans-serif ;
  font-family: "Raleway", sans-serif; 
}

*, *::before,*::after, h1,h2,h3,h4,h5{
    margin:0;
    padding:0
}

h1,h2,h3,h4,h5{
  display: inline-block
}

`











