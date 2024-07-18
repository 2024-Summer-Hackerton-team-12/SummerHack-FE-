import styled from "styled-components";

export const TemHumiContainer = styled.div`
  display: flex;
  width: auto;
  height: auto;
  padding: 12px 8px 20px 8px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.neutral[99]};
  margin-left: 188px;
  margin-top: 50px;
`;

export const SingleContainer = styled.div`
  display: flex;
  padding: 8px 8px 16px 8px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral[97]};
`;

export const Button = styled.div`
  display: flex;
  padding: 12px 20px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary[100]};
  margin-top: 32px;
`;

export const SmallContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
`;
