import "sanitize.css";
import { createGlobalStyle } from "styled-components";

interface Props {
    themeName : string;
}

export const GlobalStyle = createGlobalStyle<Props>`
    body {
        padding : 0;
        margin : 0;
    }

    h1 {
        margin : 0;
    }

    * {
        color : ${(props)=> (props.themeName === "light" ? "black" : "white")};
        background-color : ${(props)=> (props.themeName === "light" ? "white" : "black")};
    }
`;