import * as Styles from '../../style.js';
import styled from 'styled-components';


export const CalendarContainer = styled.div`
  display: flex;
  width: 167px;
  padding: 17px 16px;
  height: 200px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  border-radius: 8px;
  border: 1px solid ${Styles.theme.colors.neutral[20]};
`;
