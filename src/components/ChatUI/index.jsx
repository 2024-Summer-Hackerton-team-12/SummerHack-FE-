import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import * as S from './style.js';
import * as Styles from "../../style.js";

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const chatContainerRef = useRef(null);



  const presetQuestions = [
    "지난주 평균 숙면시간은 어느정도 인가요?",
    "지난주 평균 공부 시간은 무엇인가요?",
    "이번주 공부해야할 과목들을 알려주세요(쉼표로 구분)",
    "기타 참고 사항을 알려주세요(상세하게 입력할수록 좋아요)"
  ];

  useEffect(() => {
    if (currentQuestion < presetQuestions.length) {
      setMessages(prev => [...prev, { text: presetQuestions[currentQuestion], isUser: false }]);
    } else if (currentQuestion === presetQuestions.length && !isGeneratingPlan) {
      setIsGeneratingPlan(true);
      generatePlan();
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const callGPTAPI = async (prompt) => {
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      });
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error("Error calling GPT API:", error);
      throw new Error("AI 응답 생성 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInput.trim() === "") return;

    setMessages(prev => [...prev, { text: userInput, isUser: true }]);
    setUserInput('');
    setCurrentQuestion(prev => prev + 1);
  };

  const formatPlanForBackend = (plan) => {
    const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
    const formattedPlan = {};

    days.forEach((day, dayIndex) => {
      formattedPlan[day] = {};
      for (let i = 1; i <= 4; i++) {
        const descKey = `description${i > 1 ? i : ''}`;
        formattedPlan[day][descKey] = {
          id: dayIndex * 4 + i,
          time: null,
          text: null
        };
      }
    });

    const planLines = plan.split('\n');
    let currentDay = '';

    planLines.forEach(line => {
      const dayMatch = line.match(/^([A-Z]+):/);
      if (dayMatch) {
        currentDay = dayMatch[1];
      } else if (currentDay && line.trim()) {
        const timeMatch = line.match(/^(\d{2}:\d{2})/);
        if (timeMatch) {
          const time = timeMatch[1];
          const text = line.substring(time.length).trim();
          const descKeys = Object.keys(formattedPlan[currentDay]);
          const emptyDescKey = descKeys.find(key => formattedPlan[currentDay][key].text === null);
          
          if (emptyDescKey) {
            formattedPlan[currentDay][emptyDescKey] = {
              id: formattedPlan[currentDay][emptyDescKey].id,
              time: time,
              text: text
            };
          }
        }
      }
    });

    return { plans: formattedPlan };
  };

  const generatePlan = async () => {
    try {
      const userResponses = messages.filter(msg => msg.isUser).map(msg => msg.text);
      const prompt = `다음 정보를 바탕으로 일주일 간의 효율적인 학습 계획을 세워주세요:
      지난주 평균 숙면시간: ${userResponses[0]}
      지난주 평균 공부 시간: ${userResponses[1]}
      이번주 공부해야할 과목: ${userResponses[2]}
      기타 참고 사항: ${userResponses[3]}
      
      각 요일별로 4개의 학습 항목을 시간과 함께 제안해주세요. 예를 들어:
      MONDAY:
      09:00 수학 3페이지 풀기
      11:00 영어 단어 50개 암기
      14:00 과학 실험 보고서 작성
      16:00 역사 요약 정리
      
      이런 식으로 월요일부터 일요일까지 작성해주세요. 띄어쓰기를 잘 한뒤 값을 내보내주세요. 시간 배분을 비슷하게 하지말고 좀 다르게 해줘`;

      setMessages(prev => [...prev, { text: "계획을 생성 중입니다...", isUser: false, isLoading: true }]);
      
      const gptResponse = await callGPTAPI(prompt);
      
      setMessages(prev => prev.filter(msg => !msg.isLoading));
      setMessages(prev => [...prev, { text: "일주일 공부 계획이 생성되었습니다:", isUser: false }]);
      setMessages(prev => [...prev, { text: gptResponse, isUser: false, isPlan: true }]);

      const formattedPlan = formatPlanForBackend(gptResponse);
      setGeneratedPlan(formattedPlan);
      setShowConfirmation(true);
    } catch (error) {
      setMessages(prev => [...prev, { text: `오류 발생: ${error.message}`, isUser: false }]);
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const handleConfirmPlan = async () => {
    try {
      await axios.post('http://192.168.0.31:8080/api/plan', generatedPlan);
      setMessages(prev => [...prev, { text: "계획이 성공적으로 저장되었습니다.", isUser: false }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: "계획 저장 중 오류가 발생했습니다.", isUser: false }]);
    } finally {
      setShowConfirmation(false);
    }
  };

  const renderFormattedPlan = (plan) => {
    const formattedPlan = formatPlanForBackend(plan);
    
    return (
      <PlanContainer>
        {Object.entries(formattedPlan.plans).map(([day, activities]) => (
          <DayPlan key={day}>
            <DayTitle>{day}</DayTitle>
            <ActivitiesList>
              {Object.values(activities).map((activity, index) => (
                <ActivityItem key={index}>
                  {activity.time ? `${activity.time} ${activity.text}` : '-'}
                </ActivityItem>
              ))}
            </ActivitiesList>
          </DayPlan>
        ))}
      </PlanContainer>
    );
  };

  return (
    <S.ChatContainer>
      <S.ChatMessages ref={chatContainerRef}>
        {messages.map((message, index) => (
          message.isLoading ? (
            <S.ChatBubbleLeft key={index}>
              <S.ChatBubbleText>
                <TypingIndicator>계획을 생성 중입니다</TypingIndicator>
              </S.ChatBubbleText>
            </S.ChatBubbleLeft>
          ) : message.isPlan ? (
            <S.ChatBubbleLeft key={index}>
              <S.ChatBubbleText>{renderFormattedPlan(message.text)}</S.ChatBubbleText>
            </S.ChatBubbleLeft>
          ) : (
            message.isUser ? (
              <S.ChatBubbleRight key={index}>
                <S.ChatBubbleText>{message.text}</S.ChatBubbleText>
              </S.ChatBubbleRight>
            ) : (
              <S.ChatBubbleLeft key={index}>
                <S.ChatBubbleText>{message.text}</S.ChatBubbleText>
              </S.ChatBubbleLeft>
            )
          )
        ))}
      </S.ChatMessages>

      <S.FlexRow>
        <form onSubmit={handleSubmit} style={{ display: 'flex', width: '100%' }}>
          <S.ChatInput
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={currentQuestion < presetQuestions.length ? "답변을 입력해주세요" : "명령어를 입력해주세요"}
            disabled={isGeneratingPlan}
          />
          <SubmitButton type="submit" disabled={isGeneratingPlan}>
            <img src="https://raw.githubusercontent.com/akns27/EssetStorage/0f8f23956ffec75d7edc78f52c6dc049880fd11e/SubmitButton.svg" alt="Submit" />
          </SubmitButton>
        </form>
      </S.FlexRow>

      {showConfirmation && (
        <ConfirmationBox>
          <p>생성된 계획을 캘린더에 반영하시겠습니까?</p>
          <ConfirmButton onClick={handleConfirmPlan}>확인</ConfirmButton>
          <CancelButton onClick={() => setShowConfirmation(false)}>취소</CancelButton>
        </ConfirmationBox>
      )}
    </S.ChatContainer>
  );
};

const TypingIndicator = styled.div`
  &:after {
    content: '...';
    animation: ellipsis 1.5s infinite;
  }

  @keyframes ellipsis {
    0% { content: '.'; }
    33% { content: '..'; }
    66% { content: '...'; }
  }
`;

const SubmitButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  img {
    width: 40px;
    height: 40px;
  }
`;

const PlanContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 100%;
  overflow-x: auto;
`;

const DayPlan = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 15px;
`;

const DayTitle = styled.h3`
  margin: 0 0 10px 0;
  font-weight: bold;
  color: #4dabf7;
`;

const ActivitiesList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin: 0;
`;

const ActivityItem = styled.li`
  margin-bottom: 8px;
  line-height: 1.4;
`;

const ConfirmationBox = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  text-align: center;
`;

const ConfirmButton = styled.button`
  background-color: #4dabf7;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const CancelButton = styled(ConfirmButton)`
  background-color: #868e96;
`;

export default ChatUI;