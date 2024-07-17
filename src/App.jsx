import React from 'react';
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "./style";
import Calendar from "./components/Calendar/index"
import Profile from './components/Profile/index';
import ChatUI from './components/ChatUI';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Calendar />
      <Profile/>
      <ChatUI/>
    </ThemeProvider>
  );
}

export default App;