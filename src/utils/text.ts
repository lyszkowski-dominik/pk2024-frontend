export const truncateFileName = (filename: string, maxLength: number = 60) => {
  const filenameLength = filename.length;
  if (filename.length < maxLength) {
    return filename;
  }
  const extIndex = filename.lastIndexOf('.');
  const extLength = filenameLength - extIndex;
  const newFilename = filename.slice(0, maxLength - extLength - 4);
  const ext = filename.slice(extIndex);
  return newFilename + '... ' + ext;
};
