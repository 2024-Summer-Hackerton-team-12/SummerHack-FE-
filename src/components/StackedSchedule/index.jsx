import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import cancelIcon from "../../assets/cancel.svg";
import checkIcon from "../../assets/check.svg";

const StackContainer = styled.div`
  width: auto;
  margin-left: 170px;
  padding: 16px;
`;

const ScheduleItem = styled.div`
  background-color: ${({ theme }) => theme.colors.common[100]};
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-direction: column;
`;

const Time = styled.p`
  color: ${({ theme }) => theme.colors.neutral[60]};
  font-size: 14px;
  margin: 0;
`;

const Task = styled.h3`
  color: ${({ theme }) => theme.colors.neutral[20]};
  font-size: 18px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin: 0;
  word-wrap: break-word; // Allows long words to be broken and wrap
  overflow-wrap: break-word; // Ensures long words don't overflow
  max-width: 80%; // Ensures text doesn't exceed container width
  width: 200px;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const ScheduleItemComponent = ({ time, task, onToggle }) => (
  <ScheduleItem>
    <TextContainer>
      <Time>{time}</Time>
      <Task>{task}</Task>
    </TextContainer>
    <IconContainer>
      <Icon
        style={{ width: "32px" }}
        src={cancelIcon}
        alt="Cancel"
        onClick={() => onToggle("cancel")}
      />
      <Icon
        style={{ width: "32px" }}
        src={checkIcon}
        alt="Complete"
        onClick={() => onToggle("complete")}
      />
    </IconContainer>
  </ScheduleItem>
);

const StackedSchedule = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [scheduleItems, setScheduleItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodayPlans = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://192.168.0.31:8080/api/plan");

        if (response.data && response.data.plans) {
          const today = new Date()
            .toLocaleString("en-us", { weekday: "long" })
            .toUpperCase();
          const todayPlans = response.data.plans[today];

          if (todayPlans) {
            const formattedPlans = Object.values(todayPlans).map((plan) => ({
              time: plan.time,
              task: plan.text,
            }));
            setScheduleItems(formattedPlans);
          } else {
            setScheduleItems([]);
          }
        } else {
          setError("서버 응답의 형식이 예상과 다릅니다.");
        }
      } catch (err) {
        console.error("Error fetching today's plans:", err);
        setError("오늘의 계획을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodayPlans();
  }, []);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleToggle = (index, action) => {
    if (action === "cancel" || action === "complete") {
      const newItems = scheduleItems.filter((_, i) => i !== index);
      setScheduleItems(newItems);
      if (newItems.length === 0) setIsExpanded(false);
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (scheduleItems.length === 0)
    return <div>오늘은 예정된 일정이 없습니다.</div>;

  return (
    <StackContainer onClick={toggleExpand}>
      {isExpanded ? (
        scheduleItems.map((item, index) => (
          <ScheduleItemComponent
            key={index}
            time={item.time}
            task={item.task}
            onToggle={(action) => handleToggle(index, action)}
          />
        ))
      ) : (
        <ScheduleItemComponent
          time={scheduleItems[0].time}
          task={scheduleItems[0].task}
          onToggle={(action) => handleToggle(0, action)}
        />
      )}
    </StackContainer>
  );
};

export default StackedSchedule;
