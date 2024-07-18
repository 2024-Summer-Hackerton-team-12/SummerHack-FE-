// import React, { useState, useEffect } from 'react';
// import * as TH from "./style.js";
// import * as Styles from "../../style.js";
// import styled from "styled-components";

// const Degree = styled.span`
//   vertical-align: super;
//   font-size: 0.6em;
// `;

// const TemHumi = () => {
//   const [lightMode, setLightMode] = useState('강');
//   const [isAutoAdjusting, setIsAutoAdjusting] = useState(false);

//   useEffect(() => {
//     let interval;
//     if (isAutoAdjusting) {
//       interval = setInterval(() => {
//         setLightMode(prevMode => {
//           switch(prevMode) {
//             case '중': return '강';
//             case '강': return '약';
//             case '약': return '중';
//             default: return '강';
//           }
//         });
//       }, 2500);
//     }
//     return () => clearInterval(interval);
//   }, [isAutoAdjusting]);

//   const handleAutoAdjust = () => {
//     setIsAutoAdjusting(prev => !prev);
//   };

//   return (
//     <TH.TemHumiContainer>
//       <TH.SingleContainer>
//         <TH.SmallContainer>
//           <Styles.H1>온도</Styles.H1>
//           <Styles.T1>
//             24<Degree>◦</Degree>c
//           </Styles.T1>
//         </TH.SmallContainer>
//       </TH.SingleContainer>
//       <TH.SingleContainer>
//         <TH.SmallContainer>
//           <Styles.H1>습도</Styles.H1>
//           <Styles.T1>80%</Styles.T1>
//         </TH.SmallContainer>
//       </TH.SingleContainer>
//       <TH.SingleContainer>
//         <TH.SmallContainer>
//           <Styles.H1>조명</Styles.H1>
//           <Styles.T1>{lightMode}</Styles.T1>
//         </TH.SmallContainer>
//       </TH.SingleContainer>
//       <TH.Button onClick={handleAutoAdjust}>
//         <Styles.Label style={{cursor:"pointer"}}>
//           {isAutoAdjusting ? "자동 조절 중지" : "자동 조절 시작"}
//         </Styles.Label>
//       </TH.Button>
//     </TH.TemHumiContainer>
//   );
// };

// export default TemHumi;


import React, { useState, useEffect } from 'react';
import * as TH from "./style.js";
import * as Styles from "../../style.js";
import styled from "styled-components";
import axios from 'axios';

const Degree = styled.span`
  vertical-align: super;
  font-size: 0.6em;
`;

const TemHumi = () => {
  const [temperature, setTemperature] = useState(24);
  const [humidity, setHumidity] = useState(80);
  const [lightMode, setLightMode] = useState('강');
  const [isAutoAdjusting, setIsAutoAdjusting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.0.31:8080/api/mqtt');
        setTemperature(response.data.temperature);
        setHumidity(response.data.humidity);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // 1분마다 데이터 업데이트

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval;
    if (isAutoAdjusting) {
      interval = setInterval(() => {
        setLightMode(prevMode => {
          switch(prevMode) {
            case '중': return '강';
            case '강': return '약';
            case '약': return '중';
            default: return '강';
          }
        });
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isAutoAdjusting]);

  const handleAutoAdjust = () => {
    setIsAutoAdjusting(prev => !prev);
  };

  return (
    <TH.TemHumiContainer>
      <TH.SingleContainer>
        <TH.SmallContainer>
          <Styles.H1>온도</Styles.H1>
          <Styles.T1>
            {temperature}<Degree>◦</Degree>c
          </Styles.T1>
        </TH.SmallContainer>
      </TH.SingleContainer>
      <TH.SingleContainer>
        <TH.SmallContainer>
          <Styles.H1>습도</Styles.H1>
          <Styles.T1>{humidity}%</Styles.T1>
        </TH.SmallContainer>
      </TH.SingleContainer>
      <TH.SingleContainer>
        <TH.SmallContainer>
          <Styles.H1>조명</Styles.H1>
          <Styles.T1>{lightMode}</Styles.T1>
        </TH.SmallContainer>
      </TH.SingleContainer>
      <TH.Button onClick={handleAutoAdjust}>
        <Styles.Label style={{cursor:"pointer"}}>
          {isAutoAdjusting ? "자동 조절 중지" : "자동 조절 시작"}
        </Styles.Label>
      </TH.Button>
    </TH.TemHumiContainer>
  );
};

export default TemHumi;