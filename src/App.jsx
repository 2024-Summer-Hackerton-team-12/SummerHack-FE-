import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "./style";
import Calendar from "./components/Calendar/index";
import Profile from "./components/Profile/index";
import ChatUI from "./components/ChatUI";
import TemHumi from "./components/TemHumi";
import StackedSchedule from "./components/StackedSchedule";
import MqttApiCheck from "./components/MqttApiCheck";

const Img = styled.img`
  margin-left: 188px;
  margin-top: 32px;
  `;

const FlexColumn2 = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 36px;
`;

const FlexColumn3 = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
;
`



function App() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: "flex" }}>
        <GlobalStyle />
        <FlexColumn2>
          <Img style={{width:"153px", height:"30px"}} src="https://raw.githubusercontent.com/akns27/EssetStorage/d7ee2c7c5efce1d7d233b5da2860bd94b35836f4/PLANCIENCY.svg"></Img>
          <Profile />
          <StackedSchedule/>
          <TemHumi />
        </FlexColumn2>
        <FlexColumn3>
          <Calendar />
          <ChatUI />
        </FlexColumn3>
      </div>
      {/* <MqttApiCheck /> */}
    </ThemeProvider>
  );
}

export default App;