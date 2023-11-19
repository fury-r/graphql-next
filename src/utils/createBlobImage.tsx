export const createBlobImage = (image: string): Blob => {
  const binaryData = Buffer.from(image, "base64");
  const blob = new Blob([binaryData], {
    type: "image/png",
  });

  return blob;
};

export const getBlobUrlFromImage = (image: string) => {
  const blob = createBlobImage(image);
  return URL.createObjectURL(blob);
};
