import React from "react";
import * as Styles from "../../style.js";
import * as CI from "../CalendarIndividual/style.js";
import styled from "styled-components";

const TextFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;
`;

const StyledH1 = styled(Styles.H1)`
  margin-bottom: 0px;
`;


const NewCaption2 = styled(Styles.Caption2)`
  color: #c4c4c4;

`;

const CalendarWrapper = styled.div`
  position: relative;
  width: fit-content;
`;

const CheckIcon = styled.img`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 24px;
  height: 24px;
`;

const CalendarIndividual = ({ dayOfWeek, date }) => {
  const formattedDate = `${date.getMonth() + 1}월 ${date.getDate()}일`;

  return (
    <CalendarWrapper>
      <CI.CalendarContainer>
        <TextFlex>
          <StyledH1>{dayOfWeek}요일</StyledH1>
          <NewCaption2>{formattedDate}</NewCaption2>
        </TextFlex>
        <TextFlex>
          <ul>
            <li>~하기</li>
            <li>~하기</li>
            <li>~하기</li>
            <li>~하기</li>
          </ul>
        </TextFlex>
      </CI.CalendarContainer>
      <CheckIcon
        style={{ width: "40px", height: "40px" }}
        src="https://raw.githubusercontent.com/akns27/EssetStorage/70800f3f104b26a94474063f5a0064070e1c5e4b/check.svg"
        alt="Check"
      />
    </CalendarWrapper>
  );
};

export default CalendarIndividual;
