import React from 'react';
import styled from "styled-components";
import * as P from "../Profile/style.js";
import * as Styles from "../../style.js";

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  
`;

const Profile = () => {
  return (
    <P.ProfileContainer>
      <P.ProfileImg />
      <FlexColumn style={{gap: "-16px"}}>
        <Styles.H2>오시온</Styles.H2>
        <Styles.Body2Normal style={{marginTop: "-16px"}}>3일째 초집중🔥</Styles.Body2Normal>
      </FlexColumn>
    </P.ProfileContainer>
  );
};

export default Profile;