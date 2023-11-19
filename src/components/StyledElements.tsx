import { Box, CircularProgress } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export const AppBackground = styled.div`
  background: linear-gradient(to right, var(--primary), var(--accent));
  background-size: 400% 400%;
  animation: gradient 6s ease infinite;
  height: 100vh;
  width: 100vw;
  color: black;
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

export const AppContainer = styled.div`
  min-height: 350px;
  min-width: 350px;
  height: 70vh;
  width: 70vw;
  border: 2px solid #ffffff22;
  border-radius: 15px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  z-index: 2;

  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 26px;
  box-shadow: 35px 35px 68px 0px rgba(145, 192, 255, 0.5),
    inset -9px -9px 16px 0px rgba(145, 192, 255, 0.6),
    inset 0px 11px 28px 0px rgb(255, 255, 255);
`;

export const AppInnerContainer = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  width: 100%;
`;

export const AppTitle = styled.div`
  font-family: "Nunito", sans-serif;
  font-size: 50px;
  text-align: center;
  color: black;
  padding: 0px 20px 0px 20px;
  position: relative;
  /* media query */
  @media only screen and (max-width: 600px) {
    font-size: 30px;
  }
`;

export const AppSubTitle = styled.div`
  color: black;
  font-family: "Nunito", sans-serif;
  font-size: 35px;
  position: relative;
  width: 100%;
  text-align: center;
  padding: 0px 20px 0px 20px;
  @media only screen and (max-width: 600px) {
    font-size: 25px;
  }
`;

export const AppButton = styled.div`
  height: 100px;
  width: 300px;
  border: 2px solid darkgrey;
  border-radius: 20px;

  margin-top: 20px;
  position: relative;
  transition: 0.2s all ease-in-out;
  cursor: pointer;
  top: 20px;
  margin: auto;
  transform-origin: center;
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 26px;
  box-shadow: 0px 35px 68px 0px rgba(0, 108, 255, 0.5),
    inset 0px -9px 16px 0px rgba(0, 108, 255, 0.6),
    inset 0px 11px 28px 0px rgb(255, 255, 255);
  &:hover {
    filter: contrast(3);
    transition: 0.2s all ease-in-out;
    transform: scale(1.1);
    transform-origin: center;
  }
`;

export const ButtonText = styled.div`
  color: black;
  font-family: "Nunito", sans-serif;
  font-size: 35px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  width: 100%;
  text-align: center;
`;

export const ModalContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70vw;
  height: 70vh;
  box-shadow: 24;

  background: rgb(193 193 255 / 19%);
  box-shadow: 0 8px 32px 0 rgb(31 38 135 / 37%);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  &:focus {
    outline: none !important;
  }
`;
export const ModalInnerContainer = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: relative;
`;

export const ModalCircularLoader = styled(CircularProgress)`
  color: white !important;
  stroke-linecap: round;
  position: relative;
  margin-left: -55px;
  left: 50%;
  transform: translateX(-50%);
`;
