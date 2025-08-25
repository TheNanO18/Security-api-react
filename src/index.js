// index.js
import React from "react";
import ReactDOM                       from "react-dom/client";
import { BrowserRouter }              from "react-router-dom";
import App                            from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline                    from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    background: {
      default: "#3f3939ff",
    },
  },
  typography: {
    // 1. 앱 전체의 기본 폰트를 설정합니다.
    // CSS에서 폰트 이름에 공백이 있으면 따옴표로 감싸줍니다.
    fontFamily: "'Mozilla Headline', sans-serif",

    // 2. 특정 태그(variant)에만 다른 폰트를 적용합니다.
    h4: {
      fontFamily: "'Fjalla One', sans-serif",
      fontWeight: 700,
      fontSize: '2.5rem', // 크기 등 조절 가능
    },
    // 필요하다면 다른 태그들도 추가로 정의할 수 있습니다.
    // body1: {
    //   fontFamily: "'Libertinus Serif', serif",
    // }
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </BrowserRouter>
);