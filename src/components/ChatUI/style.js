import styled from "styled-components";
import * as Styles from "../../style.js";

export const ChatContainer = styled.div`
  width: 768px;
  height: 574px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.common[100]};
  border: 1px solid ${({ theme }) => theme.colors.neutral[20]};
`;

export const ChatInput = styled.input`
  display: flex;
  width: 625px;
  padding: 16px 400px 16px 28px;
  align-items: center;
  border-radius: 40px;
  background: ${({ theme }) => theme.colors.neutral[99]};
  border: none;
`;

export const ChatBubbleLeft = styled.div`
  display: inline-flex;
  padding: 10px 12px;
  max-width: 70%;
  align-items: center;
  border-radius: 16px 16px 16px 0px;
  background: ${({ theme }) => theme.colors.primary[100]};
  align-self: flex-start;
  word-wrap: break-word;
`;

export const ChatBubbleRight = styled.div`
  display: inline-flex;
  padding: 10px 12px;
  max-width: 70%;
  justify-content: center;
  align-items: center;
  text-align: right;
  border-radius: 16px 16px 0px 16px;
  background: ${({ theme }) => theme.colors.neutral[99]};
  align-self: flex-end;
  word-wrap: break-word;
`;

export const ChatBubbleText = styled(Styles.Hd2)`
  // 추가적인 스타일이 필요한 경우 여기에 작성
`;

export const ChatMessages = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  overflow-y: auto;
  padding: 20px;
`;

export const FlexRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 701px;
  margin: 0 auto;
  height: 100%;
  margin-top: -200px;
`;
