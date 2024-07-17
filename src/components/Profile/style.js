import * as Styles from "../../style.js";
import styled from "styled-components";

export const ProfileContainer = styled.div`
  display: inline-flex;
  padding: 16px 56px 16px 8px;
  align-items: center;
  gap: 16px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.neutral[99]};
`;

export const ProfileImg = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 999px;
  background: url("src/assets/시온 5.jpeg") lightgray 0px -35.2px / 100% 150.037%
    no-repeat;
`;
