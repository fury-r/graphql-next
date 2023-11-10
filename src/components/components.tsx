import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export const AppBackground = styled.div`
  background: linear-gradient(to right, var(--primary), var(--accent));
  background-size: 400% 400%;
  animation: gradient 6s ease infinite;
  height: 100vh;
  width: 100vw;

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export const BackgroundImage1 = styled(Image)`
  position: relative;
  z-index: 1;
  margin-left: -10px;
  margin-right: -10px;
`;

export const BackgroundImage2 = styled(Image)`
  position: fixed;
  z-index: 1;
  right: -120px;
  bottom: 10px;
`;

export const FooterContainer = styled.div`
  width: 100vw;
  height: 50px;
  text-align: center;
  font-family: "Source Code Pro", monospace;
  font-size: 15px;
  position: absolute;
  bottom: 0;
  color: white;
  z-index: 99999;
`;

export const FooterLink = styled(Link)`
  color: white;
`;

export const RedSpan = styled.span`
  color: red;
`;
