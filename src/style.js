import styled, { createGlobalStyle } from "styled-components";

export const theme = {
  colors: {
    neutral: {
      99: "#F7F7F7",
      98: "#F4F4F5",
      97: "#EAEBEC",
      96: "#E1E2E4",
      95: "#DCDCDC",
      90: "#C4C4C4",
      80: "#B0B0B0",
      70: "#9B9B9B",
      60: "#8A8A8A",
      50: "#737373",
      40: "#5C5C5C",
      30: "#474747",
      22: "#303030",
      20: "#2A2A2A",
      15: "#1C1C1C",
      10: "#171717",
      5: "#0F0F0F",
    },
    primary: {
      100: "#7DFCA0",
    },
    common: {
      100: "#FFFFFF",
      0: "#000000",
    },
  },
  fonts: {
    main: "Pretendard",
  },
  fontWeights: {
    regular: 400,
    semibold: 600,
    bold: 700,
  },
};

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${({ theme }) => theme.fonts.main};
    color: ${({ theme }) => theme.colors.neutral[20]};
  }
`;

export const D1 = styled.div`
  font-size: 56px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 128.6%;
  letter-spacing: -1.786px;
`;

export const D2 = styled.div`
  font-size: 40px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 130%; 
  letter-spacing: -1.168px;
`;

export const T1 = styled.div`
  font-size: 36px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 133.4%;
  letter-spacing: -0.972px;
`;

export const T2 = styled.div`
  font-size: 28px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 135.8%;
  letter-spacing: -0.661px;
`;

export const T3 = styled.div`
  font-size: 24px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 133.4%;
  letter-spacing: -0.552px;
`;

export const H1 = styled.h1`
  font-size: 22px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 136.4%;
  letter-spacing: -0.427px;
`;

export const H2 = styled.h2`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 140%;
  letter-spacing: -0.24px;
`;

export const Hd1 = styled.div`
  font-size: 18px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 144.5%;
  letter-spacing: -0.004px;
`;

export const Hd2 = styled.div`
  font-size: 17px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 141.2%; 
`;

export const Body1Normal = styled.p`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 150%;
  letter-spacing: 0.091px;
`;

export const Body1Reading = styled.p`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 162.5%;
  letter-spacing: 0.091px;
`;

export const Body2Normal = styled.p`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 147%;
  letter-spacing: 0.144px;
`;

export const Body2Reading = styled.p`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 160%;
  letter-spacing: 0.144px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 157.14%;
  letter-spacing: 0.203px;
`;

export const Caption1 = styled.span`
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 133.4%;
  letter-spacing: 0.302px;
`;

export const Caption2 = styled.span`
  font-size: 11px;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 127.3%;
  letter-spacing: 0.342px;
`;