import React from "react";
import Lottie from "react-lottie-player";
import lottieAnimation from "@src/assets/animated-photo.json";
import {
  CenteredLottie,
  DownloadCardCon,
  DownloadCardConText,
} from "./StyledElements";
const DownloadButton = ({
  title,
  handleDownload,
}: {
  title: string;
  handleDownload: () => void;
}) => {
  return (
    <DownloadCardCon onClick={handleDownload}>
      <CenteredLottie loop animationData={lottieAnimation} play />
      <DownloadCardConText>Download your {title} card</DownloadCardConText>
    </DownloadCardCon>
  );
};

export default DownloadButton;
