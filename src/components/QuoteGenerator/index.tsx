import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Backdrop, Fade, Modal } from "@mui/material";
import {
  AppSubTitle,
  AppTitle,
  ModalCircularLoader,
  ModalContainer,
  ModalInnerContainer,
} from "../StyledElements";
import ImageBlob from "../animations/ImageBlob";
import { ImgBlobCon } from "../animations/StyledElements";
import DownloadButton from "../animations/DownloadButton";
import { getBlobUrlFromImage } from "@src/utils/createBlobImage";

interface IQuoteGenerator {
  open: boolean;
  close: () => void;
  processing: boolean;
  setProcessing: Dispatch<SetStateAction<boolean>>;
  dataRecieved: string | null;
  setDataRecieved: Dispatch<SetStateAction<string | null>>;
}
const style = {};
const QuoteGenerator = ({
  open,
  close,
  dataRecieved,
  processing,
  setDataRecieved,
  setProcessing,
}: IQuoteGenerator) => {
  const quote = "Delete repo to solve all your problems";
  const author = "-fury-r";

  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const handleDownload = () => {
    if (typeof blobUrl === "string") {
      const link = document.createElement("a");
      link.download = "quote.png";
      link.href = blobUrl;
      link.click();
      close();
    }
  };

  useEffect(() => {
    if (dataRecieved) {
      setBlobUrl(getBlobUrlFromImage(dataRecieved));
    }
  }, [dataRecieved]);
  return (
    <Modal
      id="AppModal"
      aria-labelledby="spring-modal-Appmodal"
      aria-describedby="spring-modal-opens-and-closes-quote-generator"
      open={open}
      onClose={close}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <ModalContainer sx={style}>
          <ModalInnerContainer>
            {processing && (
              <>
                <ModalCircularLoader size={"8rem"} thickness={2.5} />
                <AppTitle>Generating your Quote</AppTitle>
                <AppSubTitle>
                  {quote}

                  <br />
                  <span style={{ fontSize: 26 }}>{author}</span>
                </AppSubTitle>
              </>
            )}
            {dataRecieved && (
              <>
                <AppTitle>
                  Download your quote
                  <AppSubTitle
                    style={{
                      marginBottom: "15px",
                    }}
                  >
                    See preview:
                  </AppSubTitle>
                  <ImgBlobCon>
                    <ImageBlob imageUrl={blobUrl} />
                  </ImgBlobCon>
                  <DownloadButton
                    handleDownload={handleDownload}
                    title="Quote"
                  />
                </AppTitle>
              </>
            )}
          </ModalInnerContainer>
        </ModalContainer>
      </Fade>
    </Modal>
  );
};

export default QuoteGenerator;
