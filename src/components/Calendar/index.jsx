import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CalendarIndividual from "../CalendarIndividual";
import * as C from "../Calendar/style.js";
import styled from "styled-components";

const Calendar = () => {
  const [plansData, setPlansData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const weekDays = ['월', '화', '수', '목', '금', '토', '일'];

  const CalendarWrapper = styled.div`
    display: flex;
    width: calc(100% * 5);
    gap: 12px;
  `;

  // Get the current date
  const currentDate = new Date();
  
  const monday = new Date(currentDate);
  monday.setDate(currentDate.getDate() - (currentDate.getDay() + 6) % 7);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://192.168.0.31:8080/api/plan');
        if (response.data && response.data.plans) {
          setPlansData(response.data.plans);
        } else {
          setError('서버 응답의 형식이 예상과 다릅니다.');
        }
      } catch (err) {
        console.error("Error fetching plans:", err);
        setError('계획을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <C.CalendarWholeContainer>
      <CalendarWrapper>
        {weekDays.map((day, index) => {
          const date = new Date(monday);
          date.setDate(monday.getDate() + index);
          const dayKey = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][date.getDay()];
          return (
            <CalendarIndividual 
              key={index} 
              dayOfWeek={day} 
              date={date}
              plans={plansData[dayKey]}
            />
          );
        })}
      </CalendarWrapper>
    </C.CalendarWholeContainer>
  );
};

export default Calendar;