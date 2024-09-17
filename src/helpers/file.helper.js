export const extractFilenameFromUrl = (url) => {
  const parts = url.split("/");
  const fileName = parts[parts.length - 1];
  return fileName;
};
