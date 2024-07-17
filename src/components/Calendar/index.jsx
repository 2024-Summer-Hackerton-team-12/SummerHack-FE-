// import CalendarIndividual from "../CalendarIndividual";
// import * as C from "../Calendar/style.js";
// import styled from "styled-components";

// const Calendar = () => {
//   const weekDays = [0, 1, 2, 3, 4, 5, 6];

//   const CalendarWrapper = styled.div`
//     display: flex;
//     width: calc(100% * 5);
//     gap: 12px;
//   `;

//   return (
//     <C.CalendarWholeContainer>
//       <CalendarWrapper>
//         {weekDays.map((day) => (
//           <CalendarIndividual key={day} />
//         ))}
//       </CalendarWrapper>
//     </C.CalendarWholeContainer>
//   );
// };

// export default Calendar;
import React from 'react';
import CalendarIndividual from "../CalendarIndividual";
import * as C from "../Calendar/style.js";
import styled from "styled-components";

const Calendar = () => {
  const weekDays = ['월', '화', '수', '목', '금', '토', '일'];

  const CalendarWrapper = styled.div`
    display: flex;
    width: calc(100% * 5);
    gap: 12px;
  `;

  // Get the current date
  const currentDate = new Date();
  
  // Find the most recent Monday
  const monday = new Date(currentDate);
  monday.setDate(currentDate.getDate() - (currentDate.getDay() + 6) % 7);

  return (
    <C.CalendarWholeContainer>
      <CalendarWrapper>
        {weekDays.map((day, index) => {
          const date = new Date(monday);
          date.setDate(monday.getDate() + index);
          return (
            <CalendarIndividual 
              key={index} 
              dayOfWeek={day} 
              date={date}
            />
          );
        })}
      </CalendarWrapper>
    </C.CalendarWholeContainer>
  );
};

export default Calendar;