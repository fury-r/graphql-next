import Image from "next/image";
import React from "react";

const ImageBlob = ({ imageUrl }: { imageUrl: string | null }) => {
  if (!imageUrl) {
    return <></>;
  }
  return <Image src={imageUrl} alt="Quote card" width={150} height={150} />;
};

export default ImageBlob;
